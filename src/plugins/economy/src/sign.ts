import CommandManager from "~/core/manager";
import { Client } from "oicq";
import { GroupProfile, SystemProfile, UserProfile } from "~/core/profile";
import { IMessage } from "~/core/typings";
import hitokoto from "~/services/hitokoto";
import ms from "ms";
import pms from "pretty-ms";
import { handleXP } from "./../../../services/db";
/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "sign",
		alias2: ["签到"],
		handler: async (msg: IMessage) => {
			const p = await UserProfile(msg);
			const g = await GroupProfile(msg);
			const s = await SystemProfile();

			const dp = new Date(p.lastSign ?? Date.now());
			const dg = new Date(g.lastSign ?? Date.now());

			const dn = new Date();

			const dt = new Date(dn);
			dt.setDate(dt.getDate() + 1);
			dt.setHours(0, 0, 0, 0);

			const dk = new Date(dp);
			dk.setDate(dp.getDate() + 1);
			dk.setHours(0, 0, 0, 0);

			if (dp.getDay() == dn.getDay()) {
				msg.reply(
					`需要等待${pms(dt.getTime() - dn.getTime())}才能下次签到！`
				);
				return;
			}

			if (dg.getDay() !== dn.getDay()) {
				g.signCountToday = 0;
			}

			if (dn.getDay() == dk.getDay()) {
				p.signCombo++;
			} else {
				p.signCombo = 1;
			}

			let isFirstSign = false,
				giveCoin = random(50, 100),
				giveExp = random(5, 10);

			if (p.lastSign == 0) {
				isFirstSign = true;
				giveCoin = Math.floor(giveCoin * 1.5);
				giveExp = Math.floor(giveExp * 1.2);
			}

			giveCoin = Math.floor(giveCoin * (p.signCombo * 0.3));
			giveExp = Math.floor(giveCoin * (p.signCombo * 0.2));

			p.lastSign = Date.now();
			g.lastSign = Date.now();

			p.signCount++;
			g.signCount++;
			s.signCount++;

			g.signCountToday++;

			p.coin += giveCoin;
			p.exp[0] += giveExp;

			handleXP(p);

			msg.reply(
				`签到成功！${
					isFirstSign ? "这是你第一天签到！" : getTimeDependedString()
				}
今日共有${g.signCountToday}人签到
本群已有${g.signCount}人签到
已经连续签到${p.signCombo}天
积累签到天数${p.signCount}天
金币+${giveCoin} 经验+${giveExp}

当前金币：${p.coin}
当前等级：${p.level} (${p.exp[0]} / ${p.exp[1]})
-------------------------
${(await hitokoto()).hitokoto}
`,
				true
			);

			await p.save();
			await g.save();
			await s.save();
		}
	});
}

function getTimeDependedString() {
	const hr = new Date().getHours();
	if (hr <= 8) return "今天好早啊~";
	else if (hr <= 13) return "早上好！";
	else if (hr <= 18) return "下午好耶~";
	else if (hr <= 24) return "晚上好~";
	return "好耶！";
}

module.exports = load;

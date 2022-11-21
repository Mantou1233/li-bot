import Manager from "../../../core/manager";

import { GroupProfile, UserProfile } from "~/core/profile";
import { Client, segment } from "oicq";
import ms from "ms";
import hitokoto from "~/services/hitokoto";
import { Sign } from "~/services/Sign";

/**
 * @returns void
 */
async function load(client: Client, cm: Manager) {
	cm.register({
		command: "restart",
		handler: msg => {
			msg.reply("正在热重置，请稍等片刻...");
			client.loader.restart(msg.group_id);
		}
	});
	cm.register({
		command: "ping",
		handler: async msg => {
			const myhitokoto = await hitokoto();
			msg.reply([
				segment.json(
					(
						await Sign(
							JSON.stringify({
								actionData: "",
								actionData_A: "",
								app: "com.tencent.bot.task.deblock",
								appID: "",
								desc: "",
								extra: "",
								meta: {
									detail: {
										appID: "",
										botName: `${ms(
											Date.now() - msg.time * 1000
										)} | 数据库`,
										cmdTitle: `璃酱 - 2022`,
										content: `${myhitokoto.hitokoto} ——${
											myhitokoto.from_who ||
											myhitokoto.from
										}`,
										guildID: "",
										iconLeft: [{ num: "10" }],
										iconRight: [],
										receiverName: `${msg.sender.nickname}`
									}
								},
								prompt: "生命体正常|深潛接口",
								sourceAd: "",
								sourceName: "",
								sourceUrl: "",
								text: "",
								ver: "2.0.4.0",
								view: "index"
							})
						)
					).data
				)
			]);
		}
	});

	cm.register({
		command: "help",
		alias: ["h"],
		alias2: ["菜单", "帮助"],
		handler: async (msg, { prefix }) => {
			const content = msg.content;
			/* prettier-ignore */ //ignore this line!
			const commands = ((cm) => {let _ = {};for(let [key, value] of cm.entries()) _[key] = value; return _;})(cm.commands);

			const args = ap(content);

			if (!args[1]) {
				let keys: any[] = [];
				for (let command of Object.keys(commands)) {
					keys.push(command);
				}
				let categoryLists: any[] = [];
				let helpMsg = `机械人帮助界面\n现在的触发符是: "${prefix}" \n如果指令是英文的使用"${prefix}[指令]"使用指令\n如果是中文的直接打出来\n用"${prefix}help <指令>"查看指令详细用法。\n请注意指令名后如有参数要加空格!\n已经注册了的指令：`;
				Object.values(commands).forEach((c: any) => {
					if ("category" in c) {
						if (c.category in categoryLists) {
							let display = prefix + c.command;
							if (c.alias2) display = c.alias2[0];
							if (c.display) display = c.display;
							categoryLists[c.category] += ", " + display + "";
						} else {
							let display = prefix + c.command;
							if (c.alias2) display = c.alias2[0];
							if (c.display) display = c.display;
							categoryLists[c.category] = "\n" + display;
						}
					}
				});
				for (const [key, value] of Object.entries(categoryLists)) {
					helpMsg += `\n-----${key}-----` + value + "";
				}
				return msg.reply(helpMsg, true);
			}
			msg.reply("错误");
		}
	});
}

module.exports = load;

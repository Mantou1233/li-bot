import CommandManager from "@core/Manager";
import { Client, segment } from "oicq";
import { UserProfile } from "~/core/Profile";
import { IMessage } from "~/core/typings";
import { ListUI } from "~/services/embed";
import { toPercent } from "~/services/math";
const { db } = storage;

/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "balance",
		alias: ["bal"],
		alias2: ["查询"],
		handler: async (msg: IMessage) => {
			const p = await UserProfile(msg);
			msg.reply(`账户信息如下：
个人财富：${p.coin}金币
签到次数：${p.signCount}次
存款金额：${p.bank} / ${p.bankAmount} (${toPercent(p.bank, p.bankAmount)})
个人等级：${p.level} (${p.exp[0]} / ${p.exp[1]})`);
		}
	});
	cm.register({
		command: "balancetop",
		alias: ["baltop"],
		alias2: ["排行榜"],
		handler: async (msg: IMessage) => {
			const users = await db.all({
				filter: ({ ID, data }) => ID.startsWith("qq:user:")
			});
			const members = await client.getGroupMemberList(msg.group_id);
			const memberSets = [...members.values()].map(v => v.user_id);
			const toplist = users
				.filter(v =>
					memberSets.includes(parseInt(v.ID.replace("qq:user:", "")))
				)
				.sort(
					(a: any, b: any) =>
						a.data.coin + a.data.bank - (b.data.coin + b.data.bank)
				)
				.reverse()
				.map((v: any, index) => ({
					id: parseInt(v.ID.replace("qq:user:", "")),
					name: members.get(parseInt(v.ID.replace("qq:user:", "")))
						?.nickname,
					index: index + 1,
					money: v.data!.coin
				}));
			msg.reply([
				segment.json(
					await ListUI({
						data: Array(10)
							.fill(undefined)
							.map((v, i) => ({
								title: `${i + 1}.`,
								value: toplist[i]
									? `${toplist[i].name} (${toplist[i].id}) - $${toplist[i].money}`
									: ""
							})) as any,
						title: "经济排行榜",
						name: "璃",
						page: [1, Math.round(toplist.length / 10) + 1],
						prompt: "经济排行榜"
					})
				)
			]);
		}
	});
}

module.exports = load;

import Manager from "../../../core/manager";

import { GroupProfile, UserProfile } from "~/core/profile";
import { Client, segment } from "oicq";
import ms from "ms";
import hitokoto from "~/services/hitokoto";
import { Sign } from "~/services/Sign";
import { MessageCommand } from "~/core/structure/Types";

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
			msg.reply(`pong! ${ms(Date.now() - msg.time * 1000)}`);
			// const myhitokoto = await hitokoto();
			// msg.reply([
			// 	segment.json(
			// 		(
			// 			await Sign(
			// 				JSON.stringify({
			// 					actionData: "",
			// 					actionData_A: "",
			// 					app: "com.tencent.bot.task.deblock",
			// 					appID: "",
			// 					desc: "",
			// 					extra: "",
			// 					meta: {
			// 						detail: {
			// 							appID: "",
			// 							botName: `${ms(
			// 								Date.now() - msg.time * 1000
			// 							)} | 数据库`,
			// 							cmdTitle: `璃酱 - 2022`,
			// 							content: `${myhitokoto.hitokoto} ——${
			// 								myhitokoto.from_who ||
			// 								myhitokoto.from
			// 							}`,
			// 							guildID: "",
			// 							iconLeft: [{ num: "10" }],
			// 							iconRight: [],
			// 							receiverName: `${msg.sender.nickname}`
			// 						}
			// 					},
			// 					prompt: "生命体正常|深潛接口",
			// 					sourceAd: "",
			// 					sourceName: "",
			// 					sourceUrl: "",
			// 					text: "",
			// 					ver: "2.0.4.0",
			// 					view: "index"
			// 				})
			// 			)
			// 		).data
			// 	)
			// ]);
		}
	});

	cm.register({
		command: "help",
		alias: ["h"],
		desc: "查看指令列表或某模块的指令",
		alias2: ["菜单", "帮助", "模块"],
		handler: async (msg, { prefix }) => {
			const content = msg.content;
			/* prettier-ignore */ //ignore this line!
			const args = ap(content);

			const categorys = [
				...new Set(
					[...client.manager.commands.values()].map(v => v.category)
				)
			];
			if (!args[1]) {
				return msg.reply(
					`你好你好，这里是nico!!\n现在的触发符是: "${prefix}" \n如果指令是英文的使用"${prefix}[指令]"使用指令\n如果是中文的直接打出来\n用"${prefix}模块 <模块名>"阅读指定模块的指令。\n模块包括: ${[
						...categorys
					].join(", ")}`,
					true
				);
			} else {
				if (!categorys.includes(args[1]))
					return msg.reply("没有这个模块!");
				msg.reply(
					[...client.manager.commands.values()]
						.filter(v => v.category == args[1])
						.reduce(
							(i, v) =>
								i +
								`\n${(
									v.usage ??
									`${
										v.alias2?.length
											? `${v.alias2?.[0]}`
											: `%p${v.command}`
									}`
								).replaceAll("%p", prefix)}: ${
									v.desc ?? "无简介"
								}`,
							`${args[1]}的指令列表:`
						),
					true
				);
			}
		}
	});
}

module.exports = load;

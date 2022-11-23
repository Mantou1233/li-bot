import CommandManager from "~/core/manager";
import { Client, segment } from "oicq";
import data from "../data.json";
import { ListUI } from "~/services/embed";
import { UserProfile } from "~/core/profile";
import { parseTree } from "~/services/get";

/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "shop",
		alias2: ["商店"],
		handler: async msg => {
			const page = 1;
			const entries = Object.entries(data.buy);
			msg.reply([
				segment.json(
					await ListUI({
						data: Array(10)
							.fill(undefined)
							.map((v, i) => ({
								title: entries[i + (page - 1) * 10]
									? `$${entries[i + (page - 1) * 10][1]}`
									: " ",
								value: entries[i + (page - 1) * 10]
									? `${td(entries[i + (page - 1) * 10][0])}`
									: " "
							})) as any,
						title: "商店",
						name: "璃",
						footer: '使用"购买 <物品>"购买指定物品！',
						page: [page, 1],
						prompt: "商店"
					})
				)
			]);
		}
	});
	cm.register({
		command: "sell",
		alias2: ["出售"],
		handler: async msg => {
			const args = ap(msg.content, true);
			const p = await UserProfile(msg);
			let list = {};
			if (args[1]) {
				if (args[1] === "all" || args[1] === "全部")
					list = { ...data.sell };
				else {
					const id = inv.get(args[1], Object.keys(data.sell));
					if (!id) return msg.reply("商店好像不收这个东西...", true);
					if (!p.inv[id])
						return msg.reply("你好像没有这东西...", true);
					list = { [id]: data.sell[id] };
				}
			}
			let text = "";
			let result = {};
			let count = 0,
				value = 0;
			for (let [k, v] of Object.entries(list) as [string, number][]) {
				if (p.inv[k] > 0) {
					result[k] = p.inv[k];
					count += p.inv[k];
					value += p.inv[k] * v;
					inv.delete(p, k);
					text += `\n${td(k)} x${result[k]}`;
				}
			}
			text = text || "\n什么都没有！";
			msg.reply([
				segment.at(msg.user_id),
				` 你售出了：${text}\n共售出${count}件物品，获得${value}个金币。`
			]);
			p.coin += value;
			p.save();
		}
	});
	cm.register({
		command: "buy",
		alias2: ["购买"],
		desc: "从商店购买物品",
		usage: "购买 <物品>",
		handler: async msg => {
			const args = ap(msg.content, true);
			const p = await UserProfile(msg);

			if (!args[1]) msg.reply("请提供你要买什么物品！", true);

			const id = inv.get(args[1], Object.keys(data.buy));
			if (!id) return msg.reply("商店好像不卖这个东西...", true);
			if (p.coin < data.buy[id])
				return msg.reply("你好像不够钱...", true);
			p.coin -= data.buy[id]?.value ?? data.buy[id];
			inv.add(p, id, 1);
			msg.reply(
				[segment.at(msg.user_id), ` 你成功购买了${td(id)}!`],
				true
			);
			p.save();
		}
	});
}

module.exports = load;

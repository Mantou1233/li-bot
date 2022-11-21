import CommandManager from "~/core/manager";
import { Client, segment } from "oicq";
import data from "../data.json";
import { ListUI } from "~/services/embed";

/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "shop",
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
}

module.exports = load;

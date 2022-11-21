import CommandManager from "~/core/manager";
import { Client, segment } from "oicq";
import { UserProfile } from "~/core/profile";
import data from "~/plugins/economy/data.json";
import { parseTree } from "./../../../services/get";
const { db } = storage;

/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "use",
		alias2: ["使用"],
		handler: async msg => {
			const args = ap(msg.content, true);
			const p = await UserProfile(msg);
			const id = inv.get(args[1], Object.keys(data.use));
			if (!id) return msg.reply("这个物品好像不能用... 换个试试?", true);
			if (!p.inv[id]) return msg.reply("你好像没有这东西...", true);
			const parsed = parseTree(data.use[id]);
			let remove = true;
			for (let [key, value] of Object.entries(parsed) as [string, any]) {
				if (key == "$coin") p.coin += value;

				if (key == "$exp") p.exp += value;
				if (key == "#noAutoRemove") remove = value;

				if (key.startsWith("$rm_"))
					inv.remove(p, key.replace("$rm_"), value);
				if (!"#$@%".includes(key[0])) inv.add(p, key, value);
			}
			if (remove) inv.remove(p, id, 1);
			msg.reply(
				parsed["@msg"] ||
					"呃呃，你好像使用了一个物品，但是没有文本。请联系馒头。",
				true
			);
			p.save();
		}
	});
}

module.exports = load;

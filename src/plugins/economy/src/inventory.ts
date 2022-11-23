import { Client, User } from "oicq";
import Manager from "~/core/manager";
import { UserProfile } from "~/core/profile";

/**
 * @returns void
 */
async function load(client: Client, cm: Manager) {
	cm.register({
		command: "inventory",
		category: "经济",
		desc: "查看背包。",
		usage: "背包",
		alias: ["inv"],
		alias2: ["背包"],
		handler: async msg => {
			const p = await UserProfile(msg);
			msg.reply(
				Object.entries(p.inv).reduce(
					(i, [k, v]) => i + `${td(k)} x${v}\n`,
					"你的背包：\n"
				)
			);
		}
	});
}
module.exports = load;

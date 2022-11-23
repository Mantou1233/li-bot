import CommandManager from "~/core/manager";
import { Client } from "oicq";
import { UserProfile } from "~/core/profile";
import pms from "pretty-ms";
import { getPlantingTimestamp } from "./../../../services/db";
import data from "~/plugins/economy/data.json";
/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	client.getFriendList
	cm.register({
		command: "plant",
		usage: "种植 <田地号码> <种子>",
		alias2: ["种植"],
		handler: async msg => {
			let args = ap(msg.content, true);
			const seed = args[1];
			const p = await UserProfile(msg);
			if (p.planting !== "none")
				return msg.reply(
					`你已经在种${td(p.planting.plant)}了！还有${pms(
						getPlantingTimestamp(p) - Date.now()
					)}就熟啦~`
				);
			const id = inv.get(seed, Object.keys(data.plant));
			if (!id) return msg.reply("这个东西不能种哦~");
			else {
				p.planting = {
					plant: id,
					lastPlant: Date.now()
				};
				msg.reply(
					`在种植${td(id)}啦！稍等${pms(
						getPlantingTimestamp(p) - Date.now()
					)}就熟啦~`
				);
				p.save();
			}
		}
	});
}

module.exports = load;

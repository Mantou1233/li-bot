import CommandManager from "~/core/manager";
import { Client, GroupMessageEvent, segment } from "oicq";
import { UserProfile } from "~/core/profile";
import { IMessage } from "~/core/typings";
/**
 * @returns void
 */
async function load(client: Client, cm: CommandManager) {
	cm.register({
		command: "question",
		alias2: ["答问", "答题"],
		cooldown: 1000 * 30,
		handler: async (msg: IMessage) => {
			const p = await UserProfile(msg);

			let meta = ["+", "-", "*"][random(0, 2)];
			let v1 = random(1, 30);
			let v2 = random(1, 20);
			let ans;
			eval(`ans = ${v1} ${meta} ${v2}`);

			msg.reply([segment.at(msg.user_id), ` ${v1} ${meta} ${v2} = ?`]);

			const msg2: GroupMessageEvent = await new Promise(r => {
				function __callback(msg2: GroupMessageEvent) {
					if (msg2.group_id !== msg.group_id) return;
					if (isNaN(parseInt(msg2.raw_message))) return;
					client.off("message.group.normal", __callback);
					r(msg2);
				}
				client.on("message.group.normal", __callback);
			});

			const value = parseInt(msg2.raw_message);
			if (value == ans) {
				msg2.reply([
					segment.at(msg2.user_id),
					` 对的答案！送你${Math.floor(Math.abs(ans * 2))}金币`
				]);
				let p = await UserProfile(msg2.user_id);
				p.coin += Math.floor(Math.abs(ans * 2));
				p.save();
			} else {
				msg2.reply([
					segment.at(msg2.user_id),
					` 错的答案！答案是${ans}！扣你${Math.abs(ans)}金币！`
				]);
				let p = await UserProfile(msg2.user_id);
				p.coin -= Math.abs(ans);
				p.save();
				return;
			}

			// 进行相关操作
		}
	});
}

module.exports = load;

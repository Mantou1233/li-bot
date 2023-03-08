import ms from "ms";
import { Collection } from "@discordjs/collection";
import { MessageCommand } from "./structure/Types";
import { UserProfile, GroupProfile, SystemProfile } from "./profile";
import { ExtMessage, IMessage } from "./typings";
import { processProfiles } from "./../services/db";

const Cooldown = new Collection<number, number>();
const client = storage.client;

let prefix: string = process.env.PREFIX as string;

async function CommandHandler(msg: IMessage & ExtMessage) {
	if (!client.loader?.ready) return;
	if (msg.user_id == msg.self_id) return;
	if (!storage.config.groups.includes(msg.group_id)) return;
	msg.content = msg.message
		.filter(val => ["text", "at"].includes(val.type))
		.map((val: any) => val.qq ?? val.text)
		.join("");

	const p = await UserProfile(msg);
	await p.checkAndUpdate();

	const g = await GroupProfile(msg);
	await g.checkAndUpdate();

	const s = await SystemProfile();
	await s.checkAndUpdate();

	prefix = process.env.PREFIX as string;
	const mappings = client.manager.commands as Collection<
		string,
		MessageCommand
	>;
	const isp = msg.content.startsWith(prefix);
	const launch = msg.content.trim().split(" ")[0].replace(prefix, "");
	const command = mappings.find(
		cmd =>
			((cmd.command === launch || (cmd.alias ?? []).includes(launch)) &&
				isp) ||
			(cmd.alias2 ?? []).includes(launch)
	) as MessageCommand;
	if (command && !command?.disabled)
		processProfiles(msg, { p, g, s, using: true });
	else {
		processProfiles(msg, { p, g, s, using: false });
		return;
	}
	if (command.cooldown && Cooldown.has(msg.user_id))
		return msg.reply(
			`cooldown: ${ms(Cooldown.get(msg.user_id)! - Date.now())}`
		);
	try {
		await command.handler(msg, {
			prefix
		});
	} catch (e) {
		return msg.reply(`error: ${e.message}`);
	}
	if (command.cooldown) {
		Cooldown.set(msg.user_id, Date.now() + command.cooldown);
		setTimeout(() => Cooldown.delete(msg.user_id), command.cooldown);
	}
}

export { CommandHandler };

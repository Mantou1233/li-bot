// preload globals
import "@services/random";
import "@services/ap";
import "@services/td";
import "@services/inv";

import PluginLoader from "~/core/loader";
import { CommandHandler } from "@core/handlers";
import Manager from "./core/manager";
import ms from "ms";

const { client, db } = storage;

console.log("Starting nico...");

const main = async () => {
	console.log(`[miraicle] logged in as ${client.uin}!`);
	await botMain();
};
main();
//Main Function
export async function botMain() {
	try {
		// Load Plugins
		if (!db.ready) {
			await db.connect();
			let _tmp = Date.now();
			await db.add("sys:time", 1);
			console.log(
				`connected to mongo! DB ping: ${require("ms")(
					Date.now() - _tmp
				)}, s: ${await db.get("sys:time")}`
			);
		}

		client.manager = new Manager(client);
		client.loader = new PluginLoader(client);
		await client.loader.load();

		// Register for a single guild

		// await client.guilds.cache
		// 	.get("1026816602588590100")!
		// 	.commands.set(__T__T);

		// Register for all the guilds the bot is in

		if (global.__tmp__ctx__lastGroupID) {
			client.sendGroupMsg(
				global.__tmp__ctx__lastGroupID,
				`重启成功，耗时${ms(Date.now() - global.__tmp__ctx__date)}`
			);
			delete global["__tmp__ctx__lastGroupID"];
			delete global["__tmp__ctx__date"];
		}
		client.on("message.group.normal", CommandHandler as any);
		console.log("-> miraicle has started!");
	} catch (e) {
		console.error("Failed to start miraicle:");
		console.error(e);
		process.exit(1);
	}
}

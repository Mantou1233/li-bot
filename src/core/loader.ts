/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from "oicq";
import fg from "fast-glob";

const outpath = "../../";
const log = (times: number, message: string): void =>
	console.log(`${"  ".repeat(times)}-> ${message}`);
//const log = (_, message) => storage.client.logger.info(message)
class PluginLoader {
	client: Client;
	loadedList: string[];
	loadedNames: string[];
	ready: boolean = false;
	constructor(client: Client) {
		this.client = client;
		this.loadedList = [];
		this.loadedNames = [];
	}

	async load(path = "src/plugins") {
		this.client.manager.commands.clear();
		const plugins = await (await fg(["**/.plugin.json"], { dot: true }))
			.map(e => e.replace(".plugin.json", ""))
			.filter(e => e.includes("dist"));

		log(
			0,
			`fetched ${plugins.length} plugin${plugins.length > 1 ? "s" : ""}!`
		);

		log(1, "Loading plugin...");
		for (const plugin of plugins) {
			let pluginName = plugin
				.replace(path, "")
				.split("/")
				.pop() as string;
			let temp: any = {};
			try {
				temp = require(`${outpath}${plugin}.plugin.json`);
			} catch (e) {
				log(3, `Loading config ${pluginName} fail: ${e.message}`);
				continue;
			}
			pluginName = temp.name;
			if (this.loadedNames.includes(pluginName))
				throw new Error("Plugin Names should be unique!");
			this.loadedNames.push(pluginName);
			this.client.manager.nowLoading = pluginName;
			this.client.manager.category = temp.category;
			let entry = await import(
				`${outpath}${plugin}${temp.entry.replace(".js", "")}`
			);
			entry = typeof entry == "function" ? entry : entry.default;
			try {
				await entry(this.client, this.client.manager);
			} catch (e) {
				console.log(e);
				log(3, `Launching plugin ${pluginName} fail: ${e.message}`);
				continue;
			}
			log(2, `Loaded plugin ${pluginName}!`);
			continue;
		}

		log(1, "Plugin loaded!");
		log(0, "Bot started!");
		this.ready = true;
	}
	async restart(ctx) {
		this.loadedList = [];
		this.loadedNames = [];
		this.client.removeAllListeners("message");
		this.client.removeAllListeners("message.group.normal");
		this.client.removeAllListeners("notice.group.poke");
		global.__tmp__ctx__lastGroupID = ctx;
		global.__tmp__ctx__date = Date.now();
		for (let k3 of Object.keys(require.cache)) {
			if (k3.includes("node_modules")) continue;
			delete require.cache[k3];
		}

		require("../main");
	}
}

export default PluginLoader;

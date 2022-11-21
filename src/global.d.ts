/* eslint-disable-no-var */
import Manager from "~/core/Manager";
import PluginLoader from "@core/PluginLoader";
import { Client } from "oicq";
import { Database } from "quickmongo";

declare global {
	var random: (min: number, max: number) => number;
	var storage: {
		client: Client;
		db: Database;
		config: {
			groups: number[];
		};
	};
	var td: (item: string) => string;
	var ap: (msg: string, mode?: boolean, flags?: any) => string[];
}

declare module "oicq" {
	interface Client {
		manager: Manager;
		loader: PluginLoader;
	}
}
export {};

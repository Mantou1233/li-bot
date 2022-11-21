/* eslint-disable-no-var */
import Manager from "~/core/manager";
import PluginLoader from "~/core/loader";

import { Client } from "oicq";
import { Database } from "quickmongo";

declare global {
	/**
	 * random.
	 */
	var random: (min: number, max: number) => number;
	var storage: {
		/**
		 * the current Client object that is running on the current process.
		 */
		client: Client;
		/**
		 * the current Database object that is running on the current process.
		 */
		db: Database;
		config: {
			groups: number[];
		};
	};
	/**
	 * @param {string} item item
	 * returns the display value of the string given, or the given value if there isnt any display value.
	 */
	var td: (item: string, undef?: boolean) => string;
	var td: (item: string, undef?: true) => string | undefined;

	var inv: {
		add(p, id, count = 1): void;
		remove(p, id, count = 1): void;
		delete(p, id): void;
		has(p, id, count = 1): boolean;
		get(id, list: string[]): string | undefined;
		parse(id): string | undefined;
	};
	/**
	 * argument parser utility. no idea why is this global but its good rn so whatever
	 */
	var ap: (msg: string, mode?: boolean, flags?: any) => string[];
}

declare module "oicq" {
	interface Client {
		manager: Manager;
		loader: PluginLoader;
	}
}
export {};

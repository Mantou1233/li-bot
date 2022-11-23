import { Collection } from "@discordjs/collection";
import { Client } from "oicq";
import type { MessageCommand } from "./structure/Types";

type ToSignature<T extends Record<string, any[]>> = {
	[K in keyof T]: (...args: T[K]) => any;
};

class Manager {
	nowLoading: string | number = -1;
	category: string;
	client: Client;
	commands = new Collection<string, MessageCommand>();

	constructor(client) {
		this.client = client;
	}

	register(ctx: MessageCommand & { type?: never | "command" }): void;
	register(ctx): void {
		if (ctx.type == "command" || !ctx.type) {
			delete ctx["type"];
			if (this.commands.has(ctx.command))
				throw new Error(`${ctx.command}: Naming conflict!`);
			this.commands.set(ctx.command, {
				disabled: false,
				hidden: false,
				from: this.nowLoading as unknown as string,
				category: this.category ?? "基础",
				...ctx
			});
		}
	}
}

export default Manager;

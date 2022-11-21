import { Awaitable } from "../utils";
import { IExtMessage } from "../typings";
interface RawMessageHandler {
	from?: string;
	handler: (message: IExtMessage, ext: any) => Awaitable<void | any>;
}

interface MessageCommand extends RawMessageHandler {
	display?: string;
	command: string;
	force?: boolean;
	refer?: string;
	desc?: string;
	usage?: string;
	cooldown?: number;
	category?: string;
	alias?: string[];
	alias2?: string[];
	disabled?: boolean;
	hidden?: boolean;
}

export type { MessageCommand, RawMessageHandler };

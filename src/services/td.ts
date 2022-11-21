import data from "~/plugins/economy/data.json";

export function ToDisplay(str: string, undef: boolean = false) {
	return data.translate[str] ?? (undef ? undefined : str);
}

globalThis.td = ToDisplay;

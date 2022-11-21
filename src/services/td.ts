import data from "~/plugins/economy/data.json";

function ToDisplay(str: string) {
	return data.translate[str];
}

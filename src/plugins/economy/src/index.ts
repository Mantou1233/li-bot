import CommandManager from "~/core/manager";
import QuickLoader, { cook } from "@services/QuickLoader";

let ql = new QuickLoader({
	include: [
		"basic",
		"sign",
		"question",
		"bank",
		"shop",
		"fish",
		"inventory",
		"use",
		"farm"
	],
	pattern: [cook(__dirname) + "/*.js"]
});
/**
 * ImportDefaultable
 * @param v module imported
 * @returns module that is default or is expr or a object
 */
const importDefaultable = v => v.default ?? v ?? {};
/**
 * @returns void
 */
async function load(client, cm: CommandManager) {
	await ql.load(
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		v => importDefaultable(require(v))(client, cm)
	);
}

module.exports = load;

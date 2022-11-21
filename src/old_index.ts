import { createClient } from "oicq";

import { IMessage } from "./core/typings";

const client = createClient(2814595278, {
	platform: 2
});

client.on("system.online", async () => {
	console.log("Logged in!");
	require("fs/promises").writeFile(
		"./sb.json",
		JSON.stringify(await client.getRoamingStamp())
	);
});

client
	.on("system.login.qrcode", function (e) {
		//扫码后按回车登录
		process.stdin.once("data", () => {
			this.login();
		});
	})
	.login();

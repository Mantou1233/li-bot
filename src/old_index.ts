import { createClient } from "oicq";

import { IMessage } from "./core/typings";

const client = createClient(2186103712, {
	platform: 1
});

client.on("system.online", async () => {
	console.log("Logged in!");
});

client
	.on("system.login.qrcode", function (e) {
		//扫码后按回车登录
		process.stdin.once("data", () => {
			this.login();
		});
	})
	.login();

import "dotenv/config";
import "reflect-metadata";

import { createClient } from "oicq";
import { Database } from "quickmongo";

const db = new Database(process.env.MONGO!, {
	collectionName: "qq"
});
const client = createClient(parseInt(process.env.QQ!), {
	platform: 5
});

client.on("system.online", () => {
	console.log("Logged in!");
	import("./main.js");
});

process.on("unhandledRejection", (reason, promise) => {
	console.log("Unhandled Rejection at:", promise, "reason:", reason);
	// Application specific logging, throwing an error, or other logic here.
});

process.on("uncaughtException", (err, origin) => {
	console.log(err);
});

// client
// 	.on("system.login.qrcode", function (e) {
// 		//扫码后按回车登录
// 		process.stdin.once("data", () => {
// 			this.login();
// 		});
// 	})
// 	.login();

client
	.on("system.login.slider", function (e) {
		console.log("输入ticket：");
		process.stdin.once("data", ticket =>
			this.submitSlider(String(ticket).trim())
		);
	})
	.login(process.env.PASSWORD);

//之后还可能会输出设备锁url，需要去网页自行验证，也可监听 `system.login.device` 处理

globalThis.storage = {
	client,
	db,
	config: {
		groups: [952303234, 627048885, 764575578]
	}
};
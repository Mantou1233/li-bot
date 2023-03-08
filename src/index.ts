import "dotenv/config";
import "reflect-metadata";

import "@services/date";

import { createClient } from "oicq";
import { Database } from "quickmongo";

const db = new Database(process.env.MONGO!, {
	collectionName: "qq"
});
const client = createClient(parseInt(process.env.QQ!), {
	platform: parseInt(process.argv[3]) || 3 //2
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

const commonQr = cl =>
	cl.on("system.login.qrcode", function (e) {
		process.stdin.once("data", () => {
			this.login();
		});
	});
const commonSlider = cl =>
	cl.on("system.login.slider", function (e) {
		console.log("输入ticket：");
		console.log(e.url.replace("ssl.captcha.qq.com", "txhelper.glitch.me"));
		process.stdin.once("data", ticket =>
			this.submitSlider(String(ticket).trim())
		);
	});

if (process.argv[2] == "qr") {
	commonQr(client);
	commonSlider(client);
	client.login();
} else {
	commonSlider(client);
	client.login(process.env.PASSWORD);
}

//之后还可能会输出设备锁url，需要去网页自行验证，也可监听 `system.login.device` 处理

globalThis.storage = {
	client,
	db,
	config: {
		groups: [952303234, 627048885, 764575578, 236172566, 491289722]
	}
};

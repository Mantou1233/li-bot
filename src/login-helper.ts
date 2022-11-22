import { createClient } from "oicq";
import d from "dotenv";
d.config();

const client = createClient(parseInt(process.env.QQ!), {
	platform: 1
});

client.on("system.online", async () => {
	console.log("Logged in!");
});

if (process.argv[2] == "qr") {
	client
		.on("system.login.qrcode", function (e) {
			//扫码后按回车登录
			process.stdin.once("data", () => {
				this.login();
			});
		})
		.login();
} else {
	client
		.on("system.login.slider", function (e) {
			console.log("输入ticket：");
			process.stdin.once("data", ticket =>
				this.submitSlider(String(ticket).trim())
			);
		})
		.login(process.env.PASSWORD);
}

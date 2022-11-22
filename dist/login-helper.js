"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = (0, oicq_1.createClient)(parseInt(process.env.QQ), {
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
}
else {
    client
        .on("system.login.slider", function (e) {
        console.log("输入ticket：");
        process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()));
    })
        .login(process.env.PASSWORD);
}
//# sourceMappingURL=login-helper.js.map
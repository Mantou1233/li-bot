"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const oicq_1 = require("oicq");
const quickmongo_1 = require("quickmongo");
const db = new quickmongo_1.Database(process.env.MONGO, {
    collectionName: "qq"
});
const client = (0, oicq_1.createClient)(parseInt(process.env.QQ), {
    platform: 4
});
client.on("system.online", () => {
    console.log("Logged in!");
    Promise.resolve().then(() => __importStar(require("./main.js")));
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
    process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()));
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
//# sourceMappingURL=index.js.map
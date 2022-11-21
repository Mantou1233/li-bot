"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const client = (0, oicq_1.createClient)(2186103712, {
    platform: 2
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
//# sourceMappingURL=old_index.js.map
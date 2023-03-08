"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("../../../core/profile");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "inventory",
        category: "经济",
        desc: "查看背包。",
        usage: "背包",
        alias: ["inv"],
        alias2: ["背包"],
        handler: async (msg) => {
            const p = await (0, profile_1.UserProfile)(msg);
            msg.reply(Object.entries(p.inv).reduce((i, [k, v]) => i + `${td(k)} x${v}\n`, "你的背包：\n"));
        }
    });
    cm.register({
        command: "giveall",
        category: "经济",
        desc: "",
        hidden: true,
        handler: async (msg) => {
            const p = await (0, profile_1.UserProfile)(msg);
            const { db } = storage;
        }
    });
}
module.exports = load;
//# sourceMappingURL=inventory.js.map
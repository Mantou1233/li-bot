"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("../../../core/profile");
const data_json_1 = __importDefault(require("../data.json"));
const get_1 = require("../../../services/get");
const { db } = storage;
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "use",
        alias2: ["使用"],
        handler: async (msg) => {
            const args = ap(msg.content, true);
            const p = await (0, profile_1.UserProfile)(msg);
            const id = inv.get(args[1], Object.keys(data_json_1.default.use));
            if (!id)
                return msg.reply("这个物品好像不能用... 换个试试?", true);
            if (!p.inv[id])
                return msg.reply("你好像没有这东西...", true);
            const parsed = (0, get_1.parseTree)({ ...data_json_1.default.use[id] });
            let remove = true;
            for (let [key, value] of Object.entries(parsed)) {
                if (key == "$coin")
                    p.coin += value;
                if (key == "$exp")
                    p.exp += value;
                if (key == "@noAutoRemove")
                    remove = value;
                if (key.startsWith("$rm_"))
                    inv.remove(p, key.replace("$rm_"), value);
                if (!"#$@%".includes(key[0]))
                    inv.add(p, key, value);
            }
            if (remove)
                inv.remove(p, id, 1);
            msg.reply(parsed["@msg"] ||
                "呃呃，你好像使用了一个物品，但是没有文本。请联系馒头。", true);
            p.save();
        }
    });
}
module.exports = load;
//# sourceMappingURL=use.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const profile_1 = require("../../../core/profile");
const data_json_1 = __importDefault(require("../data.json"));
function randomL(max) {
    if (max > 1)
        return Math.floor(Math.random() * max);
    if (max === 1)
        return Math.random() > 0.5 ? 0 : 1;
    if (max < 1)
        return Math.random() > max ? 0 : 1;
}
async function init(client, cm) {
    cm.register({
        command: "fish",
        category: "经济",
        desc: "钓下鱼~",
        alias2: ["钓鱼"],
        cooldown: 2 * 1000,
        handler: async (msg) => {
            try {
                let [_, rod] = ap(msg.content);
                const p = await (0, profile_1.UserProfile)(msg);
                if (!rod) {
                    rod =
                        Object.keys(data_json_1.default.fish)
                            .reverse()
                            .find(k => {
                            if (p.inv[k])
                                return true;
                        }) || "none";
                }
                else {
                    rod =
                        inv.get(rod, Object.keys(data_json_1.default.fish).reverse()) ||
                            "none";
                }
                if (rod == "none")
                    return msg.reply('你没有鱼竿！可以用 "使用 新手礼包" 获得鱼竿。');
                let loots = data_json_1.default.fish[rod] ?? {};
                let text = "";
                let result = {};
                for (let [k, v] of Object.entries(loots)) {
                    result[k] = random(0, v);
                    if (result[k] > 0) {
                        inv.add(p, k, result[k]);
                        text += `\n${td(k)} x${result[k]}`;
                    }
                }
                text = text || "\n什么都没有！";
                let seaMonster = random(0, 100);
                if (seaMonster < 95) {
                    msg.reply([
                        oicq_1.segment.at(msg.user_id),
                        ` 你钓到了：${text}\n可以用 "出售 全部" 获得金币！`
                    ]);
                }
                else {
                    for (let key of Object.keys(loots)) {
                        if (Object.keys(p.inv).includes(key))
                            continue;
                        inv.delete(p.inv, key);
                    }
                    msg.reply([
                        oicq_1.segment.at(msg.user_id),
                        " 哇靠！",
                        oicq_1.segment.image("sea_monster.jpg"),
                        "遇见了海怪！他把鱼都抢走了，呜呜"
                    ]);
                }
                p.save();
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        }
    });
    cm.register({
        command: "rod",
        cooldown: 2 * 1000,
        handler: async (msg) => {
            let args = ap(msg.content);
            const p = await (0, profile_1.UserProfile)(msg);
            p.inv["bundle"] = 1;
            await p.save();
            msg.reply("given");
        }
    });
}
module.exports = init;
//# sourceMappingURL=fish.js.map
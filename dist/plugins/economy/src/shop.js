"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const data_json_1 = __importDefault(require("../data.json"));
const embed_1 = require("../../../services/embed");
const profile_1 = require("../../../core/profile");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "shop",
        alias2: ["商店"],
        handler: async (msg) => {
            const page = 1;
            const entries = Object.entries(data_json_1.default.buy);
            msg.reply([
                oicq_1.segment.json(await (0, embed_1.ListUI)({
                    data: Array(10)
                        .fill(undefined)
                        .map((v, i) => ({
                        title: entries[i + (page - 1) * 10]
                            ? `$${entries[i + (page - 1) * 10][1]}`
                            : " ",
                        value: entries[i + (page - 1) * 10]
                            ? `${td(entries[i + (page - 1) * 10][0])}`
                            : " "
                    })),
                    title: "商店",
                    name: "璃",
                    footer: '使用"购买 <物品>"购买指定物品！',
                    page: [page, 1],
                    prompt: "商店"
                }))
            ]);
        }
    });
    cm.register({
        command: "sell",
        alias2: ["出售"],
        handler: async (msg) => {
            const args = ap(msg.content, true);
            const p = await (0, profile_1.UserProfile)(msg);
            let list = {};
            if (args[1]) {
                if (args[1] === "all" || args[1] === "全部")
                    list = { ...data_json_1.default.sell };
                else {
                    const id = inv.get(args[1], Object.keys(data_json_1.default.sell));
                    if (!id)
                        return msg.reply("商店好像不收这个东西...", true);
                    if (!p.inv[id])
                        return msg.reply("你好像没有这东西...", true);
                    list = { [id]: data_json_1.default.sell[id] };
                }
            }
            let text = "";
            let result = {};
            let count = 0, value = 0;
            for (let [k, v] of Object.entries(list)) {
                if (p.inv[k] > 0) {
                    result[k] = p.inv[k];
                    count += p.inv[k];
                    value += p.inv[k] * v;
                    inv.delete(p, k);
                    text += `\n${td(k)} x${result[k]}`;
                }
            }
            text = text || "\n什么都没有！";
            msg.reply([
                oicq_1.segment.at(msg.user_id),
                ` 你售出了：${text}\n共售出${count}件物品，获得${value}个金币。`
            ]);
            p.coin += value;
            p.save();
        }
    });
    cm.register({
        command: "buy",
        alias2: ["购买"],
        desc: "从商店购买物品",
        usage: "购买 <物品>",
        handler: async (msg) => {
            const args = ap(msg.content, true);
            const p = await (0, profile_1.UserProfile)(msg);
            if (!args[1])
                msg.reply("请提供你要买什么物品！", true);
            const id = inv.get(args[1], Object.keys(data_json_1.default.buy));
            if (!id)
                return msg.reply("商店好像不卖这个东西...", true);
            if (p.coin < data_json_1.default.buy[id])
                return msg.reply("你好像不够钱...", true);
            p.coin -= data_json_1.default.buy[id]?.value ?? data_json_1.default.buy[id];
            inv.add(p, id, 1);
            msg.reply([oicq_1.segment.at(msg.user_id), ` 你成功购买了${td(id)}!`], true);
            p.save();
        }
    });
    cm.register({
        command: "dailyshop",
        alias2: ["每日商店"],
        handler: async (msg) => {
            const page = 1;
            const entries = Object.entries(data_json_1.default.buy);
            msg.reply([
                `星月之友*3 单价：3*钻石莓果，还剩6个了
蓝色蝴蝶*2 单价：8*天星，还剩1个了
冥*1 单价：1*死，还剩2个了
whiter*4 单价：1*钻石块，还剩5个了
西瓜*4 单价：9*鱼，还剩3个了
没了 用"每日商店 购买 <物品>"购买`
                // segment.json(
                // 	await ListUI({
                // 		data: Array(10)
                // 			.fill(undefined)
                // 			.map((v, i) => ({
                // 				title: entries[i + (page - 1) * 10]
                // 					? `$${entries[i + (page - 1) * 10][1]}`
                // 					: " ",
                // 				value: entries[i + (page - 1) * 10]
                // 					? `${td(entries[i + (page - 1) * 10][0])}`
                // 					: " "
                // 			})) as any,
                // 		title: "商店",
                // 		name: "璃",
                // 		footer: '使用"每日商店 购买 <物品>"购买指定物品！',
                // 		page: [page, 1],
                // 		prompt: "商店"
                // 	})
                // )
            ]);
        }
    });
}
module.exports = load;
//# sourceMappingURL=shop.js.map
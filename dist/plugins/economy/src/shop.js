"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const data_json_1 = __importDefault(require("../data.json"));
const embed_1 = require("../../../services/embed");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "shop",
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
}
module.exports = load;
//# sourceMappingURL=shop.js.map
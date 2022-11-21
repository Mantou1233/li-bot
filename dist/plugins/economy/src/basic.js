"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const profile_1 = require("../../../core/profile");
const embed_1 = require("../../../services/embed");
const math_1 = require("../../../services/math");
const { db } = storage;
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "balance",
        alias: ["bal"],
        alias2: ["查询"],
        handler: async (msg) => {
            const p = await (0, profile_1.UserProfile)(msg);
            msg.reply(`账户信息如下：
个人财富：${p.coin}金币
签到次数：${p.signCount}次
存款金额：${p.bank} / ${p.bankAmount} (${(0, math_1.toPercent)(p.bank, p.bankAmount)})
个人等级：${p.level} (${p.exp[0]} / ${p.exp[1]})`);
        }
    });
    cm.register({
        command: "balancetop",
        alias: ["baltop"],
        alias2: ["排行榜"],
        handler: async (msg) => {
            const users = await db.all({
                filter: ({ ID, data }) => ID.startsWith("qq:user:")
            });
            const members = await client.getGroupMemberList(msg.group_id);
            const memberSets = [...members.values()].map(v => v.user_id);
            const toplist = users
                .filter(v => memberSets.includes(parseInt(v.ID.replace("qq:user:", ""))))
                .sort((a, b) => a.data.coin + a.data.bank - (b.data.coin + b.data.bank))
                .reverse()
                .map((v, index) => ({
                id: parseInt(v.ID.replace("qq:user:", "")),
                name: members.get(parseInt(v.ID.replace("qq:user:", "")))
                    ?.nickname,
                index: index + 1,
                money: v.data.coin
            }));
            msg.reply([
                oicq_1.segment.json(await (0, embed_1.ListUI)({
                    data: Array(10)
                        .fill(undefined)
                        .map((v, i) => ({
                        title: `${i + 1}.`,
                        value: toplist[i]
                            ? `${toplist[i].name} (${toplist[i].id}) - $${toplist[i].money}`
                            : ""
                    })),
                    title: "经济排行榜",
                    name: "璃",
                    page: [1, Math.round(toplist.length / 10) + 1],
                    prompt: "经济排行榜"
                }))
            ]);
        }
    });
}
module.exports = load;
//# sourceMappingURL=basic.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const profile_1 = require("../../../core/profile");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "question",
        alias2: ["答问", "答题"],
        cooldown: 1000 * 30,
        handler: async (msg) => {
            const p = await (0, profile_1.UserProfile)(msg);
            let meta = ["+", "-", "*"][random(0, 2)];
            let v1 = random(1, 30);
            let v2 = random(1, 20);
            let ans;
            eval(`ans = ${v1} ${meta} ${v2}`);
            msg.reply([oicq_1.segment.at(msg.user_id), ` ${v1} ${meta} ${v2} = ?`]);
            const msg2 = await new Promise(r => {
                function __callback(msg2) {
                    if (msg2.group_id !== msg.group_id)
                        return;
                    if (isNaN(parseInt(msg2.raw_message)))
                        return;
                    client.off("message.group.normal", __callback);
                    r(msg2);
                }
                client.on("message.group.normal", __callback);
            });
            const value = parseInt(msg2.raw_message);
            if (value == ans) {
                msg2.reply([
                    oicq_1.segment.at(msg2.user_id),
                    ` 对的答案！送你${Math.floor(Math.abs(ans * 2))}金币`
                ]);
                let p = await (0, profile_1.UserProfile)(msg2.user_id);
                p.coin += Math.floor(Math.abs(ans * 2));
                p.save();
            }
            else {
                msg2.reply([
                    oicq_1.segment.at(msg2.user_id),
                    ` 错的答案！答案是${ans}！扣你${Math.abs(ans)}金币！`
                ]);
                let p = await (0, profile_1.UserProfile)(msg2.user_id);
                p.coin -= Math.abs(ans);
                p.save();
                return;
            }
            // 进行相关操作
        }
    });
}
module.exports = load;
//# sourceMappingURL=question.js.map
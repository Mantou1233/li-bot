"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("../../../core/profile");
const hitokoto_1 = __importDefault(require("../../../services/hitokoto"));
const ms_1 = __importDefault(require("ms"));
const db_1 = require("../../../services/db");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "sign",
        alias2: ["签到"],
        handler: async (msg) => {
            const p = await (0, profile_1.UserProfile)(msg);
            const g = await (0, profile_1.GroupProfile)(msg);
            const dp = new Date(p.lastSign ?? Date.now());
            const dg = new Date(g.lastSign ?? Date.now());
            const dn = new Date();
            const dt = new Date(dn);
            dt.setDate(dt.getDate() + 1);
            dt.setHours(0, 0, 0, 0);
            if (dp.getDay() == dn.getDay()) {
                msg.reply(`需要等待${(0, ms_1.default)(dt.getTime() - dn.getTime())}才能下次签到！`);
                return;
            }
            if (dg.getDay() !== dn.getDay()) {
                g.signCountToday = 0;
            }
            if (dp.getDay() == dt.getDay()) {
                p.signCombo++;
            }
            else {
                p.signCombo = 1;
            }
            let isFirstSign = false, giveCoin = random(50, 100), giveExp = random(5, 10);
            if (p.lastSign == 0) {
                isFirstSign = true;
                giveCoin = Math.floor(giveCoin * 1.5);
                giveExp = Math.floor(giveExp * 1.2);
            }
            giveCoin = Math.floor(giveCoin * (p.signCombo * 0.3));
            giveExp = Math.floor(giveCoin * (p.signCombo * 0.2));
            p.lastSign = Date.now();
            g.lastSign = Date.now();
            p.signCount++;
            g.signCount++;
            g.signCountToday++;
            p.coin += giveCoin;
            p.exp[0] += giveExp;
            (0, db_1.handleXP)(p);
            msg.reply(`签到成功！${isFirstSign ? "这是你第一天签到！" : ""}
今日共有${g.signCountToday}人签到
本群已有${g.signCount}人签到
已经连续签到${p.signCombo}天
积累签到天数${p.signCount}天
金币+${giveCoin} 经验+${giveExp}

当前金币：${p.coin}
当前等级：${p.level} (${p.exp[0]} / ${p.exp[1]})
-------------------------
${(await (0, hitokoto_1.default)()).hitokoto}
`, true);
            await p.save();
            await g.save();
        }
    });
}
module.exports = load;
//# sourceMappingURL=sign.js.map
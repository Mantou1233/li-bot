"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("../../../core/Profile");
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
            const p = await (0, Profile_1.UserProfile)(msg);
            const g = await (0, Profile_1.GroupProfile)(msg);
            const dp = new Date(p.lastSign ?? Date.now());
            const dg = new Date(g.lastSign ?? Date.now());
            const dn = new Date();
            if (dp.getDay() == dn.getDay()) {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                msg.reply(`需要等待${(0, ms_1.default)(tomorrow.getTime() - today.getTime())}才能下次签到！`);
                return;
            }
            if (dg.getDay() !== dn.getDay()) {
                console.log("1");
                g.signCountToday = 0;
            }
            if (dp.getDay() == dn.getDay()) {
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
    cm.register({
        command: "rsst",
        handler: async (msg) => {
            const p = await (0, Profile_1.UserProfile)(msg);
            const g = await (0, Profile_1.GroupProfile)(msg);
            const dp = new Date(p.lastSign ?? Date.now());
            const dg = new Date(g.lastSign ?? Date.now());
            const dn = new Date();
            msg.reply(`${g.__prefix}${g.__id}`);
            g.myTestyData++;
            await p.save();
            await g.save();
            const g2 = await (0, Profile_1.GroupProfile)(msg);
            msg.reply(`${g2.myTestyData}`);
        }
    });
}
module.exports = load;
//# sourceMappingURL=sign.js.map
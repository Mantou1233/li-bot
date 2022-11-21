"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("../../../core/Profile");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "deposit",
        category: "经济",
        desc: "从钱包里存款到银行",
        alias: ["dep"],
        alias2: ["存款"],
        handler: async (msg) => {
            let args = ap(msg.content);
            let p = await (0, Profile_1.UserProfile)(msg);
            if (args.length === 0) {
                return msg.reply("请提供你要存多少钱，或者全部(或all)!", true);
            }
            if (args[1] == "全部" || args[1] == "all") {
                let amount = p.bankAmount - p.bank;
                if (amount === 0) {
                    return msg.reply("你的银行已满！", true);
                }
                if (p.coin < amount) {
                    p.bank += p.coin;
                    p.coin -= p.coin;
                    msg.reply("已经将你钱包的钱转到银行！", true);
                    p.save();
                    return;
                }
                else {
                    p.coin -= amount;
                    p.bank = p.bankAmount;
                    msg.reply("已经将你的银行填满！", true);
                    p.save();
                    return;
                }
            }
            else {
                const value = +args[1];
                if (value % 1 !== 0)
                    return msg.reply("存的款项必须是数字！", true);
                else if (value < 0)
                    return msg.reply("草 不要存负数！", true);
                else if (value > p.coin)
                    return msg.reply("你没有这么多钱！", true);
                else if (value + p.bank > p.bankAmount)
                    return msg.reply('你存的款项会让银行撑满！如果你还是想存的话请用 "存款 全部(或all)"!');
                else if (p.bankAmount === p.bank) {
                    return msg.reply("你的银行已满！", true);
                }
                else {
                    p.coin -= value;
                    p.bank += value;
                    await msg.reply("存款成功！", true);
                    p.save();
                    return;
                }
            }
        }
    });
    cm.register({
        command: "withdraw",
        category: "经济",
        desc: "从银行里取款",
        alias: ["with"],
        alias2: ["取款"],
        handler: async (msg) => {
            let args = ap(msg.content);
            let p = await (0, Profile_1.UserProfile)(msg);
            if (args.length == 0)
                return msg.reply("请提供你要取多少钱，或者全部(或all)!", true);
            if (args[1] == "全部" || args[1] == "all") {
                if (p.bank !== 0) {
                    let amount = p.bank;
                    p.coin += amount;
                    p.bank -= amount;
                    msg.reply("请提供你要取多少钱，或者全部(或all)!", true);
                    p.save();
                    return;
                }
                else
                    return msg.reply("你的银行里没钱！", true);
            }
            else {
                const value = +args[1];
                if (value % 1 !== 0)
                    return msg.reply("存的款项必须是数字！", true);
                else if (value < 0)
                    return msg.reply("草 不要拿负数！", true);
                else if (value > p.bank)
                    return msg.reply("你的银行没有这么多钱！如果你还是想取的话请用 取款 全部(或all)!", true);
                else {
                    p.coin += value;
                    p.bank -= value;
                    msg.reply("取款成功！", true);
                    p.save();
                    return;
                }
            }
        }
    });
    cm.register({
        command: "pay",
        category: "经济",
        desc: "付钱给别人。",
        usage: "%psay <内容>",
        alias2: ["转账"],
        handler: async (msg) => {
            let args = ap(msg.content);
            let p = await (0, Profile_1.UserProfile)(msg);
            let tp = await (0, Profile_1.UserProfile)(+args[1]);
            const ok = await tp.check();
            console.log(ok, tp.__prefix + args[1]);
            if (!ok)
                return msg.reply("对方没有账号！", true);
            if (args.length < 3)
                return msg.reply("请提供金额和用户！", true);
            const value = +args[2];
            if (isNaN(value) || value < 100)
                return msg.reply("请提供合法的金额！转帐需要至少转100元！", true);
            if (p.coin < value + Math.floor(value * 0.01))
                return msg.reply(`你没有足够的金钱！ (转帐收取1%手续费，请确认你有没有足够的金额！)`, true);
            tp.coin += value;
            p.coin -= value + Math.floor(value * 0.01);
            p.save();
            tp.save();
            msg.reply(`成功转账给qid${args[1]}的用户！扣去1%手续费(${Math.floor(value * 0.01)}金币)，你现在有${p.coin}元。`, true);
            return;
        }
    });
}
module.exports = load;
//# sourceMappingURL=bank.js.map
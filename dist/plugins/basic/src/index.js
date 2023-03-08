"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const ms_1 = __importDefault(require("ms"));
const hitokoto_1 = __importDefault(require("../../../services/hitokoto"));
const Sign_1 = require("../../../services/Sign");
const arkSign_1 = require("../../../services/arkSign");
/**
 * @returns void
 */
async function load(client, cm) {
    cm.register({
        command: "restart",
        handler: msg => {
            msg.reply("正在热重置，请稍等片刻...");
            client.loader.restart(msg.group_id);
        }
    });
    cm.register({
        command: "time",
        alias2: ["时间"],
        handler: msg => {
            msg.reply(`shard#1: ${new Date().toTSVString()}`);
        }
    });
    cm.register({
        command: "playize",
        handler: msg => {
            msg.reply(`shard#1: ${new Date().toTSVString()}`);
        }
    });
    cm.register({
        command: "tryreq",
        handler: async (msg) => {
            const args = ap(msg.content);
            const cookie = client.cookies[""];
            const bkn = client.bkn;
            console.log(args[1]);
            msg.reply(JSON.stringify(await fetch(`https://httpbin.org/cookies`, //`https://qinfo.clt.qq.com/cgi-bin/qun_info/get_group_setting_v2?gc=${msg.group_id}&bkn=${bkn}`,
            {
                headers: {
                    Cookie: cookie
                }
            }).then(v => v.json())));
        }
    });
    cm.register({
        command: "ping",
        handler: async (msg) => {
            const myhitokoto = await (0, hitokoto_1.default)();
            msg.reply([
                oicq_1.segment.json((await (0, Sign_1.Sign)(JSON.stringify({
                    actionData: "",
                    actionData_A: "",
                    app: "com.tencent.bot.task.deblock",
                    appID: "",
                    desc: "",
                    extra: "",
                    meta: {
                        detail: {
                            appID: "",
                            botName: `${(0, ms_1.default)(Date.now() - msg.time * 1000)} | 数据库`,
                            cmdTitle: `璃酱 - 2022`,
                            content: `${myhitokoto.hitokoto} ——${myhitokoto.from_who ||
                                myhitokoto.from}`,
                            guildID: "",
                            iconLeft: [{ num: "10" }],
                            iconRight: [],
                            receiverName: `${msg.sender.nickname}`
                        }
                    },
                    prompt: "生命体正常|深潛接口",
                    sourceAd: "",
                    sourceName: "",
                    sourceUrl: "",
                    text: "",
                    ver: "2.0.4.0",
                    view: "index"
                }))).data)
            ]);
        }
    });
    cm.register({
        command: "ascent",
        handler: async (msg) => {
            await (0, arkSign_1.Share)({
                app: "com.tencent.miniapp",
                desc: "",
                view: "notification",
                ver: "0.0.0.1",
                prompt: "笑笑报时",
                appID: "",
                sourceName: "",
                actionData: "",
                actionData_A: "",
                sourceUrl: "",
                meta: {
                    notification: {
                        appInfo: {
                            appName: "笑笑报时",
                            appType: 4,
                            appid: 1109659848
                        },
                        data: [
                            { title: "日期", value: "yyyy年MM月dd日" },
                            { title: "星期", value: "星期日 上午" },
                            { title: "时间", value: "HH:mm:ss" },
                            { title: "一言", value: "一言" }
                        ],
                        emphasis_keyword: ""
                    }
                }
            }, msg.group_id);
        }
    });
    cm.register({
        command: "info",
        handler: async (msg) => {
            (0, arkSign_1.Share)(JSON.stringify({
                app: "com.tencent.channel.robot",
                view: "albumAddPic",
                ver: "0.0.0.1",
                desc: "bot info",
                prompt: "bot info msg",
                meta: {
                    detail: {
                        title: "标题",
                        prompt: "消息通知",
                        fields: [
                            {
                                name: "当前等级：黄金"
                            },
                            {
                                name: "之前等级：白银"
                            },
                            {
                                name: "😁继续努力"
                            }
                        ]
                    }
                }
            }), msg.group_id);
        }
    });
    cm.register({
        command: "help",
        alias: ["h"],
        desc: "查看指令列表或某模块的指令",
        alias2: ["菜单", "帮助", "模块"],
        handler: async (msg, { prefix }) => {
            const content = msg.content;
            /* prettier-ignore */ //ignore this line!
            const args = ap(content);
            const categorys = [
                ...new Set([...client.manager.commands.values()].map(v => v.category))
            ];
            if (!args[1]) {
                return msg.reply(`你好你好，这里是nico!!\n现在的触发符是: "${prefix}" \n如果指令是英文的使用"${prefix}[指令]"使用指令\n如果是中文的直接打出来\n用"${prefix}模块 <模块名>"阅读指定模块的指令。\n模块包括: ${[
                    ...categorys
                ].join(", ")}`, true);
            }
            else {
                if (!categorys.includes(args[1]))
                    return msg.reply("没有这个模块!");
                msg.reply([...client.manager.commands.values()]
                    .filter(v => v.category == args[1])
                    .reduce((i, v) => i +
                    `\n${(v.usage ??
                        `${v.alias2?.length
                            ? `${v.alias2?.[0]}`
                            : `%p${v.command}`}`).replaceAll("%p", prefix)}: ${v.desc ?? "无简介"}`, `${args[1]}的指令列表:`), true);
            }
        }
    });
}
module.exports = load;
//# sourceMappingURL=index.js.map
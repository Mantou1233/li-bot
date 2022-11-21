"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkSignDat = exports.ArkSign = void 0;
/**
 * 使用须知
 * 1.代码语言为：TypeScript
 * 2.基于的框架为：oicq
 * 3.使用函数ArkSign前，请先执行npm i oicq
 */
const oicq_1 = require("oicq");
/**
 * 通过小程序对json消息进行ark签名 基于oicq的core
 * @param json 要签名的json
 * @param bot 已经创建好的机器人实例
 * @param core oicq的核心
 * @returns
 */
async function ArkSign(json, bot = storage.client, core = oicq_1.core) {
    return new Promise((resolve, reject) => {
        class Result {
            code = -1;
        }
        let result = new Result();
        let json_data = null;
        try {
            json_data = JSON.parse(json);
        }
        catch (err) { }
        if (!json_data) {
            result.code = -1;
            result.msg = "签名失败，不是有效的json！";
            resolve(result);
            return;
        }
        delete json_data["extra"];
        //style 改成 10表示小程序发送
        let appid = 100951776, style = 10, appname = "tv.danmaku.bili", appsign = "7194d531cbe7960a22007b9f6bdaa38b";
        let send_type = 0, recv_uin = bot.uin;
        let time = new Date().getTime();
        function random(min, max) {
            const range = max - min;
            const random = Math.random();
            const result = min + Math.round(random * range);
            return result;
        }
        let msg_seq = BigInt(`${time}${random(100, 999)}`);
        //拼凑一个发送包
        let body = {
            1: appid,
            2: 1,
            3: style,
            5: {
                1: 1,
                2: "0.0.0",
                3: appname,
                4: appsign
            },
            7: {
                15: msg_seq
            },
            10: send_type,
            11: recv_uin,
            18: {
                1: 1109937557,
                2: {
                    14: "pages"
                },
                3: "url",
                4: "text",
                5: "text",
                6: "text",
                10: JSON.stringify(json_data)
            }
        };
        //接收到签名好的json消息的处理函数
        let json_handle = function (e) {
            if (bot.uin == e.user_id && e?.message[0]?.type == "json") {
                let json_str = e.message[0].data;
                let json = null;
                let extra = null;
                try {
                    json = JSON.parse(json_str);
                    extra =
                        typeof json.extra == "object"
                            ? json.extra
                            : JSON.parse(json.extra);
                }
                catch (err) { }
                if (extra && extra.msg_seq == msg_seq) {
                    bot.off("message", json_handle);
                    clearTimeout(timer);
                    delete json["extra"];
                    result.code = 1;
                    result.msg = "签名成功！";
                    result.data = JSON.stringify(json);
                    resolve(result);
                }
            }
        };
        let timer = setTimeout(function () {
            bot.off("message", json_handle);
            result.code = -1;
            result.msg = "签名失败，请稍后再试！";
            resolve(result);
        }, 3000);
        //监听TX服务器返回签名好的json文本
        bot.on("message", json_handle);
        //发送数据包
        bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));
    });
}
exports.ArkSign = ArkSign;
async function ArkSignDat(...args) {
    try {
        return (await ArkSign(...args)).data;
    }
    catch (e) {
        throw e;
    }
}
exports.ArkSignDat = ArkSignDat;
//# sourceMappingURL=arkSign.js.map
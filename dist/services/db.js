"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlantingTimestamp = exports.processProfiles = exports.handleXP = void 0;
const ms_1 = __importDefault(require("ms"));
const oicq_1 = require("oicq");
const data_json_1 = __importDefault(require("../plugins/economy/data.json"));
const get_1 = require("./get");
function handleXP(p) {
    if (p.exp[0] >= p.exp[1]) {
        p.exp[0] -= p.exp[1];
        p.exp[1] += p.exp[2];
        p.exp[2] += random(1, 4);
        p.level++;
    }
    if (p.exp[0] >= p.exp[1])
        handleXP(p);
}
exports.handleXP = handleXP;
function processProfiles(msg, { p, g, s, using }) {
    p.exp[0] += random(0, 3);
    handleXP(p);
    if (!p.help && using) {
        msg.reply('欢迎使用本bot! 新人可以先输入"使用 新手礼包"领取新手礼包，然后签到，之后可以去钓鱼！使用"菜单"查看指令列表。', true);
        p.help = true;
    }
    p.chatCount++;
    g.chatCount++;
    s.chatCount++;
    for (let [key, value] of Object.entries(p.inv)) {
        if (typeof value !== "number") {
            if (typeof value === "string") {
                p.inv[key] = parseInt(value.replaceAll(/[^0-9]/g, "")) ?? 1;
            }
            else
                p.inv[key] = 0;
        }
        if (p.inv[key] == 0)
            inv.delete(p, key);
    }
    if (p.planting !== "none") {
        p.planting.lastPlant;
        if (getPlantingTimestamp(p) <= Date.now()) {
            const parsed = (0, get_1.parseTree)({
                ...JSON.parse(JSON.stringify(data_json_1.default.plant[p.planting.plant].loots))
            });
            const result = [];
            for (let [key, value] of Object.entries(parsed)) {
                if (value > 0) {
                    result.push({ key, value });
                    inv.add(p, key, value);
                }
            }
            msg.reply([
                oicq_1.segment.at(msg.user_id),
                ` 你种植的${td(p.planting.plant)}熟啦~ 获得:${result.reduce((i, v) => i + `\n${td(v.key)} x${v.value}`, "")}`
            ]);
            p.planting = "none";
            p.save();
        }
    }
    p.save();
    g.save();
    s.save();
}
exports.processProfiles = processProfiles;
function getPlantingTimestamp(p) {
    if (p.planting === "none")
        return 0;
    return (p.planting.lastPlant + (0, ms_1.default)(data_json_1.default.plant[p.planting.plant].time));
}
exports.getPlantingTimestamp = getPlantingTimestamp;
//# sourceMappingURL=db.js.map
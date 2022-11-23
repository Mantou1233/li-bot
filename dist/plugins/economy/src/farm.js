"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("../../../core/profile");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const db_1 = require("../../../services/db");
const data_json_1 = __importDefault(require("../data.json"));
/**
 * @returns void
 */
async function load(client, cm) {
    client.getFriendList;
    cm.register({
        command: "plant",
        usage: "种植 <田地号码> <种子>",
        alias2: ["种植"],
        handler: async (msg) => {
            let args = ap(msg.content, true);
            const seed = args[1];
            const p = await (0, profile_1.UserProfile)(msg);
            if (p.planting !== "none")
                return msg.reply(`你已经在种${td(p.planting.plant)}了！还有${(0, pretty_ms_1.default)((0, db_1.getPlantingTimestamp)(p) - Date.now())}就熟啦~`);
            const id = inv.get(seed, Object.keys(data_json_1.default.plant));
            if (!id)
                return msg.reply("这个东西不能种哦~");
            else {
                p.planting = {
                    plant: id,
                    lastPlant: Date.now()
                };
                msg.reply(`在种植${td(id)}啦！稍等${(0, pretty_ms_1.default)((0, db_1.getPlantingTimestamp)(p) - Date.now())}就熟啦~`);
                p.save();
            }
        }
    });
}
module.exports = load;
//# sourceMappingURL=farm.js.map
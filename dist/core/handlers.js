"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const ms_1 = __importDefault(require("ms"));
const collection_1 = require("@discordjs/collection");
const profile_1 = require("./profile");
const db_1 = require("../services/db");
const Cooldown = new collection_1.Collection();
const client = storage.client;
let prefix = process.env.PREFIX;
async function CommandHandler(msg) {
    if (!client.loader?.ready)
        return;
    if (msg.user_id == msg.self_id)
        return;
    if (!storage.config.groups.includes(msg.group_id))
        return;
    msg.content = msg.message
        .filter(val => ["text", "at"].includes(val.type))
        .map((val) => val.qq ?? val.text)
        .join("");
    const p = await (0, profile_1.UserProfile)(msg);
    await p.checkAndUpdate();
    const g = await (0, profile_1.GroupProfile)(msg);
    await g.checkAndUpdate();
    const s = await (0, profile_1.SystemProfile)();
    await s.checkAndUpdate();
    (0, db_1.processProfiles)(msg, { p, g, s });
    prefix = process.env.PREFIX;
    const mappings = client.manager.commands;
    const isp = msg.content.startsWith(prefix);
    const launch = msg.content.trim().split(" ")[0].replace(prefix, "");
    const command = mappings.find(cmd => ((cmd.command === launch || (cmd.alias ?? []).includes(launch)) &&
        isp) ||
        (cmd.alias2 ?? []).includes(launch));
    if (!command)
        return;
    if (command.disabled)
        return;
    if (command.cooldown && Cooldown.has(msg.user_id))
        return msg.reply(`cooldown: ${(0, ms_1.default)(Cooldown.get(msg.user_id) - Date.now())}`);
    try {
        await command.handler(msg, {
            prefix
        });
    }
    catch (e) {
        return msg.reply(`error: ${e.message}`);
    }
    if (command.cooldown) {
        Cooldown.set(msg.user_id, Date.now() + command.cooldown);
        setTimeout(() => Cooldown.delete(msg.user_id), command.cooldown);
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=handlers.js.map
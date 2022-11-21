"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botMain = void 0;
// preload globals
require("./services/random");
require("./services/ap");
require("./services/td");
require("./services/inv");
const loader_1 = __importDefault(require("./core/loader"));
const handlers_1 = require("./core/handlers");
const manager_1 = __importDefault(require("./core/manager"));
const ms_1 = __importDefault(require("ms"));
const { client: _client, db } = storage;
console.log("Starting nico...");
const main = async (client) => {
    console.log(`[miraicle] logged in as ${client.uin}!`);
    await botMain();
};
main(_client);
//Main Function
async function botMain() {
    const client = storage.client;
    try {
        // Load Plugins
        if (!db.ready) {
            await db.connect();
            let _tmp = Date.now();
            await db.add("sys:time", 1);
            console.log(`connected to mongo! DB ping: ${require("ms")(Date.now() - _tmp)}, s: ${await db.get("sys:time")}`);
        }
        client.manager = new manager_1.default(client);
        client.loader = new loader_1.default(client);
        await client.loader.load();
        // Register for a single guild
        // await client.guilds.cache
        // 	.get("1026816602588590100")!
        // 	.commands.set(__T__T);
        // Register for all the guilds the bot is in
        if (global.__tmp__ctx__lastGroupID) {
            client.sendGroupMsg(global.__tmp__ctx__lastGroupID, `重启成功，耗时${(0, ms_1.default)(Date.now() - global.__tmp__ctx__date)}`);
            delete global["__tmp__ctx__lastGroupID"];
            delete global["__tmp__ctx__date"];
        }
        client.on("message.group.normal", handlers_1.CommandHandler);
        console.log("-> miraicle has started!");
    }
    catch (e) {
        console.error("Failed to start miraicle:");
        console.error(e);
        process.exit(1);
    }
}
exports.botMain = botMain;
//# sourceMappingURL=main.js.map
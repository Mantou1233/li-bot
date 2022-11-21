"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@discordjs/collection");
class Manager {
    nowLoading = -1;
    client;
    commands = new collection_1.Collection();
    constructor(client) {
        this.client = client;
    }
    register(ctx) {
        if (ctx.type == "command" || !ctx.type) {
            delete ctx["type"];
            if (this.commands.has(ctx.command))
                throw new Error(`${ctx.command}: Naming conflict!`);
            this.commands.set(ctx.command, {
                disabled: false,
                hidden: false,
                from: this.nowLoading,
                category: "Basic",
                desc: "",
                usage: `%p${ctx.command}`,
                ...ctx
            });
        }
    }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map
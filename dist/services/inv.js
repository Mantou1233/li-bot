"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManager = void 0;
const data_json_1 = __importDefault(require("../plugins/economy/data.json"));
class InventoryManager {
    add(p, id, count = 1) {
        if (p.inv?.[id])
            p.inv[id] += count;
        else
            p.inv[id] = count;
    }
    remove(p, id, count = 1) {
        p.inv[id] -= count;
        if (p.inv?.[id] < 1)
            delete p.inv?.[id];
    }
    delete(p, id) {
        if (p.inv?.[id])
            delete p.inv?.[id];
    }
    has(p, id, count = 1) {
        if (p.inv?.[id] && p.inv?.[id] >= count)
            return true;
        return false;
    }
    get(id, list = []) {
        if (list.length == 0)
            return;
        let obj = {};
        for (let ea of list) {
            obj[ea] = [ea, td(ea) ?? -1].filter(v => v !== -1);
            obj[ea] = [...new Set(obj[ea])];
        }
        for (let [key, lit] of Object.entries(obj)) {
            if (lit.includes(id.replaceAll(" ", "_")))
                return obj[key][0];
        }
        return;
    }
    parse(n) {
        return this.get(n, Object.keys(data_json_1.default.translate));
    }
}
exports.InventoryManager = InventoryManager;
globalThis.inv = new InventoryManager();
//# sourceMappingURL=inv.js.map
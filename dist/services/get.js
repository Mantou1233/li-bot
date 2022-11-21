"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTree = void 0;
const isObject = obj => {
    return Object.prototype.toString.call(obj) === "[object Object]";
};
function parseTree(data) {
    if (!isObject(data))
        return data;
    for (let [key, value] of Object.entries(data)) {
        if (key === "#random") {
            data = parseTree(value[random(0, value["length"] - 1)]);
            break;
        }
        else if (key === "#random_num") {
            data = random(value[0], value[1]);
            break;
        }
        if (key === "$coin")
            console.log;
        data[key] = parseTree(value);
    }
    if (data["@msg"]) {
        data["@msg"] = Object.entries(data)
            .filter(([k, v]) => !isObject(v))
            .reduce((i, [k, v]) => i.replaceAll(`%${k}%`, td(v, true) || v), data["@msg"]);
    }
    return data;
}
exports.parseTree = parseTree;
//# sourceMappingURL=get.js.map
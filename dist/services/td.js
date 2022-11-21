"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDisplay = void 0;
const data_json_1 = __importDefault(require("../plugins/economy/data.json"));
function ToDisplay(str, undef = false) {
    return data_json_1.default.translate[str] ?? (undef ? undefined : str);
}
exports.ToDisplay = ToDisplay;
globalThis.td = ToDisplay;
//# sourceMappingURL=td.js.map
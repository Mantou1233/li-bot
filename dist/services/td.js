"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("../plugins/economy/data.json"));
function ToDisplay(str) {
    return data_json_1.default.translate[str];
}
//# sourceMappingURL=td.js.map
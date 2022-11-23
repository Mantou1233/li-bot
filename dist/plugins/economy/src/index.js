"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickLoader_1 = __importStar(require("../../../services/QuickLoader"));
let ql = new QuickLoader_1.default({
    include: [
        "basic",
        "sign",
        "question",
        "bank",
        "shop",
        "fish",
        "inventory",
        "use",
        "farm"
    ],
    pattern: [(0, QuickLoader_1.cook)(__dirname) + "/*.js"]
});
/**
 * ImportDefaultable
 * @param v module imported
 * @returns module that is default or is expr or a object
 */
const importDefaultable = v => v.default ?? v ?? {};
/**
 * @returns void
 */
async function load(client, cm) {
    await ql.load(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    v => importDefaultable(require(v))(client, cm));
}
module.exports = load;
//# sourceMappingURL=index.js.map
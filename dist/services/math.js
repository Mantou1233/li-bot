"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSizing = exports.toPercent = void 0;
function toPercent(num, total) {
    return `${Math.round((num / total) * 10000) / 100.0}%`;
}
exports.toPercent = toPercent;
function toSizing(num, total) {
    return Math.round((num / total) * 10000) / 100;
}
exports.toSizing = toSizing;
//# sourceMappingURL=math.js.map
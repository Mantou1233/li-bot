"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleXP = void 0;
function handleXP(p) {
    if (p.exp[0] >= p.exp[1]) {
        p.exp[0] -= p.exp[1];
        p.exp[1] += p.exp[2];
        p.exp[2] += random(1, 4);
        p.level++;
    }
    if (p.exp[0] >= p.exp[1])
        handleXP(p);
}
exports.handleXP = handleXP;
//# sourceMappingURL=db.js.map
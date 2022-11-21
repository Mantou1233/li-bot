"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSchema = exports.UserSchema = void 0;
const UserSchema = {
    coin: 1000,
    coinFactor: 0,
    bank: 2000,
    bankAmount: 5000,
    signCombo: 0,
    signCount: 0,
    lastSign: 0,
    exp: [0, 75, 9],
    level: 1,
    inv: {
        bundle: 1
    },
    chatCount: 0
};
exports.UserSchema = UserSchema;
const GroupSchema = {
    signCount: 0,
    signCountToday: 0,
    lastSign: 0,
    myTestyData: 0
};
exports.GroupSchema = GroupSchema;
//# sourceMappingURL=Schema.js.map
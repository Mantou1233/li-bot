"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSchema = exports.GroupSchema = exports.UserSchema = void 0;
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
    planting: "none",
    help: false,
    chatCount: 0
};
exports.UserSchema = UserSchema;
const GroupSchema = {
    chatCount: 0,
    signCount: 0,
    signCountToday: 0,
    lastSign: 0
};
exports.GroupSchema = GroupSchema;
const SystemSchema = {
    chatCount: 0,
    signCount: 0,
    dailyShopItems: [],
    lastDailyShopRefresh: 0
};
exports.SystemSchema = SystemSchema;
//# sourceMappingURL=Schema.js.map
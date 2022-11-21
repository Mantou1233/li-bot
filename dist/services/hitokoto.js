"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async () => {
    return (await fetch("https://v1.hitokoto.cn/").then(async (v) => await v.json()));
};
//# sourceMappingURL=hitokoto.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const jimp_1 = __importDefault(require("jimp"));
const Canvas = __importStar(require("@napi-rs/canvas"));
const pet_pet_gif_1 = __importDefault(require("pet-pet-gif"));
/**
 * @returns void
 */
async function load(client, cm) {
    client.config;
    cm.register({
        command: "fry",
        handler: async (msg) => {
            let args = ap(msg.content);
            let user = args[1] || msg.user_id;
            let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=640`;
            let image = await jimp_1.default.read(pic);
            await image.blur(10);
            await image.dither565();
            await image.invert();
            await image.normalize();
            await image.rotate(random(0, 360));
            let buffer = await image.getBufferAsync(jimp_1.default.AUTO);
            msg.reply([oicq_1.segment.image(buffer)]);
        }
    });
    cm.register({
        command: "pet",
        handler: async (msg) => {
            let args = ap(msg.content);
            let user = args[1] || msg.user_id;
            console.log(user);
            let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=640`;
            let buffer = await (0, pet_pet_gif_1.default)(pic);
            msg.reply([oicq_1.segment.image(buffer)]);
        }
    });
    cm.register({
        command: "rip",
        handler: async (msg) => {
            let args = ap(msg.content);
            let user = parseInt(args[1]) || msg.user_id;
            let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=160`;
            let welcome = await jimp_1.default.read(pic);
            welcome.blur(1);
            welcome.brightness(-0.5);
            welcome.dither565();
            welcome.greyscale();
            welcome.normalize();
            //welcome.rotate(10);
            let img = await welcome.getBase64Async(jimp_1.default.AUTO);
            const canvas = Canvas.createCanvas(190, 190);
            const ctx = canvas.getContext("2d");
            await Canvas.loadImage(img).then(image => {
                ctx.drawImage(image, 31, 31);
            });
            await Canvas.loadImage("image.png").then(image => {
                ctx.drawImage(image, 0, 0);
            });
            const buffer = canvas.toBuffer("image/png");
            msg.reply([oicq_1.segment.image(buffer)]);
        }
    });
}
module.exports = load;
//# sourceMappingURL=index.js.map
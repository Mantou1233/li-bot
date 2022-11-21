import Manager from "../../../core/Manager";
import { Client, segment } from "oicq";
import Jimp from "jimp";
import * as Canvas from "@napi-rs/canvas";
import pet_pet_gif from "pet-pet-gif";

/**
 * @returns void
 */
async function load(client: Client, cm: Manager) {
	client.config;
	cm.register({
		command: "fry",
		handler: async msg => {
			let args = ap(msg.content);
			let user = args[1] || msg.user_id;

			let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=640`;

			let image = await Jimp.read(pic);

			await image.blur(10);
			await image.dither565();
			await image.invert();
			await image.normalize();
			await image.rotate(random(0, 360));

			let buffer = await image.getBufferAsync(Jimp.AUTO as any);

			msg.reply([segment.image(buffer)]);
		}
	});
	cm.register({
		command: "pet",
		handler: async msg => {
			let args = ap(msg.content);
			let user = args[1] || msg.user_id;

			console.log(user);
			let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=640`;

			let buffer = await pet_pet_gif(pic);

			msg.reply([segment.image(buffer)]);
		}
	});
	cm.register({
		command: "rip",
		handler: async msg => {
			let args = ap(msg.content);
			let user = parseInt(args[1]) || msg.user_id;
			let pic = `http://q4.qlogo.cn/g?b=qq&nk=${user}&s=160`;

			let welcome = await Jimp.read(pic);
			welcome.blur(1);
			welcome.brightness(-0.5);
			welcome.dither565();
			welcome.greyscale();
			welcome.normalize();
			//welcome.rotate(10);
			let img = await welcome.getBase64Async(Jimp.AUTO as any);
			const canvas = Canvas.createCanvas(190, 190);
			const ctx = canvas.getContext("2d");
			await Canvas.loadImage(img).then(image => {
				ctx.drawImage(image, 31, 31);
			});
			await Canvas.loadImage("image.png").then(image => {
				ctx.drawImage(image, 0, 0);
			});
			const buffer = canvas.toBuffer("image/png");

			msg.reply([segment.image(buffer)]);
		}
	});
}

module.exports = load;

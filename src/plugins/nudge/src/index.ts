import { Client } from "oicq";
const replys = [
	"别戳啦(இωஇ)",
	"笨蛋，不许戳我！ヾ(≧へ≦)〃",
	"干嘛戳我(눈_눈)",
	"要变坏啦...",
	"ԅ(¯﹃¯ԅ) 戳我干嘛..." //(/≧▽≦/)
];

const delay = 10;
const chanceRe = 30;
const chanceSup = 15;
const SupReply = "超级加倍！耶";
const SupTimes = 10;

const wait = delay => {
	return new Promise(resolve => {
		setTimeout(resolve, delay);
	});
};

async function init(client: Client, cm) {
	client.on("notice.group.poke", async data => {
		if (!storage.config.groups.includes(data.group_id)) return;
		if (data.operator_id === client.uin) return;
		if (data.target_id !== client.uin) return;
		const { group_id, operator_id: user_id } = data;
		console.log(user_id, client.uin);

		// const rng = random(0, 100);
		// if (rng < chanceSup) {
		// 	for (let i = 0; i < SupTimes; i++) {
		// 		await client.sendGroupPoke(group_id, user_id);
		// 		await wait(delay);
		// 	}
		// 	await client.sendGroupMsg(group_id, SupReply);
		// } else if (rng < chanceRe + chanceSup) {
		// 	await client.sendGroupPoke(group_id, user_id);
		// 	await client.sendGroupMsg(group_id, "戳回去! 嘿嘿");
		// } else {
		const rrng = random(0, replys.length - 1);
		await client.sendGroupMsg(group_id, replys[rrng]);
		// }
	});
}
module.exports = init;

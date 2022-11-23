const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const isObject = obj => {
	return Object.prototype.toString.call(obj) === "[object Object]";
};

export function parseTree(data) {
	if (Array.isArray(data) && data.length == 2)
		if (!isNaN(data[0]) && !isNaN(data[1])) return random(data[0], data[1]);
	if (!isObject(data)) return data;
	for (let [key, value] of Object.entries(data) as [string, any][]) {
		if (key === "#random") {
			data = parseTree(value[random(0, value["length"] - 1)]);
			break;
		}
		if (value.length == 2) {
			data[key] = random(...(value as [number, number]));
		}
		data[key] = parseTree(value);
		console.log(data[key]);
	}
	if (data["@msg"]) {
		data["@msg"] = Object.entries(data)
			.filter(([k, v]) => !isObject(v))
			.reduce((i, [k, v]) => i.replaceAll(`%${k}%`, v), data["@msg"]);
	}
	return data;
}

console.log(
	parseTree({
		secret_chest: {
			"#random": [
				{
					$coin: [1500, 3000],
					"@msg": "你获得了%$coin%金币！"
				},
				{
					iron_pickaxe: 1,
					"@msg": "你获得了%iron_pickaxe%个铁镐！"
				},
				{
					diamond_block: 1,
					"@msg": "你获得了%diamond_block%个钻石块！！"
				},
				{
					iron_ingot: [1, 5],
					"@msg": "你获得了%iron_ingot%个铁锭！"
				},
				{
					glow_berries: [3, 6],
					"@msg": "你找到了%glow_berries%个发光梅子。这也可以种欸！"
				},
				{
					melon_seed: [1, 3],
					"@msg": "你找到了%melon_seed%个西瓜种子。可以种欸！"
				},
				{
					enchanted_golden_apple: 1,
					"@msg": "你找到了%enchanted_golden_apple%个附魔金苹果！！但是好像没有什么卵用。"
				}
			]
		}
	})
);

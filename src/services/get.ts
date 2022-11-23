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
		data[key] = parseTree(value);
	}
	if (data["@msg"]) {
		data["@msg"] = Object.entries(data)
			.filter(([k, v]) => !isObject(v))
			.reduce(
				(i, [k, v]) => i.replaceAll(`%${k}%`, td(v as any, true) || v),
				data["@msg"]
			);
	}
	return data;
}

import data from "~/plugins/economy/data.json";

export class InventoryManager {
	add(p, id: string, count = 1) {
		if (p.inv?.[id]) p.inv[id] += count;
		else p.inv[id] = count;
	}
	remove(p, id, count = 1) {
		p.inv[id] -= count;
		if (p.inv?.[id] < 1) delete p.inv?.[id];
	}
	delete(p, id) {
		if (p.inv?.[id]) delete p.inv?.[id];
	}
	has(p, id, count = 1) {
		if (p.inv?.[id] && p.inv?.[id] >= count) return true;
		return false;
	}
	get(id, list: string[] = []) {
		if (list.length == 0) return;
		let obj: Record<string, string[]> = {};
		for (let ea of list) {
			obj[ea] = [ea, td(ea) ?? -1, ...data.alias[ea] ?? []].filter(v => (v as any) !== -1);
			obj[ea] = [...new Set(obj[ea])];
		}

		for (let [key, lit] of Object.entries(obj)) {
			if (lit.includes(id.replaceAll(" ", "_"))) return obj[key][0];
		}
		return;
	}
	parse(n) {
		return this.get(n, Object.keys(data.translate));
	}
}

globalThis.inv = new InventoryManager();

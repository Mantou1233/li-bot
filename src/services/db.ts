import ms from "ms";
import pms from "pretty-ms";
import { segment } from "oicq";
import { GroupProfile, SystemProfile, UserProfile } from "~/core/profile";
import data from "~/plugins/economy/data.json";
import { parseTree } from "./get";

export function handleXP(p: Awaited<ReturnType<typeof UserProfile>>) {
	if (p.exp[0] >= p.exp[1]) {
		p.exp[0] -= p.exp[1];
		p.exp[1] += p.exp[2];
		p.exp[2] += random(1, 4);
		p.level++;
	}
	if (p.exp[0] >= p.exp[1]) handleXP(p);
}

export function processProfiles(
	msg,
	{
		p,
		g,
		s,
		using
	}: {
		p: Awaited<ReturnType<typeof UserProfile>>;
		g: Awaited<ReturnType<typeof GroupProfile>>;
		s: Awaited<ReturnType<typeof SystemProfile>>;
		using: boolean;
	}
) {
	p.exp[0] += random(0, 3);
	handleXP(p);

	if (!p.help && using) {
		msg.reply(
			'欢迎使用本bot! 新人可以先输入"使用 新手礼包"领取新手礼包，然后签到，之后可以去钓鱼！使用"菜单"查看指令列表。',
			true
		);
		p.help = true;
	}
	p.chatCount++;
	g.chatCount++;
	s.chatCount++;

	for (let [key, value] of Object.entries(p.inv) as [string, any]) {
		if (typeof value !== "number") {
			if (typeof value === "string") {
				p.inv[key] = parseInt(value.replaceAll(/[^0-9]/g, "")) ?? 1;
			} else p.inv[key] = 0;
		}
		if (p.inv[key] == 0) inv.delete(p, key);
	}

	if (p.planting !== "none") {
		p.planting.lastPlant;
		if (getPlantingTimestamp(p) <= Date.now()) {
			const parsed = parseTree({
				...JSON.parse(
					JSON.stringify(data.plant[p.planting.plant].loots)
				)
			});
			const result: { key: string; value: number }[] = [];
			for (let [key, value] of Object.entries(parsed) as [
				string,
				number
			][]) {
				if (value > 0) {
					result.push({ key, value });
					inv.add(p, key, value);
				}
			}
			msg.reply([
				segment.at(msg.user_id),
				` 你种植的${td(p.planting.plant)}熟啦~ 获得:${result.reduce(
					(i, v) => i + `\n${td(v.key)} x${v.value}`,
					""
				)}`
			]);
			p.planting = "none";
			p.save();
		}
	}

	p.save();
	g.save();
	s.save();
}

export function getPlantingTimestamp(
	p: Awaited<ReturnType<typeof UserProfile>>
) {
	if (p.planting === "none") return 0;
	return (
		p.planting.lastPlant + ms(data.plant[p.planting.plant].time as string)
	);
}

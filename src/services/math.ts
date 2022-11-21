export function toPercent(num, total): `${string}%` {
	return `${Math.round((num / total) * 10000) / 100.0}%`;
}

export function toSizing(num, total): number {
	return Math.round((num / total) * 10000) / 100;
}

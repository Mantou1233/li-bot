import { GroupProfile, UserProfile } from "~/core/Profile";

export function handleXP(p: Awaited<ReturnType<typeof UserProfile>>) {
	if (p.exp[0] >= p.exp[1]) {
		p.exp[0] -= p.exp[1];
		p.exp[1] += p.exp[2];
		p.exp[2] += random(1, 4);
		p.level++;
	}
	if (p.exp[0] >= p.exp[1]) handleXP(p);
}

export interface Hitokoto {
	id: number;
	uuid: string;
	hitokoto: string;
	type: string;
	from: string;
	from_who?: null;
	creator: string;
	creator_uid: number;
	reviewer: number;
	commit_from: string;
	created_at: string;
	length: number;
}

export default async () => {
	return (await fetch("https://v1.hitokoto.cn/").then(
		async v => await v.json()
	)) as Hitokoto;
};

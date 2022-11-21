import { Sign } from "./Sign";

export async function ListUI({
	data,
	title,
	name,
	page,
	prompt,
	footer = 0
}: {
	data: { title: string; value: string }[];
	title;
	name;
	page: [number, number];
	prompt;
	footer?;
}) {
	return (
		await Sign(
			JSON.stringify({
				app: "com.tencent.miniapp",
				desc: "",
				view: "notification",
				ver: "1.0.0.11",
				prompt,
				appID: "",
				sourceName: "",
				actionData: "",
				actionData_A: "",
				sourceUrl: "",
				meta: {
					notification: {
						appInfo: {
							appName: name,
							appType: 4,
							appid: 1109659848
						},
						button: [],
						data: [
							...data,
							{
								title: ` `,
								value: `${page[0]} / ${page[1]}${
									footer === 0 ? "" : ` | ${footer}`
								}`
							}
						],
						emphasis_keyword: "",
						title
					}
				}
			})
		)
	).data;
}

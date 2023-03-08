/**
 * 使用须知
 * 1.代码语言为：TypeScript
 * 2.基于的框架为：oicq
 * 3.使用函数ArkSign前，请先执行npm i oicq
 */
import { Client, core as _core } from "oicq";
import { JSONShareable } from "~/core/typings";
const bot: Client = storage.client,
	core: typeof _core = _core;
/**
 * 通过小程序对json消息进行ark签名 基于oicq的core
 * @param json 要签名的json
 * @param bot 已经创建好的机器人实例
 * @param core oicq的核心
 * @returns
 */
async function ArkSign(
	json
): Promise<{ code: number; msg: string; data?: any }> {
	return new Promise((resolve, reject) => {
		let result: {
			[key: string]: any;
		} = { code: -1 };
		let json_data = null;
		try {
			json_data = JSON.parse(json);
		} catch (err) {}

		if (!json_data) {
			result.code = -1;
			result.msg = "签名失败，不是有效的json！";
			resolve(result as any);
			return;
		}
		delete json_data["extra"];

		let appid = 100951776,
			style = 10, //10表示小程序发送
			appname = "tv.danmaku.bili",
			appsign = "7194d531cbe7960a22007b9f6bdaa38b";
		let send_type = 0,
			recv_uin = bot.uin;

		let time = new Date().getTime();

		let msg_seq = BigInt(`${time}${random(100, 999)}`);

		//拼凑一个发送包
		let body = {
			1: appid,
			2: 1,
			3: style,
			5: {
				1: 1,
				2: "0.0.0",
				3: appname,
				4: appsign
			},
			7: {
				15: msg_seq
			},
			10: send_type,
			11: recv_uin,
			18: {
				1: 1109937557,
				2: {
					14: "pages"
				},
				3: "url",
				4: "text",
				5: "text",
				6: "text",
				10: JSON.stringify(json_data)
			}
		};

		//接收到签名好的json消息的处理函数
		let json_handle = function (e: any) {
			if (bot.uin == e.user_id && e?.message[0]?.type == "json") {
				let json_str = e.message[0].data;
				let json: any = null;
				let extra: any = null;
				try {
					json = JSON.parse(json_str);
					extra =
						typeof json.extra == "object"
							? json.extra
							: JSON.parse(json.extra);
				} catch (err) {}

				if (extra && extra.msg_seq == msg_seq) {
					bot.off("message", json_handle);
					clearTimeout(timer);
					delete json["extra"];
					result.code = 1;
					result.msg = "签名成功！";
					result.data = JSON.stringify(json);
					resolve(result as any);
				}
			}
		};

		let timer = setTimeout(function () {
			bot.off("message", json_handle);
			result.code = -1;
			result.msg = "签名失败，请稍后再试！";
			resolve(result as any);
		}, 3000);

		//监听TX服务器返回签名好的json文本
		bot.on("message", json_handle);

		//发送数据包
		bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));
	});
}

export async function Share(json: JSONShareable | string, id, type = "group") {
	let result: {
		[key: string]: any;
	} = { code: -1 };
	let json_data: JSONShareable = json as any;
	try {
		json_data = JSON.parse(json as any) as any;
	} catch (err) {}

	if (!json_data) {
		result.code = -1;
		result.msg = "分享失败，不是有效的json！";
		return result;
	}
	delete json_data["extra"];

	let recv_uin = 0;
	let send_type = 0;
	let recv_guild_id = 0;

	if (type == "group") {
		//群聊
		recv_uin = id;
		send_type = 1;
	} else if (type == "friend") {
		//私聊
		recv_uin = id;
		send_type = 0;
	} else throw new Error("type must be group | friend");

	const client_info = {
		appid: 100951776,
		appname: "tv.danmaku.bili",
		appsign: "7194d531cbe7960a22007b9f6bdaa38b",
		miniapp_appid: 1109937557
	};

	let style = 10;

	let time = new Date().getTime();
	let msg_seq = parseInt(`${time}${random(100, 999)}`);

	result.msg_seq = msg_seq;

	let body = {
		1: client_info.appid,
		2: 1,
		3: style,
		5: {
			1: 1,
			2: "0.0.0",
			3: client_info.appname,
			4: client_info.appsign
		},
		7: {
			15: msg_seq
		},
		10: send_type,
		11: recv_uin,
		18: {
			1: client_info.miniapp_appid,
			2: {
				14: "pages"
			},
			3: "url",
			4: "text",
			5: "text",
			6: "text",
			10: JSON.stringify(json_data)
		},
		19: recv_guild_id
	};

	let payload = await bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));
	result.data = core.pb.decode(payload);
	if (result.data[3] == 0) {
		const rst: any = await new Promise((resolve, reject) => {
			let result: any = { code: -1 };
			let handleMsg = function (e) {
				if (bot.uin == e.user_id && e?.message[0]?.type == "json") {
					let json_str = e.message[0].data;
					let json: {
						extra: any;
						[key: string]: any;
					} | null = null;
					let extra: {
						[key: string]: any;
					} | null = null;
					try {
						json = JSON.parse(json_str);
						extra =
							typeof json!.extra == "object"
								? json!.extra
								: JSON.parse(json!.extra);
					} catch (err) {}

					if (!json) return false;
					if (extra && extra.msg_seq == msg_seq) {
						clearTimeout(timer);
						delete json!["extra"];
						result.code = 1;
						result.msg = "获取成功！";
						result.data = json;
						result.message_id = e.message_id;
						resolve(result);
						return true;
					}
				}
				return false;
			};
			let get_message = async function (status = false) {
				let seq = 0;
				for (let i = 0; i < 3; i++) {
					let historys =
						send_type == 1
							? await bot
									.pickGroup(recv_uin)
									.getChatHistory(seq, 20)
							: await bot
									.pickFriend(recv_uin)
									.getChatHistory(seq, 20);
					if (send_type == 1) {
						seq = historys[0]?.seq;
					} else {
						seq = historys[0]?.time;
					}
					historys.reverse();
					for (let msg of historys) {
						if (handleMsg(msg)) {
							return;
						}
					}
				}
				if (!status) {
					timer = setTimeout(function () {
						get_message(true);
					}, 1000);
				} else {
					resolve(result);
				}
			};
			let timer = setTimeout(get_message, 1000);
		});
		bot.logger.info(
			`succeed to send: ${
				type == "group" ? `[Group(${id})]` : `[Friend(${id})]`
			} ${JSON.stringify((rst as any).data)}`
		);
		if (rst) {
			result.data = rst.data;
			result.message_id = rst.message_id;
		}
		result.msg = "分享成功！";
		result.code = 1;
	} else {
		result.msg = result[3];
	}
	return result;
}

async function ArkSignDat(...args) {
	try {
		return (await ArkSign(...(args as [any]))).data;
	} catch (e) {
		throw e;
	}
}

export { ArkSign, ArkSignDat };

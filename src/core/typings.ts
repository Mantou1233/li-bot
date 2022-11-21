import { Group, GroupMessageEvent, Member } from "oicq";

export interface IGroupMessage {
	post_type: string;
	message_id: string;
	user_id: number;
	time: number;
	seq: number;
	rand: number;
	font: string;
	message?: MessageEvent;
	raw_message: string;
	message_type: string;
	sender: Sender;
	group_id: number;
	block: boolean;
	sub_type: string;
	anonymous?: null;
	atme: boolean;
	atall: boolean;
	group: Group;
	member: Member;
	self_id: number;
}
export interface MessageEntity {
	type: string;
	text: string;
}
export interface Sender {
	user_id: number;
	nickname: string;
	card: string;
	sex: string;
	age: number;
	area: string;
	level: number;
	role: string;
	title: string;
}

export interface ExtMessage {
	content: string;
}

export type IMessage = IGroupMessage & GroupMessageEvent;
export type IExtMessage = IGroupMessage & ExtMessage & GroupMessageEvent;

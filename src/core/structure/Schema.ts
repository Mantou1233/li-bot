
import { Copy } from "../utils";

const UserSchema = {
	coin: 1000,
	coinFactor: 0,
	bank: 2000,
	bankAmount: 5000,
	signCombo: 0,
	signCount: 0,
	lastSign: 0,
	exp: [0, 75, 9],
	level: 1,
	inv: {
		bundle: 1
	},
	planting: "none",
	help: false,
	chatCount: 0
} satisfies UserSchema;


const GroupSchema = {
	chatCount: 0,
	signCount: 0,
	signCountToday: 0,
	lastSign: 0
} satisfies GroupSchema;

const SystemSchema = {
	chatCount: 0,
	signCount: 0,
	dailyShopItems: [],
	lastDailyShopRefresh: 0
} satisfies SystemSchema;


interface UserSchema {
	coin: number,
	coinFactor: number, 
	bank: number,
	bankAmount: number, // max val of bank saving
	signCombo: number,
	signCount: number,
	lastSign: number,
	exp: [number, number, number], // [0] = xp, [1] = max xp, [2] = factor
	level: number,
	inv: {
		//[K in keyof Items]: number
		[k: string]: number
	},
	planting: {
		plant: string,
		lastPlant: number,
	} | "none",
	help: boolean,
	chatCount: number
}

interface GroupSchema {
	chatCount: number
	signCount: number
	signCountToday: number
	lastSign: number
}

interface SystemSchema {
	chatCount: number
	signCount: number,
	dailyShopItems: {
		id: string,
		count: number
	}[]
	lastDailyShopRefresh: number,
}

export { UserSchema, GroupSchema, SystemSchema };

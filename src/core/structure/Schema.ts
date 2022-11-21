
import { Copy } from "../Utils";

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
	chatCount: 0
} satisfies UserSchema;


const GroupSchema = {
	signCount: 0,
	signCountToday: 0,
	lastSign: 0,
	myTestyData: 0
} satisfies GroupSchema;

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
	chatCount: number
}

interface GroupSchema {
	signCount: number
	signCountToday: number
	lastSign: number
	myTestyData: number
}

export { UserSchema, GroupSchema };

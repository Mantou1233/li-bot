import { GroupSchema, UserSchema } from "./structure/Schema";
const { db } = storage;

export class Profile<
	T extends { [key: string]: any } = { [key: string]: any }
> {
	__id: string;
	__prefix: string;
	__schema: T;

	constructor(id, prefix: string, schema: T) {
		this.__id = id;
		this.__schema = schema;
		this.__prefix = `${prefix}:`;
	}
	async init() {
		const data = (await db.get(`${this.__prefix}${this.__id}`)) ?? -1;
		if (data == -1) return this;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
		return this;
	}

	async check(): Promise<boolean> {
		return (await db.get(`${this.__prefix}${this.__id}`)) ? true : false;
	}

	async checkAndUpdate(): Promise<true> {
		if (!(await this.check())) {
			await this.newSchema();
		}
		this.updateSchema();
		return true;
	}

	get db() {
		return db;
	}

	async newSchema(initType = "user") {
		if (!this.__schema) return false;
		Object.assign(this, this.__schema);
		return void this.save();
	}

	async updateSchema() {
		if (!this.__schema) return false;
		let raw = this.raw;
		Object.assign(this, this.__schema, raw);
		return this.save();
	}

	async save() {
		const data = JSON.parse(JSON.stringify(this));
		delete data["__id"];
		delete data["__schema"];
		delete data["__prefix"];
		return (
			void (await db.set(`${this.__prefix}${this.__id}`, data)) ?? this
		);
	}

	get raw() {
		const data = JSON.parse(JSON.stringify(this));
		delete data["__id"];
		delete data["__schema"];
		delete data["__prefix"];
		return data;
	}
}

export async function GroupProfile(
	id
): Promise<Profile<UserSchema> & { [K in keyof GroupSchema]: GroupSchema[K] }> {
	return (await new Profile<GroupSchema>(
		id?.group_id ?? id,
		"qq:group",
		GroupSchema
	).init()) as unknown as Profile<UserSchema> & {
		[K in keyof GroupSchema]: GroupSchema[K];
	};
}

export async function UserProfile(
	id
): Promise<Profile<UserSchema> & { [K in keyof UserSchema]: UserSchema[K] }> {
	return (await new Profile<UserSchema>(
		id?.user_id ?? id,
		"qq:user",
		UserSchema
	).init()) as unknown as Profile<UserSchema> & {
		[K in keyof UserSchema]: UserSchema[K];
	};
}

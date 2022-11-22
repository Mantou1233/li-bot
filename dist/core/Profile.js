"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = exports.GroupProfile = exports.Profile = void 0;
const Schema_1 = require("./structure/Schema");
const { db } = storage;
class Profile {
    __id;
    __prefix;
    __schema;
    constructor(id, prefix, schema) {
        this.__id = id;
        this.__schema = schema;
        this.__prefix = `${prefix}:`;
    }
    async init() {
        const data = (await db.get(`${this.__prefix}${this.__id}`)) ?? -1;
        if (data == -1)
            return this;
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
        return this;
    }
    async check() {
        return (await db.get(`${this.__prefix}${this.__id}`)) ? true : false;
    }
    async checkAndUpdate() {
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
        if (!this.__schema)
            return false;
        Object.assign(this, this.__schema);
        return void this.save();
    }
    async updateSchema() {
        if (!this.__schema)
            return false;
        let raw = this.raw;
        Object.assign(this, this.__schema, raw);
        const schemaKeys = Object.keys(this.__schema);
        for (let key of Object.keys(this.raw)) {
            if (schemaKeys.includes(key))
                continue;
            delete this[key];
        }
        return this.save();
    }
    async save() {
        const data = this.raw;
        return (void (await db.set(`${this.__prefix}${this.__id}`, data)) ?? this);
    }
    get raw() {
        const data = JSON.parse(JSON.stringify(this));
        delete data["__id"];
        delete data["__schema"];
        delete data["__prefix"];
        return data;
    }
}
exports.Profile = Profile;
async function GroupProfile(id) {
    return (await new Profile(id?.group_id ?? id, "qq:group", Schema_1.GroupSchema).init());
}
exports.GroupProfile = GroupProfile;
async function UserProfile(id) {
    return (await new Profile(id?.user_id ?? id, "qq:user", Schema_1.UserSchema).init());
}
exports.UserProfile = UserProfile;
//# sourceMappingURL=profile.js.map
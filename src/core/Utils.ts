export type Awaitable<T> = T | PromiseLike<T>;
export type AllKeysOf<T> = T extends T ? keyof T : never;

export type KeyOfUnion<T> = T[keyof T];

export type Copy<T> = {
	[K in keyof T]: T[K];
};

export type Sect3<T3, T2, T1> = {
	[K in keyof T1 | keyof T2 | keyof T3]: K extends keyof T1
		? T1[K]
		: K extends keyof T2
		? T2[K]
		: K extends keyof T3
		? T3[K]
		: never;
};
type sect2 = Sect3<
	{
		a: 2;
	},
	{ b: 2 },
	{
		c: 23;
		a: 4;
	}
>;

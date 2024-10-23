type OptionalKeys<O extends object> = O extends unknown ? {
    [K in keyof O]-?: {} extends Pick<O, K> ? K : never;
}[keyof O] : never;
type RequiredKeys<O extends object> = O extends unknown ? {
    [K in keyof O]-?: {} extends Pick<O, K> ? never : K;
}[keyof O] : never;
type MergeObjectDeeply<O extends Record<string | number | symbol, unknown>, O1 extends Record<string | number | symbol, unknown>> = {
    [K in keyof (O & O1)]: K extends RequiredKeys<O1> ? MergeObjectsOrReturnFallback<O[K], O1[K], O1[K]> : K extends OptionalKeys<O1> ? K extends OptionalKeys<O> ? MergeObjectsOrReturnFallback<Exclude<O[K], undefined>, Exclude<O1[K], undefined>, Exclude<O[K], undefined> | Exclude<O1[K], undefined>> : K extends RequiredKeys<O> ? Exclude<O1[K], undefined> extends O[K] ? O[K] : MergeObjectsOrReturnFallback<O[K], Exclude<O1[K], undefined>, O[K] | Exclude<O1[K], undefined>> : O1[K] : O[K];
};
type MergeObjectsOrReturnFallback<O, O1, Fallback> = O extends Record<string | number | symbol, unknown> ? O1 extends Record<string | number | symbol, unknown> ? MergeObjectDeeply<O, O1> : Fallback : Fallback;
export type MergeDeep<O extends Record<string | number | symbol, unknown>, O1 extends Record<string | number | symbol, unknown>> = O extends unknown ? (O1 extends unknown ? MergeObjectDeeply<O, O1> : never) : never;
export {};

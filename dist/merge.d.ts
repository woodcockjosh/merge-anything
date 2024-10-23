import type { Assign } from './typeUtils/Assign.js';
import type { Pop } from './typeUtils/List.js';
import type { PrettyPrint } from './typeUtils/PrettyPrint.js';
export type Merge<T, Ts extends unknown[]> = T extends Record<string | number | symbol, unknown> ? Ts extends Record<string | number | symbol, unknown>[] ? PrettyPrint<Assign<T, Ts>> : Pop<Ts> : Pop<Ts>;
export declare function merge<T, Tn extends unknown[]>(object: T, ...otherObjects: Tn): Merge<T, Tn>;
export declare function mergeAndCompare<T, Tn extends unknown[]>(compareFn: (prop1: unknown, prop2: unknown, propName: string | symbol) => any, object: T, ...otherObjects: Tn): Merge<T, Tn>;
export declare function mergeAndConcat<T, Tn extends unknown[]>(object: T, ...otherObjects: Tn): Merge<T, Tn>;

import type { Iteration, IterationOf, Next, Pos } from './Iteration.js';
import type { Length, List } from './List.js';
import type { MergeDeep } from './MergeDeep.js';
type Cast<A1, A2> = A1 extends A2 ? A1 : A2;
type Extends<A1, A2> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
type __Assign<O extends Record<string | number | symbol, unknown>, Os extends List<Record<string | number | symbol, unknown>>, I extends Iteration = IterationOf<0>> = Extends<Pos<I>, Length<Os>> extends 1 ? O : __Assign<MergeDeep<O, Os[Pos<I>]>, Os, Next<I>>;
type _Assign<O extends Record<string | number | symbol, unknown>, Os extends List<Record<string | number | symbol, unknown>>> = __Assign<O, Os> extends infer X ? Cast<X, Record<string | number | symbol, unknown>> : never;
export type Assign<O extends Record<string | number | symbol, unknown>, Os extends List<Record<string | number | symbol, unknown>>> = O extends unknown ? (Os extends unknown ? _Assign<O, Os> : never) : never;
export {};

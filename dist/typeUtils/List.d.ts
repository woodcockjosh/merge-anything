export type List<T = unknown> = readonly T[];
export type Length<L extends List> = L['length'];
export type Pop<L extends List> = L extends readonly [] ? never : L extends [...unknown[], infer Last] ? Last : L extends (infer T)[] ? T : never;

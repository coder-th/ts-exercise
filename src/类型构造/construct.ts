// 合并数组
type Zip<T extends unknown[], U extends unknown[]> = T extends [
  infer TFirst,
  ...infer TRest
]
  ? U extends [infer UFirst, ...infer URest]
    ? [[TFirst, UFirst], ...Zip<TRest, URest>]
    : []
  : [];

type ZipResult = Zip<[1, 2], ["guang", "dong"]>;

// 全部首字母大写
type CapitalizeChar<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : never;

type CapitalizeResult = CapitalizeChar<"hello guang dong">;

type CamelCase<T extends string> =
  T extends `${infer First}${" "}${infer Second}${infer Rest}`
    ? `${CapitalizeChar<First>}${" "}${Uppercase<Second>}${CamelCase<Rest>}`
    : T;
type CamelCaseResult = CamelCase<"hello guang dong">;

// 删除字符串某个子串
type DropSubStr<
  T extends string,
  U extends string
> = T extends `${infer First}${U}${infer Rest}`
  ? `${First}${DropSubStr<Rest, U>}`
  : T;
type DropSubStrResult = DropSubStr<"hel~lo~~", "~">;

/**
 * 函数
 */
// 函数参数添加类型
type AppendArgument<T extends Function, Type> = T extends (
  ...args: infer Args
) => infer Return
  ? (...args: [...Args, Type]) => Return
  : never;
type AppendArgumentResult = AppendArgument<() => number, number>;

/***
 * 索引类型
 */
type UppercaseKey<T extends Record<string, unknown>> = T extends Record<
  string,
  unknown
>
  ? { [Key in keyof T as Uppercase<Key & string>]: [T[Key], T[Key], T[Key]] }
  : never;
type UpperResult = UppercaseKey<{ a: number; b: string }>;

/**
 * 内置高级类型的实现
 */
type MyRecord<Keys extends string | number | symbol, T extends Object> = {
  [Key in Keys]: T;
};
type RecordResult = MyRecord<string, number>;

/**
 * 只读与可变
 */
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};
type MyReadonlyResult = MyReadonly<{ a: number; b: string }>;
type MyMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type MyMutableResult = MyMutable<MyReadonly<{ a: number; b: string }>>;

/**
 * 可选和必选
 */
type MyPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type MyPartialResult = MyPartial<{ a: number; b: string }>;
type MyRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type MyRequiredResult = MyRequired<{ a?: number; b?: string }>;

/**
 * 扩展和排除
 */
type MyExtend<T, U> = U extends T ? T : U;
type MyExtendResult = MyExtend<"a" | "b" | "c" | "d", "a" | "e">;
type MyExclude<T, U extends T> = T extends U ? never : T;
type MyExcludeResult = MyExclude<"a" | "b" | "c" | "d", "a">;

/**
 * 选择和剔除
 */
type MyPick<T, U extends keyof T> = {
  [Key in U]: T[Key];
};
type MyPickResult = MyPick<{ age: number; name: string }, "age">;
type MyOmit<T, U extends keyof T> = {
  [Key in Exclude<keyof T, U>]: T[Key];
};
type MyOmitResult = MyOmit<{ age: number; name: string }, "age">;

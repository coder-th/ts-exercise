// 递归获取类型
type DeepPromiseGetValue<T extends Promise<unknown>> = T extends Promise<
  infer Value
>
  ? Value extends Promise<unknown>
    ? DeepPromiseGetValue<Value>
    : Value
  : never;
type DeepPromiseGetValueResult = DeepPromiseGetValue<
  Promise<Promise<Promise<Promise<Record<string, string>>>>>
>;

/**
 * 数组类型的递归
 */
// 反转数组
type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : T;
type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>;
// includes
type IsEqual<T, U> = (T extends U ? true : false) &
  (U extends T ? true : false);
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;
type IncludesResult = Includes<[1, 2, 3, 4], 5>;
// RemoveItem
type RemoveItem<
  Arr extends unknown[],
  Remove,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Remove> extends true
    ? RemoveItem<Rest, Remove, Result>
    : RemoveItem<Rest, Remove, [...Result, First]>
  : Result;
type RemoveItemResult = RemoveItem<[1, 2, 3, 4], 3>;

// BuildArray
type BuildArray<
  Length extends number,
  DefaultType extends unknown,
  Result extends unknown[] = []
> = Result["length"] extends Length
  ? Result
  : BuildArray<Length, DefaultType, [...Result, DefaultType]>;
type BuildArrayResult = BuildArray<5, string>;

/**
 * 字符串类型的递归
 */
// 替换所有
type ReplaceStrAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Rest}`
  ? `${Left}${To}${ReplaceStrAll<Rest, From, To>}`
  : Str;
type ReplaceAll = ReplaceStrAll<"guang dong,guang zhou", "guang", "hu">;

// 每个字符作为类型
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;
type StringUnion = StringToUnion<"abcdefg">;
// 反转字符串
type ReverseStr<
  Str extends string,
  Result extends string = ""
> = Str extends `${infer First}${infer Rest}`
  ? ReverseStr<Rest, `${First}${Result}`>
  : Result;
type ReverseStrResult = ReverseStr<"abcdefg">;

/**
 * 对象递归
 */
type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends Object
    ? Obj[Key] extends Function
      ? Obj[Key]
      : DeepReadonly<Obj[Key]>
    : Obj[Key];
};
type DeepReadonlyResult = DeepReadonly<{
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
}>["a"]["b"]["c"];

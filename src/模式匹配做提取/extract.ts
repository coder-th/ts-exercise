// 类型体操套路一： 模式匹配做提取

// 提取promise的具体类型
type GetPromiseValueType<T> = T extends Promise<infer Value> ? Value : never;
type p = Promise<[1, 2, 3]>;
type pRes = GetPromiseValueType<p>;

/**
 * 数组类型的模式匹配
 */

// 获取第一个元素的类型
type GetFirst<T extends unknown[]> = T extends [infer Value, ...unknown[]]
  ? Value
  : never;
type FristType = GetFirst<[1, 2, 3]>;
// 获取最后一个元素的类型
type GetLast<T extends unknown[]> = T extends [...unknown[], infer Last]
  ? Last
  : never;
type LastType = GetLast<[1, 2, 3]>;
// 去掉最后一个元素后，获取剩余数组
type Pop<T extends unknown[]> = T extends []
  ? []
  : T extends [...infer Rest, unknown]
  ? Rest
  : never;
type PopArr = Pop<[1, 2, 3]>;
// 去除第一个元素后，获取剩余数组的类型
type Shift<T extends unknown[]> = T extends []
  ? []
  : T extends [unknown, ...infer Rest]
  ? Rest
  : never;
type ShiftArr = Shift<[1, 2, 3]>;

/**
 * 字符串的模式匹配
 */

// 判断字符串是否以某个前缀开头
type StartWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;
type IsStartWith = StartWith<"abcdege", "abcf">;

// 字符串替换
type Replace<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : never;
type ReplaceStr = Replace<"guangdong hate you", "hate", "love">;

// 去掉空白字符
type TrimLeft<U extends string> = U extends `${" " | "\n" | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : U;
type TrimRight<U extends string> = U extends `${infer Rest}${" " | "\n" | "\t"}`
  ? TrimRight<Rest>
  : U;
type Trim<T extends string> = TrimRight<TrimLeft<T>>;
type TrimStr = Trim<"    helllo world    ">;

/**
 * 函数类型
 */
// 获取函数参数
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type GetArgs = GetParameters<(name: string, age: number) => void>;

// 获取函数的返回值类型
type GetReturnTypes<Func extends Function> = Func extends (
  ...args: unknown[]
) => infer Return
  ? Return
  : never;
type GetReturn = GetReturnTypes<() => { name: string; age: number }>;


/**
 * class 类型
 */

class Javascript {
  name: string;

  constructor() {
    this.name = "dong";
  }

  hello(this: Javascript) {
    return "hello, I'm " + this.name;
  }
}


const js = new Javascript();
type GetThisParameterTypes<T> = T extends (this:infer thisType,...args:unknown[]) => unknown ? thisType: unknown
type GetThisResult = GetThisParameterTypes<typeof js.hello>;
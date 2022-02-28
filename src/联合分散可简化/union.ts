// 字符串数组进行首字母大写
type CamelCaseItem<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}_${Uppercase<Right>}${CamelCaseItem<Rest>}`
    : Str;
type CamelCaseItemTest = CamelCaseItem<"aa_bb_cc">;
type CamelCaseStrArr<
  Arr extends unknown[],
  Result extends string[] = []
> = Arr["length"] extends 0
  ? Result
  : Arr extends [infer First, ...infer Rest]
  ? CamelCaseStrArr<Rest, [...Result, CamelCaseItem<First & string>]>
  : Result;
type CamelCaseStrArrTest = CamelCaseStrArr<["aa_bb_cc", "dd_ee_ff"]>;

// 联合类型可以简化循环，因为ts检测到联合类型，会自动进行循环
type CamelStart<T extends string> = T extends `${infer Left}${infer Rest}`
  ? `${Uppercase<Left>}${Rest}`
  : never;
type CamelCaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}_${Uppercase<Right>}${CamelCaseUnion<Rest>}`
    : Item;
type CamelCaseUnionTest = CamelCaseUnion<CamelStart<"aa_bb_cc" | "dd_ee_ff">>;

// 判断是不是联合类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionTest = IsUnion<"a" | "b" | "c">;
/**
 * A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。

[B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。

B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处理，A 和 B 都是同一个，怎么判断都成立。

利用这个特点就可以判断出是否是联合类型。

其中有两个点比较困惑，我们重点记一下：

当 A 是联合类型时：

A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。

A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。
 */

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type BEMTest = BEM<
  "qy",
  ["container", "parent"],
  ["success", "error", "warning", "danger"]
>;

/**
 * 联合类型的组合
 */
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;
type AllCombination<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombination<Exclude<B, A>>>
  : never;
type AllCombinationTest = AllCombination<"a" | "b" | "c" | "d" | "e">;

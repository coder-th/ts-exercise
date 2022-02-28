// 判断类型是否为any
type IsAny<T> = 1 extends "1" & T ? true : false;
type IsAnyTest = IsAny<1>;
// 判断类型是否相等
type IsTypeEqual<T, U> = (<Return>() => Return extends T ? 1 : 2) extends <
  Return
>() => Return extends U ? 1 : 2
  ? true
  : false;
type NotEqual<T, U> = (<Return>() => Return extends T ? 1 : 2) extends <
  Return
>() => Return extends U ? 1 : 2
  ? false
  : true;
type IsEqualTest = IsTypeEqual<number, boolean>;

// 判断类型是不是联合类型
type IsUnionType<A extends unknown, B extends unknown = A> = A extends A
  ? [A] extends [B]
    ? true
    : false
  : never;
type IsUnionTypeTest = IsUnionType<"a" | "b" | "d">;
// 判断类型是不是Nerver类型
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverTest = IsNever<never>;
// 判断类型是不是元祖类型
/**
 * 元祖和数组的两个区别:
 *  - length属性: 数组是number,元祖是数字字面量比如3
 *  - readonly:  元祖的每个属性是只读的
 */
type IsTuple<T> = T extends readonly [...infer Item]
  ? NotEqual<Item["length"], number>
  : false;
type IsTupleTest = IsTuple<[1, 2, 3]>;
/**
 * 联合类型转交叉类型
 */
type UnionToIntersection<T> = (
  T extends T ? (value: T) => unknown : never
) extends (value: infer R) => unknown
  ? R
  : never;
type UnionToIntersectionTest = UnionToIntersection<
  { hello: string } | { name: string } | { age: number }
>;

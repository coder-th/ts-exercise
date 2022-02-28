type BuildArr<
  Length extends number,
  Type = number,
  Result extends unknown[] = []
> = Result["length"] extends Length
  ? Result
  : BuildArr<Length, Type, [...Result, Type]>;
type BuildArrTest = BuildArr<10, string>;

/**
 * 数组长度实现加法
 */
type Add<T extends number, U extends number> = [
  ...BuildArr<T>,
  ...BuildArr<U>
]["length"];
type AddTest = Add<100, 4>;

/**
 * 数组长度实现减法
 */
type Subtract<T extends number, U extends number> = BuildArr<T> extends [
  ...arr: BuildArr<U>,
  ...rest: infer Rest
]
  ? Rest["length"]
  : never;
type SubTest = Subtract<100, 34>;

/**
 * 数组长度实现乘法
 */
type Mutiply<
  T extends number,
  U extends number,
  Result extends unknown[] = []
> = U extends 0
  ? Result["length"]
  : Mutiply<T, Subtract<U, 1>, [...Result, ...BuildArr<T>]>;
type MutiplyTest = Mutiply<14, 6>;
/**
 * 数组长度实现除法
 */
type Divide<
  T extends number,
  U extends number,
  Result extends unknown[] = []
> = T extends 0
  ? Result["length"]
  : Divide<Subtract<T, U>, U, [unknown, ...Result]>;
type DivideTest = Divide<15, 3>;
/**
 * 数组长度实现比较(不断判断result的长度，先到number2说明number2小，长度先等于谁，谁小)
 */
type More<
  T extends number,
  U extends number,
  Result extends unknown[] = []
> = T extends U
  ? false
  : Result["length"] extends U
  ? true
  : Result["length"] extends T
  ? false
  : More<T, U, [...Result, unknown]>;
type MoreTest = More<13, 12>;

/**
 * 数组长度求字符串长度
 */
type StrLen<
  Str extends string,
  Result extends unknown[] = []
> = Str extends `${infer First}${infer Rest}`
  ? StrLen<Rest, [First, ...Result]>
  : Result["length"];
type StrLenTest = StrLen<"abcdefg">;

/**
 * 数组长度求斐波那契数列
 */
type FibonacciLoop<
  PreArr extends unknown[],
  CountArr extends unknown[],
  ResultArr extends unknown[],
  Total extends number = 1
> = CountArr["length"] extends Total
  ? ResultArr["length"]
  : FibonacciLoop<
      ResultArr,
      [...CountArr, unknown],
      [...PreArr, ...ResultArr],
      Total
    >;
type Fibonacci<T extends number> = FibonacciLoop<[1], [], [], T>;
type FibonacciTest = Fibonacci<8>;

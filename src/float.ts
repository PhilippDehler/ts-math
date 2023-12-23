import { Bool } from "./boolean";
import { Int } from "./int";
import { DIGIT } from "./maps";
import { UInt } from "./uint";

export namespace Float {
  export type Type = { sign: boolean; digits: UInt.Type };
  type PRECISION = 10;
  type Fill<
    T extends number,
    Item extends DIGIT = 0,
    Agg extends UInt.Type = []
  > = Agg["length"] extends T ? Agg : Fill<T, Item, [...Agg, Item]>;

  type Ten_Digits = Fill<PRECISION, DIGIT>;
  //prettier-ignore
  export type Append<T extends UInt.Type> =  [...T, ...Fill<PRECISION>]
  //prettier-ignore
  type Drop<T extends UInt.Type> = 
   T extends [...Fill<PRECISION, DIGIT>, ...infer Tail extends UInt.Type]? Tail : never
  //prettier-ignore
  type TakeRight<
    T extends UInt.Type,
    Agg extends UInt.Type = []
  > = Agg["length"] extends PRECISION
      ? Agg
      : T extends [...infer Tail extends UInt.Type, infer Last extends DIGIT]
        ? TakeRight<Tail, [Last, ...Agg]>
        : TakeRight<T, [...Agg, 0]>;

  //prettier-ignore
  export type Parse<
  T extends string,
> = T extends `-${infer Fst}.${infer Rest}`
    ? { sign: false; digits: UInt.Parse<`${Fst}${AppendZeros<Rest>}`> }
    : T extends `${infer Fst}.${infer Rest}`
        ? { sign: true; digits: UInt.Parse<`${Fst}${AppendZeros<Rest>}`> }
        : { sign: true; digits: UInt.Parse<`${T}${AppendZeros<"">}`> };

  export type Print<T extends Type> = `${Int.Print<{
    sign: T["sign"];
    digits: Drop<T["digits"]>;
  }>}.${UInt.Print<TakeRight<T["digits"]>>}`;

  //prettier-ignore
  type AppendZeros<T extends string,  Agg extends string = "", C extends any[] = []> = 
    C["length"] extends PRECISION 
        ? Agg
        : T extends `${infer P}${infer Rest}`
            ? AppendZeros<Rest, `${Agg}${P}`, [...C, any]>
            : AppendZeros<T, `${Agg}${0}`, [...C, any]>;

  export type Add<A extends Type, B extends Type> = Int.Add<A, B>;
  export type Subtract<A extends Type, B extends Type> = Int.Subtract<A, B>;
  export type Sum<A extends Type[]> = Int.Sum<A>;
  //prettier-ignore
  export type Product<A extends Type[], Agg extends Type> = 
    A extends [infer Head extends Type, ...infer Tail extends Type[]]
      ? Product<Tail, Multiply<Head, Agg>>
      : Agg;

  export type Divide<A extends Type, B extends Type> = {
    sign: Bool.XNOR<A["sign"], B["sign"]>;
    digits: UInt.Divide<Append<A["digits"]>, B["digits"]>;
  };

  type SignLessMultiply<
    A extends Type["digits"],
    B extends Type["digits"]
  > = Drop<UInt.Multiply<A, B>>;

  export type Multiply<A extends Type, B extends Type> = {
    sign: Bool.XNOR<A["sign"], B["sign"]>;
    digits: SignLessMultiply<A["digits"], B["digits"]>;
  };

  //prettier-ignore
  export type Power<A extends Type, B extends UInt.Type, Agg extends Type = Parse<"1">> = 
  B extends [0]
    ? Parse<"1">
    : Power<A, UInt.Subtract<B, [1]>, Multiply<Agg, A>>;

  type NextGuess<
    Base extends Type,
    N extends UInt.Type,
    Previous extends Type
  > = Subtract<
    Previous,
    Divide<
      Subtract<Power<Previous, N>, Base>,
      Multiply<UIntToFloat<N>, Power<Previous, UInt.Subtract<N, [1]>>>
    >
  >;

  type UIntToFloat<T extends UInt.Type> = {
    sign: true;
    digits: Append<T>;
  };

  //prettier-ignore
  export type ApproximateRoot<
    A extends Type & { sign: true },
    B extends UInt.Type,
    Approximation extends Type = Parse<"3">,
    IterationCount extends number = 6,
    Count extends any[] = []
  > = Count["length"] extends IterationCount
    ? Approximation
    : ApproximateRoot<A,B, NextGuess<A, B, Approximation>, IterationCount, [...Count, unknown]>;

  type A = Print<
    // ^?
    // 1024 ** (1/8)
    ApproximateRoot<Parse<"1024.0">, UInt.Parse<"2">, Parse<"15">, 4>
    //                      ^- Base     ^- N-th root
    //                             ^-Precision of float     ^- Initial guess
    //                                                                   ^- Iteration count
  >;

  // type B = Print<
  //   // ^?
  //   ApproximateRoot<Parse<"1024.0">, UInt.Parse<"4">>
  // >;
  // type C = Print<
  //   // ^?
  //   ApproximateRoot<Parse<"1024.0">, UInt.Parse<"8">>
  // >;
  // type D = Print<
  //   // ^?
  //   ApproximateRoot<Parse<"1024.0">, UInt.Parse<"2">>
  // >;
}

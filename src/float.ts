import { BOOL } from "./boolean";
import { Int } from "./int";
import { UInt } from "./uint";

export namespace Float {
  export type Type = { precision: number; sign: boolean; digits: UInt.Type };
  //prettier-ignore
  export type Parse<
  T extends string,
  Precision extends number = 4
> = T extends `-${infer Fst}.${infer Rest}`
    ? { sign: false; precision: Precision; digits: UInt.Parse<`${Fst}${AppendZeros<Rest, Precision>}`> }
    : T extends `${infer Fst}.${infer Rest}`
        ? { sign: true; precision: Precision; digits: UInt.Parse<`${Fst}${AppendZeros<Rest, Precision>}`> }
        : { sign: true; precision: Precision; digits: UInt.Parse<`${T}${AppendZeros<"", Precision>}`> };

  export type Print<T extends Type> = `${Int.Print<{
    sign: T["sign"];
    digits: Drop<T["digits"], T["precision"]>;
  }>}.${UInt.Print<TakeRight<T["digits"], T["precision"]>>}`;

  //prettier-ignore
  type AppendZeros<T extends string, Precision extends number, Agg extends string = "", C extends any[] = []> = 
    C["length"] extends Precision 
        ? Agg
        : T extends `${infer P}${infer Rest}`
            ? AppendZeros<Rest, Precision, `${Agg}${P}`, [...C, any]>
            : AppendZeros<T, Precision, `${Agg}${0}`, [...C, any]>;
  //prettier-ignore
  type Drop<T extends UInt.Type, Precision extends number, Counter extends any[] = []> = 
    Counter["length"] extends Precision
        ? T
        : T extends [...infer Tail extends UInt.Type, any]
            ? Drop<Tail, Precision, [...Counter, any]>
            : [];
  //prettier-ignore
  type TakeRight<T extends UInt.Type, Precision extends number, Counter extends UInt.Type = []> = 
    Counter["length"] extends Precision
        ? Counter
        : T extends [...infer Tail extends UInt.Type, infer Last extends UInt.DIGIT]
            ? TakeRight<Tail, Precision, [Last, ...Counter]>
            : TakeRight<T, Precision, [...Counter, 0]>;

  export type Add<A extends Type, B extends Type> = {
    sign: Int.Add<A, B>["sign"];
    digits: Int.Add<A, B>["digits"];
    precision: A["precision"] & B["precision"];
  };

  export type Subtract<A extends Type, B extends Type> = {
    sign: Int.Subtract<A, B>["sign"];
    digits: Int.Subtract<A, B>["digits"];
    precision: A["precision"];
  };

  export type Divide<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: UInt.Divide<Append<A["digits"], A["precision"]>, B["digits"]>;
    precision: A["precision"];
  };

  type SignLessMultiply<
    A extends Type["digits"],
    B extends Type["digits"],
    P extends Type["precision"]
  > = Drop<UInt.Multiply<A, B>, P>;

  export type Multiply<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: SignLessMultiply<A["digits"], B["digits"], A["precision"]>;
    precision: A["precision"] & B["precision"];
  };

  type __Power<
    A extends Type["digits"],
    B extends Type["digits"],
    P extends Type["precision"]
  > = B extends [0] | []
    ? Append<[1], P>
    : SignLessMultiply<A, __Power<A, UInt.Subtract<B, [1]>, P>, P>;

  export type Power<A extends Type, B extends UInt.Type> = {
    sign: UInt.IsEven<B> extends true ? true : A["sign"];
    digits: __Power<A["digits"], B, A["precision"]>;
    precision: A["precision"];
  };

  export type Append<
    T extends UInt.Type,
    Precision extends number,
    Agg extends UInt.Type = []
  > = Agg["length"] extends Precision
    ? [...T, ...Agg]
    : Append<T, Precision, [0, ...Agg]>;

  type NextGuess<
    Base extends Type,
    N extends UInt.Type,
    Previous extends Type
  > = Subtract<
    Previous,
    Divide<
      Subtract<Power<Previous, N>, Base>,
      Multiply<
        UIntToFloat<N, Base["precision"]>,
        Power<Previous, UInt.Subtract<N, [1]>>
      >
    >
  >;

  type UIntToFloat<T extends UInt.Type, P extends number> = {
    sign: true;
    digits: Append<T, P>;
    precision: P;
  };

  //prettier-ignore
  export type ApproximateRoot<
    A extends Type & { sign: true },
    B extends UInt.Type,
    Approximation extends Type = Parse<"3", A["precision"]>,
    IterationCount extends number = 6,
    Count extends any[] = []
  > = Count["length"] extends IterationCount
    ? Approximation
    : ApproximateRoot<A,B, NextGuess<A,B, Approximation>, IterationCount, [...Count, unknown]>;

  type A = Print<
    // ^?
    // 1024 ** (1/8)
    ApproximateRoot<Parse<"1024.0", 8>, UInt.Parse<"2">, Parse<"15", 8>, 4>
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

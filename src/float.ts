import { BOOL } from "./boolean";
import { Int } from "./int";
import { UInt } from "./uint";

export namespace FLOAT {
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
  }>}.${UInt.Print<DropAndTake<T["digits"], T["precision"]>>}`;

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
  type DropAndTake<T extends UInt.Type, Precision extends number, Counter extends UInt.Type = []> = 
    Counter["length"] extends Precision
        ? Counter
        : T extends [...infer Tail extends UInt.Type, infer Last extends UInt.DIGIT]
            ? DropAndTake<Tail, Precision, [Last, ...Counter]>
            : DropAndTake<T, Precision, [...Counter, 0]>;

  export type Add<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: Int.Add<A, B>["digits"];
    precision: A["precision"] & B["precision"];
  };

  export type Subtract<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: Int.Subtract<A, B>["digits"];
    precision: A["precision"];
  };

  export type Divide<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: UInt.Divide<Append<A["digits"], A["precision"]>, B["digits"]>;
    precision: A["precision"];
  };

  export type Multiply<A extends Type, B extends Type> = {
    sign: BOOL.XNOR<A["sign"], B["sign"]>;
    digits: Drop<UInt.Multiply<A["digits"], B["digits"]>, A["precision"]>;
    precision: A["precision"] & B["precision"];
  };

  export type Append<
    T extends UInt.Type,
    Precision extends number,
    Agg extends UInt.Type = []
  > = Agg["length"] extends Precision
    ? [...T, ...Agg]
    : Append<T, Precision, [0, ...Agg]>;

  //   type P<A extends Type, B extends Type> = {
  //     sign: UInt.__IsEven<B> extends true ? true : A["sign"];
  //     digits: Power<A["digits"], B>;
  //   };

  //   type NextGuess<
  //     Base extends Type,
  //     N extends Type,
  //     Previous extends Type
  //   > = Subtract<
  //     Previous,
  //     Divide<
  //       Subtract<Power<Previous, N>, Base>,
  //       Multiply<N, Power<Previous, Subtract<N, [1]>>>
  //     >
  //   >;

  //   //prettier-ignore
  //   export type Root<
  //   A extends Type,
  //   B extends Type,
  //   Approximation extends Type,
  //   IterationCount extends number = 10,
  //   Count extends any[] = []
  // > = Count["length"] extends IterationCount
  //   ? Approximation
  //   : Root<A,B, NextGuess<A,B, Approximation>, IterationCount, [...Count, unknown]>;
  // }
}
// type GH = Float<"1.20">;
// type GHG = Float<"7.00">;
// type GGGG = Append<GH["digits"], GH["precision"]>;
// type OO = __Division<Append<GHG["digits"], 4, []>, GH["digits"]>;
// type GG = ToReadableFloat<FloatDivide<Float<"1.2000">, Float<"2.4000">>>;
// type digits = __Division<GGGG, GHG["digits"]>;

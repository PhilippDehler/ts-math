import {
  CompareMap,
  DecimalAddMap,
  DecimalSubtractMap,
  EQUAL,
  GREATER_THAN,
  LESS_THAN,
  MultiplicationMap,
} from "./maps";

/**
 * Implements:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Modulo
 * - Power
 * - SquareRoot
 * - IsEven
 * - IsOdd
 * - Compare
 *  - Nth-Root
 * -
 */
export namespace UInt {
  export type DIGIT = keyof DecimalAddMap;
  type CARRY = 0 | 1;
  export type Type = DIGIT[];

  // prettier-ignore
  export type Parse<T extends string, I extends Type = []> = 
    T extends `${infer Fst extends DIGIT}${infer Rest}`
        ? Parse<Rest, [...I, Fst]>
        : I;
  // prettier-ignore
  export type Print<T extends Type, Num extends string = ""> = 
    T extends [infer Fst extends DIGIT,...infer Rest extends Type] 
        ? Print<Rest, `${Num}${Fst}`>
        : Num extends "" ? "0" : Num;

  //IDEA: Strings could be more performant than arrays, but I'm not sure

  /**
   *
   * @param A - Internal number e.g: [1, 1, 2, 3]
   * @param B - Internal number e.g: [9, 8, 7]
   * @param Carry - Carry from the previous addition, Defaults to 0
   * @param Sum - Aggregator for the sum, Defaults to []
   *
   * @returns The sum of A and B
   *
   * @example
   * type X = Adder<InternalNumber<"1123">, InternalNumber<"987">>;
   * -> X = InternalNumber<"2110">
   * Wokrs like this:
   *
   * First iteration: A: [1, 1, 2, 3]; B = [9, 8, 7]; Carry = 0; Sum = []
   * Case 1
   * -> ALast = 3, BLast = 7
   * -> DecimalAddMap[3][7][0] = {sum: 0, carry: 1}
   *
   * Second iteration: A: [1, 1, 2] B = [9, 8]; Carry = 1; Sum = [0]
   * Case 1
   * -> ALast = 2, BLast = 8
   * -> DecimalAddMap[2][8][1] = {sum: 1, carry: 1}
   *
   * Third iteration: A: [1, 1] B = [9]; Carry = 1; Sum = [1, 0]
   * Case 1
   * -> ALast = 1, BLast = 9
   * -> DecimalAddMap[1][9][1] = {sum: 1, carry: 1}
   *
   * Fourth iteration: A: [1] B = []; Carry = 1; Sum = [1, 1, 0]
   * Case 2
   * -> ALast = 1, BLast = 0
   * -> DecimalAddMap[1][0][1] = {sum: 2, carry: 0}
   *
   * Fifth iteration: A: [] B = []; Carry = 0; Sum = [2, 1, 1, 0]
   * Case 3
   */
  // prettier-ignore
  export type Add<A extends Type, B extends Type, Carry extends CARRY = 0, Sum extends Type = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT] 
/*case: 1*/ ? Add<AInit, BInit, DecimalAddMap[ALast][BLast][Carry]["carry"], [DecimalAddMap[ALast][BLast][Carry]["sum"], ...Sum]> 
/*case: 2*/ : Add<AInit, [], DecimalAddMap[ALast][0][Carry]["carry"], [DecimalAddMap[ALast][0][Carry]["sum"], ...Sum]>            
        : Carry extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? [...B, ...Sum] // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends Type, infer Last1 extends DIGIT]                               
/*case: 4*/     ? Add<Init1, [], DecimalAddMap[Last1][0][Carry]["carry"], [DecimalAddMap[Last1][0][Carry]["sum"], ...Sum]>        
/*case: 5*/     : Carry extends 1 ? [1, ...Sum] : Sum;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param Digit - Internal digit e.g: 9
   * @param Carry - Carry from the previous multiplication, Defaults to 0
   * @param Product - Aggregator for the product, Defaults to [[AggProduct:INTERNAL_NUMBER], [AggCarry:INTERNAL_NUMBER]]
   *
   * @returns The product of A and Digit
   *
   * @example
   * type X = MultiplyWithDigit<InternalNumber<"23">, 9>;
   * -> X = InternalNumber<"207">
   * Works like this:
   *
   * First iteration: A: [2, 3]; Digit = 9; Carry = 0; Product = [[], []]
   * Case 1
   * -> ALast = 3, Digit = 9
   * -> MultiplicationMap[3][9] = {product: 7, carry: 2}
   *
   * Second iteration: A: [2]; Digit = 9; Carry = 2; Product = [[7], [0]]
   * Case 1
   * -> ALast = 2, Digit = 9
   * -> MultiplicationMap[2][9] = {product: 8, carry: 1}
   *
   * Third iteration: A: []; Digit = 9; Carry = 2; Product = [[8, 7], [2, 0]]
   * Case 3
   * -> Appends Carry to the AggProduct
   * Product = [[1, 8, 7], [2, 0]]
   * -> Sum<Product> = [2, 0, 7]
   *
   */
  // prettier-ignore
  export type __MultiplyWithDigit<A extends Type, Digit extends DIGIT, Carry extends DIGIT = 0, Product extends [Type,Type] = [[], []]> =
    A extends [...infer Init extends Type, infer Last extends DIGIT] 
/*case: 1*/ ? __MultiplyWithDigit<Init, Digit, MultiplicationMap[Last][Digit]["carry"], [[MultiplicationMap[Last][Digit]["product"], ...Product[0]], [Carry, ...Product[1]]]>
            : Carry extends 0 
/*case: 2*/     ? Sum<Product> 
/*case: 3*/     : Sum<[[Carry, ...Product[0]], Product[1]]>;

  /**
   * @param A - Internal number e.g: [2, 3]
   * @param B - Internal number e.g: [9, 8]
   * @param Filler - Filler for the multiplication, Defaults to []
   * @param Product - Aggregator for the product, Defaults to []
   * @returns The product of A and B
   * @example
   * type X = Multiply<InternalNumber<"23">, InternalNumber<"98">>;
   * -> X = InternalNumber<"2254">
   * Works like this:
   *
   * First iteration: A: [2, 3]; B = [9, 8]; Filler = []; Product = []
   * Multiply<[2,3], [9, 8], [], []>
   * Results in -> Case 1
   * NextA -> [2, 3]; NextB = [9]; NextFiller = [0]; NextProduct = [[1, 8, 7,...(Filler=[])],...(Product=[])]
   *
   * Multiply<[2,3], [9], [0], [[1, 8, 7]]>
   * Second iteration: A: [2, 3]; B = [9]; Filler = [0]; Product = [[1, 8, 7]]
   * -> Case 1
   * NextA -> [2]; NextB = []; NextFiller = [0, 0]; NextProduct = [[2, 0, 7,...(Filler=[0])],...(Product=[[1, 8, 7]])]
   *
   * Multiply<[2, 3], [], [0, 0], [[2, 0, 7, 0], [1, 8, 7]]>
   * Third iteration: A: [2]; B = []; Filler = [0, 0]; Product = [[2, 0, 7, 0], [1, 8, 7]]
   * -> Case 3
   * -> Sum<Product> = [2, 2, 5, 4]
   */
  // prettier-ignore
  export type Multiply<A extends Type, B extends Type, Filler extends Type = [], Product extends Type[] = []
> = 
    B extends [...infer Init extends Type, infer Last extends DIGIT] 
        ? Last extends 0 
            ? Multiply<A, Init, [0, ...Filler], Product>
            : Multiply<A, Init, [0, ...Filler], [[...__MultiplyWithDigit<A, Last>, ...Filler], ...Product]>
        : Sum<Product>;

  // prettier-ignore
  export type Sum<A extends Type[], Agg extends Type=[]> = 
    A extends [infer Fst extends Type, ...infer Rest extends Type[]] 
        ? Sum<Rest, Add<Agg, Fst>>
        : Agg;

  // prettier-ignore
  export type Subtract<A extends Type, B extends Type, Borrow extends CARRY = 0, Difference extends Type = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT] 
/*case: 1*/ ? Subtract<AInit, BInit, DecimalSubtractMap[ALast][BLast][Borrow]["borrow"], [DecimalSubtractMap[ALast][BLast][Borrow]["difference"], ...Difference]> 
/*case: 2*/ : Subtract<AInit, [], DecimalSubtractMap[ALast][0][Borrow]["borrow"], [DecimalSubtractMap[ALast][0][Borrow]["difference"], ...Difference]>            
        : Borrow extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? FilterLeadingZeros<[...B, ...Difference]> // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends Type, infer Last1 extends DIGIT]                               
/*case: 4*/     ? Subtract<Init1, [], DecimalSubtractMap[Last1][0][Borrow]["borrow"], [DecimalSubtractMap[Last1][0][Borrow]["difference"], ...Difference]>        
/*case: 5*/     : Borrow extends 1 ? [1, ...Difference] : FilterLeadingZeros<Difference>;

  //prettier-ignore
  type CountPossibleSubtractions<A extends Type, B extends Type> =
    Compare<A, B> extends "LESS_THAN" ? 0 
    : Compare<A, Multiply<B, [2]>> extends "LESS_THAN" ? 1 
    : Compare<A, Multiply<B, [3]>> extends "LESS_THAN" ? 2 
    : Compare<A, Multiply<B, [4]>> extends "LESS_THAN" ? 3 
    : Compare<A, Multiply<B, [5]>> extends "LESS_THAN" ? 4 
    : Compare<A, Multiply<B, [6]>> extends "LESS_THAN" ? 5 
    : Compare<A, Multiply<B, [7]>> extends "LESS_THAN" ? 6 
    : Compare<A, Multiply<B, [8]>> extends "LESS_THAN" ? 7 
    : Compare<A, Multiply<B, [9]>> extends "LESS_THAN" ? 8 
    : 9

  //prettier-ignore
  export type Divide<
  A extends Type,
  B extends Type,
  Divided extends Type = [],
  CurrentNum extends Type = []
> = A extends [infer Head extends DIGIT, ...infer Tail extends Type]
  ? Divide<Tail, B, 
                [...Divided, CountPossibleSubtractions<CurrentNum, B>],
                [...Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : FilterLeadingZeros<[...Divided, CountPossibleSubtractions<CurrentNum, B>]>;

  //prettier-ignore
  export type Modulo<
  A extends Type,
  B extends Type,
  CurrentNum extends Type = []
> = A extends [infer Head extends DIGIT, ...infer Tail extends Type]
  ? Modulo<Tail, B, 
            [...Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : FilterLeadingZeros<Subtract<CurrentNum, Multiply<B, [CountPossibleSubtractions<CurrentNum, B>]>>>;

  type Not<A extends boolean> = A extends true ? false : true;
  export type __IsEven<A extends Type> = A extends [...infer _, infer Last]
    ? Last extends 0 | 2 | 4 | 6 | 8
      ? true
      : false
    : false;
  export type __IsOdd<A extends Type> = Not<__IsEven<A>>;

  // prettier-ignore
  type FilterLeadingZeros<T extends Type> = 
    T extends [0, ...infer Rest extends Type]
        ? FilterLeadingZeros<Rest>
        : T extends [] ? [0] : T;

  // prettier-ignore
  export type Compare<A extends Type, B extends Type, Zip extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> = 
    A extends [...infer AInit extends Type, infer ALast extends DIGIT] 
        ? B extends [...infer BInit extends Type, infer BLast extends DIGIT]
            ? Compare<AInit, BInit, [CompareMap[ALast][BLast], ...Zip]>
            : Compare<AInit, [], [CompareMap[ALast][0], ...Zip]>
        : B extends [...infer BInit extends Type, infer BLast extends DIGIT]
            ? Compare<[], BInit, [CompareMap[0][BLast], ...Zip]>
            : ResolveCompare<Zip>

  //prettier-ignore
  export type ResolveCompare<Zip extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> =
    Zip extends [infer Fst, ...infer Rest extends (GREATER_THAN | LESS_THAN | EQUAL)[]]
        ? Fst extends EQUAL
            ? ResolveCompare<Rest>
            : Fst
        : EQUAL;

  export type Power<A extends Type, B extends Type> = B extends [0]
    ? [1]
    : Multiply<A, Power<A, Subtract<B, [1]>>>;

  type __Root_Next<A extends Type, Prev extends Type> = Divide<
    Add<Prev, Divide<A, Prev>>,
    [2]
  >;

  //prettier-ignore
  type __SquareRoot__<
  A extends Type,
  Approximation extends Type,
  IterationCount extends number = 4,
  Count extends any[] = []
> = Count["length"] extends IterationCount
  ? Approximation 
  : __SquareRoot__<A, __Root_Next<A, Approximation>, IterationCount, [...Count, unknown]>;

  type CeilSplit<
    A extends Type,
    Return extends any[] = [],
    Count extends any[] = []
  > = A extends [infer H extends DIGIT, ...infer Tail extends Type]
    ? Count extends [...Tail, ...any[]]
      ? Return
      : CeilSplit<Tail, [...Return, H], [...Count, any]>
    : Return;

  export type SquareRoot<A extends Type> = __SquareRoot__<
    A,
    Divide<A, CeilSplit<A>>,
    5
  >;
  type NextGuess<
    Base extends Type,
    N extends Type,
    Previous extends Type
  > = Subtract<
    Previous,
    Divide<
      Subtract<Power<Previous, N>, Base>,
      Multiply<N, Power<Previous, Subtract<N, [1]>>>
    >
  >;

  //prettier-ignore
  export type Root<
  A extends Type,
  B extends Type,
  Approximation extends Type,
  IterationCount extends number = 10,
  Count extends any[] = []
> = Count["length"] extends IterationCount
  ? Approximation 
  : Root<A,B, NextGuess<A,B, Approximation>, IterationCount, [...Count, unknown]>;
}

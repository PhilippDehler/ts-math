import {
  CompareMap,
  DecimalAddMap,
  DecimalSubtractMap,
  EQUAL,
  GREATER_THAN,
  LESS_THAN,
  MultiplicationMap,
} from "./maps";

//IDEA: Strings could be more performant than arrays, but I'm not sure

type UDIGIT = keyof DecimalAddMap;
type CARRY = 0 | 1;
type UINT = UDIGIT[];

// prettier-ignore
type InternalUnsignedInteger<T extends string, I extends UINT = []> = 
    T extends `${infer Fst extends UDIGIT}${infer Rest}`
        ? InternalUnsignedInteger<Rest, [...I, Fst]>
        : I;
// prettier-ignore
type ReadableUnsignedInteger<T extends UINT, Num extends string = ""> = 
    T extends [infer Fst extends UDIGIT,...infer Rest extends UINT] 
        ? ReadableUnsignedInteger<Rest, `${Num}${Fst}`>
        : Num;
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
type __Adder<A extends UINT, B extends UINT, Carry extends CARRY = 0, Sum extends UINT = []> = 
    A extends [...infer AInit extends UINT, infer ALast extends UDIGIT] 
        ? B extends [...infer BInit extends UINT, infer BLast extends UDIGIT] 
/*case: 1*/ ? __Adder<AInit, BInit, DecimalAddMap[ALast][BLast][Carry]["carry"], [DecimalAddMap[ALast][BLast][Carry]["sum"], ...Sum]> 
/*case: 2*/ : __Adder<AInit, [], DecimalAddMap[ALast][0][Carry]["carry"], [DecimalAddMap[ALast][0][Carry]["sum"], ...Sum]>            
        : Carry extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? [...B, ...Sum] // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends UINT, infer Last1 extends UDIGIT]                               
/*case: 4*/     ? __Adder<Init1, [], DecimalAddMap[Last1][0][Carry]["carry"], [DecimalAddMap[Last1][0][Carry]["sum"], ...Sum]>        
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
type __MultiplyWithDigit<A extends UINT, Digit extends UDIGIT, Carry extends UDIGIT = 0, Product extends [UINT,UINT] = [[], []]> =
    A extends [...infer Init extends UINT, infer Last extends UDIGIT] 
/*case: 1*/ ? __MultiplyWithDigit<Init, Digit, MultiplicationMap[Last][Digit]["carry"], [[MultiplicationMap[Last][Digit]["product"], ...Product[0]], [Carry, ...Product[1]]]>
            : Carry extends 0 
/*case: 2*/     ? __Sum<Product> 
/*case: 3*/     : __Sum<[[Carry, ...Product[0]], Product[1]]>;

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
type __Multiply<A extends UINT, B extends UINT, Filler extends UINT = [], Product extends UINT[] = []
> = 
    B extends [...infer Init extends UINT, infer Last extends UDIGIT] 
        ? Last extends 0 
            ? __Multiply<A, Init, [0, ...Filler], Product>
            : __Multiply<A, Init, [0, ...Filler], [[...__MultiplyWithDigit<A, Last>, ...Filler], ...Product]>
        : __Sum<Product>;

// prettier-ignore
type __Sum<A extends UINT[], Agg extends UINT=[]> = 
    A extends [infer Fst extends UINT, ...infer Rest extends UINT[]] 
        ? __Sum<Rest, __Adder<Agg, Fst>>
        : Agg;
// prettier-ignore
type __Subtract<A extends UINT, B extends UINT, Borrow extends CARRY = 0, Difference extends UINT = []> = 
    A extends [...infer AInit extends UINT, infer ALast extends UDIGIT] 
        ? B extends [...infer BInit extends UINT, infer BLast extends UDIGIT] 
/*case: 1*/ ? __Subtract<AInit, BInit, DecimalSubtractMap[ALast][BLast][Borrow]["borrow"], [DecimalSubtractMap[ALast][BLast][Borrow]["difference"], ...Difference]> 
/*case: 2*/ : __Subtract<AInit, [], DecimalSubtractMap[ALast][0][Borrow]["borrow"], [DecimalSubtractMap[ALast][0][Borrow]["difference"], ...Difference]>            
        : Borrow extends 0  // If A is empty and the carry is zero then we can just return B
/*case: 3*/ ? FilterLeadingZeros<[...B, ...Difference]> // the commeted lines are just an optimization, but it's not necessary                                 
            : B extends [...infer Init1 extends UINT, infer Last1 extends UDIGIT]                               
/*case: 4*/     ? __Subtract<Init1, [], DecimalSubtractMap[Last1][0][Borrow]["borrow"], [DecimalSubtractMap[Last1][0][Borrow]["difference"], ...Difference]>        
/*case: 5*/     : Borrow extends 1 ? [1, ...Difference] : FilterLeadingZeros<Difference>;

//prettier-ignore
type __CountPossibleSubtractions<A extends UINT, B extends UINT> =
    __Compare<A, B> extends "LESS_THAN" ? 0 
    : __Compare<A, __Multiply<B, [2]>> extends "LESS_THAN" ? 1 
    : __Compare<A, __Multiply<B, [3]>> extends "LESS_THAN" ? 2 
    : __Compare<A, __Multiply<B, [4]>> extends "LESS_THAN" ? 3 
    : __Compare<A, __Multiply<B, [5]>> extends "LESS_THAN" ? 4 
    : __Compare<A, __Multiply<B, [6]>> extends "LESS_THAN" ? 5 
    : __Compare<A, __Multiply<B, [7]>> extends "LESS_THAN" ? 6 
    : __Compare<A, __Multiply<B, [8]>> extends "LESS_THAN" ? 7 
    : __Compare<A, __Multiply<B, [9]>> extends "LESS_THAN" ? 8 
    : 9

//prettier-ignore
type __Division<
  A extends UINT,
  B extends UINT,
  Divided extends UINT = [],
  CurrentNum extends UINT = []
> = A extends [infer Head extends UDIGIT, ...infer Tail extends UINT]
  ? __Division<Tail, B, 
                [...Divided, __CountPossibleSubtractions<CurrentNum, B>],
                [...__Subtract<CurrentNum, __Multiply<B, [__CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : FilterLeadingZeros<[...Divided, __CountPossibleSubtractions<CurrentNum, B>]>;

//prettier-ignore
type __Modulo<
  A extends UINT,
  B extends UINT,
  CurrentNum extends UINT = []
> = A extends [infer Head extends UDIGIT, ...infer Tail extends UINT]
  ? __Modulo<Tail, B, 
            [...__Subtract<CurrentNum, __Multiply<B, [__CountPossibleSubtractions<CurrentNum, B>]>>, Head]>
  : FilterLeadingZeros<__Subtract<CurrentNum, __Multiply<B, [__CountPossibleSubtractions<CurrentNum, B>]>>>;

type __IsEven<A extends UINT> = A extends [...infer _, infer Last]
  ? Last extends 0 | 2 | 4 | 6 | 8
    ? true
    : false
  : false;
type __IsOdd<A extends UINT> = Not<__IsEven<A>>;

// prettier-ignore
type FilterLeadingZeros<T extends UINT> = 
    T extends [0, ...infer Rest extends UINT]
        ? FilterLeadingZeros<Rest>
        : T extends [] ? [0] : T;

// prettier-ignore
type __Compare<A extends UINT, B extends UINT, Zip extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> = 
    A extends [...infer AInit extends UINT, infer ALast extends UDIGIT] 
        ? B extends [...infer BInit extends UINT, infer BLast extends UDIGIT]
            ? __Compare<AInit, BInit, [CompareMap[ALast][BLast], ...Zip]>
            : __Compare<AInit, [], [CompareMap[ALast][0], ...Zip]>
        : B extends [...infer BInit extends UINT, infer BLast extends UDIGIT]
            ? __Compare<[], BInit, [CompareMap[0][BLast], ...Zip]>
            : __ResolveCompare<Zip>

//prettier-ignore
type __ResolveCompare<Zip extends (GREATER_THAN | LESS_THAN | EQUAL)[] = []> =
    Zip extends [infer Fst, ...infer Rest extends (GREATER_THAN | LESS_THAN | EQUAL)[]]
        ? Fst extends EQUAL
            ? __ResolveCompare<Rest>
            : Fst
        : EQUAL;

type __Power<A extends UINT, B extends UINT> = B extends [0]
  ? [1]
  : __Multiply<A, __Power<A, __Subtract<B, [1]>>>;

type __Root_Next<A extends UINT, Prev extends UINT> = __Division<
  __Adder<Prev, __Division<A, Prev>>,
  [2]
>;

//prettier-ignore
type __SquareRoot__<
  A extends UINT,
  Approximation extends UINT,
  IterationCount extends number = 4,
  Count extends any[] = []
> = Count["length"] extends IterationCount
  ? Approximation 
  : __SquareRoot__<A, __Root_Next<A, Approximation>, IterationCount, [...Count, unknown]>;

type CeilSplit<
  A extends UINT,
  Return extends any[] = [],
  Count extends any[] = []
> = A extends [infer H extends UDIGIT, ...infer Tail extends UINT]
  ? Count extends [...Tail, ...any[]]
    ? Return
    : CeilSplit<Tail, [...Return, H], [...Count, any]>
  : Return;

type __SquareRoot<A extends UINT> = __SquareRoot__<
  A,
  __Division<A, CeilSplit<A>>,
  10
>;

type DIGIT = keyof DecimalAddMap;

type INT = {
  sign: boolean;
  digits: DIGIT[];
};

type InternalSignedInteger<T extends string> = T extends `-${infer Rest}`
  ? { sign: false; digits: InternalUnsignedInteger<Rest> }
  : { sign: true; digits: InternalUnsignedInteger<T> };

type ReadableSignedInteger<T extends INT> = `${T["sign"] extends true
  ? ""
  : "-"}${ReadableUnsignedInteger<T["digits"]>}`;

//prettier-ignore
type Add<A extends INT, B extends INT> = 
    A["sign"] extends true 
        ? B["sign"] extends true 
            ? { sign: true, digits: __Adder<A["digits"], B["digits"]> }
            : __Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: __Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: __Subtract<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ?  __Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: __Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: __Subtract<A["digits"], B["digits"]> }
            : { sign: false, digits: __Adder<A["digits"], B["digits"]> };

//prettier-ignore
type Subtract<A extends INT, B extends INT> =
    A["sign"] extends true 
        ? B["sign"] extends true 
            ? __Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: __Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: __Subtract<A["digits"], B["digits"]> }
            :  { sign: true, digits: __Adder<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ? { sign: false, digits: __Adder<A["digits"], B["digits"]> }
            : __Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: __Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: __Subtract<A["digits"], B["digits"]> }

//prettier-ignore
type XNOR<A extends boolean, B extends boolean> = A extends B ? true : false;
type Not<A extends boolean> = A extends true ? false : true;
//prettier-ignore
type Multiply<A extends INT, B extends INT> =
    { sign: XNOR<A["sign"], B["sign"]>, digits: __Multiply<A["digits"], B["digits"]> };

//prettier-ignore
type Divide<A extends INT, B extends INT> =
    { sign: XNOR<A["sign"], B["sign"]>, digits: __Division<A["digits"], B["digits"]> };

type Modulo<A extends INT, B extends INT> = {
  sign: A["sign"];
  digits: __Modulo<A["digits"], B["digits"]>;
};

//prettier-ignore
type IsEven<A extends INT> = A["digits"] extends [...any[], infer Last]
  ? Last extends 0 | 2 | 4 | 6 | 8 ? true : false
  : false;
//prettier-ignore
type IsOdd<A extends INT> = Not<IsEven<A>>;

type Power<A extends INT, B extends UINT> = {
  sign: __IsEven<B> extends true ? true : A["sign"];
  digits: __Power<A["digits"], B>;
};

type Abs<A extends INT> = A["digits"];

type SquareRoot<A extends INT> = {
  sign: boolean;
  digits: __SquareRoot<A["digits"]>;
};

type X = SquareRoot<InternalSignedInteger<"123456781231242141249">>;
//   ^?

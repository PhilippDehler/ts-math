import { BOOL } from "./boolean";
import { LESS_THAN } from "./maps";
import { UInt } from "./uint";

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
 * TODO:
 * Nth-Root
 *
 */
export namespace Int {
  export type Type = {
    sign: boolean;
    digits: UInt.DIGIT[];
  };

  export type Parse<T extends string> = T extends `-${infer Rest}`
    ? { sign: false; digits: UInt.Parse<Rest> }
    : { sign: true; digits: UInt.Parse<T> };

  export type Print<T extends Type> = `${T["sign"] extends true
    ? ""
    : "-"}${UInt.Print<T["digits"]>}`;

  //prettier-ignore
  export type Add<A extends Type, B extends Type> = 
    A["sign"] extends true 
        ? B["sign"] extends true 
            ? { sign: true, digits: UInt.Add<A["digits"], B["digits"]> }
            : UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: UInt.Subtract<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ?  UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true, digits: UInt.Subtract<A["digits"], B["digits"]> }
            : { sign: false, digits: UInt.Add<A["digits"], B["digits"]> };

  //prettier-ignore
  export type Subtract<A extends Type, B extends Type> =
    A["sign"] extends true 
        ? B["sign"] extends true 
            ? UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: UInt.Subtract<A["digits"], B["digits"]> }
            :  { sign: true, digits: UInt.Add<A["digits"], B["digits"]> }
        : B["sign"] extends true
            ? { sign: false, digits: UInt.Add<A["digits"], B["digits"]> }
            : UInt.Compare<A["digits"], B["digits"]> extends LESS_THAN 
                ? { sign: false, digits: UInt.Subtract<B["digits"], A["digits"]> }
                : { sign: true,  digits: UInt.Subtract<A["digits"], B["digits"]> }

  //prettier-ignore

  //prettier-ignore
  export type Multiply<A extends Type, B extends Type> =
    { sign: BOOL.XNOR<A["sign"], B["sign"]>, digits: UInt.Multiply<A["digits"], B["digits"]> };

  //prettier-ignore
  export type Divide<A extends Type, B extends Type> =
    { sign: BOOL.XNOR<A["sign"], B["sign"]>, digits: UInt.Divide<A["digits"], B["digits"]> };

  export type Modulo<A extends Type, B extends Type> = {
    sign: A["sign"];
    digits: UInt.Modulo<A["digits"], B["digits"]>;
  };

  //prettier-ignore
  export type IsEven<A extends Type> = A["digits"] extends [...any[], infer Last]
  ? Last extends 0 | 2 | 4 | 6 | 8 ? true : false
  : false;
  //prettier-ignore
  export type IsOdd<A extends Type> = BOOL.Not<IsEven<A>>;

  export type Power<A extends Type, B extends UInt.Type> = {
    sign: UInt.IsEven<B> extends true ? true : A["sign"];
    digits: UInt.Power<A["digits"], B>;
  };

  export type Abs<A extends Type> = A["digits"];

  export type SquareRoot<A extends Type> = {
    sign: true;
    digits: UInt.SquareRoot<A["digits"]>;
  };
}

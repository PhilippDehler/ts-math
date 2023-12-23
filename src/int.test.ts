// import { Int } from "./int";
// import { Test } from "./test";
// import { UInt } from "./uint";

//prettier-ignore
{
//  type T00 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"1">, Int.Parse<"3">>, Int.Parse<"4">>>;
//  type T01 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"0">, Int.Parse<"0">>, Int.Parse<"0">>>;
//  type T02 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"999">, Int.Parse<"1">>, Int.Parse<"1000">>>;
//  type T03 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"5">, Int.Parse<"3">>, Int.Parse<"2">>>;
//  type T04 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"10">, Int.Parse<"20">>, Int.Parse<"-10">>>;
//  type T05 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"100">, Int.Parse<"50">>, Int.Parse<"50">>>;
//  type T06 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"5">, Int.Parse<"3">>, Int.Parse<"15">>>;
//  type T07 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"0">, Int.Parse<"999">>, Int.Parse<"0">>>;
//  type T08 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"8">, Int.Parse<"8">>, Int.Parse<"64">>>;
//  type T09 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"15">, Int.Parse<"5">>, Int.Parse<"3">>>;
//  type T10 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"16">, Int.Parse<"5">>, Int.Parse<"3">>>;
//  type T12 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"25">, Int.Parse<"5">>, Int.Parse<"5">>>;
//  type T11 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"100">, Int.Parse<"0">>, Int.Parse<"Infinity">>>;
//  type T13 = Test.Assert<Test.Equal<Int.SquareRoot<Int.Parse<"16">>, Int.Parse<"4">>>;
//  type T14 = Test.Assert<Test.Equal<Int.SquareRoot<Int.Parse<"81">>, Int.Parse<"9">>>;
//  type T15 = Test.Assert<Test.Equal<Int.SquareRoot<Int.Parse<"25">>, Int.Parse<"5">>>;
//  type T16 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"5">, Int.Parse<"3">]>, Int.Parse<"3">>>;
//  type T17 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"10">, Int.Parse<"20">]>, Int.Parse<"10">>>;
//  type T18 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"100">, Int.Parse<"50">]>, Int.Parse<"50">>>;
//  type T19 = Test.Assert<Test.Equal<Int.Max<[Int.Parse<"5">, Int.Parse<"3">]>, Int.Parse<"5">>>;
//  type T20 = Test.Assert<Test.Equal<Int.Max<[Int.Parse<"10">, Int.Parse<"20">]>, Int.Parse<"20">>>;
//  type T21 = Test.Assert<Test.Equal<Int.Max<[Int.Parse<"100">, Int.Parse<"50">]>, Int.Parse<"100">>>;
//  type T22 = Test.Assert<Test.Equal<Int.Sum<[Int.Parse<"5">, Int.Parse<"3">]>, Int.Parse<"8">>>;
//  type T23 = Test.Assert<Test.Equal<Int.Sum<[Int.Parse<"10">, Int.Parse<"20">]>, Int.Parse<"30">>>;
//  type T24 = Test.Assert<Test.Equal<Int.Sum<[Int.Parse<"100">, Int.Parse<"50">]>, Int.Parse<"150">>>;
//  type T25 = Test.Assert<Test.Equal<Int.Product<[Int.Parse<"5">, Int.Parse<"3">]>, Int.Parse<"15">>>;
//  type T26 = Test.Assert<Test.Equal<Int.Product<[Int.Parse<"10">, Int.Parse<"20">]>, Int.Parse<"200">>>;
//  type T27 = Test.Assert<Test.Equal<Int.Product<[Int.Parse<"100">, Int.Parse<"50">]>, Int.Parse<"5000">>>;
//  type T28 = Test.Assert<Test.Equal<Int.Product<[Int.Parse<"100">, Int.Parse<"0">]>, Int.Parse<"0">>>;
//  type T29 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"2">, UInt.Parse<"3">>, Int.Parse<"8">>>;
//  type T30 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"3">, UInt.Parse<"3">>, Int.Parse<"27">>>;
//  type T31 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"4">, UInt.Parse<"3">>, Int.Parse<"64">>>;
//  type T32 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"5">, UInt.Parse<"0">>, Int.Parse<"1">>>;
//  type T33 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"5">, Int.Parse<"3">>, Int.Parse<"2">>>;
//  type T34 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"10">, Int.Parse<"20">>, Int.Parse<"10">>>;
//  type T35 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"100">, Int.Parse<"50">>, Int.Parse<"0">>>;
//  type T36 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"100">, Int.Parse<"0">>, Int.Parse<"NaN">>>;
//  type T37 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"0">, Int.Parse<"0">>, Int.Parse<"NaN">>>;
//  type T38 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"0">, Int.Parse<"100">>, Int.Parse<"0">>>;
//  type T39 = Test.Assert<Test.Equal<Int.Max<[]>, Int.Parse<"-Infinity">>>;
//  type T40 = Test.Assert<Test.Equal<Int.Min<[]>, Int.Parse<"Infinity">>>;
//  type T41 = Test.Assert<Test.Equal<Int.IsEven<Int.Parse<"0">>, true>>;
//  type T42 = Test.Assert<Test.Equal<Int.IsEven<Int.Parse<"1">>, false>>;
//  type T43 = Test.Assert<Test.Equal<Int.IsEven<Int.Parse<"2">>, true>>;
//  type T44 = Test.Assert<Test.Equal<Int.Parse<"asdad">, Int.Parse<"NaN">>>;
//  type T45 = Test.Assert<Test.Equal<Int.Parse<"NaN">, Int.Parse<"NaN">>>;
//  type T46 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"5">, Int.Parse<"asd">>, Int.Parse<"NaN">>>;
//  type T47 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"5">, Int.Parse<"Infinity">>, Int.Parse<"5">>>;
//  type T48 = Test.Assert<Test.Equal<Int.Modulo<Int.Parse<"NaN">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;
//  type T50 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"0">, Int.Parse<"-10">>, Int.Parse<"-10">>>;
//  type T51 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"0">, Int.Parse<"10">>, Int.Parse<"10">>>;
//  type T52 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"10">, Int.Parse<"0">>, Int.Parse<"10">>>;
//  type T53 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"10">, Int.Parse<"Infinity">>, Int.Parse<"Infinity">>>;
//  type T54 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"Infinity">, Int.Parse<"10">>, Int.Parse<"Infinity">>>;
//  type T55 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;
//  type T56 = Test.Assert<Test.Equal<Int.Add<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, Int.Parse<"NaN">>>;

//  type T57 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"0">, Int.Parse<"-10">>, Int.Parse<"10">>>;
//  type T58 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"0">, Int.Parse<"10">>, Int.Parse<"-10">>>;
//  type T59 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"10">, Int.Parse<"0">>, Int.Parse<"10">>>;
//  type T60 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"10">, Int.Parse<"Infinity">>, Int.Parse<"-Infinity">>>;
//  type T61 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"Infinity">, Int.Parse<"10">>, Int.Parse<"Infinity">>>;
//  type T62 = Test.Assert<Test.Equal<Int.Subtract<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;

//  type T63 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"0">, Int.Parse<"-10">>, Int.Parse<"-0">>>;
//  type T64 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"0">, Int.Parse<"10">>, Int.Parse<"0">>>;
//  type T65 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"10">, Int.Parse<"0">>, Int.Parse<"0">>>;
//  type T66 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"10">, Int.Parse<"Infinity">>, Int.Parse<"Infinity">>>;
//  type T67 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"Infinity">, Int.Parse<"10">>, Int.Parse<"Infinity">>>;
//  type T68 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, Int.Parse<"Infinity">>>;
//  type T69 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, Int.Parse<"-Infinity">>>;
//  type T70 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, Int.Parse<"-Infinity">>>;
//  type T71 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, Int.Parse<"Infinity">>>;
//  type T72 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"Infinity">, Int.Parse<"0">>, Int.Parse<"NaN">>>;
//  type T73 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"0">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;
//  type T74 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"Infinity">, Int.Parse<"NaN">>, Int.Parse<"NaN">>>;
//  type T75 = Test.Assert<Test.Equal<Int.Multiply<Int.Parse<"NaN">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;

//  type T76 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"0">, Int.Parse<"-10">>, Int.Parse<"-0">>>;
//  type T77 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"0">, Int.Parse<"10">>, Int.Parse<"0">>>;
//  type T78 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"10">, Int.Parse<"0">>, Int.Parse<"Infinity">>>;
//  type T79 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"10">, Int.Parse<"Infinity">>, Int.Parse<"0">>>;
//  type T80 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"Infinity">, Int.Parse<"10">>, Int.Parse<"Infinity">>>;

//  type T81 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, Int.Parse<"NaN">>>;
//  type T82 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, Int.Parse<"-NaN">>>;
//  type T83 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, Int.Parse<"-NaN">>>;
//  type T84 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, Int.Parse<"NaN">>>;
//  type T85 = Test.Assert<Test.Equal<Int.Divide<Int.Parse<"Infinity">, Int.Parse<"0">>, Int.Parse<"Infinity">>>;

//  type T86 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"0">, UInt.Parse<"Infinity">>, Int.Parse<"0">>>;
//  type T87 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"Infinity">, UInt.Parse<"0">>, Int.Parse<"1">>>;
//  type T88 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"Infinity">, UInt.Parse<"Infinity">>, Int.Parse<"Infinity">>>;
//  type T90 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"-Infinity">, UInt.Parse<"Infinity">>, Int.Parse<"-Infinity">>>;
//  type T91 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"-Infinity">, UInt.Parse<"Infinity">>, Int.Parse<"-Infinity">>>;
//  type T92 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"Infinity">, UInt.Parse<"NaN">>, Int.Parse<"NaN">>>;
//  type T93 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"NaN">, UInt.Parse<"Infinity">>, Int.Parse<"NaN">>>;
//  type T94 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"NaN">, UInt.Parse<"NaN">>, Int.Parse<"NaN">>>;
//  type T95 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"0">, UInt.Parse<"0">>, Int.Parse<"1">>>;
//  type T96 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"0">, UInt.Parse<"1">>, Int.Parse<"0">>>;
//  type T97 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"1">, UInt.Parse<"0">>, Int.Parse<"1">>>;
//  type T98 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"1">, UInt.Parse<"1">>, Int.Parse<"1">>>;
//  type T99 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"0">, UInt.Parse<"NaN">>, Int.Parse<"NaN">>>;
//  type T100 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"NaN">, UInt.Parse<"0">>, Int.Parse<"NaN">>>;
//  type T101 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"1">, UInt.Parse<"10">>, Int.Parse<"1">>>;
//  type T102 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"10">, UInt.Parse<"10">>, Int.Parse<"10000000000">>>;
//  type T103 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"-10">, UInt.Parse<"10">>, Int.Parse<"10000000000">>>;
//  type T104 = Test.Assert<Test.Equal<Int.Power<Int.Parse<"-10">, UInt.Parse<"9">>, Int.Parse<"-1000000000">>>;

//  type T105 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"10">, Int.Parse<"9">>, false>>;
//  type T106 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"9">, Int.Parse<"10">>, true>>;
//  type T107 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"10">, Int.Parse<"10">>, false>>;
//  type T108 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"10">, Int.Parse<"Infinity">>, true>>;
//  type T109 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"Infinity">, Int.Parse<"10">>, false>>;
//  type T110 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T111 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, false>>;
//  type T112 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, true>>;
//  type T113 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, false>>;
//  type T114 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"Infinity">, Int.Parse<"NaN">>, false>>;
//  type T115 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"NaN">, Int.Parse<"Infinity">>, false>>;
//  type T116 = Test.Assert<Test.Equal<Int.LT<Int.Parse<"NaN">, Int.Parse<"NaN">>, false>>;

//  type T117 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"10">, Int.Parse<"9">>, true>>;
//  type T118 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"9">, Int.Parse<"10">>, false>>;
//  type T119 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"10">, Int.Parse<"10">>, false>>;
//  type T120 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"10">, Int.Parse<"Infinity">>, false>>;
//  type T121 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"Infinity">, Int.Parse<"10">>, true>>;
//  type T122 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T123 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, true>>;
//  type T124 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T125 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, false>>;
//  type T126 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"Infinity">, Int.Parse<"NaN">>, false>>;
//  type T127 = Test.Assert<Test.Equal<Int.GT<Int.Parse<"NaN">, Int.Parse<"Infinity">>, false>>;

//  type T128 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"10">, Int.Parse<"9">>, false>>;
//  type T129 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"9">, Int.Parse<"10">>, false>>;
//  type T130 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"10">, Int.Parse<"10">>, true>>;
//  type T131 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"10">, Int.Parse<"Infinity">>, false>>;
//  type T132 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"Infinity">, Int.Parse<"10">>, false>>;
//  type T133 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T134 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, false>>;
//  type T135 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T136 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, false>>;
//  type T137 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"Infinity">, Int.Parse<"NaN">>, false>>;
//  type T138 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"NaN">, Int.Parse<"Infinity">>, false>>;
//  type T139 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"NaN">, Int.Parse<"NaN">>, false>>;
//  type T140 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"0">, Int.Parse<"-0">>, true>>;
//  type T141 = Test.Assert<Test.Equal<Int.EQ<Int.Parse<"0">, Int.Parse<"0">>, true>>;

//  type T142 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"10">, Int.Parse<"9">>, true>>;
//  type T143 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"9">, Int.Parse<"10">>, false>>;
//  type T144 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"10">, Int.Parse<"10">>, true>>;
//  type T145 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"10">, Int.Parse<"Infinity">>, false>>;
//  type T146 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"Infinity">, Int.Parse<"10">>, true>>;
//  type T147 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T148 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"Infinity">, Int.Parse<"-Infinity">>, true>>;
//  type T149 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"-Infinity">, Int.Parse<"Infinity">>, false>>;
//  type T150 = Test.Assert<Test.Equal<Int.GTE<Int.Parse<"-Infinity">, Int.Parse<"-Infinity">>, false>>;

//  type T151 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"5">, Int.Parse<"3">]>, Int.Parse<"3">>>;
//  type T152 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"10">, Int.Parse<"20">]>, Int.Parse<"10">>>;
//  type T153 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"100">, Int.Parse<"50">]>, Int.Parse<"50">>>;
//  type T154 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"Infinity">, Int.Parse<"50">]>, Int.Parse<"50">>>;
//  type T155 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"Infinity">, Int.Parse<"Infinity">]>, Int.Parse<"Infinity">>>;
//  type T156 = Test.Assert<Test.Equal<Int.Min<[Int.Parse<"Infinity">, Int.Parse<"-Infinity">]>, Int.Parse<"-Infinity">>>;
//  type T157 = Test.Assert<Test.Equal<Int.Min<[]>, Int.Parse<"Infinity">>>;

//  //Root
//  type T159 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"0">, UInt.Parse<"1">, Int.Parse<"2">>, Int.Parse<"0">>>;
//  type T160 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"1">, UInt.Parse<"0">, Int.Parse<"2">>, Int.Parse<"Infinity">>>;
//  type T161 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"1">, UInt.Parse<"1">, Int.Parse<"2">>, Int.Parse<"1">>>;
//  type T162 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"0">, UInt.Parse<"NaN">, Int.Parse<"2">>, Int.Parse<"NaN">>>;
//  type T163 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"1024">, UInt.Parse<"10">, Int.Parse<"2">>, Int.Parse<"2">>>;
//  // Note that this is not the correct answer, but it is the correct answer for the algorithm I have implemented.
//  // Newtons method is required to get the correct answer will almost certainly not be able to get the correct answer
//  type T164 = Test.Assert<Test.Equal<Int.Root<Int.Parse<"1024">, UInt.Parse<"2">, Int.Parse<"32">>, Int.Parse<"32">>>;

 }

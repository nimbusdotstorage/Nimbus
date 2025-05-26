"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const z = __importStar(require("zod/v4"));
var testEnum;
(function (testEnum) {
    testEnum[testEnum["A"] = 0] = "A";
    testEnum[testEnum["B"] = 1] = "B";
})(testEnum || (testEnum = {}));
(0, vitest_1.test)("flat inference", () => {
    const readonlyString = z.string().readonly();
    const readonlyNumber = z.number().readonly();
    const readonlyNaN = z.nan().readonly();
    const readonlyBigInt = z.bigint().readonly();
    const readonlyBoolean = z.boolean().readonly();
    const readonlyDate = z.date().readonly();
    const readonlyUndefined = z.undefined().readonly();
    const readonlyNull = z.null().readonly();
    const readonlyAny = z.any().readonly();
    const readonlyUnknown = z.unknown().readonly();
    const readonlyVoid = z.void().readonly();
    const readonlyStringArray = z.array(z.string()).readonly();
    const readonlyTuple = z.tuple([z.string(), z.number()]).readonly();
    const readonlyMap = z.map(z.string(), z.date()).readonly();
    const readonlySet = z.set(z.string()).readonly();
    const readonlyStringRecord = z.record(z.string(), z.string()).readonly();
    const readonlyNumberRecord = z.record(z.string(), z.number()).readonly();
    const readonlyObject = z.object({ a: z.string(), 1: z.number() }).readonly();
    const readonlyEnum = z.nativeEnum(testEnum).readonly();
    const readonlyPromise = z.promise(z.string()).readonly();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
// test("deep inference", () => {
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[0]>>().toEqualTypeOf<string>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[1]>>().toEqualTypeOf<number>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[2]>>().toEqualTypeOf<number>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[3]>>().toEqualTypeOf<bigint>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[4]>>().toEqualTypeOf<boolean>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[5]>>().toEqualTypeOf<Date>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[6]>>().toEqualTypeOf<undefined>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[7]>>().toEqualTypeOf<null>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[8]>>().toEqualTypeOf<any>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[9]>
//   >().toEqualTypeOf<Readonly<unknown>>();
//   expectTypeOf<z.infer<(typeof deepReadonlySchemas_0)[10]>>().toEqualTypeOf<void>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[11]>
//   >().toEqualTypeOf<(args_0: string, args_1: number, ...args_2: unknown[]) => unknown>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[12]>
//   >().toEqualTypeOf<readonly string[]>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[13]>
//   >().toEqualTypeOf<readonly [string, number]>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[14]>
//   >().toEqualTypeOf<ReadonlyMap<string, Date>>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[15]>
//   >().toEqualTypeOf<ReadonlySet<Promise<string>>>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[16]>
//   >().toEqualTypeOf<Readonly<Record<string, string>>>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[17]>
//   >().toEqualTypeOf<Readonly<Record<string, number>>>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[18]>
//   >().toEqualTypeOf<{ readonly a: string; readonly 1: number }>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[19]>
//   >().toEqualTypeOf<Readonly<testEnum>>();
//   expectTypeOf<
//     z.infer<(typeof deepReadonlySchemas_0)[20]>
//   >().toEqualTypeOf<Promise<string>>();
//   expectTypeOf<
//     z.infer<typeof crazyDeepReadonlySchema>
//   >().toEqualTypeOf<ReadonlyMap<
//     ReadonlySet<readonly [string, number]>,
//     {
//       readonly a: {
//         readonly [x: string]: readonly any[];
//       };
//       readonly b: {
//         readonly c: {
//           readonly d: {
//             readonly e: {
//               readonly f: {
//                 readonly g?: {};
//               };
//             };
//           };
//         };
//       };
//     }
//   >>();
// });
(0, vitest_1.test)("object freezing", async () => {
    (0, vitest_1.expect)(Object.isFrozen(z.array(z.string()).readonly().parse(["a"]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.tuple([z.string(), z.number()]).readonly().parse(["a", 1]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z
        .map(z.string(), z.date())
        .readonly()
        .parse(new Map([["a", new Date()]])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.record(z.string(), z.string()).readonly().parse({ a: "b" }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.record(z.string(), z.number()).readonly().parse({ a: 1 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.object({ a: z.string(), 1: z.number() }).readonly().parse({ a: "b", 1: 2 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z
        .set(z.promise(z.string()))
        .readonly()
        .parseAsync(new Set([Promise.resolve("a")])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.promise(z.string()).readonly().parseAsync(Promise.resolve("a")))).toBe(true);
});
(0, vitest_1.test)("async object freezing", async () => {
    (0, vitest_1.expect)(Object.isFrozen(await z.array(z.string()).readonly().parseAsync(["a"]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.tuple([z.string(), z.number()]).readonly().parseAsync(["a", 1]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z
        .map(z.string(), z.date())
        .readonly()
        .parseAsync(new Map([["a", new Date()]])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z
        .set(z.promise(z.string()))
        .readonly()
        .parseAsync(new Set([Promise.resolve("a")])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.record(z.string(), z.string()).readonly().parseAsync({ a: "b" }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.record(z.string(), z.number()).readonly().parseAsync({ a: 1 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.object({ a: z.string(), 1: z.number() }).readonly().parseAsync({ a: "b", 1: 2 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.promise(z.string()).readonly().parseAsync(Promise.resolve("a")))).toBe(true);
});
(0, vitest_1.test)("readonly inference", () => {
    const readonlyStringArray = z.string().array().readonly();
    const readonlyStringTuple = z.tuple([z.string()]).readonly();
    const deepReadonly = z.object({ a: z.string() }).readonly();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("readonly parse", () => {
    const schema = z.array(z.string()).readonly();
    const readonlyArray = ["a", "b", "c"];
    const mutableArray = ["a", "b", "c"];
    const result1 = schema.parse(readonlyArray);
    const result2 = schema.parse(mutableArray);
    (0, vitest_1.expect)(result1).toEqual(readonlyArray);
    (0, vitest_1.expect)(result2).toEqual(mutableArray);
});
(0, vitest_1.test)("readonly parse with tuples", () => {
    const schema = z.tuple([z.string(), z.number()]).readonly();
    schema.parse(["a", 1]);
});
(0, vitest_1.test)("readonly and the get method", () => {
    const readonlyString = z.string().readonly();
    const readonlyNumber1 = z.number().readonly();
    const readonlyNumber2 = z.number().readonly();
    const readonlyBigInt = z.bigint().readonly();
    const readonlyBoolean = z.boolean().readonly();
    const readonlyDate = z.date().readonly();
    const readonlyUndefined = z.undefined().readonly();
    const readonlyNull = z.null().readonly();
    const readonlyAny = z.any().readonly();
    const readonlyUnknown = z.unknown().readonly();
    const readonlyVoid = z.void().readonly();
    // const readonlyFunction = z.function(z.tuple([z.string(), z.number()]), z.unknown()).readonly();
    const readonlyStringArray = z.string().array().readonly();
    const readonlyTuple = z.tuple([z.string(), z.number()]).readonly();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // expectTypeOf<z.infer<typeof readonlyFunction>>().toEqualTypeOf<
    //   (args_0: string, args_1: number, ...args_2: unknown[]) => unknown
    // >();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(readonlyString.parse("asdf")).toEqual("asdf");
    (0, vitest_1.expect)(readonlyNumber1.parse(1234)).toEqual(1234);
    (0, vitest_1.expect)(readonlyNumber2.parse(1234)).toEqual(1234);
    const bigIntVal = BigInt(1);
    (0, vitest_1.expect)(readonlyBigInt.parse(bigIntVal)).toEqual(bigIntVal);
    (0, vitest_1.expect)(readonlyBoolean.parse(true)).toEqual(true);
    const dateVal = new Date();
    (0, vitest_1.expect)(readonlyDate.parse(new Date())).toEqual(dateVal);
    (0, vitest_1.expect)(readonlyUndefined.parse(undefined)).toEqual(undefined);
    (0, vitest_1.expect)(readonlyNull.parse(null)).toEqual(null);
    (0, vitest_1.expect)(readonlyAny.parse("whatever")).toEqual("whatever");
    (0, vitest_1.expect)(readonlyUnknown.parse("whatever")).toEqual("whatever");
    (0, vitest_1.expect)(readonlyVoid.parse(undefined)).toEqual(undefined);
    // expect(readonlyFunction.parse(() => void 0)).toEqual(() => void 0);
    (0, vitest_1.expect)(readonlyStringArray.parse(["asdf"])).toEqual(["asdf"]);
    (0, vitest_1.expect)(readonlyTuple.parse(["asdf", 1234])).toEqual(["asdf", 1234]);
});

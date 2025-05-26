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
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const z = __importStar(require("zod/v3"));
const util_js_1 = require("../helpers/util.js");
var testEnum;
(function (testEnum) {
    testEnum[testEnum["A"] = 0] = "A";
    testEnum[testEnum["B"] = 1] = "B";
})(testEnum || (testEnum = {}));
const schemas = [
    z.string().readonly(),
    z.number().readonly(),
    z.nan().readonly(),
    z.bigint().readonly(),
    z.boolean().readonly(),
    z.date().readonly(),
    z.undefined().readonly(),
    z.null().readonly(),
    z.any().readonly(),
    z.unknown().readonly(),
    z.void().readonly(),
    z.function().args(z.string(), z.number()).readonly(),
    z.array(z.string()).readonly(),
    z.tuple([z.string(), z.number()]).readonly(),
    z.map(z.string(), z.date()).readonly(),
    z.set(z.promise(z.string())).readonly(),
    z.record(z.string()).readonly(),
    z.record(z.string(), z.number()).readonly(),
    z.object({ a: z.string(), 1: z.number() }).readonly(),
    z.nativeEnum(testEnum).readonly(),
    z.promise(z.string()).readonly(),
];
(0, vitest_1.test)("flat inference", () => {
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
// test("deep inference", () => {
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[0]>, string>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[1]>, number>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[2]>, number>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[3]>, bigint>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[4]>, boolean>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[5]>, Date>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[6]>, undefined>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[7]>, null>(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[8]>, any>(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[9]>,
//     Readonly<unknown>
//   >(true);
//   util.assertEqual<z.infer<(typeof deepReadonlySchemas_0)[10]>, void>(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[11]>,
//     (args_0: string, args_1: number, ...args_2: unknown[]) => unknown
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[12]>,
//     readonly string[]
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[13]>,
//     readonly [string, number]
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[14]>,
//     ReadonlyMap<string, Date>
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[15]>,
//     ReadonlySet<Promise<string>>
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[16]>,
//     Readonly<Record<string, string>>
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[17]>,
//     Readonly<Record<string, number>>
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[18]>,
//     { readonly a: string; readonly 1: number }
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[19]>,
//     Readonly<testEnum>
//   >(true);
//   util.assertEqual<
//     z.infer<(typeof deepReadonlySchemas_0)[20]>,
//     Promise<string>
//   >(true);
//   util.assertEqual<
//     z.infer<typeof crazyDeepReadonlySchema>,
//     ReadonlyMap<
//       ReadonlySet<readonly [string, number]>,
//       {
//         readonly a: {
//           readonly [x: string]: readonly any[];
//         };
//         readonly b: {
//           readonly c: {
//             readonly d: {
//               readonly e: {
//                 readonly f: {
//                   readonly g?: {};
//                 };
//               };
//             };
//           };
//         };
//       }
//     >
//   >(true);
// });
(0, vitest_1.test)("object freezing", () => {
    (0, vitest_1.expect)(Object.isFrozen(z.array(z.string()).readonly().parse(["a"]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.tuple([z.string(), z.number()]).readonly().parse(["a", 1]))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z
        .map(z.string(), z.date())
        .readonly()
        .parse(new Map([["a", new Date()]])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z
        .set(z.promise(z.string()))
        .readonly()
        .parse(new Set([Promise.resolve("a")])))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.record(z.string()).readonly().parse({ a: "b" }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.record(z.string(), z.number()).readonly().parse({ a: 1 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.object({ a: z.string(), 1: z.number() }).readonly().parse({ a: "b", 1: 2 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(z.promise(z.string()).readonly().parse(Promise.resolve("a")))).toBe(true);
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
    (0, vitest_1.expect)(Object.isFrozen(await z.record(z.string()).readonly().parseAsync({ a: "b" }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.record(z.string(), z.number()).readonly().parseAsync({ a: 1 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.object({ a: z.string(), 1: z.number() }).readonly().parseAsync({ a: "b", 1: 2 }))).toBe(true);
    (0, vitest_1.expect)(Object.isFrozen(await z.promise(z.string()).readonly().parseAsync(Promise.resolve("a")))).toBe(true);
});

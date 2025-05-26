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
const ZodError_js_1 = require("../ZodError.js");
const util_js_1 = require("../helpers/util.js");
const testTuple = z.tuple([z.string(), z.object({ name: z.literal("Rudy") }), z.array(z.literal("blue"))]);
const testData = ["asdf", { name: "Rudy" }, ["blue"]];
const badData = [123, { name: "Rudy2" }, ["blue", "red"]];
(0, vitest_1.test)("tuple inference", () => {
    const args1 = z.tuple([z.string()]);
    const returns1 = z.number();
    const func1 = z.function(args1, returns1);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("successful validation", () => {
    const val = testTuple.parse(testData);
    (0, vitest_1.expect)(val).toEqual(["asdf", { name: "Rudy" }, ["blue"]]);
});
(0, vitest_1.test)("successful async validation", async () => {
    const val = await testTuple.parseAsync(testData);
    return (0, vitest_1.expect)(val).toEqual(testData);
});
(0, vitest_1.test)("failed validation", () => {
    const checker = () => {
        testTuple.parse([123, { name: "Rudy2" }, ["blue", "red"]]);
    };
    try {
        checker();
    }
    catch (err) {
        if (err instanceof ZodError_js_1.ZodError) {
            (0, vitest_1.expect)(err.issues.length).toEqual(3);
        }
    }
});
(0, vitest_1.test)("failed async validation", async () => {
    const res = await testTuple.safeParse(badData);
    (0, vitest_1.expect)(res.success).toEqual(false);
    if (!res.success) {
        (0, vitest_1.expect)(res.error.issues.length).toEqual(3);
    }
    // try {
    //   checker();
    // } catch (err) {
    //   if (err instanceof ZodError) {
    //     expect(err.issues.length).toEqual(3);
    //   }
    // }
});
(0, vitest_1.test)("tuple with transformers", () => {
    const stringToNumber = z.string().transform((val) => val.length);
    const val = z.tuple([stringToNumber]);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(val.parse(["1234"])).toEqual([4]);
});
(0, vitest_1.test)("tuple with rest schema", () => {
    const myTuple = z.tuple([z.string(), z.number()]).rest(z.boolean());
    (0, vitest_1.expect)(myTuple.parse(["asdf", 1234, true, false, true])).toEqual(["asdf", 1234, true, false, true]);
    (0, vitest_1.expect)(myTuple.parse(["asdf", 1234])).toEqual(["asdf", 1234]);
    (0, vitest_1.expect)(() => myTuple.parse(["asdf", 1234, "asdf"])).toThrow();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("parse should fail given sparse array as tuple", () => {
    (0, vitest_1.expect)(() => testTuple.parse(new Array(3))).toThrow();
});
// test('tuple with optional elements', () => {
//   const result = z
//     .tuple([z.string(), z.number().optional()])
//     .safeParse(['asdf']);
//   expect(result).toEqual(['asdf']);
// });

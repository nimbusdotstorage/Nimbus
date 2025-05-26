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
const promSchema = z.promise(z.object({
    name: z.string(),
    age: z.number(),
}));
(0, vitest_1.test)("promise inference", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("promise parsing success", async () => {
    const pr = promSchema.parse(Promise.resolve({ name: "Bobby", age: 10 }));
    (0, vitest_1.expect)(pr).toBeInstanceOf(Promise);
    const result = await pr;
    (0, vitest_1.expect)(typeof result).toBe("object");
    (0, vitest_1.expect)(typeof result.age).toBe("number");
    (0, vitest_1.expect)(typeof result.name).toBe("string");
});
(0, vitest_1.test)("promise parsing success 2", () => {
    const fakePromise = {
        then() {
            return this;
        },
        catch() {
            return this;
        },
    };
    promSchema.parse(fakePromise);
});
(0, vitest_1.test)("promise parsing fail", async () => {
    const bad = promSchema.parse(Promise.resolve({ name: "Bobby", age: "10" }));
    // return await expect(bad).resolves.toBe({ name: 'Bobby', age: '10' });
    return await (0, vitest_1.expect)(bad).rejects.toBeInstanceOf(z.ZodError);
    // done();
});
(0, vitest_1.test)("promise parsing fail 2", async () => {
    const failPromise = promSchema.parse(Promise.resolve({ name: "Bobby", age: "10" }));
    await (0, vitest_1.expect)(failPromise).rejects.toBeInstanceOf(z.ZodError);
    // done();/z
});
(0, vitest_1.test)("promise parsing fail", () => {
    const bad = () => promSchema.parse({ then: () => { }, catch: {} });
    (0, vitest_1.expect)(bad).toThrow();
});
// test('sync promise parsing', () => {
//   expect(() => z.promise(z.string()).parse(Promise.resolve('asfd'))).toThrow();
// });
const asyncFunction = z.function(z.tuple([]), promSchema);
(0, vitest_1.test)("async function pass", async () => {
    const validatedFunction = asyncFunction.implement(async () => {
        return { name: "jimmy", age: 14 };
    });
    await (0, vitest_1.expect)(validatedFunction()).resolves.toEqual({
        name: "jimmy",
        age: 14,
    });
});
(0, vitest_1.test)("async function fail", async () => {
    const validatedFunction = asyncFunction.implement(() => {
        return Promise.resolve("asdf");
    });
    await (0, vitest_1.expect)(validatedFunction()).rejects.toBeInstanceOf(z.ZodError);
});
(0, vitest_1.test)("async promise parsing", () => {
    const res = z.promise(z.number()).parseAsync(Promise.resolve(12));
    (0, vitest_1.expect)(res).toBeInstanceOf(Promise);
});
(0, vitest_1.test)("resolves", () => {
    const foo = z.literal("foo");
    const res = z.promise(foo);
    (0, vitest_1.expect)(res.unwrap()).toEqual(foo);
});

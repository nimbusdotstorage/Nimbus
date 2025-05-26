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
const promSchema = z.promise(z.object({
    name: z.string(),
    age: z.number(),
}));
(0, vitest_1.test)("promise inference", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("promise parsing success", async () => {
    // expect(() => promSchema.parse(Promise.resolve({ name: "Bobby", age: 10 }))).toThrow();
    const pr = promSchema.parseAsync(Promise.resolve({ name: "Bobby", age: 10 }));
    (0, vitest_1.expect)(pr).toBeInstanceOf(Promise);
    const result = await pr;
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "age": 10,
      "name": "Bobby",
    }
  `);
});
(0, vitest_1.test)("promise parsing fail", async () => {
    const bad = await promSchema.safeParseAsync(Promise.resolve({ name: "Bobby", age: "10" }));
    (0, vitest_1.expect)(bad.success).toBe(false);
    (0, vitest_1.expect)(bad.error).toBeInstanceOf(z.ZodError);
});
(0, vitest_1.test)("promise parsing fail 2", async () => {
    const result = await promSchema.safeParseAsync(Promise.resolve({ name: "Bobby", age: "10" }));
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toBeInstanceOf(z.ZodError);
});
(0, vitest_1.test)("promise parsing fail", () => {
    const bad = () => promSchema.parse({ then: () => { }, catch: {} });
    (0, vitest_1.expect)(bad).toThrow();
});
(0, vitest_1.test)("sync promise parsing", () => {
    (0, vitest_1.expect)(() => z.promise(z.string()).parse(Promise.resolve("asfd"))).toThrow();
});
const asyncFunction = z.function({
    input: z.tuple([]),
    output: promSchema,
});
(0, vitest_1.test)("async function pass", async () => {
    const validatedFunction = asyncFunction.implementAsync(async () => {
        return { name: "jimmy", age: 14 };
    });
    await (0, vitest_1.expect)(validatedFunction()).resolves.toEqual({
        name: "jimmy",
        age: 14,
    });
});
(0, vitest_1.test)("async function fail", async () => {
    const validatedFunction = asyncFunction.implementAsync(() => {
        return Promise.resolve("asdf");
    });
    await (0, vitest_1.expect)(validatedFunction()).rejects.toBeInstanceOf(z.core.$ZodError);
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

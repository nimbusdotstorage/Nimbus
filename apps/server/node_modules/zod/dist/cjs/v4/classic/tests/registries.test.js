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
(0, vitest_1.test)("globalRegistry", () => {
    const reg = z.registry();
    const a = z.string();
    reg.add(a);
    (0, vitest_1.expect)(reg.has(a)).toEqual(true);
    reg.remove(a);
    (0, vitest_1.expect)(reg.has(a)).toEqual(false);
    a.register(z.globalRegistry, { field: "sup" });
    (0, vitest_1.expect)(z.globalRegistry.has(a)).toEqual(true);
    (0, vitest_1.expect)(z.globalRegistry.get(a)).toEqual({ field: "sup" });
    z.globalRegistry.remove(a);
    (0, vitest_1.expect)(z.globalRegistry.has(a)).toEqual(false);
});
(0, vitest_1.test)("z.registry", () => {
    const fieldRegistry = z.registry();
    const a = z.string();
    fieldRegistry.add(a, { name: "hello", description: "world" });
    const a_meta = fieldRegistry.get(a);
    (0, vitest_1.expect)(a_meta).toEqual({ name: "hello", description: "world" });
    fieldRegistry.remove(a);
    (0, vitest_1.expect)(fieldRegistry.has(a)).toEqual(false);
    (0, vitest_1.expect)(fieldRegistry.get(a)).toEqual(undefined);
});
(0, vitest_1.test)("z.registry no metadata", () => {
    const fieldRegistry = z.registry();
    const a = z.string();
    fieldRegistry.add(a);
    fieldRegistry.add(z.number());
    (0, vitest_1.expect)(fieldRegistry.get(a)).toEqual(undefined);
    (0, vitest_1.expect)(fieldRegistry.has(a)).toEqual(true);
});
(0, vitest_1.test)("z.registry with schema constraints", () => {
    const fieldRegistry = z.registry();
    const a = z.string();
    fieldRegistry.add(a, { name: "hello", description: "world" });
    // @ts-expect-error
    fieldRegistry.add(z.number(), { name: "test" });
    // @ts-expect-error
    z.number().register(fieldRegistry, { name: "test", description: "test" });
});
// test("z.namedRegistry", () => {
//   const namedReg = z
//     .namedRegistry<{ name: string; description: string }>()
//     .add(z.string(), { name: "hello", description: "world" })
//     .add(z.number(), { name: "number", description: "number" });
//   expect(namedReg.get("hello")).toEqual({
//     name: "hello",
//     description: "world",
//   });
//   expect(namedReg.has("hello")).toEqual(true);
//   expect(namedReg.get("number")).toEqual({
//     name: "number",
//     description: "number",
//   });
//   // @ts-expect-error
//   namedReg.get("world");
//   // @ts-expect-error
//   expect(namedReg.get("world")).toEqual(undefined);
//   const hello = namedReg.get("hello");
//   expect(hello).toEqual({ name: "hello", description: "world" });
//   expectTypeOf<typeof hello>().toEqualTypeOf<{
//     name: "hello";
//     description: "world";
//   }>();
//   expectTypeOf<typeof namedReg.items>().toEqualTypeOf<{
//     hello: { name: "hello"; description: "world" };
//     number: { name: "number"; description: "number" };
//   }>();
// });
(0, vitest_1.test)("output type in registry meta", () => {
    const reg = z.registry();
    const a = z.string();
    reg.add(a, { out: "asdf" });
    // @ts-expect-error
    reg.add(a, 1234);
    (0, vitest_1.expectTypeOf)(reg.get(a)).toEqualTypeOf();
});
(0, vitest_1.test)("output type in registry meta - objects and arrays", () => {
    const reg = z.registry();
    const a = z.string();
    reg.add(a, { name: "hello", examples: ["world"] });
    // @ts-expect-error
    reg.add(a, { name: "hello", examples: "world" });
    (0, vitest_1.expectTypeOf)(reg.get(a)).toEqualTypeOf();
});
(0, vitest_1.test)("input type in registry meta", () => {
    const reg = z.registry();
    const a = z.pipe(z.number(), z.transform(String));
    reg.add(a, { in: 1234 });
    // @ts-expect-error
    reg.add(a, "1234");
    (0, vitest_1.expectTypeOf)(reg.get(a)).toEqualTypeOf();
});
(0, vitest_1.test)("input type in registry meta - objects and arrays", () => {
    const reg = z.registry();
    const a = z.pipe(z.number(), z.transform(String));
    reg.add(a, { name: "hello", examples: [1234] });
    // @ts-expect-error
    reg.add(a, { name: "hello", examples: "world" });
    (0, vitest_1.expectTypeOf)(reg.get(a)).toEqualTypeOf();
});
(0, vitest_1.test)(".meta method", () => {
    const a1 = z.string();
    const a2 = a1.meta({ name: "hello" });
    (0, vitest_1.expect)(a1.meta()).toEqual(undefined);
    (0, vitest_1.expect)(a2.meta()).toEqual({ name: "hello" });
    (0, vitest_1.expect)(a1 === a2).toEqual(false);
});
(0, vitest_1.test)(".meta metadata does not bubble up", () => {
    const a1 = z.string().meta({ name: "hello" });
    const a2 = a1.optional();
    (0, vitest_1.expect)(a1.meta()).toEqual({ name: "hello" });
    (0, vitest_1.expect)(a2.meta()).toEqual(undefined);
});
(0, vitest_1.test)(".describe", () => {
    const a1 = z.string();
    const a2 = a1.describe("Hello");
    (0, vitest_1.expect)(a1.description).toEqual(undefined);
    (0, vitest_1.expect)(a2.description).toEqual("Hello");
});
(0, vitest_1.test)("inherit across clone", () => {
    const A = z.string().meta({ a: true });
    (0, vitest_1.expect)(A.meta()).toEqual({ a: true });
    const B = A.meta({ b: true });
    (0, vitest_1.expect)(B.meta()).toEqual({ a: true, b: true });
    const C = B.describe("hello");
    (0, vitest_1.expect)(C.meta()).toEqual({ a: true, b: true, description: "hello" });
});

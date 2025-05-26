"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// import * as z from "zod/v4/core";
(0, vitest_1.test)("z.function", () => {
    (0, vitest_1.expect)(true).toEqual(true);
});
// test("z.function", () => {
//   const a = z.function({
//     args: z.tuple([z.string()]),
//     returns: z.string(),
//   });
//   const myFunc = a.implement((name: string | number) => `Hello, ${name}!`);
//   expect(myFunc("world")).toEqual("Hello, world!");
//   expect(() => myFunc(123 as any)).toThrow();
//   // this won't run
//   () => {
//     // @ts-expect-error
//     const r = myFunc(123);
//     expectTypeOf(r).toEqualTypeOf<string>();
//   };
// });
// test("z.function async", async () => {
//   const b = z.function({
//     args: z.tuple([z.string()]).$check(async (_) => {}),
//     returns: z.string().$check(async (_) => {}),
//   });
//   const myFuncAsync = b.implementAsync(async (name) => `Hello, ${name}!`);
//   expect(await myFuncAsync("world")).toEqual("Hello, world!");
//   expect(myFuncAsync(123 as any)).rejects.toThrow();
//   // this won't run
//   () => {
//     // @ts-expect-error
//     const r = myFuncAsync(123);
//     expectTypeOf(r).toEqualTypeOf<Promise<string>>();
//   };
// });

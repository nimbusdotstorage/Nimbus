"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const v4_1 = require("zod/v4");
(0, vitest_1.test)("basic defaults", () => {
    (0, vitest_1.expect)(v4_1.z.string().default("default").parse(undefined)).toBe("default");
});
(0, vitest_1.test)("default with optional", () => {
    const schema = v4_1.z.string().optional().default("default");
    (0, vitest_1.expect)(schema.parse(undefined)).toBe("default");
    (0, vitest_1.expect)(schema.unwrap().parse(undefined)).toBe(undefined);
});
(0, vitest_1.test)("default with transform", () => {
    const stringWithDefault = v4_1.z
        .string()
        .transform((val) => val.toUpperCase())
        .default("default");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("default");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v4_1.z.ZodDefault);
    (0, vitest_1.expect)(stringWithDefault.unwrap()).toBeInstanceOf(v4_1.z.ZodPipe);
    (0, vitest_1.expect)(stringWithDefault.unwrap().in).toBeInstanceOf(v4_1.z.ZodString);
    (0, vitest_1.expect)(stringWithDefault.unwrap().out).toBeInstanceOf(v4_1.z.ZodTransform);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("default on existing optional", () => {
    const stringWithDefault = v4_1.z.string().optional().default("asdf");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("asdf");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v4_1.z.ZodDefault);
    (0, vitest_1.expect)(stringWithDefault.unwrap()).toBeInstanceOf(v4_1.z.ZodOptional);
    (0, vitest_1.expect)(stringWithDefault.unwrap().unwrap()).toBeInstanceOf(v4_1.z.ZodString);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("optional on default", () => {
    const stringWithDefault = v4_1.z.string().default("asdf").optional();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe(undefined);
});
// test("complex chain example", () => {
//   const complex = z
//     .string()
//     .default("asdf")
//     .transform((val) => val.toUpperCase())
//     .default("qwer")
//     .unwrap()
//     .optional()
//     .default("asdfasdf");
//   expect(complex.parse(undefined)).toBe("asdfasdf");
// });
(0, vitest_1.test)("removeDefault", () => {
    const stringWithRemovedDefault = v4_1.z.string().default("asdf").removeDefault();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("apply default at output", () => {
    const schema = v4_1.z
        .string()
        .transform((_) => (Math.random() > 0 ? undefined : _))
        .default("asdf");
    (0, vitest_1.expect)(schema.parse("")).toEqual("asdf");
});
(0, vitest_1.test)("nested", () => {
    const inner = v4_1.z.string().default("asdf");
    const outer = v4_1.z.object({ inner }).default({
        inner: "qwer",
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(outer.parse(undefined)).toEqual({ inner: "qwer" });
    (0, vitest_1.expect)(outer.parse({})).toEqual({ inner: "asdf" });
    (0, vitest_1.expect)(outer.parse({ inner: undefined })).toEqual({ inner: "asdf" });
});
(0, vitest_1.test)("chained defaults", () => {
    const stringWithDefault = v4_1.z.string().default("inner").default("outer");
    const result = stringWithDefault.parse(undefined);
    (0, vitest_1.expect)(result).toEqual("outer");
});
(0, vitest_1.test)("object optionality", () => {
    const schema = v4_1.z.object({
        hi: v4_1.z.string().default("hi"),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(schema.parse({})).toEqual({
        hi: "hi",
    });
});

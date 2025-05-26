"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const v3_1 = require("zod/v3");
const util_js_1 = require("../helpers/util.js");
(0, vitest_1.test)("basic defaults", () => {
    (0, vitest_1.expect)(v3_1.z.string().default("default").parse(undefined)).toBe("default");
});
(0, vitest_1.test)("default with transform", () => {
    const stringWithDefault = v3_1.z
        .string()
        .transform((val) => val.toUpperCase())
        .default("default");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("DEFAULT");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v3_1.z.ZodDefault);
    (0, vitest_1.expect)(stringWithDefault._def.innerType).toBeInstanceOf(v3_1.z.ZodEffects);
    (0, vitest_1.expect)(stringWithDefault._def.innerType._def.schema).toBeInstanceOf(v3_1.z.ZodSchema);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("default on existing optional", () => {
    const stringWithDefault = v3_1.z.string().optional().default("asdf");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("asdf");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v3_1.z.ZodDefault);
    (0, vitest_1.expect)(stringWithDefault._def.innerType).toBeInstanceOf(v3_1.z.ZodOptional);
    (0, vitest_1.expect)(stringWithDefault._def.innerType._def.innerType).toBeInstanceOf(v3_1.z.ZodString);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("optional on default", () => {
    const stringWithDefault = v3_1.z.string().default("asdf").optional();
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("complex chain example", () => {
    const complex = v3_1.z
        .string()
        .default("asdf")
        .transform((val) => val.toUpperCase())
        .default("qwer")
        .removeDefault()
        .optional()
        .default("asdfasdf");
    (0, vitest_1.expect)(complex.parse(undefined)).toBe("ASDFASDF");
});
(0, vitest_1.test)("removeDefault", () => {
    const stringWithRemovedDefault = v3_1.z.string().default("asdf").removeDefault();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("nested", () => {
    const inner = v3_1.z.string().default("asdf");
    const outer = v3_1.z.object({ inner }).default({
        inner: undefined,
    });
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(outer.parse(undefined)).toEqual({ inner: "asdf" });
    (0, vitest_1.expect)(outer.parse({})).toEqual({ inner: "asdf" });
    (0, vitest_1.expect)(outer.parse({ inner: undefined })).toEqual({ inner: "asdf" });
});
(0, vitest_1.test)("chained defaults", () => {
    const stringWithDefault = v3_1.z.string().default("inner").default("outer");
    const result = stringWithDefault.parse(undefined);
    (0, vitest_1.expect)(result).toEqual("outer");
});
(0, vitest_1.test)("factory", () => {
    (0, vitest_1.expect)(v3_1.z.ZodDefault.create(v3_1.z.string(), { default: "asdf" }).parse(undefined)).toEqual("asdf");
});
(0, vitest_1.test)("native enum", () => {
    let Fruits;
    (function (Fruits) {
        Fruits["apple"] = "apple";
        Fruits["orange"] = "orange";
    })(Fruits || (Fruits = {}));
    const schema = v3_1.z.object({
        fruit: v3_1.z.nativeEnum(Fruits).default(Fruits.apple),
    });
    (0, vitest_1.expect)(schema.parse({})).toEqual({ fruit: Fruits.apple });
});
(0, vitest_1.test)("enum", () => {
    const schema = v3_1.z.object({
        fruit: v3_1.z.enum(["apple", "orange"]).default("apple"),
    });
    (0, vitest_1.expect)(schema.parse({})).toEqual({ fruit: "apple" });
});

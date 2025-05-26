"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const v3_1 = require("zod/v3");
const util_js_1 = require("../helpers/util.js");
(0, vitest_1.test)("basic catch", () => {
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(undefined)).toBe("default");
});
(0, vitest_1.test)("catch fn does not run when parsing succeeds", () => {
    let isCalled = false;
    const cb = () => {
        isCalled = true;
        return "asdf";
    };
    (0, vitest_1.expect)(v3_1.z.string().catch(cb).parse("test")).toBe("test");
    (0, vitest_1.expect)(isCalled).toEqual(false);
});
(0, vitest_1.test)("basic catch async", async () => {
    const result = await v3_1.z.string().catch("default").parseAsync(1243);
    (0, vitest_1.expect)(result).toBe("default");
});
(0, vitest_1.test)("catch replace wrong types", () => {
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(true)).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(true)).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(15)).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse([])).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(new Map())).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse(new Set())).toBe("default");
    (0, vitest_1.expect)(v3_1.z.string().catch("default").parse({})).toBe("default");
});
(0, vitest_1.test)("catch with transform", () => {
    const stringWithDefault = v3_1.z
        .string()
        .transform((val) => val.toUpperCase())
        .catch("default");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("default");
    (0, vitest_1.expect)(stringWithDefault.parse(15)).toBe("default");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v3_1.z.ZodCatch);
    (0, vitest_1.expect)(stringWithDefault._def.innerType).toBeInstanceOf(v3_1.z.ZodEffects);
    (0, vitest_1.expect)(stringWithDefault._def.innerType._def.schema).toBeInstanceOf(v3_1.z.ZodSchema);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("catch on existing optional", () => {
    const stringWithDefault = v3_1.z.string().optional().catch("asdf");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe(undefined);
    (0, vitest_1.expect)(stringWithDefault.parse(15)).toBe("asdf");
    (0, vitest_1.expect)(stringWithDefault).toBeInstanceOf(v3_1.z.ZodCatch);
    (0, vitest_1.expect)(stringWithDefault._def.innerType).toBeInstanceOf(v3_1.z.ZodOptional);
    (0, vitest_1.expect)(stringWithDefault._def.innerType._def.innerType).toBeInstanceOf(v3_1.z.ZodString);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("optional on catch", () => {
    const stringWithDefault = v3_1.z.string().catch("asdf").optional();
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("complex chain example", () => {
    const complex = v3_1.z
        .string()
        .catch("asdf")
        .transform((val) => val + "!")
        .transform((val) => val.toUpperCase())
        .catch("qwer")
        .removeCatch()
        .optional()
        .catch("asdfasdf");
    (0, vitest_1.expect)(complex.parse("qwer")).toBe("QWER!");
    (0, vitest_1.expect)(complex.parse(15)).toBe("ASDF!");
    (0, vitest_1.expect)(complex.parse(true)).toBe("ASDF!");
});
(0, vitest_1.test)("removeCatch", () => {
    const stringWithRemovedDefault = v3_1.z.string().catch("asdf").removeCatch();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("nested", () => {
    const inner = v3_1.z.string().catch("asdf");
    const outer = v3_1.z.object({ inner }).catch({
        inner: "asdf",
    });
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(outer.parse(undefined)).toEqual({ inner: "asdf" });
    (0, vitest_1.expect)(outer.parse({})).toEqual({ inner: "asdf" });
    (0, vitest_1.expect)(outer.parse({ inner: undefined })).toEqual({ inner: "asdf" });
});
(0, vitest_1.test)("chained catch", () => {
    const stringWithDefault = v3_1.z.string().catch("inner").catch("outer");
    const result = stringWithDefault.parse(undefined);
    (0, vitest_1.expect)(result).toEqual("inner");
    const resultDiff = stringWithDefault.parse(5);
    (0, vitest_1.expect)(resultDiff).toEqual("inner");
});
(0, vitest_1.test)("factory", () => {
    v3_1.z.ZodCatch.create(v3_1.z.string(), {
        catch: "asdf",
    }).parse(undefined);
});
(0, vitest_1.test)("native enum", () => {
    let Fruits;
    (function (Fruits) {
        Fruits["apple"] = "apple";
        Fruits["orange"] = "orange";
    })(Fruits || (Fruits = {}));
    const schema = v3_1.z.object({
        fruit: v3_1.z.nativeEnum(Fruits).catch(Fruits.apple),
    });
    (0, vitest_1.expect)(schema.parse({})).toEqual({ fruit: Fruits.apple });
    (0, vitest_1.expect)(schema.parse({ fruit: 15 })).toEqual({ fruit: Fruits.apple });
});
(0, vitest_1.test)("enum", () => {
    const schema = v3_1.z.object({
        fruit: v3_1.z.enum(["apple", "orange"]).catch("apple"),
    });
    (0, vitest_1.expect)(schema.parse({})).toEqual({ fruit: "apple" });
    (0, vitest_1.expect)(schema.parse({ fruit: true })).toEqual({ fruit: "apple" });
    (0, vitest_1.expect)(schema.parse({ fruit: 15 })).toEqual({ fruit: "apple" });
});
(0, vitest_1.test)("reported issues with nested usage", () => {
    const schema = v3_1.z.object({
        string: v3_1.z.string(),
        obj: v3_1.z.object({
            sub: v3_1.z.object({
                lit: v3_1.z.literal("a"),
                subCatch: v3_1.z.number().catch(23),
            }),
            midCatch: v3_1.z.number().catch(42),
        }),
        number: v3_1.z.number().catch(0),
        bool: v3_1.z.boolean(),
    });
    try {
        schema.parse({
            string: {},
            obj: {
                sub: {
                    lit: "b",
                    subCatch: "24",
                },
                midCatch: 444,
            },
            number: "",
            bool: "yes",
        });
    }
    catch (error) {
        const issues = error.issues;
        (0, vitest_1.expect)(issues.length).toEqual(3);
        (0, vitest_1.expect)(issues[0].message).toMatch("string");
        (0, vitest_1.expect)(issues[1].message).toMatch("literal");
        (0, vitest_1.expect)(issues[2].message).toMatch("boolean");
    }
});
(0, vitest_1.test)("catch error", () => {
    let catchError = undefined;
    const schema = v3_1.z.object({
        age: v3_1.z.number(),
        name: v3_1.z.string().catch((ctx) => {
            catchError = ctx.error;
            return "John Doe";
        }),
    });
    const result = schema.safeParse({
        age: null,
        name: null,
    });
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(!result.success && result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(!result.success && result.error.issues[0].message).toMatch("number");
    (0, vitest_1.expect)(catchError).toBeInstanceOf(v3_1.z.ZodError);
    (0, vitest_1.expect)(catchError !== undefined && catchError.issues.length).toEqual(1);
    (0, vitest_1.expect)(catchError !== undefined && catchError.issues[0].message).toMatch("string");
});
(0, vitest_1.test)("ctx.input", () => {
    const schema = v3_1.z.string().catch((ctx) => {
        return String(ctx.input);
    });
    (0, vitest_1.expect)(schema.parse(123)).toEqual("123");
});

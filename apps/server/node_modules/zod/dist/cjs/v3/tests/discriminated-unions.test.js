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
(0, vitest_1.test)("valid", () => {
    (0, vitest_1.expect)(z
        .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ])
        .parse({ type: "a", a: "abc" })).toEqual({ type: "a", a: "abc" });
});
(0, vitest_1.test)("valid - discriminator value of various primitive types", () => {
    const schema = z.discriminatedUnion("type", [
        z.object({ type: z.literal("1"), val: z.literal(1) }),
        z.object({ type: z.literal(1), val: z.literal(2) }),
        z.object({ type: z.literal(BigInt(1)), val: z.literal(3) }),
        z.object({ type: z.literal("true"), val: z.literal(4) }),
        z.object({ type: z.literal(true), val: z.literal(5) }),
        z.object({ type: z.literal("null"), val: z.literal(6) }),
        z.object({ type: z.literal(null), val: z.literal(7) }),
        z.object({ type: z.literal("undefined"), val: z.literal(8) }),
        z.object({ type: z.literal(undefined), val: z.literal(9) }),
        z.object({ type: z.literal("transform"), val: z.literal(10) }),
        z.object({ type: z.literal("refine"), val: z.literal(11) }),
        z.object({ type: z.literal("superRefine"), val: z.literal(12) }),
    ]);
    (0, vitest_1.expect)(schema.parse({ type: "1", val: 1 })).toEqual({ type: "1", val: 1 });
    (0, vitest_1.expect)(schema.parse({ type: 1, val: 2 })).toEqual({ type: 1, val: 2 });
    (0, vitest_1.expect)(schema.parse({ type: BigInt(1), val: 3 })).toEqual({
        type: BigInt(1),
        val: 3,
    });
    (0, vitest_1.expect)(schema.parse({ type: "true", val: 4 })).toEqual({
        type: "true",
        val: 4,
    });
    (0, vitest_1.expect)(schema.parse({ type: true, val: 5 })).toEqual({
        type: true,
        val: 5,
    });
    (0, vitest_1.expect)(schema.parse({ type: "null", val: 6 })).toEqual({
        type: "null",
        val: 6,
    });
    (0, vitest_1.expect)(schema.parse({ type: null, val: 7 })).toEqual({
        type: null,
        val: 7,
    });
    (0, vitest_1.expect)(schema.parse({ type: "undefined", val: 8 })).toEqual({
        type: "undefined",
        val: 8,
    });
    (0, vitest_1.expect)(schema.parse({ type: undefined, val: 9 })).toEqual({
        type: undefined,
        val: 9,
    });
});
(0, vitest_1.test)("invalid - null", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ type: z.literal("b"), b: z.string() }),
        ]).parse(null);
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(JSON.parse(e.message)).toEqual([
            {
                code: z.ZodIssueCode.invalid_type,
                expected: z.ZodParsedType.object,
                message: "Expected object, received null",
                received: z.ZodParsedType.null,
                path: [],
            },
        ]);
    }
});
(0, vitest_1.test)("invalid discriminator value", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ type: z.literal("b"), b: z.string() }),
        ]).parse({ type: "x", a: "abc" });
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(JSON.parse(e.message)).toEqual([
            {
                code: z.ZodIssueCode.invalid_union_discriminator,
                options: ["a", "b"],
                message: "Invalid discriminator value. Expected 'a' | 'b'",
                path: ["type"],
            },
        ]);
    }
});
(0, vitest_1.test)("valid discriminator value, invalid data", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ type: z.literal("b"), b: z.string() }),
        ]).parse({ type: "a", b: "abc" });
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(JSON.parse(e.message)).toEqual([
            {
                code: z.ZodIssueCode.invalid_type,
                expected: z.ZodParsedType.string,
                message: "Required",
                path: ["a"],
                received: z.ZodParsedType.undefined,
            },
        ]);
    }
});
(0, vitest_1.test)("wrong schema - missing discriminator", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ b: z.string() }),
        ]);
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(e.message.includes("could not be extracted")).toBe(true);
    }
});
(0, vitest_1.test)("wrong schema - duplicate discriminator values", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ type: z.literal("a"), b: z.string() }),
        ]);
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(e.message.includes("has duplicate value")).toEqual(true);
    }
});
(0, vitest_1.test)("async - valid", async () => {
    (0, vitest_1.expect)(await z
        .discriminatedUnion("type", [
        z.object({
            type: z.literal("a"),
            a: z
                .string()
                .refine(async () => true)
                .transform(async (val) => Number(val)),
        }),
        z.object({
            type: z.literal("b"),
            b: z.string(),
        }),
    ])
        .parseAsync({ type: "a", a: "1" })).toEqual({ type: "a", a: 1 });
});
(0, vitest_1.test)("async - invalid", async () => {
    try {
        await z
            .discriminatedUnion("type", [
            z.object({
                type: z.literal("a"),
                a: z
                    .string()
                    .refine(async () => true)
                    .transform(async (val) => val),
            }),
            z.object({
                type: z.literal("b"),
                b: z.string(),
            }),
        ])
            .parseAsync({ type: "a", a: 1 });
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(JSON.parse(e.message)).toEqual([
            {
                code: "invalid_type",
                expected: "string",
                received: "number",
                path: ["a"],
                message: "Expected string, received number",
            },
        ]);
    }
});
(0, vitest_1.test)("valid - literals with .default or .preprocess", () => {
    const schema = z.discriminatedUnion("type", [
        z.object({
            type: z.literal("foo").default("foo"),
            a: z.string(),
        }),
        z.object({
            type: z.literal("custom"),
            method: z.string(),
        }),
        z.object({
            type: z.preprocess((val) => String(val), z.literal("bar")),
            c: z.string(),
        }),
    ]);
    (0, vitest_1.expect)(schema.parse({ type: "foo", a: "foo" })).toEqual({
        type: "foo",
        a: "foo",
    });
});
(0, vitest_1.test)("enum and nativeEnum", () => {
    let MyEnum;
    (function (MyEnum) {
        MyEnum[MyEnum["d"] = 0] = "d";
        MyEnum["e"] = "e";
    })(MyEnum || (MyEnum = {}));
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a"),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.enum(["b", "c"]),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.nativeEnum(MyEnum),
            // Add other properties specific to this option
        }),
    ]);
    // type schema = z.infer<typeof schema>;
    schema.parse({ key: "a" });
    schema.parse({ key: "b" });
    schema.parse({ key: "c" });
    schema.parse({ key: MyEnum.d });
    schema.parse({ key: MyEnum.e });
    schema.parse({ key: "e" });
});
(0, vitest_1.test)("branded", () => {
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a"),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.literal("b").brand("asdfaf"),
            // Add other properties specific to this option
        }),
    ]);
    // type schema = z.infer<typeof schema>;
    schema.parse({ key: "a" });
    schema.parse({ key: "b" });
    (0, vitest_1.expect)(() => {
        schema.parse({ key: "c" });
    }).toThrow();
});
(0, vitest_1.test)("optional and nullable", () => {
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a").optional(),
            a: z.literal(true),
        }),
        z.object({
            key: z.literal("b").nullable(),
            b: z.literal(true),
            // Add other properties specific to this option
        }),
    ]);
    z.util.assertEqual(true);
    schema.parse({ key: "a", a: true });
    schema.parse({ key: undefined, a: true });
    schema.parse({ key: "b", b: true });
    schema.parse({ key: null, b: true });
    (0, vitest_1.expect)(() => {
        schema.parse({ key: null, a: true });
    }).toThrow();
    (0, vitest_1.expect)(() => {
        schema.parse({ key: "b", a: true });
    }).toThrow();
    const value = schema.parse({ key: null, b: true });
    if (!("key" in value))
        value.a;
    if (value.key === undefined)
        value.a;
    if (value.key === "a")
        value.a;
    if (value.key === "b")
        value.b;
    if (value.key === null)
        value.b;
});
(0, vitest_1.test)("readonly array of options", () => {
    const options = [
        z.object({ type: z.literal("x"), val: z.literal(1) }),
        z.object({ type: z.literal("y"), val: z.literal(2) }),
    ];
    (0, vitest_1.expect)(z.discriminatedUnion("type", options).parse({ type: "x", val: 1 })).toEqual({ type: "x", val: 1 });
});

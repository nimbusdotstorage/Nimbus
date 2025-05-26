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
const Test = z.object({
    f1: z.number(),
    f2: z.string().optional(),
    f3: z.string().nullable(),
    f4: z.array(z.object({ t: z.union([z.string(), z.boolean()]) })),
});
(0, vitest_1.test)("object type inference", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("unknown throw", () => {
    const asdf = 35;
    (0, vitest_1.expect)(() => Test.parse(asdf)).toThrow();
});
(0, vitest_1.test)("shape() should return schema of particular key", () => {
    const f1Schema = Test.shape.f1;
    const f2Schema = Test.shape.f2;
    const f3Schema = Test.shape.f3;
    const f4Schema = Test.shape.f4;
    (0, vitest_1.expect)(f1Schema).toBeInstanceOf(z.ZodNumber);
    (0, vitest_1.expect)(f2Schema).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(f3Schema).toBeInstanceOf(z.ZodNullable);
    (0, vitest_1.expect)(f4Schema).toBeInstanceOf(z.ZodArray);
});
(0, vitest_1.test)("correct parsing", () => {
    Test.parse({
        f1: 12,
        f2: "string",
        f3: "string",
        f4: [
            {
                t: "string",
            },
        ],
    });
    Test.parse({
        f1: 12,
        f3: null,
        f4: [
            {
                t: false,
            },
        ],
    });
});
(0, vitest_1.test)("incorrect #1", () => {
    (0, vitest_1.expect)(() => Test.parse({})).toThrow();
});
(0, vitest_1.test)("nonstrict by default", () => {
    z.object({ points: z.number() }).parse({
        points: 2314,
        unknown: "asdf",
    });
});
const data = {
    points: 2314,
    unknown: "asdf",
};
(0, vitest_1.test)("strip by default", () => {
    const val = z.object({ points: z.number() }).parse(data);
    (0, vitest_1.expect)(val).toEqual({ points: 2314 });
});
(0, vitest_1.test)("unknownkeys override", () => {
    const val = z.object({ points: z.number() }).strict().passthrough().strip().nonstrict().parse(data);
    (0, vitest_1.expect)(val).toEqual(data);
});
(0, vitest_1.test)("passthrough unknown", () => {
    const val = z.object({ points: z.number() }).passthrough().parse(data);
    (0, vitest_1.expect)(val).toEqual(data);
});
(0, vitest_1.test)("strip unknown", () => {
    const val = z.object({ points: z.number() }).strip().parse(data);
    (0, vitest_1.expect)(val).toEqual({ points: 2314 });
});
(0, vitest_1.test)("strict", () => {
    const val = z.object({ points: z.number() }).strict().safeParse(data);
    (0, vitest_1.expect)(val.success).toEqual(false);
});
(0, vitest_1.test)("catchall inference", () => {
    const o1 = z
        .object({
        first: z.string(),
    })
        .catchall(z.number());
    const d1 = o1.parse({ first: "asdf", num: 1243 });
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("catchall overrides strict", () => {
    const o1 = z.object({ first: z.string().optional() }).strict().catchall(z.number());
    // should run fine
    // setting a catchall overrides the unknownKeys behavior
    o1.parse({
        asdf: 1234,
    });
    // should only run catchall validation
    // against unknown keys
    o1.parse({
        first: "asdf",
        asdf: 1234,
    });
});
(0, vitest_1.test)("catchall overrides strict", () => {
    const o1 = z
        .object({
        first: z.string(),
    })
        .strict()
        .catchall(z.number());
    // should run fine
    // setting a catchall overrides the unknownKeys behavior
    o1.parse({
        first: "asdf",
        asdf: 1234,
    });
});
(0, vitest_1.test)("test that optional keys are unset", async () => {
    const SNamedEntity = z.object({
        id: z.string(),
        set: z.string().optional(),
        unset: z.string().optional(),
    });
    const result = await SNamedEntity.parse({
        id: "asdf",
        set: undefined,
    });
    // eslint-disable-next-line ban/ban
    (0, vitest_1.expect)(Object.keys(result)).toEqual(["id", "set"]);
});
(0, vitest_1.test)("test catchall parsing", async () => {
    const result = z.object({ name: z.string() }).catchall(z.number()).parse({ name: "Foo", validExtraKey: 61 });
    (0, vitest_1.expect)(result).toEqual({ name: "Foo", validExtraKey: 61 });
    const result2 = z
        .object({ name: z.string() })
        .catchall(z.number())
        .safeParse({ name: "Foo", validExtraKey: 61, invalid: "asdf" });
    (0, vitest_1.expect)(result2.success).toEqual(false);
});
(0, vitest_1.test)("test nonexistent keys", async () => {
    const Schema = z.union([z.object({ a: z.string() }), z.object({ b: z.number() })]);
    const obj = { a: "A" };
    const result = await Schema.spa(obj); // Works with 1.11.10, breaks with 2.0.0-beta.21
    (0, vitest_1.expect)(result.success).toBe(true);
});
(0, vitest_1.test)("test async union", async () => {
    const Schema2 = z.union([
        z.object({
            ty: z.string(),
        }),
        z.object({
            ty: z.number(),
        }),
    ]);
    const obj = { ty: "A" };
    const result = await Schema2.spa(obj); // Works with 1.11.10, breaks with 2.0.0-beta.21
    (0, vitest_1.expect)(result.success).toEqual(true);
});
(0, vitest_1.test)("test inferred merged type", async () => {
    const asdf = z.object({ a: z.string() }).merge(z.object({ a: z.number() }));
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("inferred merged object type with optional properties", async () => {
    const Merged = z
        .object({ a: z.string(), b: z.string().optional() })
        .merge(z.object({ a: z.string().optional(), b: z.string() }));
    util_js_1.util.assertEqual(true);
    // todo
    // util.assertEqual<Merged, { a?: string; b: string }>(true);
});
(0, vitest_1.test)("inferred unioned object type with optional properties", async () => {
    const Unioned = z.union([
        z.object({ a: z.string(), b: z.string().optional() }),
        z.object({ a: z.string().optional(), b: z.string() }),
    ]);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("inferred enum type", async () => {
    const Enum = z.object({ a: z.string(), b: z.string().optional() }).keyof();
    (0, vitest_1.expect)(Enum.Values).toEqual({
        a: "a",
        b: "b",
    });
    (0, vitest_1.expect)(Enum.enum).toEqual({
        a: "a",
        b: "b",
    });
    (0, vitest_1.expect)(Enum._def.values).toEqual(["a", "b"]);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("inferred partial object type with optional properties", async () => {
    const Partial = z.object({ a: z.string(), b: z.string().optional() }).partial();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("inferred picked object type with optional properties", async () => {
    const Picked = z.object({ a: z.string(), b: z.string().optional() }).pick({ b: true });
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("inferred type for unknown/any keys", () => {
    const myType = z.object({
        anyOptional: z.any().optional(),
        anyRequired: z.any(),
        unknownOptional: z.unknown().optional(),
        unknownRequired: z.unknown(),
    });
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("setKey", () => {
    const base = z.object({ name: z.string() });
    const withNewKey = base.setKey("age", z.number());
    util_js_1.util.assertEqual(true);
    withNewKey.parse({ name: "asdf", age: 1234 });
});
(0, vitest_1.test)("strictcreate", async () => {
    const strictObj = z.strictObject({
        name: z.string(),
    });
    const syncResult = strictObj.safeParse({ name: "asdf", unexpected: 13 });
    (0, vitest_1.expect)(syncResult.success).toEqual(false);
    const asyncResult = await strictObj.spa({ name: "asdf", unexpected: 13 });
    (0, vitest_1.expect)(asyncResult.success).toEqual(false);
});
(0, vitest_1.test)("object with refine", async () => {
    const schema = z
        .object({
        a: z.string().default("foo"),
        b: z.number(),
    })
        .refine(() => true);
    (0, vitest_1.expect)(schema.parse({ b: 5 })).toEqual({ b: 5, a: "foo" });
    const result = await schema.parseAsync({ b: 5 });
    (0, vitest_1.expect)(result).toEqual({ b: 5, a: "foo" });
});
(0, vitest_1.test)("intersection of object with date", async () => {
    const schema = z.object({
        a: z.date(),
    });
    (0, vitest_1.expect)(schema.and(schema).parse({ a: new Date(1637353595983) })).toEqual({
        a: new Date(1637353595983),
    });
    const result = await schema.parseAsync({ a: new Date(1637353595983) });
    (0, vitest_1.expect)(result).toEqual({ a: new Date(1637353595983) });
});
(0, vitest_1.test)("intersection of object with refine with date", async () => {
    const schema = z
        .object({
        a: z.date(),
    })
        .refine(() => true);
    (0, vitest_1.expect)(schema.and(schema).parse({ a: new Date(1637353595983) })).toEqual({
        a: new Date(1637353595983),
    });
    const result = await schema.parseAsync({ a: new Date(1637353595983) });
    (0, vitest_1.expect)(result).toEqual({ a: new Date(1637353595983) });
});
(0, vitest_1.test)("constructor key", () => {
    const person = z
        .object({
        name: z.string(),
    })
        .strict();
    (0, vitest_1.expect)(() => person.parse({
        name: "bob dylan",
        constructor: 61,
    })).toThrow();
});
(0, vitest_1.test)("constructor key", () => {
    const Example = z.object({
        prop: z.string(),
        opt: z.number().optional(),
        arr: z.string().array(),
    });
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("unknownkeys merging", () => {
    // This one is "strict"
    const schemaA = z
        .object({
        a: z.string(),
    })
        .strict();
    // This one is "strip"
    const schemaB = z
        .object({
        b: z.string(),
    })
        .catchall(z.string());
    const mergedSchema = schemaA.merge(schemaB);
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(mergedSchema._def.unknownKeys).toEqual("strip");
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(mergedSchema._def.catchall instanceof z.ZodString).toEqual(true);
});
const personToExtend = z.object({
    firstName: z.string(),
    lastName: z.string(),
});
(0, vitest_1.test)("extend() should return schema with new key", () => {
    const PersonWithNickname = personToExtend.extend({ nickName: z.string() });
    const expected = { firstName: "f", nickName: "n", lastName: "l" };
    const actual = PersonWithNickname.parse(expected);
    (0, vitest_1.expect)(actual).toEqual(expected);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("extend() should have power to override existing key", () => {
    const PersonWithNumberAsLastName = personToExtend.extend({
        lastName: z.number(),
    });
    const expected = { firstName: "f", lastName: 42 };
    const actual = PersonWithNumberAsLastName.parse(expected);
    (0, vitest_1.expect)(actual).toEqual(expected);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("passthrough index signature", () => {
    const a = z.object({ a: z.string() });
    util_js_1.util.assertEqual(true);
    const b = a.passthrough();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("xor", () => {
    const _Outer = z.object({
        data: z.union([z.object({ name: z.string(), a: z.number() }), z.object({ name: z.string(), b: z.number() })]),
    });
});

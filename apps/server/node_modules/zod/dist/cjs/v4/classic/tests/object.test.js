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
const core = __importStar(require("zod/v4/core"));
const Test = z.object({
    f1: z.number(),
    f2: z.string().optional(),
    f3: z.string().nullable(),
    f4: z.array(z.object({ t: z.union([z.string(), z.boolean()]) })),
});
(0, vitest_1.test)("object type inference", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
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
(0, vitest_1.test)("nonstrict by default", () => {
    z.object({ points: z.number() }).parse({
        points: 2314,
        unknown: "asdf",
    });
});
(0, vitest_1.test)("parse optional keys ", () => {
    const schema = z.object({
        a: z.string().optional(),
    });
    (0, vitest_1.expect)(schema.parse({ a: "asdf" })).toEqual({ a: "asdf" });
});
(0, vitest_1.test)("empty object", () => {
    const schema = z.object({});
    (0, vitest_1.expect)(schema.parse({})).toEqual({});
    (0, vitest_1.expect)(schema.parse({ name: "asdf" })).toEqual({});
    (0, vitest_1.expect)(schema.safeParse(null).success).toEqual(false);
    (0, vitest_1.expect)(schema.safeParse("asdf").success).toEqual(false);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
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
    const val = z.object({ points: z.number() }).strict().passthrough().strip().passthrough().parse(data);
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
    // expectTypeOf<(typeof d1)["asdf"]>().toEqualTypeOf<number>();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
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
(0, vitest_1.test)("optional keys are unset", async () => {
    const SNamedEntity = z.object({
        id: z.string(),
        set: z.string().optional(),
        unset: z.string().optional(),
    });
    const result = await SNamedEntity.parse({
        id: "asdf",
        set: undefined,
    });
    (0, vitest_1.expect)(Object.keys(result)).toEqual(["id", "set"]);
});
(0, vitest_1.test)("catchall parsing", async () => {
    const result = z.object({ name: z.string() }).catchall(z.number()).parse({ name: "Foo", validExtraKey: 61 });
    (0, vitest_1.expect)(result).toEqual({ name: "Foo", validExtraKey: 61 });
    const result2 = z
        .object({ name: z.string() })
        .catchall(z.number())
        .safeParse({ name: "Foo", validExtraKey: 61, invalid: "asdf" });
    (0, vitest_1.expect)(result2.success).toEqual(false);
});
(0, vitest_1.test)("nonexistent keys", async () => {
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred merged object type with optional properties", async () => {
    const Merged = z
        .object({ a: z.string(), b: z.string().optional() })
        .merge(z.object({ a: z.string().optional(), b: z.string() }));
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred unioned object type with optional properties", async () => {
    const Unioned = z.union([
        z.object({ a: z.string(), b: z.string().optional() }),
        z.object({ a: z.string().optional(), b: z.string() }),
    ]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred enum type", async () => {
    const Enum = z.object({ a: z.string(), b: z.string().optional() }).keyof();
    (0, vitest_1.expect)(Enum.enum).toEqual({
        a: "a",
        b: "b",
    });
    (0, vitest_1.expect)(Enum._zod.def.entries).toEqual({
        a: "a",
        b: "b",
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred partial object type with optional properties", async () => {
    const Partial = z.object({ a: z.string(), b: z.string().optional() }).partial();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred picked object type with optional properties", async () => {
    const Picked = z.object({ a: z.string(), b: z.string().optional() }).pick({ b: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("inferred type for unknown/any keys", () => {
    const myType = z.object({
        anyOptional: z.any().optional(),
        anyRequired: z.any(),
        unknownOptional: z.unknown().optional(),
        unknownRequired: z.unknown(),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("strictObject", async () => {
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
    (0, vitest_1.expect)(z.intersection(schema, schema).parse({ a: new Date(1637353595983) })).toEqual({
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
    (0, vitest_1.expect)(z.intersection(schema, schema).parse({ a: new Date(1637353595983) })).toEqual({
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("catchall", () => {
    const a = z.object({});
    (0, vitest_1.expect)(a._zod.def.catchall).toBeUndefined();
    const b = z.strictObject({});
    (0, vitest_1.expect)(b._zod.def.catchall).toBeInstanceOf(core.$ZodNever);
    const c = z.looseObject({});
    (0, vitest_1.expect)(c._zod.def.catchall).toBeInstanceOf(core.$ZodUnknown);
    const d = z.object({}).catchall(z.number());
    (0, vitest_1.expect)(d._zod.def.catchall).toBeInstanceOf(core.$ZodNumber);
});
(0, vitest_1.test)("unknownkeys merging", () => {
    // This one is "strict"
    const a = z.looseObject({
        a: z.string(),
    });
    const b = z.strictObject({ b: z.string() });
    // incoming object overrides
    const c = a.merge(b);
    (0, vitest_1.expect)(c._zod.def.catchall).toBeInstanceOf(core.$ZodNever);
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("extend() should have power to override existing key", () => {
    const PersonWithNumberAsLastName = personToExtend.extend({
        lastName: z.number(),
    });
    const expected = { firstName: "f", lastName: 42 };
    const actual = PersonWithNumberAsLastName.parse(expected);
    (0, vitest_1.expect)(actual).toEqual(expected);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("passthrough index signature", () => {
    const a = z.object({ a: z.string() });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const b = a.passthrough();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
// test("xor", () => {
//   type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
//   type XOR<T, U> = T extends object ? (U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U) : T;
//   type A = { name: string; a: number };
//   type B = { name: string; b: number };
//   type C = XOR<A, B>;
//   type Outer = { data: C };
//   const Outer = z.object({
//     data: z.union([z.object({ name: z.string(), a: z.number() }), z.object({ name: z.string(), b: z.number() })]),
//   }) satisfies z.ZodType<Outer, any>;
// });
(0, vitest_1.test)("assignability", () => {
    z.object({ a: z.string() });
    z.object({ a: z.string() }).catchall(z.number());
    z.object({ a: z.string() }).strict();
    z.object({});
    z.object({ "a?": z.string() });
    z.object({ "?a": z.string() });
    z.object({
        a: z.string(),
        b: z.number(),
        c: z.boolean(),
    });
});
(0, vitest_1.test)("null prototype", () => {
    const schema = z.object({ a: z.string() });
    const obj = Object.create(null);
    obj.a = "foo";
    (0, vitest_1.expect)(schema.parse(obj)).toEqual({ a: "foo" });
});
(0, vitest_1.test)("empty objects", () => {
    const A = z.looseObject({});
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const B = z.object({});
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const C = z.strictObject({});
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("preserve key order", () => {
    const schema = z.object({
        a: z.string().optional(),
        b: z.string(),
    });
    const r1 = schema.safeParse({ a: "asdf", b: "qwer" });
    const r2 = schema.safeParse({ a: "asdf", b: "qwer" }, { jitless: true });
    (0, vitest_1.expect)(Object.keys(r1.data)).toMatchInlineSnapshot(`
    [
      "a",
      "b",
    ]
  `);
    (0, vitest_1.expect)(Object.keys(r1.data)).toEqual(Object.keys(r2.data));
});

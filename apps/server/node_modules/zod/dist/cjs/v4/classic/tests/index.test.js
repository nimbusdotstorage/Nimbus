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
(0, vitest_1.test)("z.boolean", () => {
    const a = z.boolean();
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, false)).toEqual(false);
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "true")).toThrow();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("z.bigint", () => {
    const a = z.bigint();
    (0, vitest_1.expect)(z.parse(a, BigInt(123))).toEqual(BigInt(123));
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
});
(0, vitest_1.test)("z.symbol", () => {
    const a = z.symbol();
    const sym = Symbol();
    (0, vitest_1.expect)(z.parse(a, sym)).toEqual(sym);
    (0, vitest_1.expect)(() => z.parse(a, "symbol")).toThrow();
});
(0, vitest_1.test)("z.date", () => {
    const a = z.date();
    const date = new Date();
    (0, vitest_1.expect)(z.parse(a, date)).toEqual(date);
    (0, vitest_1.expect)(() => z.parse(a, "date")).toThrow();
});
(0, vitest_1.test)("z.coerce.string", () => {
    const a = z.coerce.string();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual("123");
    (0, vitest_1.expect)(z.parse(a, true)).toEqual("true");
    (0, vitest_1.expect)(z.parse(a, null)).toEqual("null");
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual("undefined");
});
(0, vitest_1.test)("z.coerce.number", () => {
    const a = z.coerce.number();
    (0, vitest_1.expect)(z.parse(a, "123")).toEqual(123);
    (0, vitest_1.expect)(z.parse(a, "123.45")).toEqual(123.45);
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(1);
    (0, vitest_1.expect)(z.parse(a, false)).toEqual(0);
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.coerce.boolean", () => {
    const a = z.coerce.boolean();
    // test booleans
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, false)).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "true")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "false")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, 1)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, 0)).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, {})).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, [])).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "")).toEqual(false);
});
(0, vitest_1.test)("z.coerce.bigint", () => {
    const a = z.coerce.bigint();
    (0, vitest_1.expect)(z.parse(a, "123")).toEqual(BigInt(123));
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(BigInt(123));
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.coerce.date", () => {
    const a = z.coerce.date();
    const date = new Date();
    (0, vitest_1.expect)(z.parse(a, date.toISOString())).toEqual(date);
    (0, vitest_1.expect)(z.parse(a, date.getTime())).toEqual(date);
    (0, vitest_1.expect)(() => z.parse(a, "invalid date")).toThrow();
});
(0, vitest_1.test)("z.iso.datetime", () => {
    const d1 = "2021-01-01T00:00:00Z";
    const d2 = "2021-01-01T00:00:00.123Z";
    const d3 = "2021-01-01T00:00:00";
    const d4 = "2021-01-01T00:00:00+07:00";
    const d5 = "bad data";
    // local: false, offset: false, precision: null
    const a = z.iso.datetime();
    (0, vitest_1.expect)(z.safeParse(a, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d3).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(a, d4).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(a, d5).success).toEqual(false);
    const b = z.iso.datetime({ local: true });
    (0, vitest_1.expect)(z.safeParse(b, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d3).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d4).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(b, d5).success).toEqual(false);
    const c = z.iso.datetime({ offset: true });
    (0, vitest_1.expect)(z.safeParse(c, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, d3).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(c, d4).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, d5).success).toEqual(false);
    const d = z.iso.datetime({ precision: 3 });
    (0, vitest_1.expect)(z.safeParse(d, d1).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(d, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(d, d3).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(d, d4).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(d, d5).success).toEqual(false);
});
(0, vitest_1.test)("z.iso.date", () => {
    const d1 = "2021-01-01";
    const d2 = "bad data";
    const a = z.iso.date();
    (0, vitest_1.expect)(z.safeParse(a, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d2).success).toEqual(false);
    const b = z.string().check(z.iso.date());
    (0, vitest_1.expect)(z.safeParse(b, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d2).success).toEqual(false);
});
(0, vitest_1.test)("z.iso.time", () => {
    const d1 = "00:00:00";
    const d2 = "00:00:00.123";
    const d3 = "bad data";
    const a = z.iso.time();
    (0, vitest_1.expect)(z.safeParse(a, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d3).success).toEqual(false);
    const b = z.iso.time({ precision: 3 });
    (0, vitest_1.expect)(z.safeParse(b, d1).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(b, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d3).success).toEqual(false);
    const c = z.string().check(z.iso.time());
    (0, vitest_1.expect)(z.safeParse(c, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, d2).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, d3).success).toEqual(false);
});
(0, vitest_1.test)("z.iso.duration", () => {
    const d1 = "P3Y6M4DT12H30M5S";
    const d2 = "bad data";
    const a = z.iso.duration();
    (0, vitest_1.expect)(z.safeParse(a, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, d2).success).toEqual(false);
    const b = z.string().check(z.iso.duration());
    (0, vitest_1.expect)(z.safeParse(b, d1).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(b, d2).success).toEqual(false);
});
(0, vitest_1.test)("z.undefined", () => {
    const a = z.undefined();
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(undefined);
    (0, vitest_1.expect)(() => z.parse(a, "undefined")).toThrow();
});
(0, vitest_1.test)("z.null", () => {
    const a = z.null();
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(null);
    (0, vitest_1.expect)(() => z.parse(a, "null")).toThrow();
});
(0, vitest_1.test)("z.any", () => {
    const a = z.any();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(null);
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(undefined);
    z.parse(a, {});
    z.parse(a, []);
    z.parse(a, Symbol());
    z.parse(a, new Date());
});
(0, vitest_1.test)("z.unknown", () => {
    const a = z.unknown();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(null);
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(undefined);
    z.parse(a, {});
    z.parse(a, []);
    z.parse(a, Symbol());
    z.parse(a, new Date());
});
(0, vitest_1.test)("z.never", () => {
    const a = z.never();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
(0, vitest_1.test)("z.void", () => {
    const a = z.void();
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(undefined);
    (0, vitest_1.expect)(() => z.parse(a, null)).toThrow();
});
(0, vitest_1.test)("z.array", () => {
    const a = z.array(z.string());
    (0, vitest_1.expect)(z.parse(a, ["hello", "world"])).toEqual(["hello", "world"]);
    (0, vitest_1.expect)(() => z.parse(a, [123])).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
(0, vitest_1.test)("z.union", () => {
    const a = z.union([z.string(), z.number()]);
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(() => z.parse(a, true)).toThrow();
});
(0, vitest_1.test)("z.discriminatedUnion", () => {
    const a = z.object({
        type: z.literal("A"),
        name: z.string(),
    });
    (0, vitest_1.expect)(a._zod.disc.get("type")).toEqual({
        values: new Set(["A"]),
        maps: [],
    });
    const b = z.object({
        type: z.literal("B"),
        age: z.number(),
    });
    const c = z.discriminatedUnion("type", [a, b]);
    (0, vitest_1.expect)(c._zod.def.options.length).toEqual(2);
    (0, vitest_1.expect)(c._zod.disc.get("type").values.has("A")).toEqual(true);
    (0, vitest_1.expect)(c._zod.disc.get("type").values.has("B")).toEqual(true);
    (0, vitest_1.expect)(z.parse(c, { type: "A", name: "john" })).toEqual({
        type: "A",
        name: "john",
    });
    (0, vitest_1.expect)(z.parse(c, { type: "B", age: 30 })).toEqual({ type: "B", age: 30 });
});
(0, vitest_1.test)("z.discriminatedUnion with nested discriminator", () => {
    const a = z.object({
        type: z.object({ key: z.literal("A") }),
        name: z.string(),
    });
    const b = z.object({
        type: z.object({ key: z.literal("B") }),
        age: z.number(),
    });
    const c = z.discriminatedUnion("type", [a, b]);
    (0, vitest_1.expect)(c._zod.disc.get("type").maps[0].get("key").values.has("A")).toEqual(true);
    (0, vitest_1.expect)(c._zod.disc.get("type").maps[1].get("key").values.has("B")).toEqual(true);
    (0, vitest_1.expect)(z.parse(c, { type: { key: "A" }, name: "john" })).toEqual({
        type: { key: "A" },
        name: "john",
    });
    (0, vitest_1.expect)(z.parse(c, { type: { key: "B" }, age: 30 })).toEqual({
        type: { key: "B" },
        age: 30,
    });
});
(0, vitest_1.test)("z.discriminatedUnion nested", () => {
    const schema1 = z.discriminatedUnion("type", [
        z.object({
            type: z.literal("A"),
            name: z.string(),
        }),
        z.object({
            num: z.literal(1),
            type: z.literal("B"),
            age: z.number(),
        }),
    ]);
    const schema2 = z.discriminatedUnion("type", [
        z.object({
            num: z.literal(2),
            type: z.literal("C"),
            name: z.string(),
        }),
        z.object({
            num: z.literal(2),
            type: z.literal("D"),
            age: z.number(),
        }),
    ]);
    const hyper = z.discriminatedUnion("type", [schema1, schema2]);
    (0, vitest_1.expect)(hyper._zod.disc.get("num")).toEqual({
        values: new Set([1, 2]),
        maps: [],
    });
    (0, vitest_1.expect)(hyper._zod.disc.get("type")).toEqual({
        values: new Set(["A", "B", "C", "D"]),
        maps: [],
    });
});
(0, vitest_1.test)("z.intersection", () => {
    const a = z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() }));
    (0, vitest_1.expect)(z.parse(a, { a: "hello", b: 123 })).toEqual({ a: "hello", b: 123 });
    (0, vitest_1.expect)(() => z.parse(a, { a: "hello" })).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, { b: 123 })).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
(0, vitest_1.test)("z.tuple", () => {
    const a = z.tuple([z.string(), z.number()]);
    (0, vitest_1.expect)(z.parse(a, ["hello", 123])).toEqual(["hello", 123]);
    (0, vitest_1.expect)(() => z.parse(a, ["hello", "world"])).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, [123, 456])).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // tuple with rest
    const b = z.tuple([z.string(), z.number(), z.optional(z.string())], z.boolean());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const datas = [
        ["hello", 123],
        ["hello", 123, "world"],
        ["hello", 123, "world", true],
        ["hello", 123, "world", true, false, true],
    ];
    for (const data of datas) {
        (0, vitest_1.expect)(z.parse(b, data)).toEqual(data);
    }
    (0, vitest_1.expect)(() => z.parse(b, ["hello", 123, 123])).toThrow();
    (0, vitest_1.expect)(() => z.parse(b, ["hello", 123, "world", 123])).toThrow();
    // tuple with readonly args
    const cArgs = [z.string(), z.number(), z.optional(z.string())];
    const c = z.tuple(cArgs, z.boolean());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // type c = z.output<typeof c>;
});
(0, vitest_1.test)("z.record", () => {
    // record schema with enum keys
    const a = z.record(z.string(), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const b = z.record(z.union([z.string(), z.number(), z.symbol()]), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(b, { a: "hello", 1: "world", [Symbol.for("asdf")]: "symbol" })).toEqual({
        a: "hello",
        1: "world",
        [Symbol.for("asdf")]: "symbol",
    });
    // enum keys
    const c = z.record(z.enum(["a", "b", "c"]), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(c, { a: "hello", b: "world", c: "world" })).toEqual({
        a: "hello",
        b: "world",
        c: "world",
    });
    // missing keys
    (0, vitest_1.expect)(() => z.parse(c, { a: "hello", b: "world" })).toThrow();
    // extra keys
    (0, vitest_1.expect)(() => z.parse(c, { a: "hello", b: "world", c: "world", d: "world" })).toThrow();
    // partial enum
    const d = z.record(z.enum(["a", "b"]).or(z.never()), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("z.map", () => {
    const a = z.map(z.string(), z.number());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, new Map([["hello", 123]]))).toEqual(new Map([["hello", 123]]));
    (0, vitest_1.expect)(() => z.parse(a, new Map([["hello", "world"]]))).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, new Map([[1243, "world"]]))).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    const r1 = z.safeParse(a, new Map([[123, 123]]));
    (0, vitest_1.expect)(r1.error?.issues[0].code).toEqual("invalid_type");
    (0, vitest_1.expect)(r1.error?.issues[0].path).toEqual([123]);
    const r2 = z.safeParse(a, new Map([[BigInt(123), 123]]));
    (0, vitest_1.expect)(r2.error.issues[0].code).toEqual("invalid_key");
    (0, vitest_1.expect)(r2.error.issues[0].path).toEqual([]);
    const r3 = z.safeParse(a, new Map([["hello", "world"]]));
    (0, vitest_1.expect)(r3.error.issues[0].code).toEqual("invalid_type");
    (0, vitest_1.expect)(r3.error.issues[0].path).toEqual(["hello"]);
});
(0, vitest_1.test)("z.map invalid_element", () => {
    const a = z.map(z.bigint(), z.number());
    const r1 = z.safeParse(a, new Map([[BigInt(123), BigInt(123)]]));
    (0, vitest_1.expect)(r1.error.issues[0].code).toEqual("invalid_element");
    (0, vitest_1.expect)(r1.error.issues[0].path).toEqual([]);
});
(0, vitest_1.test)("z.map async", async () => {
    const a = z.map(z.string().check(z.refine(async () => true)), z.number().check(z.refine(async () => true)));
    const d1 = new Map([["hello", 123]]);
    (0, vitest_1.expect)(await z.parseAsync(a, d1)).toEqual(d1);
    await (0, vitest_1.expect)(z.parseAsync(a, new Map([[123, 123]]))).rejects.toThrow();
    await (0, vitest_1.expect)(z.parseAsync(a, new Map([["hi", "world"]]))).rejects.toThrow();
    await (0, vitest_1.expect)(z.parseAsync(a, new Map([[1243, "world"]]))).rejects.toThrow();
    await (0, vitest_1.expect)(z.parseAsync(a, "hello")).rejects.toThrow();
    const r = await z.safeParseAsync(a, new Map([[123, 123]]));
    (0, vitest_1.expect)(r.success).toEqual(false);
    (0, vitest_1.expect)(r.error.issues[0].code).toEqual("invalid_type");
    (0, vitest_1.expect)(r.error.issues[0].path).toEqual([123]);
});
(0, vitest_1.test)("z.set", () => {
    const a = z.set(z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, new Set(["hello", "world"]))).toEqual(new Set(["hello", "world"]));
    (0, vitest_1.expect)(() => z.parse(a, new Set([123]))).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, ["hello", "world"])).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    const b = z.set(z.number());
    (0, vitest_1.expect)(z.parse(b, new Set([1, 2, 3]))).toEqual(new Set([1, 2, 3]));
    (0, vitest_1.expect)(() => z.parse(b, new Set(["hello"]))).toThrow();
    (0, vitest_1.expect)(() => z.parse(b, [1, 2, 3])).toThrow();
    (0, vitest_1.expect)(() => z.parse(b, 123)).toThrow();
});
(0, vitest_1.test)("z.enum", () => {
    const a = z.enum(["A", "B", "C"]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "A")).toEqual("A");
    (0, vitest_1.expect)(z.parse(a, "B")).toEqual("B");
    (0, vitest_1.expect)(z.parse(a, "C")).toEqual("C");
    (0, vitest_1.expect)(() => z.parse(a, "D")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(a.enum.A).toEqual("A");
    (0, vitest_1.expect)(a.enum.B).toEqual("B");
    (0, vitest_1.expect)(a.enum.C).toEqual("C");
    (0, vitest_1.expect)(a.enum.D).toEqual(undefined);
});
(0, vitest_1.test)("z.enum - native", () => {
    let NativeEnum;
    (function (NativeEnum) {
        NativeEnum["A"] = "A";
        NativeEnum["B"] = "B";
        NativeEnum["C"] = "C";
    })(NativeEnum || (NativeEnum = {}));
    const a = z.enum(NativeEnum);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, NativeEnum.A)).toEqual(NativeEnum.A);
    (0, vitest_1.expect)(z.parse(a, NativeEnum.B)).toEqual(NativeEnum.B);
    (0, vitest_1.expect)(z.parse(a, NativeEnum.C)).toEqual(NativeEnum.C);
    (0, vitest_1.expect)(() => z.parse(a, "D")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    // test a.enum
    a;
    (0, vitest_1.expect)(a.enum.A).toEqual(NativeEnum.A);
    (0, vitest_1.expect)(a.enum.B).toEqual(NativeEnum.B);
    (0, vitest_1.expect)(a.enum.C).toEqual(NativeEnum.C);
});
(0, vitest_1.test)("z.nativeEnum", () => {
    let NativeEnum;
    (function (NativeEnum) {
        NativeEnum["A"] = "A";
        NativeEnum["B"] = "B";
        NativeEnum["C"] = "C";
    })(NativeEnum || (NativeEnum = {}));
    const a = z.nativeEnum(NativeEnum);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, NativeEnum.A)).toEqual(NativeEnum.A);
    (0, vitest_1.expect)(z.parse(a, NativeEnum.B)).toEqual(NativeEnum.B);
    (0, vitest_1.expect)(z.parse(a, NativeEnum.C)).toEqual(NativeEnum.C);
    (0, vitest_1.expect)(() => z.parse(a, "D")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    // test a.enum
    a;
    (0, vitest_1.expect)(a.enum.A).toEqual(NativeEnum.A);
    (0, vitest_1.expect)(a.enum.B).toEqual(NativeEnum.B);
    (0, vitest_1.expect)(a.enum.C).toEqual(NativeEnum.C);
});
(0, vitest_1.test)("z.literal", () => {
    const a = z.literal("hello");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, "world")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.file", () => {
    const a = z.file();
    const file = new File(["content"], "filename.txt", { type: "text/plain" });
    (0, vitest_1.expect)(z.parse(a, file)).toEqual(file);
    (0, vitest_1.expect)(() => z.parse(a, "file")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.transform", () => {
    const a = z.pipe(z.string(), z.transform((val) => val.toUpperCase()));
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("HELLO");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.transform async", async () => {
    const a = z.pipe(z.string(), z.transform(async (val) => val.toUpperCase()));
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(await z.parseAsync(a, "hello")).toEqual("HELLO");
    await (0, vitest_1.expect)(() => z.parseAsync(a, 123)).rejects.toThrow();
});
(0, vitest_1.test)("z.preprocess", () => {
    const a = z.pipe(z.transform((val) => String(val).toUpperCase()), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual("123");
    (0, vitest_1.expect)(z.parse(a, true)).toEqual("TRUE");
    (0, vitest_1.expect)(z.parse(a, BigInt(1234))).toEqual("1234");
    // expect(() => z.parse(a, Symbol("asdf"))).toThrow();
});
// test("z.preprocess async", () => {
//   const a = z.preprocess(async (val) => String(val), z.string());
//   type a = z.output<typeof a>;
//   expectTypeOf<a>().toEqualTypeOf<string>();
//   expect(z.parse(a, 123)).toEqual("123");
//   expect(z.parse(a, true)).toEqual("true");
//   expect(() => z.parse(a, {})).toThrow();
// });
(0, vitest_1.test)("z.optional", () => {
    const a = z.optional(z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual(undefined);
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.nullable", () => {
    const a = z.nullable(z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(null);
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.default", () => {
    const a = z._default(z.string(), "default");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, undefined)).toEqual("default");
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    const b = z._default(z.string(), () => "default");
    (0, vitest_1.expect)(z.parse(b, undefined)).toEqual("default");
    (0, vitest_1.expect)(z.parse(b, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(b, 123)).toThrow();
});
(0, vitest_1.test)("z.catch", () => {
    const a = z.catch(z.string(), "default");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual("default");
    const b = z.catch(z.string(), () => "default");
    (0, vitest_1.expect)(z.parse(b, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(b, 123)).toEqual("default");
    const c = z.catch(z.string(), (ctx) => {
        return `${ctx.error.issues.length}issues`;
    });
    (0, vitest_1.expect)(z.parse(c, 1234)).toEqual("1issues");
});
(0, vitest_1.test)("z.nan", () => {
    const a = z.nan();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, Number.NaN)).toEqual(Number.NaN);
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "NaN")).toThrow();
});
(0, vitest_1.test)("z.pipe", () => {
    const a = z.pipe(z.pipe(z.string(), z.transform((val) => val.length)), z.number());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "123")).toEqual(3);
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual(5);
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.readonly", () => {
    const a = z.readonly(z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.templateLiteral", () => {
    const a = z.templateLiteral([z.string(), z.number()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello123")).toEqual("hello123");
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    // multipart
    const b = z.templateLiteral([z.string(), z.number(), z.string()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(b, "hello123world")).toEqual("hello123world");
    (0, vitest_1.expect)(z.parse(b, "123")).toEqual("123");
    (0, vitest_1.expect)(() => z.parse(b, "hello")).toThrow();
    (0, vitest_1.expect)(() => z.parse(b, 123)).toThrow();
    // include boolean
    const c = z.templateLiteral([z.string(), z.boolean()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(c, "hellotrue")).toEqual("hellotrue");
    (0, vitest_1.expect)(z.parse(c, "hellofalse")).toEqual("hellofalse");
    (0, vitest_1.expect)(() => z.parse(c, "hello")).toThrow();
    (0, vitest_1.expect)(() => z.parse(c, 123)).toThrow();
    // include literal prefix
    const d = z.templateLiteral([z.literal("hello"), z.number()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(d, "hello123")).toEqual("hello123");
    (0, vitest_1.expect)(() => z.parse(d, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(d, "world123")).toThrow();
    // include literal union
    const e = z.templateLiteral([z.literal(["aa", "bb"]), z.number()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(e, "aa123")).toEqual("aa123");
    (0, vitest_1.expect)(z.parse(e, "bb123")).toEqual("bb123");
    (0, vitest_1.expect)(() => z.parse(e, "cc123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(e, 123)).toThrow();
});
// this returns both a schema and a check
(0, vitest_1.test)("z.custom", () => {
    const a = z.custom((val) => {
        return typeof val === "string";
    });
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    const b = z.string().check(z.custom((val) => val.length > 3));
    (0, vitest_1.expect)(z.parse(b, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(b, "hi")).toThrow();
});
(0, vitest_1.test)("z.check", () => {
    // this is a more flexible version of z.custom that accepts an arbitrary _parse logic
    // the function should return base.$ZodResult
    const a = z.any().check(z.check((ctx) => {
        if (typeof ctx.value === "string")
            return;
        ctx.issues.push({
            code: "custom",
            origin: "custom",
            message: "Expected a string",
            input: ctx.value,
        });
    }));
    (0, vitest_1.expect)(z.safeParse(a, "hello")).toMatchObject({
        success: true,
        data: "hello",
    });
    (0, vitest_1.expect)(z.safeParse(a, 123)).toMatchObject({
        success: false,
        error: { issues: [{ code: "custom", message: "Expected a string" }] },
    });
});
(0, vitest_1.test)("z.instanceof", () => {
    class A {
    }
    const a = z.instanceof(A);
    (0, vitest_1.expect)(z.parse(a, new A())).toBeInstanceOf(A);
    (0, vitest_1.expect)(() => z.parse(a, {})).toThrow();
});
(0, vitest_1.test)("z.refine", () => {
    const a = z.number().check(z.refine((val) => val > 3), z.refine((val) => val < 10));
    (0, vitest_1.expect)(z.parse(a, 5)).toEqual(5);
    (0, vitest_1.expect)(() => z.parse(a, 2)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 11)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hi")).toThrow();
});
// test("z.superRefine", () => {
//   const a = z.number([
//     z.superRefine((val, ctx) => {
//       if (val < 3) {
//         return ctx.addIssue({
//           code: "custom",
//           origin: "custom",
//           message: "Too small",
//           input: val,
//         });
//       }
//       if (val > 10) {
//         return ctx.addIssue("Too big");
//       }
//     }),
//   ]);
//   expect(z.parse(a, 5)).toEqual(5);
//   expect(() => z.parse(a, 2)).toThrow();
//   expect(() => z.parse(a, 11)).toThrow();
//   expect(() => z.parse(a, "hi")).toThrow();
// });
(0, vitest_1.test)("z.transform", () => {
    const a = z.transform((val) => {
        return `${val}`;
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual("123");
});
(0, vitest_1.test)("z.$brand()", () => {
    const a = z.string().brand();
    const branded = (_) => { };
    // @ts-expect-error
    branded("asdf");
});
(0, vitest_1.test)("z.lazy", () => {
    const a = z.lazy(() => z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
// schema that validates JSON-like data
(0, vitest_1.test)("z.json", () => {
    const a = z.json();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(z.parse(a, true)).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, null)).toEqual(null);
    (0, vitest_1.expect)(z.parse(a, {})).toEqual({});
    (0, vitest_1.expect)(z.parse(a, { a: "hello" })).toEqual({ a: "hello" });
    (0, vitest_1.expect)(z.parse(a, [1, 2, 3])).toEqual([1, 2, 3]);
    (0, vitest_1.expect)(z.parse(a, [{ a: "hello" }])).toEqual([{ a: "hello" }]);
    // fail cases
    (0, vitest_1.expect)(() => z.parse(a, new Date())).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, Symbol())).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, { a: new Date() })).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, undefined)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, { a: undefined })).toThrow();
});
(0, vitest_1.test)("z.stringbool", () => {
    const a = z.stringbool();
    (0, vitest_1.expect)(z.parse(a, "true")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "yes")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "1")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "on")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "y")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "enabled")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "TRUE")).toEqual(true);
    (0, vitest_1.expect)(z.parse(a, "false")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "no")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "0")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "off")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "n")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "disabled")).toEqual(false);
    (0, vitest_1.expect)(z.parse(a, "FALSE")).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(a, "other")).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(a, "")).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(a, undefined)).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(a, {})).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(a, true)).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(a, false)).toMatchObject({ success: false });
    const b = z.stringbool({
        truthy: ["y"],
        falsy: ["n"],
    });
    (0, vitest_1.expect)(z.parse(b, "y")).toEqual(true);
    (0, vitest_1.expect)(z.parse(b, "n")).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(b, "true")).toMatchObject({ success: false });
    (0, vitest_1.expect)(z.safeParse(b, "false")).toMatchObject({ success: false });
    const c = z.stringbool({
        case: "sensitive",
    });
    (0, vitest_1.expect)(z.parse(c, "true")).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(c, "TRUE")).toMatchObject({ success: false });
});
// promise
(0, vitest_1.test)("z.promise", async () => {
    const a = z.promise(z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(await z.safeParseAsync(a, Promise.resolve("hello"))).toMatchObject({
        success: true,
        data: "hello",
    });
    (0, vitest_1.expect)(await z.safeParseAsync(a, Promise.resolve(123))).toMatchObject({
        success: false,
    });
    const b = z.string();
    (0, vitest_1.expect)(() => z.parse(b, Promise.resolve("hello"))).toThrow();
});
// test("type assertions", () => {
//   const schema = z.pipe(
//     z.string(),
//     z.transform((val) => val.length)
//   );
//   schema.assertInput<string>();
//   // @ts-expect-error
//   schema.assertInput<number>();
//   schema.assertOutput<number>();
//   // @ts-expect-error
//   schema.assertOutput<string>();
// });

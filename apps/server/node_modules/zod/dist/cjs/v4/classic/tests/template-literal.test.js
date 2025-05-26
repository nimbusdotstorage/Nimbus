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
const empty = z.templateLiteral([]);
const hello = z.templateLiteral(["hello"]);
const world = z.templateLiteral(["", z.literal("world")]);
const one = z.templateLiteral([1]);
const two = z.templateLiteral(["", z.literal(2)]);
const truee = z.templateLiteral([true]);
const anotherTrue = z.templateLiteral(["", z.literal(true)]);
const falsee = z.templateLiteral([false]);
const anotherFalse = z.templateLiteral(["", z.literal(false)]);
const nulll = z.templateLiteral([null]);
const anotherNull = z.templateLiteral(["", z.null()]);
const undefinedd = z.templateLiteral([undefined]);
const anotherUndefined = z.templateLiteral(["", z.undefined()]);
const anyString = z.templateLiteral(["", z.string()]);
const lazyString = z.templateLiteral(["", z.lazy(() => z.string())]);
const anyNumber = z.templateLiteral(["", z.number()]);
const anyInt = z.templateLiteral(["", z.number().int()]);
// const anyFiniteNumber = z.templateLiteral(["", z.number().finite()]);
// const anyNegativeNumber = z.templateLiteral(["", z.number().negative()]);
// const anyPositiveNumber = z.templateLiteral(["", z.number().positive()]);
// const zeroButInADumbWay = z.templateLiteral(["", z.number().nonnegative().nonpositive()]);
// const finiteButInADumbWay = z.templateLiteral(["", z.number().min(5).max(10)]);
const bool = z.templateLiteral(["", z.boolean()]);
const bigone = z.templateLiteral(["", z.literal(BigInt(1))]);
const anyBigint = z.templateLiteral(["", z.bigint()]);
const nullableYo = z.templateLiteral(["", z.nullable(z.literal("yo"))]);
const nullableString = z.templateLiteral(["", z.nullable(z.string())]);
const optionalYeah = z.templateLiteral(["", z.literal("yeah").optional()]);
const optionalString = z.templateLiteral(["", z.string().optional()]);
const optionalNumber = z.templateLiteral(["", z.number().optional()]);
const nullishBruh = z.templateLiteral(["", z.literal("bruh").nullish()]);
const nullishString = z.templateLiteral(["", z.string().nullish()]);
const cuid = z.templateLiteral(["", z.string().cuid()]);
const cuidZZZ = z.templateLiteral(["", z.string().cuid(), "ZZZ"]);
const cuid2 = z.templateLiteral(["", z.string().cuid2()]);
const datetime = z.templateLiteral(["", z.string().datetime()]);
const email = z.templateLiteral(["", z.string().email()]);
// const ip = z.templateLiteral(["", z.string().ip()]);
const ipv4 = z.templateLiteral(["", z.string().ipv4()]);
const ipv6 = z.templateLiteral(["", z.string().ipv6()]);
const ulid = z.templateLiteral(["", z.string().ulid()]);
const uuid = z.templateLiteral(["", z.string().uuid()]);
const stringAToZ = z.templateLiteral(["", z.string().regex(/^[a-z]+$/)]);
const stringStartsWith = z.templateLiteral(["", z.string().startsWith("hello")]);
const stringEndsWith = z.templateLiteral(["", z.string().endsWith("world")]);
const stringMax5 = z.templateLiteral(["", z.string().max(5)]);
const stringMin5 = z.templateLiteral(["", z.string().min(5)]);
const stringLen5 = z.templateLiteral(["", z.string().length(5)]);
const stringMin5Max10 = z.templateLiteral(["", z.string().min(5).max(10)]);
const stringStartsWithMax5 = z.templateLiteral(["", z.string().startsWith("hello").max(5)]);
const brandedString = z.templateLiteral(["", z.string().min(1).brand("myBrand")]);
// const anything = z.templateLiteral(["", z.any()]);
const url = z.templateLiteral(["https://", z.string().regex(/\w+/), ".", z.enum(["com", "net"])]);
const measurement = z.templateLiteral([
    "",
    z.number().finite(),
    z.enum(["px", "em", "rem", "vh", "vw", "vmin", "vmax"]).optional(),
]);
const connectionString = z.templateLiteral([
    "mongodb://",
    z
        .templateLiteral([
        "",
        z.string().regex(/\w+/).describe("username"),
        ":",
        z.string().regex(/\w+/).describe("password"),
        "@",
    ])
        .optional(),
    z.string().regex(/\w+/).describe("host"),
    ":",
    z.number().finite().int().positive().describe("port"),
    z
        .templateLiteral([
        "/",
        z.string().regex(/\w+/).optional().describe("defaultauthdb"),
        z
            .templateLiteral([
            "?",
            z
                .string()
                .regex(/^\w+=\w+(&\w+=\w+)*$/)
                .optional()
                .describe("options"),
        ])
            .optional(),
    ])
        .optional(),
]);
(0, vitest_1.test)("template literal type inference", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // expectTypeOf<z.infer<typeof anyFiniteNumber>>().toEqualTypeOf<`${number}`>();
    // expectTypeOf<z.infer<typeof anyNegativeNumber>>().toEqualTypeOf<`${number}`>();
    // expectTypeOf<z.infer<typeof anyPositiveNumber>>().toEqualTypeOf<`${number}`>();
    // expectTypeOf<z.infer<typeof zeroButInADumbWay>>().toEqualTypeOf<`${number}`>();
    // expectTypeOf<z.infer<typeof finiteButInADumbWay>>().toEqualTypeOf<`${number}`>();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // expectTypeOf<z.infer<typeof ip>>().toEqualTypeOf<string>();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // expectTypeOf<z.infer<typeof anything>>().toEqualTypeOf<`${any}`>();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("template literal unsupported args", () => {
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.object({})])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.array(z.object({}))])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.union([z.object({}), z.string()])])).toThrow();
    // @ts-expect-error
    (0, vitest_1.expect)(() => z.templateLiteral([z.date()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.custom((_) => true)])).toThrow();
    (0, vitest_1.expect)(() => z.templateLiteral([
        // @ts-expect-error
        z.discriminatedUnion("discriminator", [z.object({}), z.object({})]),
    ])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.function()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.instanceof(class MyClass {
        })])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.intersection(z.object({}), z.object({}))])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.map(z.string(), z.string())])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.nullable(z.object({}))])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.optional(z.object({}))])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.promise()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.record(z.unknown())])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.set(z.string())])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.symbol()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.tuple([z.string()])])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.unknown()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.void()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.never()])).toThrow();
    // @ts-expect-error
    (0, vitest_1.expect)(() => z.templateLiteral([z.nan()])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.pipe(z.string(), z.string())])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.preprocess(() => true, z.boolean())])).toThrow();
    (0, vitest_1.expect)(() => 
    // @ts-expect-error
    z.templateLiteral([z.object({}).brand("brand")])).toThrow();
    // these constraints aren't enforced but they shouldn't throw
    z.templateLiteral([z.number().multipleOf(2)]);
    z.templateLiteral([z.string().emoji()]);
    z.templateLiteral([z.string().url()]);
    z.templateLiteral([z.string().url()]);
    z.templateLiteral([z.string().trim()]);
    z.templateLiteral([z.string().includes("train")]);
    z.templateLiteral([z.string().toLowerCase()]);
    z.templateLiteral([z.string().toUpperCase()]);
});
(0, vitest_1.test)("template literal parsing - success - basic cases", () => {
    (0, vitest_1.expect)(() => z.templateLiteral([]).parse(7)).toThrow();
    empty.parse("");
    hello.parse("hello");
    world.parse("world");
    one.parse("1");
    two.parse("2");
    truee.parse("true");
    anotherTrue.parse("true");
    falsee.parse("false");
    anotherFalse.parse("false");
    nulll.parse("null");
    anotherNull.parse("null");
    undefinedd.parse("undefined");
    anotherUndefined.parse("undefined");
    anyString.parse("blahblahblah");
    anyString.parse("");
    lazyString.parse("blahblahblah");
    lazyString.parse("");
    anyNumber.parse("123");
    anyNumber.parse("1.23");
    anyNumber.parse("0");
    anyNumber.parse("-1.23");
    anyNumber.parse("-123");
    // anyNumber.parse("Infinity");
    // anyNumber.parse("-Infinity");
    anyInt.parse("123");
    // anyInt.parse("-123");
    // anyFiniteNumber.parse("123");
    // anyFiniteNumber.parse("1.23");
    // anyFiniteNumber.parse("0");
    // anyFiniteNumber.parse("-1.23");
    // anyFiniteNumber.parse("-123");
    // anyNegativeNumber.parse("-123");
    // anyNegativeNumber.parse("-1.23");
    // anyNegativeNumber.parse("-Infinity");
    // anyPositiveNumber.parse("123");
    // anyPositiveNumber.parse("1.23");
    // anyPositiveNumber.parse("Infinity");
    // zeroButInADumbWay.parse("0");
    // zeroButInADumbWay.parse("00000");
    // finiteButInADumbWay.parse("5");
    // finiteButInADumbWay.parse("10");
    // finiteButInADumbWay.parse("6.66");
    bool.parse("true");
    bool.parse("false");
    bigone.parse("1");
    anyBigint.parse("123456");
    anyBigint.parse("0");
    // anyBigint.parse("-123456");
    nullableYo.parse("yo");
    nullableYo.parse("null");
    nullableString.parse("abc");
    nullableString.parse("null");
    optionalYeah.parse("yeah");
    optionalYeah.parse("");
    optionalString.parse("abc");
    optionalString.parse("");
    optionalNumber.parse("123");
    optionalNumber.parse("1.23");
    optionalNumber.parse("0");
    optionalNumber.parse("-1.23");
    optionalNumber.parse("-123");
    // optionalNumber.parse("Infinity");
    // optionalNumber.parse("-Infinity");
    nullishBruh.parse("bruh");
    nullishBruh.parse("null");
    nullishBruh.parse("");
    cuid.parse("cjld2cyuq0000t3rmniod1foy");
    cuidZZZ.parse("cjld2cyuq0000t3rmniod1foyZZZ");
    cuid2.parse("tz4a98xxat96iws9zmbrgj3a");
    datetime.parse(new Date().toISOString());
    email.parse("info@example.com");
    // ip.parse("213.174.246.205");
    // ip.parse("c359:f57c:21e5:39eb:1187:e501:f936:b452");
    ipv4.parse("213.174.246.205");
    ipv6.parse("c359:f57c:21e5:39eb:1187:e501:f936:b452");
    ulid.parse("01GW3D2QZJBYB6P1Z1AE997VPW");
    uuid.parse("808989fd-3a6e-4af2-b607-737323a176f6");
    stringAToZ.parse("asudgaskhdgashd");
    stringStartsWith.parse("hello world");
    stringEndsWith.parse("hello world");
    stringMax5.parse("hello");
    stringMin5.parse("hello");
    stringLen5.parse("hello");
    stringMin5Max10.parse("hello worl");
    stringStartsWithMax5.parse("hello");
    brandedString.parse("branded string");
});
(0, vitest_1.test)("template literal parsing - failure - basic cases", () => {
    (0, vitest_1.expect)(() => empty.parse("a")).toThrow();
    (0, vitest_1.expect)(() => hello.parse("hello!")).toThrow();
    (0, vitest_1.expect)(() => hello.parse("!hello")).toThrow();
    (0, vitest_1.expect)(() => world.parse("world!")).toThrow();
    (0, vitest_1.expect)(() => world.parse("!world")).toThrow();
    (0, vitest_1.expect)(() => one.parse("2")).toThrow();
    (0, vitest_1.expect)(() => one.parse("12")).toThrow();
    (0, vitest_1.expect)(() => one.parse("21")).toThrow();
    (0, vitest_1.expect)(() => two.parse("1")).toThrow();
    (0, vitest_1.expect)(() => two.parse("21")).toThrow();
    (0, vitest_1.expect)(() => two.parse("12")).toThrow();
    (0, vitest_1.expect)(() => truee.parse("false")).toThrow();
    (0, vitest_1.expect)(() => truee.parse("1true")).toThrow();
    (0, vitest_1.expect)(() => truee.parse("true1")).toThrow();
    (0, vitest_1.expect)(() => anotherTrue.parse("false")).toThrow();
    (0, vitest_1.expect)(() => anotherTrue.parse("1true")).toThrow();
    (0, vitest_1.expect)(() => anotherTrue.parse("true1")).toThrow();
    (0, vitest_1.expect)(() => falsee.parse("true")).toThrow();
    (0, vitest_1.expect)(() => falsee.parse("1false")).toThrow();
    (0, vitest_1.expect)(() => falsee.parse("false1")).toThrow();
    (0, vitest_1.expect)(() => anotherFalse.parse("true")).toThrow();
    (0, vitest_1.expect)(() => anotherFalse.parse("1false")).toThrow();
    (0, vitest_1.expect)(() => anotherFalse.parse("false1")).toThrow();
    (0, vitest_1.expect)(() => nulll.parse("123")).toThrow();
    (0, vitest_1.expect)(() => nulll.parse("null1")).toThrow();
    (0, vitest_1.expect)(() => nulll.parse("1null")).toThrow();
    (0, vitest_1.expect)(() => anotherNull.parse("123")).toThrow();
    (0, vitest_1.expect)(() => anotherNull.parse("null1")).toThrow();
    (0, vitest_1.expect)(() => anotherNull.parse("1null")).toThrow();
    (0, vitest_1.expect)(() => undefinedd.parse("123")).toThrow();
    (0, vitest_1.expect)(() => undefinedd.parse("undefined1")).toThrow();
    (0, vitest_1.expect)(() => undefinedd.parse("1undefined")).toThrow();
    (0, vitest_1.expect)(() => anotherUndefined.parse("123")).toThrow();
    (0, vitest_1.expect)(() => anotherUndefined.parse("undefined1")).toThrow();
    (0, vitest_1.expect)(() => anotherUndefined.parse("1undefined")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2a")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("a2")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2a")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("a-2")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2.5a")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("a2.5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("Infinitya")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("aInfinity")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-Infinitya")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("a-Infinity")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2e5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2e-5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2e+5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2e5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2e-5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2e+5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2.1e5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2.1e-5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("2.1e+5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2.1e5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2.1e-5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-2.1e+5")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("-Infinity")).toThrow();
    (0, vitest_1.expect)(() => anyNumber.parse("Infinity")).toThrow();
    (0, vitest_1.expect)(() => anyInt.parse("1.23")).toThrow();
    (0, vitest_1.expect)(() => anyInt.parse("-1.23")).toThrow();
    (0, vitest_1.expect)(() => anyInt.parse("d1")).toThrow();
    (0, vitest_1.expect)(() => anyInt.parse("1d")).toThrow();
    // expect(() => anyFiniteNumber.parse("Infinity")).toThrow();
    // expect(() => anyFiniteNumber.parse("-Infinity")).toThrow();
    // expect(() => anyFiniteNumber.parse("123a")).toThrow();
    // expect(() => anyFiniteNumber.parse("a123")).toThrow();
    // expect(() => anyNegativeNumber.parse("0")).toThrow();
    // expect(() => anyNegativeNumber.parse("1")).toThrow();
    // expect(() => anyNegativeNumber.parse("Infinity")).toThrow();
    // expect(() => anyPositiveNumber.parse("0")).toThrow();
    // expect(() => anyPositiveNumber.parse("-1")).toThrow();
    // expect(() => anyPositiveNumber.parse("-Infinity")).toThrow();
    // expect(() => zeroButInADumbWay.parse("1")).toThrow();
    // expect(() => zeroButInADumbWay.parse("-1")).toThrow();
    // expect(() => finiteButInADumbWay.parse("Infinity")).toThrow();
    // expect(() => finiteButInADumbWay.parse("-Infinity")).toThrow();
    // expect(() => finiteButInADumbWay.parse("-5")).toThrow();
    // expect(() => finiteButInADumbWay.parse("10a")).toThrow();
    // expect(() => finiteButInADumbWay.parse("a10")).toThrow();
    (0, vitest_1.expect)(() => bool.parse("123")).toThrow();
    (0, vitest_1.expect)(() => bigone.parse("2")).toThrow();
    (0, vitest_1.expect)(() => bigone.parse("c1")).toThrow();
    (0, vitest_1.expect)(() => anyBigint.parse("1.23")).toThrow();
    (0, vitest_1.expect)(() => anyBigint.parse("-1.23")).toThrow();
    (0, vitest_1.expect)(() => anyBigint.parse("c123")).toThrow();
    (0, vitest_1.expect)(() => nullableYo.parse("yo1")).toThrow();
    (0, vitest_1.expect)(() => nullableYo.parse("1yo")).toThrow();
    (0, vitest_1.expect)(() => nullableYo.parse("null1")).toThrow();
    (0, vitest_1.expect)(() => nullableYo.parse("1null")).toThrow();
    (0, vitest_1.expect)(() => optionalYeah.parse("yeah1")).toThrow();
    (0, vitest_1.expect)(() => optionalYeah.parse("1yeah")).toThrow();
    (0, vitest_1.expect)(() => optionalYeah.parse("undefined")).toThrow();
    (0, vitest_1.expect)(() => optionalNumber.parse("123a")).toThrow();
    (0, vitest_1.expect)(() => optionalNumber.parse("a123")).toThrow();
    // expect(() => optionalNumber.parse("Infinitya")).toThrow();
    // expect(() => optionalNumber.parse("aInfinity")).toThrow();
    (0, vitest_1.expect)(() => nullishBruh.parse("bruh1")).toThrow();
    (0, vitest_1.expect)(() => nullishBruh.parse("1bruh")).toThrow();
    (0, vitest_1.expect)(() => nullishBruh.parse("null1")).toThrow();
    (0, vitest_1.expect)(() => nullishBruh.parse("1null")).toThrow();
    (0, vitest_1.expect)(() => nullishBruh.parse("undefined")).toThrow();
    (0, vitest_1.expect)(() => cuid.parse("bjld2cyuq0000t3rmniod1foy")).toThrow();
    (0, vitest_1.expect)(() => cuid.parse("cjld2cyu")).toThrow();
    (0, vitest_1.expect)(() => cuid.parse("cjld2 cyu")).toThrow();
    (0, vitest_1.expect)(() => cuid.parse("cjld2cyuq0000t3rmniod1foy ")).toThrow();
    (0, vitest_1.expect)(() => cuid.parse("1cjld2cyuq0000t3rmniod1foy")).toThrow();
    (0, vitest_1.expect)(() => cuidZZZ.parse("cjld2cyuq0000t3rmniod1foy")).toThrow();
    (0, vitest_1.expect)(() => cuidZZZ.parse("cjld2cyuq0000t3rmniod1foyZZY")).toThrow();
    (0, vitest_1.expect)(() => cuidZZZ.parse("cjld2cyuq0000t3rmniod1foyZZZ1")).toThrow();
    (0, vitest_1.expect)(() => cuidZZZ.parse("1cjld2cyuq0000t3rmniod1foyZZZ")).toThrow();
    (0, vitest_1.expect)(() => cuid2.parse("A9z4a98xxat96iws9zmbrgj3a")).toThrow();
    (0, vitest_1.expect)(() => cuid2.parse("tz4a98xxat96iws9zmbrgj3!")).toThrow();
    (0, vitest_1.expect)(() => datetime.parse("2022-01-01 00:00:00")).toThrow();
    (0, vitest_1.expect)(() => email.parse("info@example.com@")).toThrow();
    // expect(() => ip.parse("213.174.246:205")).toThrow();
    // expect(() => ip.parse("c359.f57c:21e5:39eb:1187:e501:f936:b452")).toThrow();
    (0, vitest_1.expect)(() => ipv4.parse("1213.174.246.205")).toThrow();
    (0, vitest_1.expect)(() => ipv4.parse("c359:f57c:21e5:39eb:1187:e501:f936:b452")).toThrow();
    (0, vitest_1.expect)(() => ipv6.parse("c359:f57c:21e5:39eb:1187:e501:f936:b4521")).toThrow();
    (0, vitest_1.expect)(() => ipv6.parse("213.174.246.205")).toThrow();
    (0, vitest_1.expect)(() => ulid.parse("01GW3D2QZJBYB6P1Z1AE997VPW!")).toThrow();
    (0, vitest_1.expect)(() => uuid.parse("808989fd-3a6e-4af2-b607-737323a176f6Z")).toThrow();
    (0, vitest_1.expect)(() => uuid.parse("Z808989fd-3a6e-4af2-b607-737323a176f6")).toThrow();
    (0, vitest_1.expect)(() => stringAToZ.parse("asdasdasd1")).toThrow();
    (0, vitest_1.expect)(() => stringAToZ.parse("1asdasdasd")).toThrow();
    (0, vitest_1.expect)(() => stringStartsWith.parse("ahello")).toThrow();
    (0, vitest_1.expect)(() => stringEndsWith.parse("worlda")).toThrow();
    (0, vitest_1.expect)(() => stringMax5.parse("123456")).toThrow();
    (0, vitest_1.expect)(() => stringMin5.parse("1234")).toThrow();
    (0, vitest_1.expect)(() => stringLen5.parse("123456")).toThrow();
    (0, vitest_1.expect)(() => stringLen5.parse("1234")).toThrow();
    (0, vitest_1.expect)(() => stringMin5Max10.parse("1234")).toThrow();
    (0, vitest_1.expect)(() => stringMin5Max10.parse("12345678901")).toThrow();
    // the "startswith" overrides the max length
    // expect(() => stringStartsWithMax5.parse("hello1")).toThrow();
    (0, vitest_1.expect)(() => stringStartsWithMax5.parse("1hell")).toThrow();
    (0, vitest_1.expect)(() => brandedString.parse("")).toThrow();
});
(0, vitest_1.test)("regexes", () => {
    (0, vitest_1.expect)(empty._zod.pattern.source).toMatchInlineSnapshot(`"^$"`);
    (0, vitest_1.expect)(hello._zod.pattern.source).toMatchInlineSnapshot(`"^hello$"`);
    (0, vitest_1.expect)(world._zod.pattern.source).toMatchInlineSnapshot(`"^(world)$"`);
    (0, vitest_1.expect)(one._zod.pattern.source).toMatchInlineSnapshot(`"^1$"`);
    (0, vitest_1.expect)(two._zod.pattern.source).toMatchInlineSnapshot(`"^(2)$"`);
    (0, vitest_1.expect)(truee._zod.pattern.source).toMatchInlineSnapshot(`"^true$"`);
    (0, vitest_1.expect)(anotherTrue._zod.pattern.source).toMatchInlineSnapshot(`"^(true)$"`);
    (0, vitest_1.expect)(falsee._zod.pattern.source).toMatchInlineSnapshot(`"^false$"`);
    (0, vitest_1.expect)(anotherFalse._zod.pattern.source).toMatchInlineSnapshot(`"^(false)$"`);
    (0, vitest_1.expect)(nulll._zod.pattern.source).toMatchInlineSnapshot(`"^null$"`);
    (0, vitest_1.expect)(anotherNull._zod.pattern.source).toMatchInlineSnapshot(`"^null$"`);
    (0, vitest_1.expect)(undefinedd._zod.pattern.source).toMatchInlineSnapshot(`"^undefined$"`);
    (0, vitest_1.expect)(anotherUndefined._zod.pattern.source).toMatchInlineSnapshot(`"^undefined$"`);
    (0, vitest_1.expect)(anyString._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{0,}$"`);
    (0, vitest_1.expect)(lazyString._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{0,}$"`);
    (0, vitest_1.expect)(anyNumber._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    (0, vitest_1.expect)(anyInt._zod.pattern.source).toMatchInlineSnapshot(`"^\\d+$"`);
    // expect(anyFiniteNumber._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    // expect(anyNegativeNumber._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    // expect(anyPositiveNumber._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    // expect(zeroButInADumbWay._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    // expect(finiteButInADumbWay._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?$"`);
    (0, vitest_1.expect)(bool._zod.pattern.source).toMatchInlineSnapshot(`"^true|false$"`);
    (0, vitest_1.expect)(bigone._zod.pattern.source).toMatchInlineSnapshot(`"^(1)$"`);
    (0, vitest_1.expect)(anyBigint._zod.pattern.source).toMatchInlineSnapshot(`"^\\d+n?$"`);
    (0, vitest_1.expect)(nullableYo._zod.pattern.source).toMatchInlineSnapshot(`"^((yo)|null)$"`);
    (0, vitest_1.expect)(nullableString._zod.pattern.source).toMatchInlineSnapshot(`"^([\\s\\S]{0,}|null)$"`);
    (0, vitest_1.expect)(optionalYeah._zod.pattern.source).toMatchInlineSnapshot(`"^((yeah))?$"`);
    (0, vitest_1.expect)(optionalString._zod.pattern.source).toMatchInlineSnapshot(`"^([\\s\\S]{0,})?$"`);
    (0, vitest_1.expect)(optionalNumber._zod.pattern.source).toMatchInlineSnapshot(`"^(-?\\d+(?:\\.\\d+)?)?$"`);
    (0, vitest_1.expect)(nullishBruh._zod.pattern.source).toMatchInlineSnapshot(`"^(((bruh)|null))?$"`);
    (0, vitest_1.expect)(nullishString._zod.pattern.source).toMatchInlineSnapshot(`"^(([\\s\\S]{0,}|null))?$"`);
    (0, vitest_1.expect)(cuid._zod.pattern.source).toMatchInlineSnapshot(`"^[cC][^\\s-]{8,}$"`);
    (0, vitest_1.expect)(cuidZZZ._zod.pattern.source).toMatchInlineSnapshot(`"^[cC][^\\s-]{8,}ZZZ$"`);
    (0, vitest_1.expect)(cuid2._zod.pattern.source).toMatchInlineSnapshot(`"^[0-9a-z]+$"`);
    (0, vitest_1.expect)(datetime._zod.pattern.source).toMatchInlineSnapshot(`"^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?(Z)$"`);
    (0, vitest_1.expect)(email._zod.pattern.source).toMatchInlineSnapshot(`"^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$"`);
    // expect(ip._zod.pattern.source).toMatchInlineSnapshot(
    //   `"^(^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$)|(^(([a-fA-F0-9]{1,4}:){7}|::([a-fA-F0-9]{1,4}:){0,6}|([a-fA-F0-9]{1,4}:){1}:([a-fA-F0-9]{1,4}:){0,5}|([a-fA-F0-9]{1,4}:){2}:([a-fA-F0-9]{1,4}:){0,4}|([a-fA-F0-9]{1,4}:){3}:([a-fA-F0-9]{1,4}:){0,3}|([a-fA-F0-9]{1,4}:){4}:([a-fA-F0-9]{1,4}:){0,2}|([a-fA-F0-9]{1,4}:){5}:([a-fA-F0-9]{1,4}:){0,1})([a-fA-F0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$)$"`
    // );
    (0, vitest_1.expect)(ipv4._zod.pattern.source).toMatchInlineSnapshot(`"^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"`);
    (0, vitest_1.expect)(ipv6._zod.pattern.source).toMatchInlineSnapshot(`"^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$"`);
    (0, vitest_1.expect)(ulid._zod.pattern.source).toMatchInlineSnapshot(`"^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$"`);
    (0, vitest_1.expect)(uuid._zod.pattern.source).toMatchInlineSnapshot(`"^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$"`);
    (0, vitest_1.expect)(stringAToZ._zod.pattern.source).toMatchInlineSnapshot(`"^[a-z]+$"`);
    (0, vitest_1.expect)(stringStartsWith._zod.pattern.source).toMatchInlineSnapshot(`"^hello.*$"`);
    (0, vitest_1.expect)(stringEndsWith._zod.pattern.source).toMatchInlineSnapshot(`"^.*world$"`);
    (0, vitest_1.expect)(stringMax5._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{0,5}$"`);
    (0, vitest_1.expect)(stringMin5._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{5,}$"`);
    (0, vitest_1.expect)(stringLen5._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{5,5}$"`);
    (0, vitest_1.expect)(stringMin5Max10._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{5,10}$"`);
    (0, vitest_1.expect)(brandedString._zod.pattern.source).toMatchInlineSnapshot(`"^[\\s\\S]{1,}$"`);
    (0, vitest_1.expect)(url._zod.pattern.source).toMatchInlineSnapshot(`"^https:\\/\\/\\w+\\.(com|net)$"`);
    (0, vitest_1.expect)(measurement._zod.pattern.source).toMatchInlineSnapshot(`"^-?\\d+(?:\\.\\d+)?((px|em|rem|vh|vw|vmin|vmax))?$"`);
    (0, vitest_1.expect)(connectionString._zod.pattern.source).toMatchInlineSnapshot(`"^mongodb:\\/\\/(\\w+:\\w+@)?\\w+:\\d+(\\/(\\w+)?(\\?(\\w+=\\w+(&\\w+=\\w+)*)?)?)?$"`);
});
(0, vitest_1.test)("template literal parsing - success - complex cases", () => {
    url.parse("https://example.com");
    url.parse("https://speedtest.net");
    // measurement.parse(1);
    // measurement.parse(1.1);
    // measurement.parse(0);
    // measurement.parse(-1.1);
    // measurement.parse(-1);
    measurement.parse("1");
    measurement.parse("1.1");
    measurement.parse("0");
    measurement.parse("-1");
    measurement.parse("-1.1");
    measurement.parse("1px");
    measurement.parse("1.1px");
    measurement.parse("0px");
    measurement.parse("-1px");
    measurement.parse("-1.1px");
    measurement.parse("1em");
    measurement.parse("1.1em");
    measurement.parse("0em");
    measurement.parse("-1em");
    measurement.parse("-1.1em");
    measurement.parse("1rem");
    measurement.parse("1.1rem");
    measurement.parse("0rem");
    measurement.parse("-1rem");
    measurement.parse("-1.1rem");
    measurement.parse("1vh");
    measurement.parse("1.1vh");
    measurement.parse("0vh");
    measurement.parse("-1vh");
    measurement.parse("-1.1vh");
    measurement.parse("1vw");
    measurement.parse("1.1vw");
    measurement.parse("0vw");
    measurement.parse("-1vw");
    measurement.parse("-1.1vw");
    measurement.parse("1vmin");
    measurement.parse("1.1vmin");
    measurement.parse("0vmin");
    measurement.parse("-1vmin");
    measurement.parse("-1.1vmin");
    measurement.parse("1vmax");
    measurement.parse("1.1vmax");
    measurement.parse("0vmax");
    measurement.parse("-1vmax");
    measurement.parse("-1.1vmax");
    connectionString.parse("mongodb://host:1234");
    connectionString.parse("mongodb://host:1234/");
    connectionString.parse("mongodb://host:1234/defaultauthdb");
    connectionString.parse("mongodb://host:1234/defaultauthdb?authSource=admin");
    connectionString.parse("mongodb://host:1234/defaultauthdb?authSource=admin&connectTimeoutMS=300000");
    connectionString.parse("mongodb://host:1234/?authSource=admin");
    connectionString.parse("mongodb://host:1234/?authSource=admin&connectTimeoutMS=300000");
    connectionString.parse("mongodb://username:password@host:1234");
    connectionString.parse("mongodb://username:password@host:1234/");
    connectionString.parse("mongodb://username:password@host:1234/defaultauthdb");
    connectionString.parse("mongodb://username:password@host:1234/defaultauthdb?authSource=admin");
    connectionString.parse("mongodb://username:password@host:1234/defaultauthdb?authSource=admin&connectTimeoutMS=300000");
    connectionString.parse("mongodb://username:password@host:1234/?authSource=admin");
    connectionString.parse("mongodb://username:password@host:1234/?authSource=admin&connectTimeoutMS=300000");
});
(0, vitest_1.test)("template literal parsing - failure - complex cases", () => {
    (0, vitest_1.expect)(() => url.parse("http://example.com")).toThrow();
    (0, vitest_1.expect)(() => url.parse("https://.com")).toThrow();
    (0, vitest_1.expect)(() => url.parse("https://examplecom")).toThrow();
    (0, vitest_1.expect)(() => url.parse("https://example.org")).toThrow();
    (0, vitest_1.expect)(() => url.parse("https://example.net.il")).toThrow();
    (0, vitest_1.expect)(() => measurement.parse("1.1.1")).toThrow();
    (0, vitest_1.expect)(() => measurement.parse("Infinity")).toThrow();
    (0, vitest_1.expect)(() => measurement.parse("-Infinity")).toThrow();
    (0, vitest_1.expect)(() => measurement.parse("NaN")).toThrow();
    (0, vitest_1.expect)(() => measurement.parse("1%")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongod://host:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:d234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:12.34")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:-1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:-12.34")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://:password@host:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://usernamepassword@host:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://username:@host:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://@host:1234")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:1234/defaultauthdb?authSourceadmin")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:1234/?authSourceadmin")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:1234/defaultauthdb?&authSource=admin")).toThrow();
    (0, vitest_1.expect)(() => connectionString.parse("mongodb://host:1234/?&authSource=admin")).toThrow();
});
(0, vitest_1.test)("template literal parsing - failure - issue format", () => {
    (0, vitest_1.expect)(anotherNull.safeParse("1null")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_format",
        "format": "template_literal",
        "pattern": "^null$",
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(cuidZZZ.safeParse("1cjld2cyuq0000t3rmniod1foyZZZ")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_format",
        "format": "template_literal",
        "pattern": "^[cC][^\\\\s-]{8,}ZZZ$",
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(stringMin5Max10.safeParse("1234")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_format",
        "format": "template_literal",
        "pattern": "^[\\\\s\\\\S]{5,10}$",
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(connectionString.safeParse("mongodb://host:1234/defaultauthdb?authSourceadmin")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_format",
        "format": "template_literal",
        "pattern": "^mongodb:\\\\/\\\\/(\\\\w+:\\\\w+@)?\\\\w+:\\\\d+(\\\\/(\\\\w+)?(\\\\?(\\\\w+=\\\\w+(&\\\\w+=\\\\w+)*)?)?)?$",
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(stringStartsWithMax5.safeParse("1hell")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_format",
        "format": "template_literal",
        "pattern": "^hello.*$",
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
});

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
const literalStringSchema = z.literal("asdf");
const literalNumberSchema = z.literal(12);
const literalBooleanSchema = z.literal(true);
const literalBigIntSchema = z.literal(BigInt(42));
const stringSchema = z.string();
const numberSchema = z.number();
const bigintSchema = z.bigint();
const booleanSchema = z.boolean();
const dateSchema = z.date();
const symbolSchema = z.symbol();
const nullSchema = z.null();
const undefinedSchema = z.undefined();
const stringSchemaOptional = z.string().optional();
const stringSchemaNullable = z.string().nullable();
const numberSchemaOptional = z.number().optional();
const numberSchemaNullable = z.number().nullable();
const bigintSchemaOptional = z.bigint().optional();
const bigintSchemaNullable = z.bigint().nullable();
const booleanSchemaOptional = z.boolean().optional();
const booleanSchemaNullable = z.boolean().nullable();
const dateSchemaOptional = z.date().optional();
const dateSchemaNullable = z.date().nullable();
const symbolSchemaOptional = z.symbol().optional();
const symbolSchemaNullable = z.symbol().nullable();
(0, vitest_1.test)("literal string schema", () => {
    (0, vitest_1.expect)(literalStringSchema.parse("asdf")).toBe("asdf");
    (0, vitest_1.expect)(() => literalStringSchema.parse("not_asdf")).toThrow();
    (0, vitest_1.expect)(() => literalStringSchema.parse(123)).toThrow();
    (0, vitest_1.expect)(() => literalStringSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => literalStringSchema.parse({})).toThrow();
});
(0, vitest_1.test)("literal number schema", () => {
    (0, vitest_1.expect)(literalNumberSchema.parse(12)).toBe(12);
    (0, vitest_1.expect)(() => literalNumberSchema.parse(13)).toThrow();
    (0, vitest_1.expect)(() => literalNumberSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => literalNumberSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => literalNumberSchema.parse({})).toThrow();
});
(0, vitest_1.test)("literal boolean schema", () => {
    (0, vitest_1.expect)(literalBooleanSchema.parse(true)).toBe(true);
    (0, vitest_1.expect)(() => literalBooleanSchema.parse(false)).toThrow();
    (0, vitest_1.expect)(() => literalBooleanSchema.parse("asdf")).toThrow();
    (0, vitest_1.expect)(() => literalBooleanSchema.parse(123)).toThrow();
    (0, vitest_1.expect)(() => literalBooleanSchema.parse({})).toThrow();
});
(0, vitest_1.test)("literal bigint schema", () => {
    (0, vitest_1.expect)(literalBigIntSchema.parse(BigInt(42))).toBe(BigInt(42));
    (0, vitest_1.expect)(() => literalBigIntSchema.parse(BigInt(43))).toThrow();
    (0, vitest_1.expect)(() => literalBigIntSchema.parse("asdf")).toThrow();
    (0, vitest_1.expect)(() => literalBigIntSchema.parse(123)).toThrow();
    (0, vitest_1.expect)(() => literalBigIntSchema.parse({})).toThrow();
});
(0, vitest_1.test)("string schema", () => {
    stringSchema.parse("foo");
    (0, vitest_1.expect)(() => stringSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => stringSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => stringSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => stringSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("number schema", () => {
    numberSchema.parse(Math.random());
    (0, vitest_1.expect)(() => numberSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => numberSchema.parse(BigInt(17))).toThrow();
    (0, vitest_1.expect)(() => numberSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => numberSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => numberSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("bigint schema", () => {
    bigintSchema.parse(BigInt(17));
    (0, vitest_1.expect)(() => bigintSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => bigintSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => bigintSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => bigintSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => bigintSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("boolean schema", () => {
    booleanSchema.parse(true);
    (0, vitest_1.expect)(() => booleanSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => booleanSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => booleanSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => booleanSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("date schema", async () => {
    dateSchema.parse(new Date());
    (0, vitest_1.expect)(() => dateSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => dateSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => dateSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => dateSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => dateSchema.parse(null)).toThrow();
    (0, vitest_1.expect)(await dateSchema.safeParseAsync(new Date("invalid"))).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "date",
        "code": "invalid_type",
        "received": "Invalid Date",
        "path": [],
        "message": "Invalid input: expected date, received Date"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("symbol schema", () => {
    symbolSchema.parse(Symbol("foo"));
    (0, vitest_1.expect)(() => symbolSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => symbolSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => symbolSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => symbolSchema.parse(new Date())).toThrow();
    (0, vitest_1.expect)(() => symbolSchema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => symbolSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("undefined schema", () => {
    undefinedSchema.parse(undefined);
    (0, vitest_1.expect)(() => undefinedSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => undefinedSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => undefinedSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => undefinedSchema.parse(null)).toThrow();
});
(0, vitest_1.test)("null schema", () => {
    nullSchema.parse(null);
    (0, vitest_1.expect)(() => nullSchema.parse("foo")).toThrow();
    (0, vitest_1.expect)(() => nullSchema.parse(Math.random())).toThrow();
    (0, vitest_1.expect)(() => nullSchema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => nullSchema.parse(undefined)).toThrow();
});
(0, vitest_1.test)("primitive inference", () => {
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("get literal values", () => {
    (0, vitest_1.expect)(literalStringSchema.values).toEqual(new Set(["asdf"]));
    (0, vitest_1.expect)(literalStringSchema._zod.def.values).toEqual(["asdf"]);
});

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
const Mocker_js_1 = require("./Mocker.js");
const literalStringSchema = z.literal("asdf");
const literalNumberSchema = z.literal(12);
const literalBooleanSchema = z.literal(true);
const literalBigIntSchema = z.literal(BigInt(42));
const MySymbol = Symbol("stuff");
const literalSymbolSchema = z.literal(MySymbol);
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
const val = new Mocker_js_1.Mocker();
(0, vitest_1.test)("literal string correct", () => {
    (0, vitest_1.expect)(literalStringSchema.parse("asdf")).toBe("asdf");
});
(0, vitest_1.test)("literal string incorrect", () => {
    const f = () => literalStringSchema.parse("not_asdf");
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal string number", () => {
    const f = () => literalStringSchema.parse(123);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal string boolean", () => {
    const f = () => literalStringSchema.parse(true);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal string boolean", () => {
    const f = () => literalStringSchema.parse(true);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal string object", () => {
    const f = () => literalStringSchema.parse({});
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal number correct", () => {
    (0, vitest_1.expect)(literalNumberSchema.parse(12)).toBe(12);
});
(0, vitest_1.test)("literal number incorrect", () => {
    const f = () => literalNumberSchema.parse(13);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal number number", () => {
    const f = () => literalNumberSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal number boolean", () => {
    const f = () => literalNumberSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal number object", () => {
    const f = () => literalStringSchema.parse({});
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal boolean correct", () => {
    (0, vitest_1.expect)(literalBooleanSchema.parse(true)).toBe(true);
});
(0, vitest_1.test)("literal boolean incorrect", () => {
    const f = () => literalBooleanSchema.parse(false);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal boolean number", () => {
    const f = () => literalBooleanSchema.parse("asdf");
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal boolean boolean", () => {
    const f = () => literalBooleanSchema.parse(123);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal boolean object", () => {
    const f = () => literalBooleanSchema.parse({});
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal bigint correct", () => {
    (0, vitest_1.expect)(literalBigIntSchema.parse(BigInt(42))).toBe(BigInt(42));
});
(0, vitest_1.test)("literal bigint incorrect", () => {
    const f = () => literalBigIntSchema.parse(BigInt(43));
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal bigint number", () => {
    const f = () => literalBigIntSchema.parse("asdf");
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal bigint boolean", () => {
    const f = () => literalBigIntSchema.parse(123);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal bigint object", () => {
    const f = () => literalBigIntSchema.parse({});
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("literal symbol", () => {
    util_js_1.util.assertEqual(true);
    literalSymbolSchema.parse(MySymbol);
    (0, vitest_1.expect)(() => literalSymbolSchema.parse(Symbol("asdf"))).toThrow();
});
(0, vitest_1.test)("parse stringSchema string", () => {
    stringSchema.parse(val.string);
});
(0, vitest_1.test)("parse stringSchema number", () => {
    const f = () => stringSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse stringSchema boolean", () => {
    const f = () => stringSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse stringSchema undefined", () => {
    const f = () => stringSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse stringSchema null", () => {
    const f = () => stringSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse numberSchema string", () => {
    const f = () => numberSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse numberSchema number", () => {
    numberSchema.parse(val.number);
});
(0, vitest_1.test)("parse numberSchema bigint", () => {
    const f = () => numberSchema.parse(val.bigint);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse numberSchema boolean", () => {
    const f = () => numberSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse numberSchema undefined", () => {
    const f = () => numberSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse numberSchema null", () => {
    const f = () => numberSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse bigintSchema string", () => {
    const f = () => bigintSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse bigintSchema number", () => {
    const f = () => bigintSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse bigintSchema bigint", () => {
    bigintSchema.parse(val.bigint);
});
(0, vitest_1.test)("parse bigintSchema boolean", () => {
    const f = () => bigintSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse bigintSchema undefined", () => {
    const f = () => bigintSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse bigintSchema null", () => {
    const f = () => bigintSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse booleanSchema string", () => {
    const f = () => booleanSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse booleanSchema number", () => {
    const f = () => booleanSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse booleanSchema boolean", () => {
    booleanSchema.parse(val.boolean);
});
(0, vitest_1.test)("parse booleanSchema undefined", () => {
    const f = () => booleanSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse booleanSchema null", () => {
    const f = () => booleanSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
// ==============
(0, vitest_1.test)("parse dateSchema string", () => {
    const f = () => dateSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse dateSchema number", () => {
    const f = () => dateSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse dateSchema boolean", () => {
    const f = () => dateSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse dateSchema date", () => {
    dateSchema.parse(val.date);
});
(0, vitest_1.test)("parse dateSchema undefined", () => {
    const f = () => dateSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse dateSchema null", () => {
    const f = () => dateSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse dateSchema invalid date", async () => {
    try {
        await dateSchema.parseAsync(new Date("invalid"));
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].code).toEqual(z.ZodIssueCode.invalid_date);
    }
});
// ==============
(0, vitest_1.test)("parse symbolSchema string", () => {
    const f = () => symbolSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse symbolSchema number", () => {
    const f = () => symbolSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse symbolSchema boolean", () => {
    const f = () => symbolSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse symbolSchema date", () => {
    const f = () => symbolSchema.parse(val.date);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse symbolSchema symbol", () => {
    symbolSchema.parse(val.symbol);
});
(0, vitest_1.test)("parse symbolSchema undefined", () => {
    const f = () => symbolSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse symbolSchema null", () => {
    const f = () => symbolSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
// ==============
(0, vitest_1.test)("parse undefinedSchema string", () => {
    const f = () => undefinedSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse undefinedSchema number", () => {
    const f = () => undefinedSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse undefinedSchema boolean", () => {
    const f = () => undefinedSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse undefinedSchema undefined", () => {
    undefinedSchema.parse(val.undefined);
});
(0, vitest_1.test)("parse undefinedSchema null", () => {
    const f = () => undefinedSchema.parse(val.null);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse nullSchema string", () => {
    const f = () => nullSchema.parse(val.string);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse nullSchema number", () => {
    const f = () => nullSchema.parse(val.number);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse nullSchema boolean", () => {
    const f = () => nullSchema.parse(val.boolean);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse nullSchema undefined", () => {
    const f = () => nullSchema.parse(val.undefined);
    (0, vitest_1.expect)(f).toThrow();
});
(0, vitest_1.test)("parse nullSchema null", () => {
    nullSchema.parse(val.null);
});
(0, vitest_1.test)("primitive inference", () => {
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    // [
    //   literalStringSchemaTest,
    //   literalNumberSchemaTest,
    //   literalBooleanSchemaTest,
    //   literalBigIntSchemaTest,
    //   stringSchemaTest,
    //   numberSchemaTest,
    //   bigintSchemaTest,
    //   booleanSchemaTest,
    //   dateSchemaTest,
    //   symbolSchemaTest,
    //   nullSchemaTest,
    //   undefinedSchemaTest,
    //   stringSchemaOptionalTest,
    //   stringSchemaNullableTest,
    //   numberSchemaOptionalTest,
    //   numberSchemaNullableTest,
    //   bigintSchemaOptionalTest,
    //   bigintSchemaNullableTest,
    //   booleanSchemaOptionalTest,
    //   booleanSchemaNullableTest,
    //   dateSchemaOptionalTest,
    //   dateSchemaNullableTest,
    //   symbolSchemaOptionalTest,
    //   symbolSchemaNullableTest,
    // ];
});
(0, vitest_1.test)("get literal value", () => {
    (0, vitest_1.expect)(literalStringSchema.value).toEqual("asdf");
});
(0, vitest_1.test)("optional convenience method", () => {
    z.ostring().parse(undefined);
    z.onumber().parse(undefined);
    z.oboolean().parse(undefined);
});

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
(0, vitest_1.test)("string coercion", () => {
    const schema = z.coerce.string();
    (0, vitest_1.expect)(schema.parse("sup")).toEqual("sup");
    (0, vitest_1.expect)(schema.parse("")).toEqual("");
    (0, vitest_1.expect)(schema.parse(12)).toEqual("12");
    (0, vitest_1.expect)(schema.parse(0)).toEqual("0");
    (0, vitest_1.expect)(schema.parse(-12)).toEqual("-12");
    (0, vitest_1.expect)(schema.parse(3.14)).toEqual("3.14");
    (0, vitest_1.expect)(schema.parse(BigInt(15))).toEqual("15");
    (0, vitest_1.expect)(schema.parse(Number.NaN)).toEqual("NaN");
    (0, vitest_1.expect)(schema.parse(Number.POSITIVE_INFINITY)).toEqual("Infinity");
    (0, vitest_1.expect)(schema.parse(Number.NEGATIVE_INFINITY)).toEqual("-Infinity");
    (0, vitest_1.expect)(schema.parse(true)).toEqual("true");
    (0, vitest_1.expect)(schema.parse(false)).toEqual("false");
    (0, vitest_1.expect)(schema.parse(null)).toEqual("null");
    (0, vitest_1.expect)(schema.parse(undefined)).toEqual("undefined");
    (0, vitest_1.expect)(schema.parse({ hello: "world!" })).toEqual("[object Object]");
    (0, vitest_1.expect)(schema.parse(["item", "another_item"])).toEqual("item,another_item");
    (0, vitest_1.expect)(schema.parse([])).toEqual("");
    (0, vitest_1.expect)(schema.parse(new Date("2022-01-01T00:00:00.000Z"))).toEqual(new Date("2022-01-01T00:00:00.000Z").toString());
});
(0, vitest_1.test)("number coercion", () => {
    const schema = z.coerce.number();
    (0, vitest_1.expect)(schema.parse("12")).toEqual(12);
    (0, vitest_1.expect)(schema.parse("0")).toEqual(0);
    (0, vitest_1.expect)(schema.parse("-12")).toEqual(-12);
    (0, vitest_1.expect)(schema.parse("3.14")).toEqual(3.14);
    (0, vitest_1.expect)(schema.parse("")).toEqual(0);
    (0, vitest_1.expect)(() => schema.parse("NOT_A_NUMBER")).toThrow(); // z.ZodError
    (0, vitest_1.expect)(schema.parse(12)).toEqual(12);
    (0, vitest_1.expect)(schema.parse(0)).toEqual(0);
    (0, vitest_1.expect)(schema.parse(-12)).toEqual(-12);
    (0, vitest_1.expect)(schema.parse(3.14)).toEqual(3.14);
    (0, vitest_1.expect)(schema.parse(BigInt(15))).toEqual(15);
    (0, vitest_1.expect)(() => schema.parse(Number.NaN)).toThrow(); // z.ZodError
    // expect(schema.parse(Number.POSITIVE_INFINITY)).toEqual(Number.POSITIVE_INFINITY);
    // expect(schema.parse(Number.NEGATIVE_INFINITY)).toEqual(Number.NEGATIVE_INFINITY);
    (0, vitest_1.expect)(schema.parse(true)).toEqual(1);
    (0, vitest_1.expect)(schema.parse(false)).toEqual(0);
    (0, vitest_1.expect)(schema.parse(null)).toEqual(0);
    (0, vitest_1.expect)(() => schema.parse(undefined)).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse({ hello: "world!" })).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse(["item", "another_item"])).toThrow(); // z.ZodError
    (0, vitest_1.expect)(schema.parse([])).toEqual(0);
    (0, vitest_1.expect)(schema.parse(new Date(1670139203496))).toEqual(1670139203496);
});
(0, vitest_1.test)("boolean coercion", () => {
    const schema = z.coerce.boolean();
    (0, vitest_1.expect)(schema.parse("true")).toEqual(true);
    (0, vitest_1.expect)(schema.parse("false")).toEqual(true);
    (0, vitest_1.expect)(schema.parse("0")).toEqual(true);
    (0, vitest_1.expect)(schema.parse("1")).toEqual(true);
    (0, vitest_1.expect)(schema.parse("")).toEqual(false);
    (0, vitest_1.expect)(schema.parse(1)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(0)).toEqual(false);
    (0, vitest_1.expect)(schema.parse(-1)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(3.14)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(BigInt(15))).toEqual(true);
    (0, vitest_1.expect)(schema.parse(Number.NaN)).toEqual(false);
    (0, vitest_1.expect)(schema.parse(Number.POSITIVE_INFINITY)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(Number.NEGATIVE_INFINITY)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(true)).toEqual(true);
    (0, vitest_1.expect)(schema.parse(false)).toEqual(false);
    (0, vitest_1.expect)(schema.parse(null)).toEqual(false);
    (0, vitest_1.expect)(schema.parse(undefined)).toEqual(false);
    (0, vitest_1.expect)(schema.parse({ hello: "world!" })).toEqual(true);
    (0, vitest_1.expect)(schema.parse(["item", "another_item"])).toEqual(true);
    (0, vitest_1.expect)(schema.parse([])).toEqual(true);
    (0, vitest_1.expect)(schema.parse(new Date(1670139203496))).toEqual(true);
});
(0, vitest_1.test)("bigint coercion", () => {
    const schema = z.coerce.bigint();
    (0, vitest_1.expect)(schema.parse("5")).toEqual(BigInt(5));
    (0, vitest_1.expect)(schema.parse("0")).toEqual(BigInt(0));
    (0, vitest_1.expect)(schema.parse("-5")).toEqual(BigInt(-5));
    (0, vitest_1.expect)(() => schema.parse("3.14")).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(schema.parse("")).toEqual(BigInt(0));
    (0, vitest_1.expect)(() => schema.parse("NOT_A_NUMBER")).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(schema.parse(5)).toEqual(BigInt(5));
    (0, vitest_1.expect)(schema.parse(0)).toEqual(BigInt(0));
    (0, vitest_1.expect)(schema.parse(-5)).toEqual(BigInt(-5));
    (0, vitest_1.expect)(() => schema.parse(3.14)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(schema.parse(BigInt(5))).toEqual(BigInt(5));
    (0, vitest_1.expect)(() => schema.parse(Number.NaN)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse(Number.POSITIVE_INFINITY)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse(Number.NEGATIVE_INFINITY)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(schema.parse(true)).toEqual(BigInt(1));
    (0, vitest_1.expect)(schema.parse(false)).toEqual(BigInt(0));
    (0, vitest_1.expect)(() => schema.parse(null)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse(undefined)).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse({ hello: "world!" })).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse(["item", "another_item"])).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(schema.parse([])).toEqual(BigInt(0));
    (0, vitest_1.expect)(schema.parse(new Date(1670139203496))).toEqual(BigInt(1670139203496));
});
(0, vitest_1.test)("date coercion", () => {
    const schema = z.coerce.date();
    (0, vitest_1.expect)(schema.parse(new Date().toDateString())).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(new Date().toISOString())).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(new Date().toUTCString())).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse("5")).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse("2000-01-01")).toBeInstanceOf(Date);
    // expect(schema.parse("0")).toBeInstanceOf(Date);
    // expect(schema.parse("-5")).toBeInstanceOf(Date);
    // expect(schema.parse("3.14")).toBeInstanceOf(Date);
    (0, vitest_1.expect)(() => schema.parse("")).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse("NOT_A_DATE")).toThrow(); // z.ZodError
    (0, vitest_1.expect)(schema.parse(5)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(0)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(-5)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(3.14)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(() => schema.parse(BigInt(5))).toThrow(); // not a z.ZodError!
    (0, vitest_1.expect)(() => schema.parse(Number.NaN)).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse(Number.POSITIVE_INFINITY)).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse(Number.NEGATIVE_INFINITY)).toThrow(); // z.ZodError
    (0, vitest_1.expect)(schema.parse(true)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(false)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(schema.parse(null)).toBeInstanceOf(Date);
    (0, vitest_1.expect)(() => schema.parse(undefined)).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse({ hello: "world!" })).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse(["item", "another_item"])).toThrow(); // z.ZodError
    (0, vitest_1.expect)(() => schema.parse([])).toThrow(); // z.ZodError
    (0, vitest_1.expect)(schema.parse(new Date())).toBeInstanceOf(Date);
});
// test("template literal coercion", () => {
//   const schema = z.coerce
//     .templateLiteral()
//     .interpolated(z.number().finite())
//     .interpolated(
//       z.enum(["px", "em", "rem", "vh", "vw", "vmin", "vmax"]).optional()
//     );
//   expect(schema.parse(300)).toEqual("300");
//   expect(schema.parse(BigInt(300))).toEqual("300");
//   expect(schema.parse("300")).toEqual("300");
//   expect(schema.parse("300px")).toEqual("300px");
//   expect(schema.parse("300em")).toEqual("300em");
//   expect(schema.parse("300rem")).toEqual("300rem");
//   expect(schema.parse("300vh")).toEqual("300vh");
//   expect(schema.parse("300vw")).toEqual("300vw");
//   expect(schema.parse("300vmin")).toEqual("300vmin");
//   expect(schema.parse("300vmax")).toEqual("300vmax");
//   expect(schema.parse(["300px"])).toEqual("300px");
// });
(0, vitest_1.test)("override input type", () => {
    const a = z.coerce.string();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});

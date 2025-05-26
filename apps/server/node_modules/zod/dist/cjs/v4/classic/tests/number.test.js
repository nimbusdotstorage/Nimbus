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
(0, vitest_1.test)("z.number() basic validation", () => {
    const schema = z.number();
    (0, vitest_1.expect)(schema.parse(1234)).toEqual(1234);
});
(0, vitest_1.test)("NaN validation", () => {
    const schema = z.number();
    (0, vitest_1.expect)(() => schema.parse(Number.NaN)).toThrow();
});
(0, vitest_1.test)("Infinity validation", () => {
    const schema = z.number();
    (0, vitest_1.expect)(schema.safeParse(Number.POSITIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse(Number.NEGATIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)(".gt() validation", () => {
    const schema = z.number().gt(0).gt(5);
    (0, vitest_1.expect)(schema.parse(6)).toEqual(6);
    (0, vitest_1.expect)(() => schema.parse(5)).toThrow();
});
(0, vitest_1.test)(".gte() validation", () => {
    const schema = z.number().gt(0).gte(1).gte(5);
    (0, vitest_1.expect)(schema.parse(5)).toEqual(5);
    (0, vitest_1.expect)(() => schema.parse(4)).toThrow();
});
(0, vitest_1.test)(".min() validation", () => {
    const schema = z.number().min(0).min(5);
    (0, vitest_1.expect)(schema.parse(5)).toEqual(5);
    (0, vitest_1.expect)(() => schema.parse(4)).toThrow();
});
(0, vitest_1.test)(".lt() validation", () => {
    const schema = z.number().lte(10).lt(5);
    (0, vitest_1.expect)(schema.parse(4)).toEqual(4);
    (0, vitest_1.expect)(() => schema.parse(5)).toThrow();
});
(0, vitest_1.test)(".lte() validation", () => {
    const schema = z.number().lte(10).lte(5);
    (0, vitest_1.expect)(schema.parse(5)).toEqual(5);
    (0, vitest_1.expect)(() => schema.parse(6)).toThrow();
});
(0, vitest_1.test)(".max() validation", () => {
    const schema = z.number().max(10).max(5);
    (0, vitest_1.expect)(schema.parse(5)).toEqual(5);
    (0, vitest_1.expect)(() => schema.parse(6)).toThrow();
});
(0, vitest_1.test)(".int() validation", () => {
    const schema = z.number().int();
    (0, vitest_1.expect)(schema.parse(4)).toEqual(4);
    (0, vitest_1.expect)(() => schema.parse(3.14)).toThrow();
});
(0, vitest_1.test)(".positive() validation", () => {
    const schema = z.number().positive();
    (0, vitest_1.expect)(schema.parse(1)).toEqual(1);
    (0, vitest_1.expect)(() => schema.parse(0)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(-1)).toThrow();
});
(0, vitest_1.test)(".negative() validation", () => {
    const schema = z.number().negative();
    (0, vitest_1.expect)(schema.parse(-1)).toEqual(-1);
    (0, vitest_1.expect)(() => schema.parse(0)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(1)).toThrow();
});
(0, vitest_1.test)(".nonpositive() validation", () => {
    const schema = z.number().nonpositive();
    (0, vitest_1.expect)(schema.parse(0)).toEqual(0);
    (0, vitest_1.expect)(schema.parse(-1)).toEqual(-1);
    (0, vitest_1.expect)(() => schema.parse(1)).toThrow();
});
(0, vitest_1.test)(".nonnegative() validation", () => {
    const schema = z.number().nonnegative();
    (0, vitest_1.expect)(schema.parse(0)).toEqual(0);
    (0, vitest_1.expect)(schema.parse(1)).toEqual(1);
    (0, vitest_1.expect)(() => schema.parse(-1)).toThrow();
});
(0, vitest_1.test)(".multipleOf() with positive divisor", () => {
    const schema = z.number().multipleOf(5);
    (0, vitest_1.expect)(schema.parse(15)).toEqual(15);
    (0, vitest_1.expect)(schema.parse(-15)).toEqual(-15);
    (0, vitest_1.expect)(() => schema.parse(7.5)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(-7.5)).toThrow();
});
(0, vitest_1.test)(".multipleOf() with negative divisor", () => {
    const schema = z.number().multipleOf(-5);
    (0, vitest_1.expect)(schema.parse(-15)).toEqual(-15);
    (0, vitest_1.expect)(schema.parse(15)).toEqual(15);
    (0, vitest_1.expect)(() => schema.parse(-7.5)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(7.5)).toThrow();
});
(0, vitest_1.test)(".step() validation", () => {
    const schemaPointOne = z.number().step(0.1);
    const schemaPointZeroZeroZeroOne = z.number().step(0.0001);
    const schemaSixPointFour = z.number().step(6.4);
    (0, vitest_1.expect)(schemaPointOne.parse(6)).toEqual(6);
    (0, vitest_1.expect)(schemaPointOne.parse(6.1)).toEqual(6.1);
    (0, vitest_1.expect)(schemaSixPointFour.parse(12.8)).toEqual(12.8);
    (0, vitest_1.expect)(schemaPointZeroZeroZeroOne.parse(3.01)).toEqual(3.01);
    (0, vitest_1.expect)(() => schemaPointOne.parse(6.11)).toThrow();
    (0, vitest_1.expect)(() => schemaPointOne.parse(6.1000000001)).toThrow();
    (0, vitest_1.expect)(() => schemaSixPointFour.parse(6.41)).toThrow();
});
(0, vitest_1.test)(".finite() validation", () => {
    const schema = z.number().finite();
    (0, vitest_1.expect)(schema.parse(123)).toEqual(123);
    (0, vitest_1.expect)(schema.safeParse(Number.POSITIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse(Number.NEGATIVE_INFINITY)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "Infinity",
        "path": [],
        "message": "Invalid input: expected number, received number"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)(".safe() validation", () => {
    const schema = z.number().safe();
    (0, vitest_1.expect)(schema.parse(Number.MIN_SAFE_INTEGER)).toEqual(Number.MIN_SAFE_INTEGER);
    (0, vitest_1.expect)(schema.parse(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);
    (0, vitest_1.expect)(() => schema.parse(Number.MIN_SAFE_INTEGER - 1)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(Number.MAX_SAFE_INTEGER + 1)).toThrow();
});
(0, vitest_1.test)("min value getters", () => {
    (0, vitest_1.expect)(z.number().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().lt(5).minValue).toBeNull;
    (0, vitest_1.expect)(z.number().lte(5).minValue).toBeNull;
    (0, vitest_1.expect)(z.number().max(5).minValue).toBeNull;
    (0, vitest_1.expect)(z.number().negative().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().nonpositive().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().int().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().multipleOf(5).minValue).toBeNull;
    (0, vitest_1.expect)(z.number().finite().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().gt(5).minValue).toEqual(5);
    (0, vitest_1.expect)(z.number().gte(5).minValue).toEqual(5);
    (0, vitest_1.expect)(z.number().min(5).minValue).toEqual(5);
    (0, vitest_1.expect)(z.number().min(5).min(10).minValue).toEqual(10);
    (0, vitest_1.expect)(z.number().positive().minValue).toEqual(0);
    (0, vitest_1.expect)(z.number().nonnegative().minValue).toEqual(0);
    (0, vitest_1.expect)(z.number().safe().minValue).toEqual(Number.MIN_SAFE_INTEGER);
});
(0, vitest_1.test)("max value getters", () => {
    (0, vitest_1.expect)(z.number().maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().gt(5).maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().gte(5).maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().min(5).maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().positive().maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().nonnegative().maxValue).toBeNull;
    (0, vitest_1.expect)(z.number().int().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().multipleOf(5).minValue).toBeNull;
    (0, vitest_1.expect)(z.number().finite().minValue).toBeNull;
    (0, vitest_1.expect)(z.number().lt(5).maxValue).toEqual(5);
    (0, vitest_1.expect)(z.number().lte(5).maxValue).toEqual(5);
    (0, vitest_1.expect)(z.number().max(5).maxValue).toEqual(5);
    (0, vitest_1.expect)(z.number().max(5).max(1).maxValue).toEqual(1);
    (0, vitest_1.expect)(z.number().negative().maxValue).toEqual(0);
    (0, vitest_1.expect)(z.number().nonpositive().maxValue).toEqual(0);
    (0, vitest_1.expect)(z.number().safe().maxValue).toEqual(Number.MAX_SAFE_INTEGER);
});
(0, vitest_1.test)("int getter", () => {
    (0, vitest_1.expect)(z.number().isInt).toEqual(false);
    (0, vitest_1.expect)(z.number().int().isInt).toEqual(true);
    (0, vitest_1.expect)(z.number().safe().isInt).toEqual(true);
    (0, vitest_1.expect)(z.number().multipleOf(5).isInt).toEqual(true);
});
/** In Zod 4, number schemas don't accept infinite values. */
(0, vitest_1.test)("finite getter", () => {
    (0, vitest_1.expect)(z.number().isFinite).toEqual(true);
});
(0, vitest_1.test)("string format methods", () => {
    const a = z.int32().min(5);
    (0, vitest_1.expect)(a.parse(6)).toEqual(6);
    (0, vitest_1.expect)(() => a.parse(1)).toThrow();
});

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
const z = __importStar(require("zod/v4-mini"));
(0, vitest_1.test)("z.number", () => {
    const a = z.number();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(z.parse(a, 123.45)).toEqual(123.45);
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("z.number async", async () => {
    const a = z.number().check(z.refine(async (_) => _ > 0));
    await (0, vitest_1.expect)(z.parseAsync(a, 123)).resolves.toEqual(123);
    await (0, vitest_1.expect)(() => z.parseAsync(a, -123)).rejects.toThrow();
    await (0, vitest_1.expect)(() => z.parseAsync(a, "123")).rejects.toThrow();
});
(0, vitest_1.test)("z.int", () => {
    const a = z.int();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(() => z.parse(a, 123.45)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
});
(0, vitest_1.test)("z.float32", () => {
    const a = z.float32();
    (0, vitest_1.expect)(z.parse(a, 123.45)).toEqual(123.45);
    (0, vitest_1.expect)(() => z.parse(a, "123.45")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    // -3.4028234663852886e38, 3.4028234663852886e38;
    (0, vitest_1.expect)(() => z.parse(a, 3.4028234663852886e38 * 2)).toThrow(); // Exceeds max
    (0, vitest_1.expect)(() => z.parse(a, -3.4028234663852886e38 * 2)).toThrow(); // Exceeds min
});
(0, vitest_1.test)("z.float64", () => {
    const a = z.float64();
    (0, vitest_1.expect)(z.parse(a, 123.45)).toEqual(123.45);
    (0, vitest_1.expect)(() => z.parse(a, "123.45")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 1.7976931348623157e308 * 2)).toThrow(); // Exceeds max
    (0, vitest_1.expect)(() => z.parse(a, -1.7976931348623157e308 * 2)).toThrow(); // Exceeds min
});
(0, vitest_1.test)("z.int32", () => {
    const a = z.int32();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(() => z.parse(a, 123.45)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 2147483648)).toThrow(); // Exceeds max
    (0, vitest_1.expect)(() => z.parse(a, -2147483649)).toThrow(); // Exceeds min
});
(0, vitest_1.test)("z.uint32", () => {
    const a = z.uint32();
    (0, vitest_1.expect)(z.parse(a, 123)).toEqual(123);
    (0, vitest_1.expect)(() => z.parse(a, -123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123.45)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 4294967296)).toThrow(); // Exceeds max
    (0, vitest_1.expect)(() => z.parse(a, -1)).toThrow(); // Below min
});
(0, vitest_1.test)("z.int64", () => {
    const a = z.int64();
    (0, vitest_1.expect)(z.parse(a, BigInt(123))).toEqual(BigInt(123));
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123.45)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, BigInt("9223372036854775808"))).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, BigInt("-9223372036854775809"))).toThrow();
    // expect(() => z.parse(a, BigInt("9223372036854775808"))).toThrow(); // Exceeds max
    // expect(() => z.parse(a, BigInt("-9223372036854775809"))).toThrow(); // Exceeds min
});
(0, vitest_1.test)("z.uint64", () => {
    const a = z.uint64();
    (0, vitest_1.expect)(z.parse(a, BigInt(123))).toEqual(BigInt(123));
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, -123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, 123.45)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "123")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, BigInt("18446744073709551616"))).toThrow(); // Exceeds max
    (0, vitest_1.expect)(() => z.parse(a, BigInt("-1"))).toThrow(); // Below min
    // expect(() => z.parse(a, BigInt("18446744073709551616"))).toThrow(); // Exceeds max
    // expect(() => z.parse(a, BigInt("-1"))).toThrow(); // Below min
});

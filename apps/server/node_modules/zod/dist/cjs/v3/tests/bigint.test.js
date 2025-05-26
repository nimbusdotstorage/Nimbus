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
const gtFive = z.bigint().gt(BigInt(5));
const gteFive = z.bigint().gte(BigInt(5));
const ltFive = z.bigint().lt(BigInt(5));
const lteFive = z.bigint().lte(BigInt(5));
const positive = z.bigint().positive();
const negative = z.bigint().negative();
const nonnegative = z.bigint().nonnegative();
const nonpositive = z.bigint().nonpositive();
const multipleOfFive = z.bigint().multipleOf(BigInt(5));
(0, vitest_1.test)("passing validations", () => {
    z.bigint().parse(BigInt(1));
    z.bigint().parse(BigInt(0));
    z.bigint().parse(BigInt(-1));
    gtFive.parse(BigInt(6));
    gteFive.parse(BigInt(5));
    gteFive.parse(BigInt(6));
    ltFive.parse(BigInt(4));
    lteFive.parse(BigInt(5));
    lteFive.parse(BigInt(4));
    positive.parse(BigInt(3));
    negative.parse(BigInt(-2));
    nonnegative.parse(BigInt(0));
    nonnegative.parse(BigInt(7));
    nonpositive.parse(BigInt(0));
    nonpositive.parse(BigInt(-12));
    multipleOfFive.parse(BigInt(15));
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => gtFive.parse(BigInt(5))).toThrow();
    (0, vitest_1.expect)(() => gteFive.parse(BigInt(4))).toThrow();
    (0, vitest_1.expect)(() => ltFive.parse(BigInt(5))).toThrow();
    (0, vitest_1.expect)(() => lteFive.parse(BigInt(6))).toThrow();
    (0, vitest_1.expect)(() => positive.parse(BigInt(0))).toThrow();
    (0, vitest_1.expect)(() => positive.parse(BigInt(-2))).toThrow();
    (0, vitest_1.expect)(() => negative.parse(BigInt(0))).toThrow();
    (0, vitest_1.expect)(() => negative.parse(BigInt(3))).toThrow();
    (0, vitest_1.expect)(() => nonnegative.parse(BigInt(-1))).toThrow();
    (0, vitest_1.expect)(() => nonpositive.parse(BigInt(1))).toThrow();
    (0, vitest_1.expect)(() => multipleOfFive.parse(BigInt(13))).toThrow();
});
(0, vitest_1.test)("min max getters", () => {
    (0, vitest_1.expect)(z.bigint().min(BigInt(5)).minValue).toEqual(BigInt(5));
    (0, vitest_1.expect)(z.bigint().min(BigInt(5)).min(BigInt(10)).minValue).toEqual(BigInt(10));
    (0, vitest_1.expect)(z.bigint().max(BigInt(5)).maxValue).toEqual(BigInt(5));
    (0, vitest_1.expect)(z.bigint().max(BigInt(5)).max(BigInt(1)).maxValue).toEqual(BigInt(1));
});

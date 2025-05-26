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
(0, vitest_1.test)("string format methods", () => {
    const a = z.email().min(10);
    const b = z.email().max(10);
    const c = z.email().length(10);
    const d = z.email().uppercase();
    const e = z.email().lowercase();
    // Positive and negative cases for `a`
    (0, vitest_1.expect)(a.safeParse("longemail@example.com").success).toBe(true); // Positive
    (0, vitest_1.expect)(a.safeParse("ort@e.co").success).toBe(false); // Negative
    // Positive and negative cases for `b`
    (0, vitest_1.expect)(b.safeParse("sho@e.co").success).toBe(true); // Positive
    (0, vitest_1.expect)(b.safeParse("longemail@example.com").success).toBe(false); // Negative
    // Positive and negative cases for `c`
    (0, vitest_1.expect)(c.safeParse("56780@e.co").success).toBe(true); // Positive
    (0, vitest_1.expect)(c.safeParse("shoasdfasdfrt@e.co").success).toBe(false); // Negative
    // Positive and negative cases for `d`
    (0, vitest_1.expect)(d.safeParse("EMAIL@EXAMPLE.COM").success).toBe(true); // Positive
    (0, vitest_1.expect)(d.safeParse("email@example.com").success).toBe(false); // Negative
    // Positive and negative cases for `e`
    (0, vitest_1.expect)(e.safeParse("email@example.com").success).toBe(true); // Positive
    (0, vitest_1.expect)(e.safeParse("EMAIL@EXAMPLE.COM").success).toBe(false); // Negative
});

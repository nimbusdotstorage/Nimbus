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
(0, vitest_1.test)(".nullable()", () => {
    const nullable = z.string().nullable();
    (0, vitest_1.expect)(nullable.parse(null)).toBe(null);
    (0, vitest_1.expect)(nullable.parse("asdf")).toBe("asdf");
    (0, vitest_1.expect)(() => nullable.parse(123)).toThrow();
});
(0, vitest_1.test)(".nullable unwrap", () => {
    const schema = z.string().nullable();
    (0, vitest_1.expect)(schema).toBeInstanceOf(z.ZodNullable);
    (0, vitest_1.expect)(schema.unwrap()).toBeInstanceOf(z.ZodString);
});
(0, vitest_1.test)("z.null", () => {
    const n = z.null();
    (0, vitest_1.expect)(n.parse(null)).toBe(null);
    (0, vitest_1.expect)(() => n.parse("asdf")).toThrow();
});

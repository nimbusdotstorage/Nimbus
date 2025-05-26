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
(0, vitest_1.test)("string to number pipe", () => {
    const schema = z.string().transform(Number).pipe(z.number());
    (0, vitest_1.expect)(schema.parse("1234")).toEqual(1234);
});
(0, vitest_1.test)("string to number pipe async", async () => {
    const schema = z
        .string()
        .transform(async (val) => Number(val))
        .pipe(z.number());
    (0, vitest_1.expect)(await schema.parseAsync("1234")).toEqual(1234);
});
(0, vitest_1.test)("string with default fallback", () => {
    const stringWithDefault = z
        .pipe(z.transform((v) => (v === "none" ? undefined : v)), z.string())
        .catch("default");
    (0, vitest_1.expect)(stringWithDefault.parse("ok")).toBe("ok");
    (0, vitest_1.expect)(stringWithDefault.parse(undefined)).toBe("default");
    (0, vitest_1.expect)(stringWithDefault.parse("none")).toBe("default");
    (0, vitest_1.expect)(stringWithDefault.parse(15)).toBe("default");
});
(0, vitest_1.test)("continue on non-fatal errors", () => {
    const schema = z
        .string()
        .refine((c) => c === "1234", "A")
        .transform((val) => Number(val))
        .refine((c) => c === 1234, "B");
    schema.parse("1234");
    (0, vitest_1.expect)(schema.safeParse("4321")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "A"
      },
      {
        "code": "custom",
        "path": [],
        "message": "B"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("break on fatal errors", () => {
    const schema = z
        .string()
        .refine((c) => c === "1234", { message: "A", abort: true })
        .transform((val) => Number(val))
        .refine((c) => c === 1234, "B");
    schema.parse("1234");
    (0, vitest_1.expect)(schema.safeParse("4321")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "A"
      }
    ]],
      "success": false,
    }
  `);
});

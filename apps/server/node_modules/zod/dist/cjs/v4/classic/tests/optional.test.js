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
const z = __importStar(require("zod/v4"));
(0, vitest_1.test)(".optional()", () => {
    const schema = z.string().optional();
    (0, vitest_1.expect)(schema.parse("adsf")).toEqual("adsf");
    (0, vitest_1.expect)(schema.parse(undefined)).toEqual(undefined);
    (0, vitest_1.expect)(schema.safeParse(null).success).toEqual(false);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("unwrap", () => {
    const unwrapped = z.string().optional().unwrap();
    (0, vitest_1.expect)(unwrapped).toBeInstanceOf(z.ZodString);
});
(0, vitest_1.test)("optionality", () => {
    const a = z.string();
    (0, vitest_1.expect)(a._zod.optin).toEqual(undefined);
    (0, vitest_1.expect)(a._zod.optout).toEqual(undefined);
    const b = z.string().optional();
    (0, vitest_1.expect)(b._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(b._zod.optout).toEqual("optional");
    const c = z.string().default("asdf");
    (0, vitest_1.expect)(c._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(c._zod.optout).toEqual(undefined);
    const d = z.string().optional().nullable();
    (0, vitest_1.expect)(d._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(d._zod.optout).toEqual("optional");
    const e = z.string().default("asdf").nullable();
    (0, vitest_1.expect)(e._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(e._zod.optout).toEqual(undefined);
});
(0, vitest_1.test)("pipe optionality", () => {
    z.string().optional()._zod.optin;
    const a = z.string().optional().pipe(z.string());
    (0, vitest_1.expect)(a._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(a._zod.optout).toEqual(undefined);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const b = z
        .string()
        .transform((val) => (Math.random() ? val : undefined))
        .pipe(z.string().optional());
    (0, vitest_1.expect)(b._zod.optin).toEqual(undefined);
    (0, vitest_1.expect)(b._zod.optout).toEqual("optional");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const c = z.string().default("asdf").pipe(z.string());
    (0, vitest_1.expect)(c._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(c._zod.optout).toEqual(undefined);
    const d = z
        .string()
        .transform((val) => (Math.random() ? val : undefined))
        .pipe(z.string().default("asdf"));
    (0, vitest_1.expect)(d._zod.optin).toEqual(undefined);
    (0, vitest_1.expect)(d._zod.optout).toEqual(undefined);
});
(0, vitest_1.test)("pipe optionality inside objects", () => {
    const schema = z.object({
        a: z.string().optional(),
        b: z.string().optional().pipe(z.string()),
        c: z.string().default("asdf").pipe(z.string()),
        d: z
            .string()
            .transform((val) => (Math.random() ? val : undefined))
            .pipe(z.string().optional()),
        e: z
            .string()
            .transform((val) => (Math.random() ? val : undefined))
            .pipe(z.string().default("asdf")),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});

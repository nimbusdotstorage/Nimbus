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
const tr_js_1 = require("../../../locales/tr.js");
(0, vitest_1.test)("parsedType", () => {
    (0, vitest_1.expect)((0, tr_js_1.parsedType)("string")).toBe("string");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(1)).toBe("number");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(true)).toBe("boolean");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(null)).toBe("null");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(undefined)).toBe("undefined");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)([])).toBe("array");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)({})).toBe("object");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(new Date())).toBe("Date");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(new Map())).toBe("Map");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(new Set())).toBe("Set");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(new Error())).toBe("Error");
    const nullPrototype = Object.create(null);
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(nullPrototype)).toBe("object");
    const doubleNullPrototype = Object.create(Object.create(null));
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(doubleNullPrototype)).toBe("object");
    (0, vitest_1.expect)((0, tr_js_1.parsedType)(Number.NaN)).toBe("NaN");
});
(0, vitest_1.test)("locales - tr", () => {
    z.config(z.locales.tr());
    const invalidType = z.number().safeParse("a");
    (0, vitest_1.expect)(invalidType.error.issues[0].code).toBe("invalid_type");
    (0, vitest_1.expect)(invalidType.error.issues[0].message).toBe("Geçersiz değer: beklenen number, alınan string");
    const invalidType2 = z.string().safeParse(1);
    (0, vitest_1.expect)(invalidType2.error.issues[0].code).toBe("invalid_type");
    (0, vitest_1.expect)(invalidType2.error.issues[0].message).toBe("Geçersiz değer: beklenen string, alınan number");
    const invalidValue = z.enum(["a", "b"]).safeParse(1);
    (0, vitest_1.expect)(invalidValue.error.issues[0].code).toBe("invalid_value");
    (0, vitest_1.expect)(invalidValue.error.issues[0].message).toBe('Geçersiz seçenek: aşağıdakilerden biri olmalı: "a"|"b"');
    const tooBig = z.number().max(10).safeParse(15);
    (0, vitest_1.expect)(tooBig.error.issues[0].code).toBe("too_big");
    (0, vitest_1.expect)(tooBig.error.issues[0].message).toBe("Çok büyük: beklenen number <=10");
    const tooSmall = z.number().min(10).safeParse(5);
    (0, vitest_1.expect)(tooSmall.error.issues[0].code).toBe("too_small");
    (0, vitest_1.expect)(tooSmall.error.issues[0].message).toBe("Çok küçük: beklenen number >=10");
    const invalidFormatRegex = z.string().regex(/abcd/).safeParse("invalid-string");
    (0, vitest_1.expect)(invalidFormatRegex.error.issues[0].code).toBe("invalid_format");
    (0, vitest_1.expect)(invalidFormatRegex.error.issues[0].message).toBe("Geçersiz metin: /abcd/ desenine uymalı");
    const invalidFormatStartsWith = z.string().startsWith("abcd").safeParse("invalid-string");
    (0, vitest_1.expect)(invalidFormatStartsWith.error.issues[0].code).toBe("invalid_format");
    (0, vitest_1.expect)(invalidFormatStartsWith.error.issues[0].message).toBe('Geçersiz metin: "abcd" ile başlamalı');
    const notMultipleOf = z.number().multipleOf(3).safeParse(10);
    (0, vitest_1.expect)(notMultipleOf.error.issues[0].code).toBe("not_multiple_of");
    (0, vitest_1.expect)(notMultipleOf.error.issues[0].message).toBe("Geçersiz sayı: 3 ile tam bölünebilmeli");
    const unrecognizedKeys = z.object({ a: z.string(), b: z.number() }).strict().safeParse({ a: "a", b: 1, c: 2 });
    (0, vitest_1.expect)(unrecognizedKeys.error.issues[0].code).toBe("unrecognized_keys");
    (0, vitest_1.expect)(unrecognizedKeys.error.issues[0].message).toBe('Tanınmayan anahtar: "c"');
    const invalidUnion = z.union([z.string(), z.number()]).safeParse(true);
    (0, vitest_1.expect)(invalidUnion.error.issues[0].code).toBe("invalid_union");
    (0, vitest_1.expect)(invalidUnion.error.issues[0].message).toBe("Geçersiz değer");
});

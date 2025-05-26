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
const v3_1 = require("zod/v3");
const util_js_1 = require("../helpers/util.js");
const stringSet = z.set(z.string());
const minTwo = z.set(z.string()).min(2);
const maxTwo = z.set(z.string()).max(2);
const justTwo = z.set(z.string()).size(2);
const nonEmpty = z.set(z.string()).nonempty();
const nonEmptyMax = z.set(z.string()).nonempty().max(2);
(0, vitest_1.test)("type inference", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("valid parse", () => {
    const result = stringSet.safeParse(new Set(["first", "second"]));
    (0, vitest_1.expect)(result.success).toEqual(true);
    if (result.success) {
        (0, vitest_1.expect)(result.data.has("first")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("second")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("third")).toEqual(false);
    }
    (0, vitest_1.expect)(() => {
        minTwo.parse(new Set(["a", "b"]));
        minTwo.parse(new Set(["a", "b", "c"]));
        maxTwo.parse(new Set(["a", "b"]));
        maxTwo.parse(new Set(["a"]));
        justTwo.parse(new Set(["a", "b"]));
        nonEmpty.parse(new Set(["a"]));
        nonEmptyMax.parse(new Set(["a"]));
    }).not.toThrow();
});
(0, vitest_1.test)("valid parse async", async () => {
    const result = await stringSet.spa(new Set(["first", "second"]));
    (0, vitest_1.expect)(result.success).toEqual(true);
    if (result.success) {
        (0, vitest_1.expect)(result.data.has("first")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("second")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("third")).toEqual(false);
    }
    const asyncResult = await stringSet.safeParse(new Set(["first", "second"]));
    (0, vitest_1.expect)(asyncResult.success).toEqual(true);
    if (asyncResult.success) {
        (0, vitest_1.expect)(asyncResult.data.has("first")).toEqual(true);
        (0, vitest_1.expect)(asyncResult.data.has("second")).toEqual(true);
        (0, vitest_1.expect)(asyncResult.data.has("third")).toEqual(false);
    }
});
(0, vitest_1.test)("valid parse: size-related methods", () => {
    (0, vitest_1.expect)(() => {
        minTwo.parse(new Set(["a", "b"]));
        minTwo.parse(new Set(["a", "b", "c"]));
        maxTwo.parse(new Set(["a", "b"]));
        maxTwo.parse(new Set(["a"]));
        justTwo.parse(new Set(["a", "b"]));
        nonEmpty.parse(new Set(["a"]));
        nonEmptyMax.parse(new Set(["a"]));
    }).not.toThrow();
    const sizeZeroResult = stringSet.parse(new Set());
    (0, vitest_1.expect)(sizeZeroResult.size).toBe(0);
    const sizeTwoResult = minTwo.parse(new Set(["a", "b"]));
    (0, vitest_1.expect)(sizeTwoResult.size).toBe(2);
});
(0, vitest_1.test)("failing when parsing empty set in nonempty ", () => {
    const result = nonEmpty.safeParse(new Set());
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.too_small);
    }
});
(0, vitest_1.test)("failing when set is smaller than min() ", () => {
    const result = minTwo.safeParse(new Set(["just_one"]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.too_small);
    }
});
(0, vitest_1.test)("failing when set is bigger than max() ", () => {
    const result = maxTwo.safeParse(new Set(["one", "two", "three"]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.too_big);
    }
});
(0, vitest_1.test)("doesn’t throw when an empty set is given", () => {
    const result = stringSet.safeParse(new Set([]));
    (0, vitest_1.expect)(result.success).toEqual(true);
});
(0, vitest_1.test)("throws when a Map is given", () => {
    const result = stringSet.safeParse(new Map([]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
    }
});
(0, vitest_1.test)("throws when the given set has invalid input", () => {
    const result = stringSet.safeParse(new Set([Symbol()]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[0].path).toEqual([0]);
    }
});
(0, vitest_1.test)("throws when the given set has multiple invalid entries", () => {
    const result = stringSet.safeParse(new Set([1, 2]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[0].path).toEqual([0]);
        (0, vitest_1.expect)(result.error.issues[1].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[1].path).toEqual([1]);
    }
});

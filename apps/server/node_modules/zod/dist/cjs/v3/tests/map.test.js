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
const stringMap = z.map(z.string(), z.string());
(0, vitest_1.test)("type inference", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("valid parse", () => {
    const result = stringMap.safeParse(new Map([
        ["first", "foo"],
        ["second", "bar"],
    ]));
    (0, vitest_1.expect)(result.success).toEqual(true);
    if (result.success) {
        (0, vitest_1.expect)(result.data.has("first")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("second")).toEqual(true);
        (0, vitest_1.expect)(result.data.get("first")).toEqual("foo");
        (0, vitest_1.expect)(result.data.get("second")).toEqual("bar");
    }
});
(0, vitest_1.test)("valid parse async", async () => {
    const result = await stringMap.spa(new Map([
        ["first", "foo"],
        ["second", "bar"],
    ]));
    (0, vitest_1.expect)(result.success).toEqual(true);
    if (result.success) {
        (0, vitest_1.expect)(result.data.has("first")).toEqual(true);
        (0, vitest_1.expect)(result.data.has("second")).toEqual(true);
        (0, vitest_1.expect)(result.data.get("first")).toEqual("foo");
        (0, vitest_1.expect)(result.data.get("second")).toEqual("bar");
    }
});
(0, vitest_1.test)("throws when a Set is given", () => {
    const result = stringMap.safeParse(new Set([]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
    }
});
(0, vitest_1.test)("throws when the given map has invalid key and invalid input", () => {
    const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[0].path).toEqual([0, "key"]);
        (0, vitest_1.expect)(result.error.issues[1].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[1].path).toEqual([0, "value"]);
    }
});
(0, vitest_1.test)("throws when the given map has multiple invalid entries", () => {
    // const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    const result = stringMap.safeParse(new Map([
        [1, "foo"],
        ["bar", 2],
    ]));
    // const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[0].path).toEqual([0, "key"]);
        (0, vitest_1.expect)(result.error.issues[1].code).toEqual(v3_1.ZodIssueCode.invalid_type);
        (0, vitest_1.expect)(result.error.issues[1].path).toEqual([1, "value"]);
    }
});
(0, vitest_1.test)("dirty", async () => {
    const map = z.map(z.string().refine((val) => val === val.toUpperCase(), {
        message: "Keys must be uppercase",
    }), z.string());
    const result = await map.spa(new Map([
        ["first", "foo"],
        ["second", "bar"],
    ]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(z.ZodIssueCode.custom);
        (0, vitest_1.expect)(result.error.issues[0].message).toEqual("Keys must be uppercase");
        (0, vitest_1.expect)(result.error.issues[1].code).toEqual(z.ZodIssueCode.custom);
        (0, vitest_1.expect)(result.error.issues[1].message).toEqual("Keys must be uppercase");
    }
});

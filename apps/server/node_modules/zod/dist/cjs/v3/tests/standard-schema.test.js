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
// import type { StandardSchemaV1 } from "@standard-schema/spec";
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const z = __importStar(require("zod/v3"));
const util_js_1 = require("../helpers/util.js");
(0, vitest_1.test)("assignability", () => {
    const _s1 = z.string();
    const _s2 = z.string();
    const _s3 = z.string();
    const _s4 = z.string();
    [_s1, _s2, _s3, _s4];
});
(0, vitest_1.test)("type inference", () => {
    const stringToNumber = z.string().transform((x) => x.length);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("valid parse", () => {
    const schema = z.string();
    const result = schema["~standard"].validate("hello");
    if (result instanceof Promise) {
        throw new Error("Expected sync result");
    }
    (0, vitest_1.expect)(result.issues).toEqual(undefined);
    if (result.issues) {
        throw new Error("Expected no issues");
    }
    else {
        (0, vitest_1.expect)(result.value).toEqual("hello");
    }
});
(0, vitest_1.test)("invalid parse", () => {
    const schema = z.string();
    const result = schema["~standard"].validate(1234);
    if (result instanceof Promise) {
        throw new Error("Expected sync result");
    }
    (0, vitest_1.expect)(result.issues).toBeDefined();
    if (!result.issues) {
        throw new Error("Expected issues");
    }
    (0, vitest_1.expect)(result.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.issues[0].path).toEqual([]);
});
(0, vitest_1.test)("valid parse async", async () => {
    const schema = z.string().refine(async () => true);
    const _result = schema["~standard"].validate("hello");
    if (_result instanceof Promise) {
        const result = await _result;
        (0, vitest_1.expect)(result.issues).toEqual(undefined);
        if (result.issues) {
            throw new Error("Expected no issues");
        }
        else {
            (0, vitest_1.expect)(result.value).toEqual("hello");
        }
    }
    else {
        throw new Error("Expected async result");
    }
});
(0, vitest_1.test)("invalid parse async", async () => {
    const schema = z.string().refine(async () => false);
    const _result = schema["~standard"].validate("hello");
    if (_result instanceof Promise) {
        const result = await _result;
        (0, vitest_1.expect)(result.issues).toBeDefined();
        if (!result.issues) {
            throw new Error("Expected issues");
        }
        (0, vitest_1.expect)(result.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.issues[0].path).toEqual([]);
    }
    else {
        throw new Error("Expected async result");
    }
});

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
const util_js_1 = require("../helpers/util.js");
const minTwo = z.string().array().min(2);
const maxTwo = z.string().array().max(2);
const justTwo = z.string().array().length(2);
const intNum = z.string().array().nonempty();
const nonEmptyMax = z.string().array().nonempty().max(2);
util_js_1.util.assertEqual(true);
util_js_1.util.assertEqual(true);
(0, vitest_1.test)("passing validations", () => {
    minTwo.parse(["a", "a"]);
    minTwo.parse(["a", "a", "a"]);
    maxTwo.parse(["a", "a"]);
    maxTwo.parse(["a"]);
    justTwo.parse(["a", "a"]);
    intNum.parse(["a"]);
    nonEmptyMax.parse(["a"]);
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => minTwo.parse(["a"])).toThrow();
    (0, vitest_1.expect)(() => maxTwo.parse(["a", "a", "a"])).toThrow();
    (0, vitest_1.expect)(() => justTwo.parse(["a"])).toThrow();
    (0, vitest_1.expect)(() => justTwo.parse(["a", "a", "a"])).toThrow();
    (0, vitest_1.expect)(() => intNum.parse([])).toThrow();
    (0, vitest_1.expect)(() => nonEmptyMax.parse([])).toThrow();
    (0, vitest_1.expect)(() => nonEmptyMax.parse(["a", "a", "a"])).toThrow();
});
(0, vitest_1.test)("parse empty array in nonempty", () => {
    (0, vitest_1.expect)(() => z
        .array(z.string())
        .nonempty()
        .parse([])).toThrow();
});
(0, vitest_1.test)("get element", () => {
    justTwo.element.parse("asdf");
    (0, vitest_1.expect)(() => justTwo.element.parse(12)).toThrow();
});
(0, vitest_1.test)("continue parsing despite array size error", () => {
    const schema = z.object({
        people: z.string().array().min(2),
    });
    const result = schema.safeParse({
        people: [123],
    });
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
    }
});
(0, vitest_1.test)("parse should fail given sparse array", () => {
    const schema = z.array(z.string()).nonempty().min(1).max(3);
    (0, vitest_1.expect)(() => schema.parse(new Array(3))).toThrow();
});

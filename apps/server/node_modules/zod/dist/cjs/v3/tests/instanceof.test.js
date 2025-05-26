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
(0, vitest_1.test)("instanceof", async () => {
    class Test {
    }
    class Subtest extends Test {
    }
    class AbstractBar {
        constructor(val) {
            this.val = val;
        }
    }
    class Bar extends AbstractBar {
    }
    const TestSchema = z.instanceof(Test);
    const SubtestSchema = z.instanceof(Subtest);
    const AbstractSchema = z.instanceof(AbstractBar);
    const BarSchema = z.instanceof(Bar);
    TestSchema.parse(new Test());
    TestSchema.parse(new Subtest());
    SubtestSchema.parse(new Subtest());
    AbstractSchema.parse(new Bar("asdf"));
    const bar = BarSchema.parse(new Bar("asdf"));
    (0, vitest_1.expect)(bar.val).toEqual("asdf");
    await (0, vitest_1.expect)(() => SubtestSchema.parse(new Test())).toThrow(/Input not instance of Subtest/);
    await (0, vitest_1.expect)(() => TestSchema.parse(12)).toThrow(/Input not instance of Test/);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("instanceof fatal", () => {
    const schema = z.instanceof(Date).refine((d) => d.toString());
    const res = schema.safeParse(null);
    (0, vitest_1.expect)(res.success).toBe(false);
});

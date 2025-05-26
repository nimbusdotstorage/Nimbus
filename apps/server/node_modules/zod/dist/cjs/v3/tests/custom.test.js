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
(0, vitest_1.test)("passing validations", () => {
    const example1 = z.custom((x) => typeof x === "number");
    example1.parse(1234);
    (0, vitest_1.expect)(() => example1.parse({})).toThrow();
});
(0, vitest_1.test)("string params", () => {
    const example1 = z.custom((x) => typeof x !== "number", "customerr");
    const result = example1.safeParse(1234);
    (0, vitest_1.expect)(result.success).toEqual(false);
    // @ts-ignore
    (0, vitest_1.expect)(JSON.stringify(result.error).includes("customerr")).toEqual(true);
});
(0, vitest_1.test)("async validations", async () => {
    const example1 = z.custom(async (x) => {
        return typeof x === "number";
    });
    const r1 = await example1.safeParseAsync(1234);
    (0, vitest_1.expect)(r1.success).toEqual(true);
    (0, vitest_1.expect)(r1.data).toEqual(1234);
    const r2 = await example1.safeParseAsync("asdf");
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error.issues.length).toEqual(1);
});

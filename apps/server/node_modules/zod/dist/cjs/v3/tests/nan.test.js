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
const schema = z.nan();
(0, vitest_1.test)("passing validations", () => {
    schema.parse(Number.NaN);
    schema.parse(Number("Not a number"));
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => schema.parse(5)).toThrow();
    (0, vitest_1.expect)(() => schema.parse("John")).toThrow();
    (0, vitest_1.expect)(() => schema.parse(true)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(null)).toThrow();
    (0, vitest_1.expect)(() => schema.parse(undefined)).toThrow();
    (0, vitest_1.expect)(() => schema.parse({})).toThrow();
    (0, vitest_1.expect)(() => schema.parse([])).toThrow();
});

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
const beforeBenchmarkDate = new Date(2022, 10, 4);
const benchmarkDate = new Date(2022, 10, 5);
const afterBenchmarkDate = new Date(2022, 10, 6);
const minCheck = z.date().min(benchmarkDate);
const maxCheck = z.date().max(benchmarkDate);
(0, vitest_1.test)("passing validations", () => {
    minCheck.parse(benchmarkDate);
    minCheck.parse(afterBenchmarkDate);
    maxCheck.parse(benchmarkDate);
    maxCheck.parse(beforeBenchmarkDate);
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => minCheck.parse(beforeBenchmarkDate)).toThrow();
    (0, vitest_1.expect)(() => maxCheck.parse(afterBenchmarkDate)).toThrow();
});
(0, vitest_1.test)("min max getters", () => {
    (0, vitest_1.expect)(minCheck.minDate).toEqual(benchmarkDate);
    (0, vitest_1.expect)(minCheck.min(afterBenchmarkDate).minDate).toEqual(afterBenchmarkDate);
    (0, vitest_1.expect)(maxCheck.maxDate).toEqual(benchmarkDate);
    (0, vitest_1.expect)(maxCheck.max(beforeBenchmarkDate).maxDate).toEqual(beforeBenchmarkDate);
});

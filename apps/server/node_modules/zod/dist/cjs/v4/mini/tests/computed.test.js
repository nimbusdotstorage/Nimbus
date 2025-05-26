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
const z = __importStar(require("zod/v4-mini"));
const core_1 = require("zod/v4/core");
(0, vitest_1.test)("min/max", () => {
    const a = z.number().check(z.minimum(5), z.minimum(6), z.minimum(7), z.maximum(10), z.maximum(11), z.maximum(12));
    (0, vitest_1.expect)(a._zod.bag.minimum).toEqual(7);
    (0, vitest_1.expect)(a._zod.bag.maximum).toEqual(10);
});
(0, vitest_1.test)("multipleOf", () => {
    const b = z.number().check(z.multipleOf(5));
    (0, vitest_1.expect)(b._zod.bag.multipleOf).toEqual(5);
});
(0, vitest_1.test)("int64 format", () => {
    const c = z.int64();
    (0, vitest_1.expect)(c._zod.bag.format).toEqual("int64");
    (0, vitest_1.expect)(c._zod.bag.minimum).toEqual(core_1.util.BIGINT_FORMAT_RANGES.int64[0]);
    (0, vitest_1.expect)(c._zod.bag.maximum).toEqual(core_1.util.BIGINT_FORMAT_RANGES.int64[1]);
});
(0, vitest_1.test)("int32 format", () => {
    const d = z.int32();
    (0, vitest_1.expect)(d._zod.bag.format).toEqual("int32");
    (0, vitest_1.expect)(d._zod.bag.minimum).toEqual(core_1.util.NUMBER_FORMAT_RANGES.int32[0]);
    (0, vitest_1.expect)(d._zod.bag.maximum).toEqual(core_1.util.NUMBER_FORMAT_RANGES.int32[1]);
});
(0, vitest_1.test)("array size", () => {
    const e = z.array(z.string()).check(z.length(5));
    (0, vitest_1.expect)(e._zod.bag.length).toEqual(5);
    (0, vitest_1.expect)(e._zod.bag.minimum).toEqual(5);
    (0, vitest_1.expect)(e._zod.bag.maximum).toEqual(5);
});

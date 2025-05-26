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
const z = __importStar(require("../index.js"));
// lt;
(0, vitest_1.test)("z.lt", () => {
    const a = z.number().check(z.lt(10));
    (0, vitest_1.expect)(z.safeParse(a, 9).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 9).data).toEqual(9);
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(false);
});
// lte;
(0, vitest_1.test)("z.lte", () => {
    const a = z.number().check(z.lte(10));
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 10).data).toEqual(10);
    (0, vitest_1.expect)(z.safeParse(a, 11).success).toEqual(false);
});
// min;
(0, vitest_1.test)("z.max", () => {
    const a = z.number().check(z.maximum(10));
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 10).data).toEqual(10);
    (0, vitest_1.expect)(z.safeParse(a, 11).success).toEqual(false);
});
// gt;
(0, vitest_1.test)("z.gt", () => {
    const a = z.number().check(z.gt(10));
    (0, vitest_1.expect)(z.safeParse(a, 11).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 11).data).toEqual(11);
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(false);
});
// gte;
(0, vitest_1.test)("z.gte", () => {
    const a = z.number().check(z.gte(10));
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 10).data).toEqual(10);
    (0, vitest_1.expect)(z.safeParse(a, 9).success).toEqual(false);
});
// min;
(0, vitest_1.test)("z.min", () => {
    const a = z.number().check(z.minimum(10));
    (0, vitest_1.expect)(z.safeParse(a, 10).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, 10).data).toEqual(10);
    (0, vitest_1.expect)(z.safeParse(a, 9).success).toEqual(false);
});
// maxSize;
(0, vitest_1.test)("z.maxLength", () => {
    const a = z.array(z.string()).check(z.maxLength(3));
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b", "c"]).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b", "c", "d"]).success).toEqual(false);
});
// minSize;
(0, vitest_1.test)("z.minLength", () => {
    const a = z.array(z.string()).check(z.minLength(3));
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b"]).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b", "c"]).success).toEqual(true);
});
// size;
(0, vitest_1.test)("z.length", () => {
    const a = z.array(z.string()).check(z.length(3));
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b"]).success).toEqual(false);
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b", "c"]).success).toEqual(true);
    (0, vitest_1.expect)(z.safeParse(a, ["a", "b", "c", "d"]).success).toEqual(false);
});
// regex;
(0, vitest_1.test)("z.regex", () => {
    const a = z.string().check(z.regex(/^aaa$/));
    (0, vitest_1.expect)(z.safeParse(a, "aaa")).toMatchObject({ success: true, data: "aaa" });
    (0, vitest_1.expect)(z.safeParse(a, "aa")).toMatchObject({ success: false });
});
// includes;
(0, vitest_1.test)("z.includes", () => {
    const a = z.string().check(z.includes("asdf"));
    z.parse(a, "qqqasdfqqq");
    z.parse(a, "asdf");
    z.parse(a, "qqqasdf");
    z.parse(a, "asdfqqq");
    (0, vitest_1.expect)(z.safeParse(a, "qqq")).toMatchObject({ success: false });
});
// startsWith;
(0, vitest_1.test)("z.startsWith", () => {
    const a = z.string().check(z.startsWith("asdf"));
    z.parse(a, "asdf");
    z.parse(a, "asdfqqq");
    (0, vitest_1.expect)(z.safeParse(a, "qqq")).toMatchObject({ success: false });
});
// endsWith;
(0, vitest_1.test)("z.endsWith", () => {
    const a = z.string().check(z.endsWith("asdf"));
    z.parse(a, "asdf");
    z.parse(a, "qqqasdf");
    (0, vitest_1.expect)(z.safeParse(a, "asdfqqq")).toMatchObject({ success: false });
});
// lowercase;
(0, vitest_1.test)("z.lowercase", () => {
    const a = z.string().check(z.lowercase());
    z.parse(a, "asdf");
    (0, vitest_1.expect)(z.safeParse(a, "ASDF")).toMatchObject({ success: false });
});
// uppercase;
(0, vitest_1.test)("z.uppercase", () => {
    const a = z.string().check(z.uppercase());
    z.parse(a, "ASDF");
    (0, vitest_1.expect)(z.safeParse(a, "asdf")).toMatchObject({ success: false });
});
// filename;
// fileType;
// overwrite;
(0, vitest_1.test)("z.overwrite", () => {
    const a = z.string().check(z.overwrite((val) => val.toUpperCase()));
    (0, vitest_1.expect)(z.safeParse(a, "asdf")).toMatchObject({ data: "ASDF" });
});
// normalize;
// trim;
// toLowerCase;
// toUpperCase;
// property
(0, vitest_1.test)("abort early", () => {
    const schema = z.string().check(z.refine((val) => val.length > 1), z.refine((val) => val.length > 2, { abort: true }), z.refine((val) => val.length > 3));
    const data = "";
    const result = z.safeParse(schema, data);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
});

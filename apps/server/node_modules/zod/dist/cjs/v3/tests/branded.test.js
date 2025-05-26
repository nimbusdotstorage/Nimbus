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
(0, vitest_1.test)("branded types", () => {
    const mySchema = z
        .object({
        name: z.string(),
    })
        .brand();
    util_js_1.util.assertEqual(true);
    const doStuff = (arg) => arg;
    doStuff(mySchema.parse({ name: "hello there" }));
    // inheritance
    const extendedSchema = mySchema.brand();
    util_js_1.util.assertEqual(true);
    doStuff(extendedSchema.parse({ name: "hello again" }));
    // number branding
    const numberSchema = z.number().brand();
    util_js_1.util.assertEqual(true);
    // symbol branding
    const MyBrand = Symbol("hello");
    const symbolBrand = z.number().brand().brand();
    // number & { [z.BRAND]: { sup: true, [MyBrand]: true } }
    util_js_1.util.assertEqual(true);
    // keeping brands out of input types
    const age = z.number().brand();
    util_js_1.util.assertEqual(false);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    // @ts-expect-error
    doStuff({ name: "hello there!" });
});

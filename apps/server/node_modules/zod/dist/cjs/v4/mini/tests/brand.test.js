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
(0, vitest_1.test)("branded types", () => {
    const mySchema = z
        .object({
        name: z.string(),
    })
        .brand();
    // Using true for type equality assertion
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const doStuff = (arg) => arg;
    doStuff(z.parse(mySchema, { name: "hello there" }));
    // inheritance
    const extendedSchema = mySchema.brand();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    doStuff(z.parse(extendedSchema, { name: "hello again" }));
    // number branding
    const numberSchema = z.number().brand();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // symbol branding
    const MyBrand = Symbol("hello");
    const symbolBrand = z.number().brand().brand();
    // number & { [z.$brand]: { sup: true, [MyBrand]: true } }
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // keeping brands out of input types
    const age = z.number().brand();
    // Using not for type inequality assertion
    (0, vitest_1.expectTypeOf)().not.toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    // @ts-expect-error
    doStuff({ name: "hello there!" });
});

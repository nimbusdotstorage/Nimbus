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
(0, vitest_1.test)("nativeEnum test with consts", () => {
    const Fruits = {
        Apple: "apple",
        Banana: "banana",
    };
    const fruitEnum = z.nativeEnum(Fruits);
    fruitEnum.parse("apple");
    fruitEnum.parse("banana");
    fruitEnum.parse(Fruits.Apple);
    fruitEnum.parse(Fruits.Banana);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("nativeEnum test with real enum", () => {
    let Fruits;
    (function (Fruits) {
        Fruits["Apple"] = "apple";
        Fruits["Banana"] = "banana";
    })(Fruits || (Fruits = {}));
    // @ts-ignore
    const fruitEnum = z.nativeEnum(Fruits);
    fruitEnum.parse("apple");
    fruitEnum.parse("banana");
    fruitEnum.parse(Fruits.Apple);
    fruitEnum.parse(Fruits.Banana);
    util_js_1.util.assertIs(true);
});
(0, vitest_1.test)("nativeEnum test with const with numeric keys", () => {
    const FruitValues = {
        Apple: 10,
        Banana: 20,
        // @ts-ignore
    };
    const fruitEnum = z.nativeEnum(FruitValues);
    fruitEnum.parse(10);
    fruitEnum.parse(20);
    fruitEnum.parse(FruitValues.Apple);
    fruitEnum.parse(FruitValues.Banana);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("from enum", () => {
    let Fruits;
    (function (Fruits) {
        Fruits[Fruits["Cantaloupe"] = 0] = "Cantaloupe";
        Fruits["Apple"] = "apple";
        Fruits["Banana"] = "banana";
    })(Fruits || (Fruits = {}));
    const FruitEnum = z.nativeEnum(Fruits);
    FruitEnum.parse(Fruits.Cantaloupe);
    FruitEnum.parse(Fruits.Apple);
    FruitEnum.parse("apple");
    FruitEnum.parse(0);
    (0, vitest_1.expect)(() => FruitEnum.parse(1)).toThrow();
    (0, vitest_1.expect)(() => FruitEnum.parse("Apple")).toThrow();
    (0, vitest_1.expect)(() => FruitEnum.parse("Cantaloupe")).toThrow();
});
(0, vitest_1.test)("from const", () => {
    const Greek = {
        Alpha: "a",
        Beta: "b",
        Gamma: 3,
        // @ts-ignore
    };
    const GreekEnum = z.nativeEnum(Greek);
    GreekEnum.parse("a");
    GreekEnum.parse("b");
    GreekEnum.parse(3);
    (0, vitest_1.expect)(() => GreekEnum.parse("v")).toThrow();
    (0, vitest_1.expect)(() => GreekEnum.parse("Alpha")).toThrow();
    (0, vitest_1.expect)(() => GreekEnum.parse(2)).toThrow();
    (0, vitest_1.expect)(GreekEnum.enum.Alpha).toEqual("a");
});

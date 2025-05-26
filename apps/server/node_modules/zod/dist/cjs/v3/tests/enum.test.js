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
(0, vitest_1.test)("create enum", () => {
    const MyEnum = z.enum(["Red", "Green", "Blue"]);
    (0, vitest_1.expect)(MyEnum.Values.Red).toEqual("Red");
    (0, vitest_1.expect)(MyEnum.Enum.Red).toEqual("Red");
    (0, vitest_1.expect)(MyEnum.enum.Red).toEqual("Red");
});
(0, vitest_1.test)("infer enum", () => {
    const MyEnum = z.enum(["Red", "Green", "Blue"]);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("get options", () => {
    (0, vitest_1.expect)(z.enum(["tuna", "trout"]).options).toEqual(["tuna", "trout"]);
});
(0, vitest_1.test)("readonly enum", () => {
    const HTTP_SUCCESS = ["200", "201"];
    const arg = z.enum(HTTP_SUCCESS);
    util_js_1.util.assertEqual(true);
    arg.parse("201");
    (0, vitest_1.expect)(() => arg.parse("202")).toThrow();
});
(0, vitest_1.test)("error params", () => {
    const result = z.enum(["test"], { required_error: "REQUIRED" }).safeParse(undefined);
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues[0].message).toEqual("REQUIRED");
    }
});
(0, vitest_1.test)("extract/exclude", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods);
    const ItalianEnum = FoodEnum.extract(["Pasta", "Pizza"]);
    const UnhealthyEnum = FoodEnum.exclude(["Salad"]);
    const EmptyFoodEnum = FoodEnum.exclude(foods);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    // @ts-expect-error TS2344
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("error map in extract/exclude", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods, {
        errorMap: () => ({ message: "This is not food!" }),
    });
    const ItalianEnum = FoodEnum.extract(["Pasta", "Pizza"]);
    const foodsError = FoodEnum.safeParse("Cucumbers");
    const italianError = ItalianEnum.safeParse("Tacos");
    if (!foodsError.success && !italianError.success) {
        (0, vitest_1.expect)(foodsError.error.issues[0].message).toEqual(italianError.error.issues[0].message);
    }
    const UnhealthyEnum = FoodEnum.exclude(["Salad"], {
        errorMap: () => ({ message: "This is not healthy food!" }),
    });
    const unhealthyError = UnhealthyEnum.safeParse("Salad");
    if (!unhealthyError.success) {
        (0, vitest_1.expect)(unhealthyError.error.issues[0].message).toEqual("This is not healthy food!");
    }
});
(0, vitest_1.test)("readonly in ZodEnumDef", () => {
    let _t;
    _t;
});

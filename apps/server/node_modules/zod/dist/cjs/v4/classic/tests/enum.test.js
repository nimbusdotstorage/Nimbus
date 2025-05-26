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
const z = __importStar(require("zod/v4"));
(0, vitest_1.test)("enum from string array", () => {
    const MyEnum = z.enum(["Red", "Green", "Blue"]);
    (0, vitest_1.expect)(MyEnum.enum.Red).toEqual("Red");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("enum from const object", () => {
    const Fruits = {
        Apple: "apple",
        Banana: "banana",
    };
    const fruitEnum = z.nativeEnum(Fruits);
    fruitEnum.parse("apple");
    fruitEnum.parse("banana");
    fruitEnum.parse(Fruits.Apple);
    fruitEnum.parse(Fruits.Banana);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("enum from native enum", () => {
    let Fruits;
    (function (Fruits) {
        Fruits["Apple"] = "apple";
        Fruits["Banana"] = "banana";
        Fruits[Fruits["Orange"] = 3] = "Orange";
    })(Fruits || (Fruits = {}));
    // @ts-ignore
    const fruitEnum = z.nativeEnum(Fruits);
    fruitEnum.parse("apple");
    fruitEnum.parse("banana");
    fruitEnum.parse(Fruits.Apple);
    fruitEnum.parse(Fruits.Banana);
    (0, vitest_1.expect)(fruitEnum.safeParse("Apple").success).toEqual(false);
    (0, vitest_1.expect)(fruitEnum.safeParse("Cantaloupe").success).toEqual(false);
    (0, vitest_1.expectTypeOf)().toMatchTypeOf();
    (0, vitest_1.expectTypeOf)().toMatchTypeOf();
});
(0, vitest_1.test)("enum from native enum with numeric keys", () => {
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("issue metadata", () => {
    const schema = z.enum(["Red", "Green", "Blue"]);
    const result = schema.safeParse("Yellow");
    (0, vitest_1.expect)(result.error.issues[0]).toMatchInlineSnapshot(`
    {
      "code": "invalid_value",
      "message": "Invalid option: expected one of "Red"|"Green"|"Blue"",
      "path": [],
      "values": [
        "Red",
        "Green",
        "Blue",
      ],
    }
  `);
});
(0, vitest_1.test)("enum from non-const inputs", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(FoodEnum.safeParse("Pasta").success).toEqual(true);
    (0, vitest_1.expect)(FoodEnum.safeParse("Cucumbers").success).toEqual(false);
});
(0, vitest_1.test)("get options", () => {
    (0, vitest_1.expect)(z.enum(["tuna", "trout"]).options).toEqual(["tuna", "trout"]);
});
(0, vitest_1.test)("readonly enum", () => {
    const HTTP_SUCCESS = ["200", "201"];
    const arg = z.enum(HTTP_SUCCESS);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    arg.parse("201");
    (0, vitest_1.expect)(() => arg.parse("202")).toThrow();
});
(0, vitest_1.test)("error map", () => {
    const result = z
        .enum(["test"], { error: (iss) => (iss.input === undefined ? "REQUIRED" : undefined) })
        .safeParse(undefined);
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues[0].message).toEqual("REQUIRED");
    }
});
(0, vitest_1.test)("type signatures", () => {
    const a = z.enum(["a", "b", "c"]);
    const b = z.enum(a.options);
    (0, vitest_1.expectTypeOf)(a).toEqualTypeOf(b);
    const c = z.enum({ a: 1, b: 2 });
    (0, vitest_1.expectTypeOf)(c.enum).toEqualTypeOf();
    let Fruit;
    (function (Fruit) {
        Fruit["Apple"] = "apple";
        Fruit["Banana"] = "banana";
        Fruit["Orange"] = "orange";
    })(Fruit || (Fruit = {}));
    const d = z.enum(Fruit);
    (0, vitest_1.expectTypeOf)(d.enum).toEqualTypeOf(Fruit);
    const e = z.enum({ a: 1, b: 2 });
    (0, vitest_1.expectTypeOf)(e.enum).toEqualTypeOf();
});
(0, vitest_1.test)("extract", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods);
    const ItalianEnum = FoodEnum.extract(["Pasta", "Pizza"]);
    (0, vitest_1.expect)(ItalianEnum.safeParse("Pasta").success).toEqual(true);
    (0, vitest_1.expect)(ItalianEnum.safeParse("Tacos").success).toEqual(false);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("exclude", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods);
    const UnhealthyEnum = FoodEnum.exclude(["Salad"]);
    (0, vitest_1.expect)(UnhealthyEnum.safeParse("Pasta").success).toEqual(true);
    (0, vitest_1.expect)(UnhealthyEnum.safeParse("Salad").success).toEqual(false);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const EmptyFoodEnum = FoodEnum.exclude(foods);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("error map inheritance", () => {
    const foods = ["Pasta", "Pizza", "Tacos", "Burgers", "Salad"];
    const FoodEnum = z.enum(foods, { error: () => "This is not food!" });
    const ItalianEnum = FoodEnum.extract(["Pasta", "Pizza"]);
    const foodsError = FoodEnum.safeParse("Cucumbers");
    const italianError = ItalianEnum.safeParse("Tacos");
    (0, vitest_1.expect)(foodsError.error.issues[0].message).toEqual(italianError.error.issues[0].message);
    const UnhealthyEnum = FoodEnum.exclude(["Salad"], {
        error: () => ({ message: "This is not healthy food!" }),
    });
    const unhealthyError = UnhealthyEnum.safeParse("Salad");
    if (!unhealthyError.success) {
        (0, vitest_1.expect)(unhealthyError.error.issues[0].message).toEqual("This is not healthy food!");
    }
});
(0, vitest_1.test)("readonly in ZodEnumDef", () => {
});
(0, vitest_1.test)("enum error message, invalid enum elementstring", () => {
    const result = z.enum(["Tuna", "Trout"]).safeParse("Salmon");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "Tuna",
          "Trout"
        ],
        "path": [],
        "message": "Invalid option: expected one of \\"Tuna\\"|\\"Trout\\""
      }
    ]]
  `);
});
(0, vitest_1.test)("enum error message, invalid type", () => {
    const result = z.enum(["Tuna", "Trout"]).safeParse(12);
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    // expect(result.error!.issues[0].message).toEqual('Invalid input: expected one of "Tuna"|"Trout"');
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "Tuna",
          "Trout"
        ],
        "path": [],
        "message": "Invalid option: expected one of \\"Tuna\\"|\\"Trout\\""
      }
    ]]
  `);
});
(0, vitest_1.test)("nativeEnum default error message", () => {
    let Fish;
    (function (Fish) {
        Fish["Tuna"] = "Tuna";
        Fish["Trout"] = "Trout";
    })(Fish || (Fish = {}));
    const result = z.nativeEnum(Fish).safeParse("Salmon");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    // expect(result.error!.issues[0].message).toEqual('Invalid input: expected one of "Tuna"|"Trout"');
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "Tuna",
          "Trout"
        ],
        "path": [],
        "message": "Invalid option: expected one of \\"Tuna\\"|\\"Trout\\""
      }
    ]]
  `);
});
(0, vitest_1.test)("enum with message returns the custom error message", () => {
    const schema = z.enum(["apple", "banana"], {
        message: "the value provided is invalid",
    });
    const result1 = schema.safeParse("berries");
    (0, vitest_1.expect)(result1.success).toEqual(false);
    if (!result1.success) {
        (0, vitest_1.expect)(result1.error.issues[0].message).toEqual("the value provided is invalid");
    }
    const result2 = schema.safeParse(undefined);
    (0, vitest_1.expect)(result2.success).toEqual(false);
    if (!result2.success) {
        (0, vitest_1.expect)(result2.error.issues[0].message).toEqual("the value provided is invalid");
    }
    const result3 = schema.safeParse("banana");
    (0, vitest_1.expect)(result3.success).toEqual(true);
    const result4 = schema.safeParse(null);
    (0, vitest_1.expect)(result4.success).toEqual(false);
    if (!result4.success) {
        (0, vitest_1.expect)(result4.error.issues[0].message).toEqual("the value provided is invalid");
    }
});
(0, vitest_1.test)("enum with diagonal keys", () => {
    const schema_02 = z.enum({
        A: 1,
        B: "A",
    });
    (0, vitest_1.expect)(schema_02.safeParse("A")).toMatchObject({ success: true });
});

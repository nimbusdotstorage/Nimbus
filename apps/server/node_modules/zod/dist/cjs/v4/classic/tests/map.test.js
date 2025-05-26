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
const stringMap = z.map(z.string(), z.string());
(0, vitest_1.test)("type inference", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("valid parse", () => {
    const result = stringMap.safeParse(new Map([
        ["first", "foo"],
        ["second", "bar"],
    ]));
    (0, vitest_1.expect)(result.success).toEqual(true);
    (0, vitest_1.expect)(result.data).toMatchInlineSnapshot(`
    Map {
      "first" => "foo",
      "second" => "bar",
    }
  `);
});
(0, vitest_1.test)("valid parse async", async () => {
    const asyncMap = z.map(z.string().refine(async () => false, "bad key"), z.string().refine(async () => false, "bad value"));
    const result = await asyncMap.safeParseAsync(new Map([["first", "foo"]]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [
          "first"
        ],
        "message": "bad key"
      },
      {
        "code": "custom",
        "path": [
          "first"
        ],
        "message": "bad value"
      }
    ]]
  `);
});
(0, vitest_1.test)("throws when a Set is given", () => {
    const result = stringMap.safeParse(new Set([]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual("invalid_type");
    }
});
(0, vitest_1.test)("throws when the given map has invalid key and invalid input", () => {
    const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            42
          ],
          "message": "Invalid input: expected string, received number"
        },
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            42
          ],
          "message": "Invalid input: expected string, received symbol"
        }
      ]]
    `);
    }
});
(0, vitest_1.test)("throws when the given map has multiple invalid entries", () => {
    // const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    const result = stringMap.safeParse(new Map([
        [1, "foo"],
        ["bar", 2],
    ]));
    // const result = stringMap.safeParse(new Map([[42, Symbol()]]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [
            1,
          ],
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [
            "bar",
          ],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("dirty", async () => {
    const map = z.map(z.string().refine((val) => val === val.toUpperCase(), {
        message: "Keys must be uppercase",
    }), z.string());
    const result = await map.spa(new Map([
        ["first", "foo"],
        ["second", "bar"],
    ]));
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "path": [
            "first"
          ],
          "message": "Keys must be uppercase"
        },
        {
          "code": "custom",
          "path": [
            "second"
          ],
          "message": "Keys must be uppercase"
        }
      ]]
    `);
    }
});
(0, vitest_1.test)("map with object keys", () => {
    const map = z.map(z.object({
        name: z.string(),
        age: z.number(),
    }), z.string());
    const data = new Map([
        [{ name: "John", age: 30 }, "foo"],
        [{ name: "Jane", age: 25 }, "bar"],
    ]);
    const result = map.safeParse(data);
    (0, vitest_1.expect)(result.success).toEqual(true);
    (0, vitest_1.expect)(result.data).toEqual(data);
    const badData = new Map([["bad", "foo"]]);
    const badResult = map.safeParse(badData);
    (0, vitest_1.expect)(badResult.success).toEqual(false);
    (0, vitest_1.expect)(badResult.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "object",
        "code": "invalid_type",
        "path": [
          "bad"
        ],
        "message": "Invalid input: expected object, received string"
      }
    ]]
  `);
});

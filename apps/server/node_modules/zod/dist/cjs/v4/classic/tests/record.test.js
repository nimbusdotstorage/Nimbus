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
(0, vitest_1.test)("type inference", () => {
    const booleanRecord = z.record(z.string(), z.boolean());
    const recordWithEnumKeys = z.record(z.enum(["Tuna", "Salmon"]), z.string());
    const recordWithLiteralKey = z.record(z.literal(["Tuna", "Salmon"]), z.string());
    const recordWithLiteralUnionKeys = z.record(z.union([z.literal("Tuna"), z.literal("Salmon")]), z.string());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("enum exhaustiveness", () => {
    const schema = z.record(z.enum(["Tuna", "Salmon"]), z.string());
    (0, vitest_1.expect)(schema.parse({
        Tuna: "asdf",
        Salmon: "asdf",
    })).toEqual({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("literal exhaustiveness", () => {
    const schema = z.record(z.literal(["Tuna", "Salmon"]), z.string());
    schema.parse({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("pipe exhaustiveness", () => {
    const schema = z.record(z.enum(["Tuna", "Salmon"]).pipe(z.any()), z.string());
    (0, vitest_1.expect)(schema.parse({ Tuna: "asdf", Salmon: "asdf" })).toEqual({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("union exhaustiveness", () => {
    const schema = z.record(z.union([z.literal("Tuna"), z.literal("Salmon")]), z.string());
    (0, vitest_1.expect)(schema.parse({ Tuna: "asdf", Salmon: "asdf" })).toEqual({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("string record parse - pass", () => {
    const schema = z.record(z.string(), z.boolean());
    schema.parse({
        k1: true,
        k2: false,
        1234: false,
    });
    (0, vitest_1.expect)(schema.safeParse({ asdf: 1234 }).success).toEqual(false);
    (0, vitest_1.expect)(schema.safeParse("asdf")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "record",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected record, received string"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("key and value getters", () => {
    const rec = z.record(z.string(), z.number());
    rec.keyType.parse("asdf");
    rec.valueType.parse(1234);
});
(0, vitest_1.test)("is not vulnerable to prototype pollution", async () => {
    const rec = z.record(z.string(), z.object({
        a: z.string(),
    }));
    const data = JSON.parse(`
    {
      "__proto__": {
        "a": "evil"
      },
      "b": {
        "a": "good"
      }
    }
  `);
    const obj1 = rec.parse(data);
    (0, vitest_1.expect)(obj1.a).toBeUndefined();
    const obj2 = rec.safeParse(data);
    (0, vitest_1.expect)(obj2.success).toBe(true);
    if (obj2.success) {
        (0, vitest_1.expect)(obj2.data.a).toBeUndefined();
    }
    const obj3 = await rec.parseAsync(data);
    (0, vitest_1.expect)(obj3.a).toBeUndefined();
    const obj4 = await rec.safeParseAsync(data);
    (0, vitest_1.expect)(obj4.success).toBe(true);
    if (obj4.success) {
        (0, vitest_1.expect)(obj4.data.a).toBeUndefined();
    }
});
(0, vitest_1.test)("dont remove undefined values", () => {
    const result1 = z.record(z.string(), z.any()).parse({ foo: undefined });
    (0, vitest_1.expect)(result1).toEqual({
        foo: undefined,
    });
});
(0, vitest_1.test)("allow undefined values", () => {
    const schema = z.record(z.string(), z.undefined());
    (0, vitest_1.expect)(Object.keys(schema.parse({
        _test: undefined,
    }))).toEqual(["_test"]);
});
(0, vitest_1.test)("async parsing", async () => {
    const schema = z
        .record(z.string(), z
        .string()
        .optional()
        .refine(async () => true))
        .refine(async () => true);
    const data = {
        foo: "bar",
        baz: "qux",
    };
    const result = await schema.safeParseAsync(data);
    (0, vitest_1.expect)(result.data).toEqual(data);
});
(0, vitest_1.test)("async parsing", async () => {
    const schema = z
        .record(z.string(), z
        .string()
        .optional()
        .refine(async () => false))
        .refine(async () => false);
    const data = {
        foo: "bar",
        baz: "qux",
    };
    const result = await schema.safeParseAsync(data);
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [
          "foo"
        ],
        "message": "Invalid input"
      },
      {
        "code": "custom",
        "path": [
          "baz"
        ],
        "message": "Invalid input"
      },
      {
        "code": "custom",
        "path": [],
        "message": "Invalid input"
      }
    ]]
  `);
});

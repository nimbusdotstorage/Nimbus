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
(0, vitest_1.test)("_values", () => {
    (0, vitest_1.expect)(z.string()._zod.values).toEqual(undefined);
    (0, vitest_1.expect)(z.enum(["a", "b"])._zod.values).toEqual(new Set(["a", "b"]));
    (0, vitest_1.expect)(z.nativeEnum({ a: "A", b: "B" })._zod.values).toEqual(new Set(["A", "B"]));
    (0, vitest_1.expect)(z.literal("test")._zod.values).toEqual(new Set(["test"]));
    (0, vitest_1.expect)(z.literal(123)._zod.values).toEqual(new Set([123]));
    (0, vitest_1.expect)(z.literal(true)._zod.values).toEqual(new Set([true]));
    (0, vitest_1.expect)(z.literal(BigInt(123))._zod.values).toEqual(new Set([BigInt(123)]));
    (0, vitest_1.expect)(z.undefined()._zod.values).toEqual(new Set([undefined]));
    (0, vitest_1.expect)(z.null()._zod.values).toEqual(new Set([null]));
    const t = z.literal("test");
    (0, vitest_1.expect)(t.optional()._zod.values).toEqual(new Set(["test", undefined]));
    (0, vitest_1.expect)(t.nullable()._zod.values).toEqual(new Set(["test", null]));
    (0, vitest_1.expect)(t.default("test")._zod.values).toEqual(new Set(["test"]));
    (0, vitest_1.expect)(t.catch("test")._zod.values).toEqual(new Set(["test"]));
    const pre = z.preprocess((val) => String(val), z.string()).pipe(z.literal("test"));
    (0, vitest_1.expect)(pre._zod.values).toEqual(undefined);
    const post = z.literal("test").transform((_) => Math.random());
    (0, vitest_1.expect)(post._zod.values).toEqual(new Set(["test"]));
});
(0, vitest_1.test)("valid parse - object", () => {
    (0, vitest_1.expect)(z
        .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ])
        .parse({ type: "a", a: "abc" })).toEqual({ type: "a", a: "abc" });
});
(0, vitest_1.test)("valid - include discriminator key (deprecated)", () => {
    (0, vitest_1.expect)(z
        .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ])
        .parse({ type: "a", a: "abc" })).toEqual({ type: "a", a: "abc" });
});
(0, vitest_1.test)("valid - optional discriminator (object)", () => {
    const schema = z.discriminatedUnion("type", [
        z.object({ type: z.literal("a").optional(), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ]);
    (0, vitest_1.expect)(schema.parse({ type: "a", a: "abc" })).toEqual({ type: "a", a: "abc" });
    (0, vitest_1.expect)(schema.parse({ a: "abc" })).toEqual({ a: "abc" });
});
(0, vitest_1.test)("valid - discriminator value of various primitive types", () => {
    const schema = z.discriminatedUnion("type", [
        z.object({ type: z.literal("1"), val: z.string() }),
        z.object({ type: z.literal(1), val: z.string() }),
        z.object({ type: z.literal(BigInt(1)), val: z.string() }),
        z.object({ type: z.literal("true"), val: z.string() }),
        z.object({ type: z.literal(true), val: z.string() }),
        z.object({ type: z.literal("null"), val: z.string() }),
        z.object({ type: z.null(), val: z.string() }),
        z.object({ type: z.literal("undefined"), val: z.string() }),
        z.object({ type: z.undefined(), val: z.string() }),
    ]);
    (0, vitest_1.expect)(schema.parse({ type: "1", val: "val" })).toEqual({ type: "1", val: "val" });
    (0, vitest_1.expect)(schema.parse({ type: 1, val: "val" })).toEqual({ type: 1, val: "val" });
    (0, vitest_1.expect)(schema.parse({ type: BigInt(1), val: "val" })).toEqual({
        type: BigInt(1),
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: "true", val: "val" })).toEqual({
        type: "true",
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: true, val: "val" })).toEqual({
        type: true,
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: "null", val: "val" })).toEqual({
        type: "null",
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: null, val: "val" })).toEqual({
        type: null,
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: "undefined", val: "val" })).toEqual({
        type: "undefined",
        val: "val",
    });
    (0, vitest_1.expect)(schema.parse({ type: undefined, val: "val" })).toEqual({
        type: undefined,
        val: "val",
    });
    const fail = schema.safeParse({
        type: "not_a_key",
        val: "val",
    });
    (0, vitest_1.expect)(fail.error).toBeInstanceOf(z.ZodError);
});
(0, vitest_1.test)("invalid - null", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ type: z.literal("b"), b: z.string() }),
        ]).parse(null);
        throw new Error();
    }
    catch (e) {
        // [
        //   {
        //     code: z.ZodIssueCode.invalid_type,
        //     expected: z.ZodParsedType.object,
        //     input: null,
        //     message: "Expected object, received null",
        //     received: z.ZodParsedType.null,
        //     path: [],
        //   },
        // ];
        (0, vitest_1.expect)(e.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_type",
          "expected": "object",
          "message": "Invalid input: expected object, received null",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("invalid discriminator value", () => {
    const result = z
        .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ])
        .safeParse({ type: "x", a: "abc" });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_union",
        "errors": [],
        "note": "No matching discriminator",
        "path": [
          "type"
        ],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("invalid discriminator value - unionFallback", () => {
    const result = z
        .discriminatedUnion("type", [z.object({ type: z.literal("a"), a: z.string() }), z.object({ type: z.literal("b"), b: z.string() })], { unionFallback: true })
        .safeParse({ type: "x", a: "abc" });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_union",
        "errors": [
          [
            {
              "code": "invalid_value",
              "values": [
                "a"
              ],
              "path": [
                "type"
              ],
              "message": "Invalid input: expected \\"a\\""
            }
          ],
          [
            {
              "code": "invalid_value",
              "values": [
                "b"
              ],
              "path": [
                "type"
              ],
              "message": "Invalid input: expected \\"b\\""
            },
            {
              "expected": "string",
              "code": "invalid_type",
              "path": [
                "b"
              ],
              "message": "Invalid input: expected string, received undefined"
            }
          ]
        ],
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("valid discriminator value, invalid data", () => {
    const result = z
        .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), a: z.string() }),
        z.object({ type: z.literal("b"), b: z.string() }),
    ])
        .safeParse({ type: "a", b: "abc" });
    // [
    //   {
    //     code: z.ZodIssueCode.invalid_type,
    //     expected: z.ZodParsedType.string,
    //     message: "Required",
    //     path: ["a"],
    //     received: z.ZodParsedType.undefined,
    //   },
    // ];
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "a"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("wrong schema - missing discriminator", () => {
    try {
        z.discriminatedUnion("type", [
            z.object({ type: z.literal("a"), a: z.string() }),
            z.object({ b: z.string() }),
        ])._zod.disc;
        throw new Error();
    }
    catch (e) {
        (0, vitest_1.expect)(e.message.includes("Invalid discriminated union option")).toBe(true);
    }
});
// removed to account for unions of unions
// test("wrong schema - duplicate discriminator values", () => {
//   try {
//     z.discriminatedUnion("type",[
//       z.object({ type: z.literal("a"), a: z.string() }),
//       z.object({ type: z.literal("a"), b: z.string() }),
//     ]);
//     throw new Error();
//   } catch (e: any) {
//     expect(e.message.includes("Duplicate discriminator value")).toEqual(true);
//   }
// });
(0, vitest_1.test)("async - valid", async () => {
    const schema = await z.discriminatedUnion("type", [
        z.object({
            type: z.literal("a"),
            a: z
                .string()
                .refine(async () => true)
                .transform(async (val) => Number(val)),
        }),
        z.object({
            type: z.literal("b"),
            b: z.string(),
        }),
    ]);
    const data = { type: "a", a: "1" };
    const result = await schema.safeParseAsync(data);
    (0, vitest_1.expect)(result.data).toEqual({ type: "a", a: 1 });
});
(0, vitest_1.test)("async - invalid", async () => {
    // try {
    const a = z.discriminatedUnion("type", [
        z.object({
            type: z.literal("a"),
            a: z
                .string()
                .refine(async () => true)
                .transform(async (val) => val),
        }),
        z.object({
            type: z.literal("b"),
            b: z.string(),
        }),
    ]);
    const result = await a.safeParseAsync({ type: "a", a: 1 });
    // expect(JSON.parse(e.message)).toEqual([
    //   {
    //     code: "invalid_type",
    //     expected: "string",
    //     input: 1,
    //     received: "number",
    //     path: ["a"],
    //     message: "Expected string, received number",
    //   },
    // ]);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "a"
        ],
        "message": "Invalid input: expected string, received number"
      }
    ]]
  `);
});
(0, vitest_1.test)("valid - literals with .default or .pipe", () => {
    const schema = z.discriminatedUnion("type", [
        z.object({
            type: z.literal("foo").default("foo"),
            a: z.string(),
        }),
        z.object({
            type: z.literal("custom"),
            method: z.string(),
        }),
        z.object({
            type: z.literal("bar").transform((val) => val),
            c: z.string(),
        }),
    ]);
    (0, vitest_1.expect)(schema.parse({ type: "foo", a: "foo" })).toEqual({
        type: "foo",
        a: "foo",
    });
});
(0, vitest_1.test)("enum and nativeEnum", () => {
    let MyEnum;
    (function (MyEnum) {
        MyEnum[MyEnum["d"] = 0] = "d";
        MyEnum["e"] = "e";
    })(MyEnum || (MyEnum = {}));
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a"),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.enum(["b", "c"]),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.nativeEnum(MyEnum),
            // Add other properties specific to this option
        }),
    ]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    schema.parse({ key: "a" });
    schema.parse({ key: "b" });
    schema.parse({ key: "c" });
    schema.parse({ key: MyEnum.d });
    schema.parse({ key: MyEnum.e });
    schema.parse({ key: "e" });
});
(0, vitest_1.test)("branded", () => {
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a"),
            // Add other properties specific to this option
        }),
        z.object({
            key: z.literal("b").brand(),
            // Add other properties specific to this option
        }),
    ]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    schema.parse({ key: "a" });
    schema.parse({ key: "b" });
    (0, vitest_1.expect)(() => {
        schema.parse({ key: "c" });
    }).toThrow();
});
(0, vitest_1.test)("optional and nullable", () => {
    const schema = z.discriminatedUnion("key", [
        z.object({
            key: z.literal("a").optional(),
            a: z.literal(true),
        }),
        z.object({
            key: z.literal("b").nullable(),
            b: z.literal(true),
            // Add other properties specific to this option
        }),
    ]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    schema.parse({ key: "a", a: true });
    schema.parse({ key: undefined, a: true });
    schema.parse({ key: "b", b: true });
    schema.parse({ key: null, b: true });
    (0, vitest_1.expect)(() => {
        schema.parse({ key: null, a: true });
    }).toThrow();
    (0, vitest_1.expect)(() => {
        schema.parse({ key: "b", a: true });
    }).toThrow();
    const value = schema.parse({ key: null, b: true });
    if (!("key" in value))
        value.a;
    if (value.key === undefined)
        value.a;
    if (value.key === "a")
        value.a;
    if (value.key === "b")
        value.b;
    if (value.key === null)
        value.b;
});
(0, vitest_1.test)("multple discriminators", () => {
    const FreeConfig = z.object({
        type: z.literal("free"),
        min_cents: z.null(),
    });
    // console.log(FreeConfig.shape.type);
    const PricedConfig = z.object({
        type: z.literal("fiat-price"),
        // min_cents: z.int().nullable(),
        min_cents: z.null(),
    });
    const Config = z.discriminatedUnion("type", [FreeConfig, PricedConfig]);
    Config.parse({
        min_cents: null,
        type: "fiat-price",
        name: "Standard",
    });
    (0, vitest_1.expect)(() => {
        Config.parse({
            min_cents: null,
            type: "not real",
            name: "Standard",
        });
    }).toThrow();
});
(0, vitest_1.test)("single element union", () => {
    const schema = z.object({
        a: z.literal("discKey"),
        b: z.enum(["apple", "banana"]),
        c: z.object({ id: z.string() }),
    });
    const input = {
        a: "discKey",
        b: "apple",
        c: {}, // Invalid, as schema requires `id` property
    };
    // Validation must fail here, but it doesn't
    const u = z.discriminatedUnion("a", [schema]);
    const result = u.safeParse(input);
    (0, vitest_1.expect)(result).toMatchObject({ success: false });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "c",
          "id"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(u.options.length).toEqual(1);
});
(0, vitest_1.test)("nested discriminated unions", () => {
    const BaseError = z.object({ status: z.literal("failed"), message: z.string() });
    const MyErrors = z.discriminatedUnion("code", [
        BaseError.extend({ code: z.literal(400) }),
        BaseError.extend({ code: z.literal(401) }),
        BaseError.extend({ code: z.literal(500) }),
    ]);
    const MyResult = z.discriminatedUnion("status", [
        z.object({ status: z.literal("success"), data: z.string() }),
        MyErrors,
    ]);
    const result = MyResult.parse({ status: "success", data: "hello" });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "data": "hello",
      "status": "success",
    }
  `);
    const result2 = MyResult.parse({ status: "failed", code: 400, message: "bad request" });
    (0, vitest_1.expect)(result2).toMatchInlineSnapshot(`
    {
      "code": 400,
      "message": "bad request",
      "status": "failed",
    }
  `);
    const result3 = MyResult.parse({ status: "failed", code: 401, message: "unauthorized" });
    (0, vitest_1.expect)(result3).toMatchInlineSnapshot(`
    {
      "code": 401,
      "message": "unauthorized",
      "status": "failed",
    }
  `);
    const result4 = MyResult.parse({ status: "failed", code: 500, message: "internal server error" });
    (0, vitest_1.expect)(result4).toMatchInlineSnapshot(`
    {
      "code": 500,
      "message": "internal server error",
      "status": "failed",
    }
  `);
});

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
const Test = z.object({
    f1: z.number(),
    f2: z.string().optional(),
    f3: z.string().nullable(),
    f4: z.array(z.object({ t: z.union([z.string(), z.boolean()]) })),
});
// type TestFlattenedErrors = core.inferFlattenedErrors<typeof Test, { message: string; code: number }>;
// type TestFormErrors = core.inferFlattenedErrors<typeof Test>;
const parsed = Test.safeParse({});
(0, vitest_1.test)("regular error", () => {
    (0, vitest_1.expect)(parsed).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "path": [
          "f1"
        ],
        "message": "Invalid input: expected number, received undefined"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "f3"
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "expected": "array",
        "code": "invalid_type",
        "path": [
          "f4"
        ],
        "message": "Invalid input: expected array, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)(".flatten()", () => {
    const flattened = parsed.error.flatten();
    // flattened.
    (0, vitest_1.expectTypeOf)(flattened).toMatchTypeOf();
    (0, vitest_1.expect)(flattened).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "f1": [
          "Invalid input: expected number, received undefined",
        ],
        "f3": [
          "Invalid input: expected string, received undefined",
        ],
        "f4": [
          "Invalid input: expected array, received undefined",
        ],
      },
      "formErrors": [],
    }
  `);
});
(0, vitest_1.test)("custom .flatten()", () => {
    const flattened = parsed.error.flatten((iss) => ({ message: iss.message, code: 1234 }));
    (0, vitest_1.expectTypeOf)(flattened).toMatchTypeOf();
    (0, vitest_1.expect)(flattened).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "f1": [
          {
            "code": 1234,
            "message": "Invalid input: expected number, received undefined",
          },
        ],
        "f3": [
          {
            "code": 1234,
            "message": "Invalid input: expected string, received undefined",
          },
        ],
        "f4": [
          {
            "code": 1234,
            "message": "Invalid input: expected array, received undefined",
          },
        ],
      },
      "formErrors": [],
    }
  `);
});
(0, vitest_1.test)(".format()", () => {
    const formatted = parsed.error.format();
    (0, vitest_1.expectTypeOf)(formatted).toMatchTypeOf();
    (0, vitest_1.expect)(formatted).toMatchInlineSnapshot(`
    {
      "_errors": [],
      "f1": {
        "_errors": [
          "Invalid input: expected number, received undefined",
        ],
      },
      "f3": {
        "_errors": [
          "Invalid input: expected string, received undefined",
        ],
      },
      "f4": {
        "_errors": [
          "Invalid input: expected array, received undefined",
        ],
      },
    }
  `);
});
(0, vitest_1.test)("custom .format()", () => {
    const formatted = parsed.error.format((iss) => ({ message: iss.message, code: 1234 }));
    (0, vitest_1.expectTypeOf)(formatted).toMatchTypeOf();
    (0, vitest_1.expect)(formatted).toMatchInlineSnapshot(`
    {
      "_errors": [],
      "f1": {
        "_errors": [
          {
            "code": 1234,
            "message": "Invalid input: expected number, received undefined",
          },
        ],
      },
      "f3": {
        "_errors": [
          {
            "code": 1234,
            "message": "Invalid input: expected string, received undefined",
          },
        ],
      },
      "f4": {
        "_errors": [
          {
            "code": 1234,
            "message": "Invalid input: expected array, received undefined",
          },
        ],
      },
    }
  `);
});
(0, vitest_1.test)("all errors", () => {
    const propertySchema = z.string();
    const schema = z
        .object({
        a: propertySchema,
        b: propertySchema,
    })
        .refine((val) => {
        return val.a === val.b;
    }, { message: "Must be equal" });
    const r1 = schema.safeParse({
        a: "asdf",
        b: "qwer",
    });
    (0, vitest_1.expect)(z.core.flattenError(r1.error)).toEqual({
        formErrors: ["Must be equal"],
        fieldErrors: {},
    });
    const r2 = schema.safeParse({
        a: null,
        b: null,
    });
    // const error = _error as z.ZodError;
    (0, vitest_1.expect)(z.core.flattenError(r2.error)).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "a": [
          "Invalid input: expected string, received null",
        ],
        "b": [
          "Invalid input: expected string, received null",
        ],
      },
      "formErrors": [],
    }
  `);
    (0, vitest_1.expect)(z.core.flattenError(r2.error, (iss) => iss.message.toUpperCase())).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "a": [
          "INVALID INPUT: EXPECTED STRING, RECEIVED NULL",
        ],
        "b": [
          "INVALID INPUT: EXPECTED STRING, RECEIVED NULL",
        ],
      },
      "formErrors": [],
    }
  `);
    // Test identity
    (0, vitest_1.expect)(z.core.flattenError(r2.error, (i) => i)).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "a": [
          {
            "code": "invalid_type",
            "expected": "string",
            "message": "Invalid input: expected string, received null",
            "path": [
              "a",
            ],
          },
        ],
        "b": [
          {
            "code": "invalid_type",
            "expected": "string",
            "message": "Invalid input: expected string, received null",
            "path": [
              "b",
            ],
          },
        ],
      },
      "formErrors": [],
    }
  `);
    // Test mapping
    const f1 = z.core.flattenError(r2.error, (i) => i.message.length);
    (0, vitest_1.expect)(f1).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "a": [
          45,
        ],
        "b": [
          45,
        ],
      },
      "formErrors": [],
    }
  `);
    // expect(f1.fieldErrors.a![0]).toEqual("Invalid input: expected string".length);
    // expect(f1).toMatchObject({
    //   formErrors: [],
    //   fieldErrors: {
    //     a: ["Invalid input: expected string".length],
    //     b: ["Invalid input: expected string".length],
    //   },
    // });
});
const schema = z.strictObject({
    username: z.string(),
    favoriteNumbers: z.array(z.number()),
    nesting: z.object({
        a: z.string(),
    }),
});
const result = schema.safeParse({
    username: 1234,
    favoriteNumbers: [1234, "4567"],
    nesting: {
        a: 123,
    },
    extra: 1234,
});
(0, vitest_1.test)("z.treeifyError", () => {
    (0, vitest_1.expect)(z.treeifyError(result.error)).toMatchInlineSnapshot(`
    {
      "errors": [
        "Unrecognized key: "extra"",
      ],
      "properties": {
        "favoriteNumbers": {
          "errors": [],
          "items": [
            ,
            {
              "errors": [
                "Invalid input: expected number, received string",
              ],
            },
          ],
        },
        "nesting": {
          "errors": [],
          "properties": {
            "a": {
              "errors": [
                "Invalid input: expected string, received number",
              ],
            },
          },
        },
        "username": {
          "errors": [
            "Invalid input: expected string, received number",
          ],
        },
      },
    }
  `);
});
(0, vitest_1.test)("z.treeifyError 2", () => {
    const schema = z.strictObject({
        name: z.string(),
        logLevel: z.union([z.string(), z.number()]),
        env: z.literal(["production", "development"]),
    });
    const data = {
        name: 1000,
        logLevel: false,
        extra: 1000,
    };
    const result = schema.safeParse(data);
    const err = z.treeifyError(result.error);
    (0, vitest_1.expect)(err).toMatchInlineSnapshot(`
    {
      "errors": [
        "Unrecognized key: "extra"",
      ],
      "properties": {
        "env": {
          "errors": [
            "Invalid option: expected one of "production"|"development"",
          ],
        },
        "logLevel": {
          "errors": [
            "Invalid input: expected string, received boolean",
            "Invalid input: expected number, received boolean",
          ],
        },
        "name": {
          "errors": [
            "Invalid input: expected string, received number",
          ],
        },
      },
    }
  `);
});
(0, vitest_1.test)("z.prettifyError", () => {
    (0, vitest_1.expect)(z.prettifyError(result.error)).toMatchInlineSnapshot(`
    "✖ Unrecognized key: "extra"
    ✖ Invalid input: expected string, received number
      → at username
    ✖ Invalid input: expected number, received string
      → at favoriteNumbers[1]
    ✖ Invalid input: expected string, received number
      → at nesting.a"
  `);
});
(0, vitest_1.test)("z.toDotPath", () => {
    (0, vitest_1.expect)(z.core.toDotPath(["a", "b", 0, "c"])).toMatchInlineSnapshot(`"a.b[0].c"`);
    (0, vitest_1.expect)(z.core.toDotPath(["a", Symbol("b"), 0, "c"])).toMatchInlineSnapshot(`"a["Symbol(b)"][0].c"`);
    // Test with periods in keys
    (0, vitest_1.expect)(z.core.toDotPath(["user.name", "first.last"])).toMatchInlineSnapshot(`"["user.name"]["first.last"]"`);
    // Test with special characters
    (0, vitest_1.expect)(z.core.toDotPath(["user", "$special", Symbol("#symbol")])).toMatchInlineSnapshot(`"user.$special["Symbol(#symbol)"]"`);
    // Test with dots and quotes
    (0, vitest_1.expect)(z.core.toDotPath(["search", `query("foo.bar"="abc")`])).toMatchInlineSnapshot(`"search["query(\\"foo.bar\\"=\\"abc\\")"]"`);
    // Test with newlines
    (0, vitest_1.expect)(z.core.toDotPath(["search", `foo\nbar`])).toMatchInlineSnapshot(`"search["foo\\nbar"]"`);
    // Test with empty strings
    (0, vitest_1.expect)(z.core.toDotPath(["", "empty"])).toMatchInlineSnapshot(`".empty"`);
    // Test with array indices
    (0, vitest_1.expect)(z.core.toDotPath(["items", 0, 1, 2])).toMatchInlineSnapshot(`"items[0][1][2]"`);
    // Test with mixed path elements
    (0, vitest_1.expect)(z.core.toDotPath(["users", "user.config", 0, "settings.theme"])).toMatchInlineSnapshot(`"users["user.config"][0]["settings.theme"]"`);
    // Test with square brackets in keys
    (0, vitest_1.expect)(z.core.toDotPath(["data[0]", "value"])).toMatchInlineSnapshot(`"["data[0]"].value"`);
    // Test with empty path
    (0, vitest_1.expect)(z.core.toDotPath([])).toMatchInlineSnapshot(`""`);
});
(0, vitest_1.test)("inheritance", () => {
    const e1 = new z.ZodError([]);
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.core.$ZodError);
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.ZodError);
    // expect(e1).not.toBeInstanceOf(Error);
    const e2 = new z.ZodRealError([]);
    (0, vitest_1.expect)(e2).toBeInstanceOf(z.ZodError);
    (0, vitest_1.expect)(e2).toBeInstanceOf(z.ZodRealError);
    (0, vitest_1.expect)(e2).toBeInstanceOf(Error);
});

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
(0, vitest_1.test)("preprocess", () => {
    const schema = z.preprocess((data) => [data], z.string().array());
    const value = schema.parse("asdf");
    (0, vitest_1.expect)(value).toEqual(["asdf"]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("async preprocess", async () => {
    const schema = z.preprocess(async (data) => {
        return [data];
    }, z.string().array());
    const value = await schema.safeParseAsync("asdf");
    (0, vitest_1.expect)(value.data).toEqual(["asdf"]);
    (0, vitest_1.expect)(value).toMatchInlineSnapshot(`
    {
      "data": [
        "asdf",
      ],
      "success": true,
    }
  `);
});
(0, vitest_1.test)("ctx.addIssue accepts string", () => {
    const schema = z.preprocess((_, ctx) => {
        ctx.addIssue("bad stuff");
    }, z.string());
    const result = schema.safeParse("asdf");
    (0, vitest_1.expect)(result.error.issues).toHaveLength(1);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "message": "bad stuff",
        "code": "custom",
        "path": []
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("preprocess ctx.addIssue with parse", () => {
    const a = z.preprocess((data, ctx) => {
        ctx.addIssue({
            input: data,
            code: "custom",
            message: `${data} is not one of our allowed strings`,
        });
        return data;
    }, z.string());
    const result = a.safeParse("asdf");
    // expect(result.error!.toJSON()).toContain("not one of our allowed strings");
    (0, vitest_1.expect)(result.error.issues).toHaveLength(1);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "asdf is not one of our allowed strings",
        "path": []
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("preprocess ctx.addIssue non-fatal by default", () => {
    const schema = z.preprocess((data, ctx) => {
        ctx.addIssue({
            code: "custom",
            message: `custom error`,
        });
        return data;
    }, z.string());
    const result = schema.safeParse(1234);
    (0, vitest_1.expect)(result.error.issues).toHaveLength(2);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "custom error",
        "path": []
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected string, received number"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("preprocess ctx.addIssue fatal true", () => {
    const schema = z.preprocess((data, ctx) => {
        ctx.addIssue({
            input: data,
            code: "custom",
            origin: "custom",
            message: `custom error`,
            fatal: true,
        });
        return data;
    }, z.string());
    const result = schema.safeParse(1234);
    (0, vitest_1.expect)(result.error.issues).toHaveLength(1);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "origin": "custom",
        "message": "custom error",
        "fatal": true,
        "path": []
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("async preprocess ctx.addIssue with parseAsync", async () => {
    const schema = z.preprocess(async (data, ctx) => {
        ctx.addIssue({
            input: data,
            code: "custom",
            message: `${data} is not one of our allowed strings`,
        });
        return data;
    }, z.string());
    const result = await schema.safeParseAsync("asdf");
    (0, vitest_1.expect)(result.error.issues).toHaveLength(1);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "asdf is not one of our allowed strings",
        "path": []
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("z.NEVER in preprocess", () => {
    const foo = z.preprocess((val, ctx) => {
        if (!val) {
            ctx.addIssue({ input: val, code: "custom", message: "bad" });
            return z.NEVER;
        }
        return val;
    }, z.number());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const result = foo.safeParse(undefined);
    (0, vitest_1.expect)(result.error.issues).toHaveLength(2);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "bad",
        "path": []
      },
      {
        "expected": "number",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected number, received object"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("preprocess as the second property of object", () => {
    const schema = z.object({
        nonEmptyStr: z.string().min(1),
        positiveNum: z.preprocess((v) => Number(v), z.number().positive()),
    });
    const result = schema.safeParse({
        nonEmptyStr: "",
        positiveNum: "",
    });
    (0, vitest_1.expect)(result.error.issues).toHaveLength(2);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 1,
        "path": [
          "nonEmptyStr"
        ],
        "message": "Too small: expected string to have >1 characters"
      },
      {
        "origin": "number",
        "code": "too_small",
        "minimum": 0,
        "inclusive": false,
        "path": [
          "positiveNum"
        ],
        "message": "Too small: expected number to be >0"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("preprocess validates with sibling errors", () => {
    const schema = z.object({
        missing: z.string().refine(() => false),
        preprocess: z.preprocess((data) => data?.trim(), z.string().regex(/ asdf/)),
    });
    const result = schema.safeParse({ preprocess: " asdf" });
    (0, vitest_1.expect)(result.error.issues).toHaveLength(2);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "missing"
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "origin": "string",
        "code": "invalid_format",
        "format": "regex",
        "pattern": "/ asdf/",
        "path": [
          "preprocess"
        ],
        "message": "Invalid string: must match pattern / asdf/"
      }
    ]],
      "success": false,
    }
  `);
});

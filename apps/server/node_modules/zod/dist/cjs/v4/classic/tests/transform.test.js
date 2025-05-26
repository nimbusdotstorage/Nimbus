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
(0, vitest_1.test)("transform ctx.addIssue with parse", () => {
    const strs = ["foo", "bar"];
    const schema = z.string().transform((data, ctx) => {
        const i = strs.indexOf(data);
        if (i === -1) {
            ctx.addIssue({
                input: data,
                code: "custom",
                message: `${data} is not one of our allowed strings`,
            });
        }
        return data.length;
    });
    const result = schema.safeParse("asdf");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "message": "asdf is not one of our allowed strings",
        "path": []
      }
    ]]
  `);
});
(0, vitest_1.test)("transform ctx.addIssue with parseAsync", async () => {
    const strs = ["foo", "bar"];
    const result = await z
        .string()
        .transform(async (data, ctx) => {
        const i = strs.indexOf(data);
        if (i === -1) {
            ctx.addIssue({
                input: data,
                code: "custom",
                message: `${data} is not one of our allowed strings`,
            });
        }
        return data.length;
    })
        .safeParseAsync("asdf");
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
(0, vitest_1.test)("z.NEVER in transform", () => {
    const foo = z
        .number()
        .optional()
        .transform((val, ctx) => {
        if (!val) {
            ctx.addIssue({
                input: val,
                code: z.ZodIssueCode.custom,
                message: "bad",
            });
            return z.NEVER;
        }
        return val;
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const arg = foo.safeParse(undefined);
    if (!arg.success) {
        (0, vitest_1.expect)(arg.error.issues[0].message).toEqual("bad");
    }
});
(0, vitest_1.test)("basic transformations", () => {
    const r1 = z
        .string()
        .transform((data) => data.length)
        .parse("asdf");
    (0, vitest_1.expect)(r1).toEqual(4);
});
(0, vitest_1.test)("coercion", () => {
    const numToString = z.number().transform((n) => String(n));
    const data = z
        .object({
        id: numToString,
    })
        .parse({ id: 5 });
    (0, vitest_1.expect)(data).toEqual({ id: "5" });
});
(0, vitest_1.test)("async coercion", async () => {
    const numToString = z.number().transform(async (n) => String(n));
    const data = await z
        .object({
        id: numToString,
    })
        .parseAsync({ id: 5 });
    (0, vitest_1.expect)(data).toEqual({ id: "5" });
});
(0, vitest_1.test)("sync coercion async error", async () => {
    const asyncNumberToString = z.number().transform(async (n) => String(n));
    (0, vitest_1.expect)(() => z
        .object({
        id: asyncNumberToString,
    })
        .parse({ id: 5 })).toThrow();
    // expect(data).toEqual({ id: '5' });
});
(0, vitest_1.test)("default", () => {
    const data = z.string().default("asdf").parse(undefined); // => "asdf"
    (0, vitest_1.expect)(data).toEqual("asdf");
});
(0, vitest_1.test)("dynamic default", () => {
    const data = z
        .string()
        .default(() => "string")
        .parse(undefined); // => "asdf"
    (0, vitest_1.expect)(data).toEqual("string");
});
(0, vitest_1.test)("default when property is null or undefined", () => {
    const data = z
        .object({
        foo: z.boolean().nullable().default(true),
        bar: z.boolean().default(true),
    })
        .parse({ foo: null });
    (0, vitest_1.expect)(data).toEqual({ foo: null, bar: true });
});
(0, vitest_1.test)("default with falsy values", () => {
    const schema = z.object({
        emptyStr: z.string().default("def"),
        zero: z.number().default(5),
        falseBoolean: z.boolean().default(true),
    });
    const input = { emptyStr: "", zero: 0, falseBoolean: true };
    const output = schema.parse(input);
    // defaults are not supposed to be used
    (0, vitest_1.expect)(output).toEqual(input);
});
(0, vitest_1.test)("object typing", () => {
    const stringToNumber = z.string().transform((arg) => Number.parseFloat(arg));
    const t1 = z.object({
        stringToNumber,
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("transform method overloads", () => {
    const t1 = z.string().transform((val) => val.toUpperCase());
    (0, vitest_1.expect)(t1.parse("asdf")).toEqual("ASDF");
    const t2 = z.string().transform((val) => val.length);
    (0, vitest_1.expect)(t2.parse("asdf")).toEqual(4);
});
(0, vitest_1.test)("multiple transformers", () => {
    const stringToNumber = z.string().transform((arg) => Number.parseFloat(arg));
    const doubler = stringToNumber.transform((val) => {
        return val * 2;
    });
    (0, vitest_1.expect)(doubler.parse("5")).toEqual(10);
});
(0, vitest_1.test)("short circuit on dirty", () => {
    const schema = z
        .string()
        .refine(() => false)
        .transform((val) => val.toUpperCase());
    const result = schema.safeParse("asdf");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "Invalid input"
      }
    ]]
  `);
    const result2 = schema.safeParse(1234);
    (0, vitest_1.expect)(result2.success).toEqual(false);
    if (!result2.success) {
        (0, vitest_1.expect)(result2.error.issues[0].code).toEqual(z.ZodIssueCode.invalid_type);
    }
});
(0, vitest_1.test)("async short circuit on dirty", async () => {
    const schema = z
        .string()
        .refine(() => false)
        .transform((val) => val.toUpperCase());
    const result = await schema.spa("asdf");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "Invalid input"
      }
    ]]
  `);
    const result2 = await schema.spa(1234);
    (0, vitest_1.expect)(result2.success).toEqual(false);
    (0, vitest_1.expect)(result2.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected string, received number"
      }
    ]]
  `);
});

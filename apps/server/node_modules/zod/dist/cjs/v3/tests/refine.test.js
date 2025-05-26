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
const ZodError_js_1 = require("../ZodError.js");
const util_js_1 = require("../helpers/util.js");
(0, vitest_1.test)("refinement", () => {
    const obj1 = z.object({
        first: z.string(),
        second: z.string(),
    });
    const obj2 = obj1.partial().strict();
    const obj3 = obj2.refine((data) => data.first || data.second, "Either first or second should be filled in.");
    (0, vitest_1.expect)(obj1 === obj2).toEqual(false);
    (0, vitest_1.expect)(obj2 === obj3).toEqual(false);
    (0, vitest_1.expect)(() => obj1.parse({})).toThrow();
    (0, vitest_1.expect)(() => obj2.parse({ third: "adsf" })).toThrow();
    (0, vitest_1.expect)(() => obj3.parse({})).toThrow();
    obj3.parse({ first: "a" });
    obj3.parse({ second: "a" });
    obj3.parse({ first: "a", second: "a" });
});
(0, vitest_1.test)("refinement 2", () => {
    const validationSchema = z
        .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
    })
        .refine((data) => data.password === data.confirmPassword, "Both password and confirmation must match");
    (0, vitest_1.expect)(() => validationSchema.parse({
        email: "aaaa@gmail.com",
        password: "aaaaaaaa",
        confirmPassword: "bbbbbbbb",
    })).toThrow();
});
(0, vitest_1.test)("refinement type guard", () => {
    const validationSchema = z.object({
        a: z.string().refine((s) => s === "a"),
    });
    util_js_1.util.assertEqual(false);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(false);
});
(0, vitest_1.test)("refinement Promise", async () => {
    const validationSchema = z
        .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
    })
        .refine((data) => Promise.resolve().then(() => data.password === data.confirmPassword), "Both password and confirmation must match");
    await validationSchema.parseAsync({
        email: "aaaa@gmail.com",
        password: "password",
        confirmPassword: "password",
    });
});
(0, vitest_1.test)("custom path", async () => {
    const result = await z
        .object({
        password: z.string(),
        confirm: z.string(),
    })
        .refine((data) => data.confirm === data.password, { path: ["confirm"] })
        .spa({ password: "asdf", confirm: "qewr" });
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues[0].path).toEqual(["confirm"]);
    }
});
(0, vitest_1.test)("use path in refinement context", async () => {
    const noNested = z.string()._refinement((_val, ctx) => {
        if (ctx.path.length > 0) {
            ctx.addIssue({
                code: ZodError_js_1.ZodIssueCode.custom,
                message: `schema cannot be nested. path: ${ctx.path.join(".")}`,
            });
            return false;
        }
        else {
            return true;
        }
    });
    const data = z.object({
        foo: noNested,
    });
    const t1 = await noNested.spa("asdf");
    const t2 = await data.spa({ foo: "asdf" });
    (0, vitest_1.expect)(t1.success).toBe(true);
    (0, vitest_1.expect)(t2.success).toBe(false);
    if (t2.success === false) {
        (0, vitest_1.expect)(t2.error.issues[0].message).toEqual("schema cannot be nested. path: foo");
    }
});
(0, vitest_1.test)("superRefine", () => {
    const Strings = z.array(z.string()).superRefine((val, ctx) => {
        if (val.length > 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                maximum: 3,
                type: "array",
                inclusive: true,
                exact: true,
                message: "Too many items 😡",
            });
        }
        if (val.length !== new Set(val).size) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `No duplicates allowed.`,
            });
        }
    });
    const result = Strings.safeParse(["asfd", "asfd", "asfd", "asfd"]);
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success)
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
    Strings.parse(["asfd", "qwer"]);
});
(0, vitest_1.test)("superRefine async", async () => {
    const Strings = z.array(z.string()).superRefine(async (val, ctx) => {
        if (val.length > 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                maximum: 3,
                type: "array",
                inclusive: true,
                exact: true,
                message: "Too many items 😡",
            });
        }
        if (val.length !== new Set(val).size) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `No duplicates allowed.`,
            });
        }
    });
    const result = await Strings.safeParseAsync(["asfd", "asfd", "asfd", "asfd"]);
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success)
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
    Strings.parseAsync(["asfd", "qwer"]);
});
(0, vitest_1.test)("superRefine - type narrowing", () => {
    const schema = z
        .object({
        type: z.string(),
        age: z.number(),
    })
        .nullable()
        .superRefine((arg, ctx) => {
        if (!arg) {
            // still need to make a call to ctx.addIssue
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "cannot be null",
                fatal: true,
            });
            return false;
        }
        return true;
    });
    util_js_1.util.assertEqual(true);
    (0, vitest_1.expect)(schema.safeParse({ type: "test", age: 0 }).success).toEqual(true);
    (0, vitest_1.expect)(schema.safeParse(null).success).toEqual(false);
});
(0, vitest_1.test)("chained mixed refining types", () => {
    const schema = z
        .object({
        first: z.string(),
        second: z.number(),
        third: z.boolean(),
    })
        .nullable()
        .refine((arg) => !!arg?.third)
        .superRefine((arg, ctx) => {
        util_js_1.util.assertEqual(true);
        if (arg.first !== "bob") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "`first` property must be `bob`",
            });
            return false;
        }
        return true;
    })
        .refine((arg) => {
        util_js_1.util.assertEqual(true);
        return arg.second === 33;
    });
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("get inner type", () => {
    z.string()
        .refine(() => true)
        .innerType()
        .parse("asdf");
});
(0, vitest_1.test)("chained refinements", () => {
    const objectSchema = z
        .object({
        length: z.number(),
        size: z.number(),
    })
        .refine(({ length }) => length > 5, {
        path: ["length"],
        message: "length greater than 5",
    })
        .refine(({ size }) => size > 7, {
        path: ["size"],
        message: "size greater than 7",
    });
    const r1 = objectSchema.safeParse({
        length: 4,
        size: 9,
    });
    (0, vitest_1.expect)(r1.success).toEqual(false);
    if (!r1.success)
        (0, vitest_1.expect)(r1.error.issues.length).toEqual(1);
    const r2 = objectSchema.safeParse({
        length: 4,
        size: 3,
    });
    (0, vitest_1.expect)(r2.success).toEqual(false);
    if (!r2.success)
        (0, vitest_1.expect)(r2.error.issues.length).toEqual(2);
});
(0, vitest_1.test)("fatal superRefine", () => {
    const Strings = z
        .string()
        .superRefine((val, ctx) => {
        if (val === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "foo",
                fatal: true,
            });
        }
    })
        .superRefine((val, ctx) => {
        if (val !== " ") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "bar",
            });
        }
    });
    const result = Strings.safeParse("");
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success)
        (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
});

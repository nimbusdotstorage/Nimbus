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
(0, vitest_1.test)("preprocess", () => {
    const schema = z.preprocess((data) => [data], z.string().array());
    const value = schema.parse("asdf");
    (0, vitest_1.expect)(value).toEqual(["asdf"]);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("async preprocess", async () => {
    const schema = z.preprocess(async (data) => [data], z.string().array());
    const value = await schema.parseAsync("asdf");
    (0, vitest_1.expect)(value).toEqual(["asdf"]);
});
(0, vitest_1.test)("preprocess ctx.addIssue with parse", () => {
    (0, vitest_1.expect)(() => {
        z.preprocess((data, ctx) => {
            ctx.addIssue({
                code: "custom",
                message: `${data} is not one of our allowed strings`,
            });
            return data;
        }, z.string()).parse("asdf");
    }).toThrow(JSON.stringify([
        {
            code: "custom",
            message: "asdf is not one of our allowed strings",
            path: [],
        },
    ], null, 2));
});
(0, vitest_1.test)("preprocess ctx.addIssue non-fatal by default", () => {
    try {
        z.preprocess((data, ctx) => {
            ctx.addIssue({
                code: "custom",
                message: `custom error`,
            });
            return data;
        }, z.string()).parse(1234);
    }
    catch (err) {
        z.ZodError.assert(err);
        (0, vitest_1.expect)(err.issues.length).toEqual(2);
    }
});
(0, vitest_1.test)("preprocess ctx.addIssue fatal true", () => {
    try {
        z.preprocess((data, ctx) => {
            ctx.addIssue({
                code: "custom",
                message: `custom error`,
                fatal: true,
            });
            return data;
        }, z.string()).parse(1234);
    }
    catch (err) {
        z.ZodError.assert(err);
        (0, vitest_1.expect)(err.issues.length).toEqual(1);
    }
});
(0, vitest_1.test)("async preprocess ctx.addIssue with parse", async () => {
    const schema = z.preprocess(async (data, ctx) => {
        ctx.addIssue({
            code: "custom",
            message: `custom error`,
        });
        return data;
    }, z.string());
    (0, vitest_1.expect)(schema.parseAsync("asdf")).rejects.toThrow(JSON.stringify([
        {
            code: "custom",
            message: "custom error",
            path: [],
        },
    ], null, 2));
});
(0, vitest_1.test)("preprocess ctx.addIssue with parseAsync", async () => {
    const result = await z
        .preprocess(async (data, ctx) => {
        ctx.addIssue({
            code: "custom",
            message: `${data} is not one of our allowed strings`,
        });
        return data;
    }, z.string())
        .safeParseAsync("asdf");
    (0, vitest_1.expect)(JSON.parse(JSON.stringify(result))).toEqual({
        success: false,
        error: {
            issues: [
                {
                    code: "custom",
                    message: "asdf is not one of our allowed strings",
                    path: [],
                },
            ],
            name: "ZodError",
        },
    });
});
(0, vitest_1.test)("z.NEVER in preprocess", () => {
    const foo = z.preprocess((val, ctx) => {
        if (!val) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "bad" });
            return z.NEVER;
        }
        return val;
    }, z.number());
    util_js_1.util.assertEqual(true);
    const arg = foo.safeParse(undefined);
    if (!arg.success) {
        (0, vitest_1.expect)(arg.error.issues[0].message).toEqual("bad");
    }
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
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        (0, vitest_1.expect)(result.error.issues[0].code).toEqual(z.ZodIssueCode.too_small);
        (0, vitest_1.expect)(result.error.issues[1].code).toEqual(z.ZodIssueCode.too_small);
    }
});
(0, vitest_1.test)("preprocess validates with sibling errors", () => {
    (0, vitest_1.expect)(() => {
        z.object({
            // Must be first
            missing: z.string().refine(() => false),
            preprocess: z.preprocess((data) => data?.trim(), z.string().regex(/ asdf/)),
        }).parse({ preprocess: " asdf" });
    }).toThrow(JSON.stringify([
        {
            code: "invalid_type",
            expected: "string",
            received: "undefined",
            path: ["missing"],
            message: "Required",
        },
        {
            validation: "regex",
            code: "invalid_string",
            message: "Invalid",
            path: ["preprocess"],
        },
    ], null, 2));
});

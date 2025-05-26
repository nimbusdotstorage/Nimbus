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
const Test = z.object({
    f1: z.number(),
    f2: z.string().optional(),
    f3: z.string().nullable(),
    f4: z.array(z.object({ t: z.union([z.string(), z.boolean()]) })),
});
(0, vitest_1.test)("default flattened errors type inference", () => {
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(false);
});
(0, vitest_1.test)("custom flattened errors type inference", () => {
    util_js_1.util.assertEqual(false);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(false);
});
(0, vitest_1.test)("form errors type inference", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)(".flatten() type assertion", () => {
    const parsed = Test.safeParse({});
    const validFlattenedErrors = parsed.error.flatten(() => ({ message: "", code: 0 }));
    // @ts-expect-error should fail assertion between `TestFlattenedErrors` and unmapped `flatten()`.
    const invalidFlattenedErrors = parsed.error.flatten();
    const validFormErrors = parsed.error.flatten();
    // @ts-expect-error should fail assertion between `TestFormErrors` and mapped `flatten()`.
    const invalidFormErrors = parsed.error.flatten(() => ({
        message: "string",
        code: 0,
    }));
    [validFlattenedErrors, invalidFlattenedErrors, validFormErrors, invalidFormErrors];
});
(0, vitest_1.test)(".formErrors type assertion", () => {
    const parsed = Test.safeParse({});
    const validFormErrors = parsed.error.formErrors;
    // @ts-expect-error should fail assertion between `TestFlattenedErrors` and `.formErrors`.
    const invalidFlattenedErrors = parsed.error.formErrors;
    [validFormErrors, invalidFlattenedErrors];
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
    try {
        schema.parse({
            a: "asdf",
            b: "qwer",
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            (0, vitest_1.expect)(error.flatten()).toEqual({
                formErrors: ["Must be equal"],
                fieldErrors: {},
            });
        }
    }
    try {
        schema.parse({
            a: null,
            b: null,
        });
    }
    catch (_error) {
        const error = _error;
        (0, vitest_1.expect)(error.flatten()).toEqual({
            formErrors: [],
            fieldErrors: {
                a: ["Expected string, received null"],
                b: ["Expected string, received null"],
            },
        });
        (0, vitest_1.expect)(error.flatten((iss) => iss.message.toUpperCase())).toEqual({
            formErrors: [],
            fieldErrors: {
                a: ["EXPECTED STRING, RECEIVED NULL"],
                b: ["EXPECTED STRING, RECEIVED NULL"],
            },
        });
        // Test identity
        (0, vitest_1.expect)(error.flatten((i) => i)).toEqual({
            formErrors: [],
            fieldErrors: {
                a: [
                    {
                        code: "invalid_type",
                        expected: "string",
                        message: "Expected string, received null",
                        path: ["a"],
                        received: "null",
                    },
                ],
                b: [
                    {
                        code: "invalid_type",
                        expected: "string",
                        message: "Expected string, received null",
                        path: ["b"],
                        received: "null",
                    },
                ],
            },
        });
        // Test mapping
        (0, vitest_1.expect)(error.flatten((i) => i.message.length)).toEqual({
            formErrors: [],
            fieldErrors: {
                a: ["Expected string, received null".length],
                b: ["Expected string, received null".length],
            },
        });
    }
});

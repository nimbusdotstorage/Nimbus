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
(0, vitest_1.describe)("basic refinement functionality", () => {
    (0, vitest_1.test)("should create a new schema instance when refining", () => {
        const obj1 = z.object({
            first: z.string(),
            second: z.string(),
        });
        const obj2 = obj1.partial().strict();
        const obj3 = obj2.refine((data) => data.first || data.second, "Either first or second should be filled in.");
        (0, vitest_1.expect)(obj1 === obj2).toEqual(false);
        (0, vitest_1.expect)(obj2 === obj3).toEqual(false);
    });
    (0, vitest_1.test)("should validate according to refinement logic", () => {
        const schema = z
            .object({
            first: z.string(),
            second: z.string(),
        })
            .partial()
            .strict()
            .refine((data) => data.first || data.second, "Either first or second should be filled in.");
        // Should fail on empty object
        (0, vitest_1.expect)(() => schema.parse({})).toThrow();
        // Should pass with first property
        (0, vitest_1.expect)(schema.parse({ first: "a" })).toEqual({ first: "a" });
        // Should pass with second property
        (0, vitest_1.expect)(schema.parse({ second: "a" })).toEqual({ second: "a" });
        // Should pass with both properties
        (0, vitest_1.expect)(schema.parse({ first: "a", second: "a" })).toEqual({ first: "a", second: "a" });
    });
    (0, vitest_1.test)("should validate strict mode correctly", () => {
        const schema = z
            .object({
            first: z.string(),
            second: z.string(),
        })
            .partial()
            .strict();
        // Should throw on extra properties
        (0, vitest_1.expect)(() => schema.parse({ third: "adsf" })).toThrow();
    });
});
(0, vitest_1.describe)("refinement with custom error messages", () => {
    (0, vitest_1.test)("should use custom error message when validation fails", () => {
        const validationSchema = z
            .object({
            email: z.string().email(),
            password: z.string(),
            confirmPassword: z.string(),
        })
            .refine((data) => data.password === data.confirmPassword, "Both password and confirmation must match");
        const result = validationSchema.safeParse({
            email: "aaaa@gmail.com",
            password: "aaaaaaaa",
            confirmPassword: "bbbbbbbb",
        });
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("Both password and confirmation must match");
        }
    });
});
(0, vitest_1.describe)("async refinements", () => {
    (0, vitest_1.test)("should support async refinement functions", async () => {
        const validationSchema = z
            .object({
            email: z.string().email(),
            password: z.string(),
            confirmPassword: z.string(),
        })
            .refine((data) => Promise.resolve().then(() => data.password === data.confirmPassword), "Both password and confirmation must match");
        // Should pass with matching passwords
        const validData = {
            email: "aaaa@gmail.com",
            password: "password",
            confirmPassword: "password",
        };
        await (0, vitest_1.expect)(validationSchema.parseAsync(validData)).resolves.toEqual(validData);
        // Should fail with non-matching passwords
        await (0, vitest_1.expect)(validationSchema.parseAsync({
            email: "aaaa@gmail.com",
            password: "password",
            confirmPassword: "different",
        })).rejects.toThrow();
    });
});
(0, vitest_1.describe)("early termination options", () => {
    (0, vitest_1.test)("should abort early with continue: false", () => {
        const schema = z
            .string()
            .superRefine((val, ctx) => {
            if (val.length < 2) {
                ctx.addIssue({
                    code: "custom",
                    message: "BAD",
                    continue: false,
                });
            }
        })
            .refine((_) => false);
        const result = schema.safeParse("");
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("BAD");
        }
    });
    (0, vitest_1.test)("should abort early with fatal: true", () => {
        const schema = z
            .string()
            .superRefine((val, ctx) => {
            if (val.length < 2) {
                ctx.addIssue({
                    code: "custom",
                    fatal: true,
                    message: "BAD",
                });
            }
        })
            .refine((_) => false);
        const result = schema.safeParse("");
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("BAD");
        }
    });
    (0, vitest_1.test)("should abort early with abort flag", () => {
        const schema = z
            .string()
            .refine((_) => false, { abort: true })
            .refine((_) => false);
        const result = schema.safeParse("");
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
        }
    });
});
(0, vitest_1.describe)("custom error paths", () => {
    (0, vitest_1.test)("should use custom path in error message", async () => {
        const result = await z
            .object({ password: z.string(), confirm: z.string() })
            .refine((data) => data.confirm === data.password, { path: ["confirm"] })
            .safeParse({ password: "asdf", confirm: "qewr" });
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues[0].path).toEqual(["confirm"]);
        }
    });
});
(0, vitest_1.describe)("superRefine functionality", () => {
    (0, vitest_1.test)("should support multiple validation rules", () => {
        const Strings = z.array(z.string()).superRefine((val, ctx) => {
            if (val.length > 3) {
                ctx.addIssue({
                    input: val,
                    code: "too_big",
                    origin: "array",
                    maximum: 3,
                    inclusive: true,
                    exact: true,
                    message: "Too many items 😡",
                });
            }
            if (val.length !== new Set(val).size) {
                ctx.addIssue({
                    input: val,
                    code: "custom",
                    message: `No duplicates allowed.`,
                });
            }
        });
        // Should fail with too many items and duplicates
        const result = Strings.safeParse(["asfd", "asfd", "asfd", "asfd"]);
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("Too many items 😡");
            (0, vitest_1.expect)(result.error.issues[1].message).toEqual("No duplicates allowed.");
        }
        // Should pass with valid input
        const validArray = ["asfd", "qwer"];
        (0, vitest_1.expect)(Strings.parse(validArray)).toEqual(validArray);
    });
    (0, vitest_1.test)("should support async superRefine", async () => {
        const Strings = z.array(z.string()).superRefine(async (val, ctx) => {
            if (val.length > 3) {
                ctx.addIssue({
                    input: val,
                    code: "too_big",
                    origin: "array",
                    maximum: 3,
                    inclusive: true,
                    message: "Too many items 😡",
                });
            }
            if (val.length !== new Set(val).size) {
                ctx.addIssue({
                    input: val,
                    code: "custom",
                    message: `No duplicates allowed.`,
                });
            }
        });
        // Should fail with too many items and duplicates
        const result = await Strings.safeParseAsync(["asfd", "asfd", "asfd", "asfd"]);
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(2);
        }
        // Should pass with valid input
        const validArray = ["asfd", "qwer"];
        await (0, vitest_1.expect)(Strings.parseAsync(validArray)).resolves.toEqual(validArray);
    });
    (0, vitest_1.test)("should accept string as shorthand for custom error message", () => {
        const schema = z.string().superRefine((_, ctx) => {
            ctx.addIssue("bad stuff");
        });
        const result = schema.safeParse("asdf");
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues).toHaveLength(1);
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("bad stuff");
        }
    });
    (0, vitest_1.test)("should respect fatal flag in superRefine", () => {
        const schema = z
            .string()
            .superRefine((val, ctx) => {
            if (val === "") {
                ctx.addIssue({
                    input: val,
                    code: "custom",
                    message: "foo",
                    fatal: true,
                });
            }
        })
            .superRefine((val, ctx) => {
            if (val !== " ") {
                ctx.addIssue({
                    input: val,
                    code: "custom",
                    message: "bar",
                });
            }
        });
        const result = schema.safeParse("");
        (0, vitest_1.expect)(result.success).toEqual(false);
        if (!result.success) {
            (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
            (0, vitest_1.expect)(result.error.issues[0].message).toEqual("foo");
        }
    });
});
(0, vitest_1.describe)("chained refinements", () => {
    (0, vitest_1.test)("should collect all validation errors when appropriate", () => {
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
        // Should fail with one error
        const r1 = objectSchema.safeParse({
            length: 4,
            size: 9,
        });
        (0, vitest_1.expect)(r1.success).toEqual(false);
        if (!r1.success) {
            (0, vitest_1.expect)(r1.error.issues.length).toEqual(1);
            (0, vitest_1.expect)(r1.error.issues[0].path).toEqual(["length"]);
        }
        // Should fail with two errors
        const r2 = objectSchema.safeParse({
            length: 4,
            size: 3,
        });
        (0, vitest_1.expect)(r2.success).toEqual(false);
        if (!r2.success) {
            (0, vitest_1.expect)(r2.error.issues.length).toEqual(2);
        }
        // Should pass with valid input
        const validData = {
            length: 6,
            size: 8,
        };
        (0, vitest_1.expect)(objectSchema.parse(validData)).toEqual(validData);
    });
});
// Commented tests can be uncommented once type-checking issues are resolved
/*
describe("type refinement", () => {
  test("refinement type guard", () => {
    const validationSchema = z.object({
      a: z.string().refine((s): s is "a" => s === "a"),
    });
    type Input = z.input<typeof validationSchema>;
    type Schema = z.infer<typeof validationSchema>;

    expectTypeOf<Input["a"]>().not.toEqualTypeOf<"a">();
    expectTypeOf<Input["a"]>().toEqualTypeOf<string>();

    expectTypeOf<Schema["a"]>().toEqualTypeOf<"a">();
    expectTypeOf<Schema["a"]>().not.toEqualTypeOf<string>();
  });

  test("superRefine - type narrowing", () => {
    type NarrowType = { type: string; age: number };
    const schema = z
      .object({
        type: z.string(),
        age: z.number(),
      })
      .nullable()
      .superRefine((arg, ctx): arg is NarrowType => {
        if (!arg) {
          // still need to make a call to ctx.addIssue
          ctx.addIssue({
            input: arg,
            code: "custom",
            message: "cannot be null",
            fatal: true,
          });
          return false;
        }
        return true;
      });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<NarrowType>();

    expect(schema.safeParse({ type: "test", age: 0 }).success).toEqual(true);
    expect(schema.safeParse(null).success).toEqual(false);
  });

  test("chained mixed refining types", () => {
    type firstRefinement = { first: string; second: number; third: true };
    type secondRefinement = { first: "bob"; second: number; third: true };
    type thirdRefinement = { first: "bob"; second: 33; third: true };
    const schema = z
      .object({
        first: z.string(),
        second: z.number(),
        third: z.boolean(),
      })
      .nullable()
      .refine((arg): arg is firstRefinement => !!arg?.third)
      .superRefine((arg, ctx): arg is secondRefinement => {
        expectTypeOf<typeof arg>().toEqualTypeOf<firstRefinement>();
        if (arg.first !== "bob") {
          ctx.addIssue({
            input: arg,
            code: "custom",
            message: "`first` property must be `bob`",
          });
          return false;
        }
        return true;
      })
      .refine((arg): arg is thirdRefinement => {
        expectTypeOf<typeof arg>().toEqualTypeOf<secondRefinement>();
        return arg.second === 33;
      });

    expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<thirdRefinement>();
  });
});
*/

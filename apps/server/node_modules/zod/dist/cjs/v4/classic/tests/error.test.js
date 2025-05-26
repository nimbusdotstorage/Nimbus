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
(0, vitest_1.test)("error creation", () => {
    const err1 = new z.ZodError([]);
    err1.issues.push({
        code: "invalid_type",
        expected: "object",
        path: [],
        message: "",
        input: "adf",
    });
    err1.isEmpty;
    const err2 = new z.ZodError(err1.issues);
    const err3 = new z.ZodError([]);
    err3.addIssues(err1.issues);
    err3.addIssue(err1.issues[0]);
    err1.message;
    err2.message;
    err3.message;
});
(0, vitest_1.test)("do not allow error and message together", () => {
    (0, vitest_1.expect)(() => z.string().refine((_) => true, {
        message: "override",
        error: (iss) => (iss.input === undefined ? "asdf" : null),
    })).toThrow();
});
const errorMap = (issue) => {
    if (issue.code === "invalid_type") {
        if (issue.expected === "string") {
            return { message: "bad type!" };
        }
    }
    if (issue.code === "custom") {
        return { message: `less-than-${issue.params?.minimum}` };
    }
    return undefined;
};
(0, vitest_1.test)("type error with custom error map", () => {
    const result = z.string().safeParse(234, { error: errorMap });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [],
        "message": "bad type!"
      }
    ]]
  `);
});
(0, vitest_1.test)("refinement fail with params", () => {
    const result = z
        .number()
        .refine((val) => val >= 3, {
        params: { minimum: 3 },
    })
        .safeParse(2, { error: errorMap });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "params": {
          "minimum": 3
        },
        "message": "less-than-3"
      }
    ]]
  `);
});
(0, vitest_1.test)("hard coded error  with custom errormap", () => {
    const result = z
        .string()
        .refine((val) => val.length > 12, {
        params: { minimum: 13 },
        message: "override",
    })
        .safeParse("asdf", { error: () => "contextual" });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "params": {
          "minimum": 13
        },
        "message": "override"
      }
    ]]
  `);
});
(0, vitest_1.test)("default error message", () => {
    const result = z
        .number()
        .refine((x) => x > 3)
        .safeParse(2);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "Invalid input"
      }
    ]]
  `);
});
(0, vitest_1.test)("override error in refine", () => {
    const result = z
        .number()
        .refine((x) => x > 3, "override")
        .safeParse(2);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "override"
      }
    ]]
  `);
});
(0, vitest_1.test)("override error in refinement", () => {
    const result = z
        .number()
        .refine((x) => x > 3, {
        message: "override",
    })
        .safeParse(2);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [],
        "message": "override"
      }
    ]]
  `);
});
(0, vitest_1.test)("array minimum", () => {
    let result = z.array(z.string()).min(3, "tooshort").safeParse(["asdf", "qwer"]);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues[0].code).toEqual("too_small");
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("tooshort");
    result = z.array(z.string()).min(3).safeParse(["asdf", "qwer"]);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues[0].code).toEqual("too_small");
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "origin": "array",
        "code": "too_small",
        "minimum": 3,
        "path": [],
        "message": "Too small: expected array to have >3 items"
      }
    ]]
  `);
});
(0, vitest_1.test)("literal bigint default error message", () => {
    const result = z.literal(BigInt(12)).safeParse(BigInt(13));
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "12"
        ],
        "path": [],
        "message": "Invalid input: expected 12n"
      }
    ]]
  `);
});
(0, vitest_1.test)("custom path in custom error map", () => {
    const schema = z.object({
        items: z.array(z.string()).refine((data) => data.length > 3, {
            path: ["items-too-few"],
        }),
    });
    const errorMap = (issue) => {
        (0, vitest_1.expect)((issue.path ?? []).length).toBe(2);
        return { message: "doesnt matter" };
    };
    const result = schema.safeParse({ items: ["first"] }, { error: errorMap });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [
          "items",
          "items-too-few"
        ],
        "message": "doesnt matter"
      }
    ]]
  `);
});
// test("error metadata from value", () => {
//   const dynamicRefine = z.string().refine(
//     (val) => val === val.toUpperCase(),
//     (val) => ({ params: { val } })
//   );
//   const result = dynamicRefine.safeParse("asdf");
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const sub = result.error.issues[0];
//     expect(result.error.issues[0].code).toEqual("custom");
//     if (sub.code === "custom") {
//       expect(sub.params?.val).toEqual("asdf");
//     }
//   }
// });
// test("don't call refine after validation failed", () => {
//   const asdf = z
//     .union([
//       z.number(),
//       z.string().transform(z.number(), (val) => {
//         return parseFloat(val);
//       }),
//     ])
//     .refine((v) => v >= 1);
//   expect(() => asdf.safeParse("foo")).not.toThrow();
// });
(0, vitest_1.test)("root level formatting", () => {
    const schema = z.string().email();
    const result = schema.safeParse("asdfsdf");
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.format()).toMatchInlineSnapshot(`
    {
      "_errors": [
        "Invalid email address",
      ],
    }
  `);
});
(0, vitest_1.test)("custom path", () => {
    const schema = z
        .object({
        password: z.string(),
        confirm: z.string(),
    })
        .refine((val) => val.confirm === val.password, { path: ["confirm"] });
    const result = schema.safeParse({
        password: "peanuts",
        confirm: "qeanuts",
    });
    (0, vitest_1.expect)(result.success).toBe(false);
    const error = result.error.format();
    (0, vitest_1.expect)(error._errors).toEqual([]);
    (0, vitest_1.expect)(error.password?._errors).toEqual(undefined);
    (0, vitest_1.expect)(error.confirm?._errors).toEqual(["Invalid input"]);
});
(0, vitest_1.test)("custom path", () => {
    const schema = z
        .object({
        password: z.string().min(6),
        confirm: z.string().min(6),
    })
        .refine((val) => val.confirm === val.password);
    const result = schema.safeParse({
        password: "qwer",
        confirm: "asdf",
    });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(3);
});
const schema = z.object({
    inner: z.object({
        name: z
            .string()
            .refine((val) => val.length > 5)
            .array()
            .refine((val) => val.length <= 1),
    }),
});
(0, vitest_1.test)("no abort early on refinements", () => {
    const invalidItem = {
        inner: { name: ["aasd", "asdfasdfasfd"] },
    };
    const result1 = schema.safeParse(invalidItem);
    (0, vitest_1.expect)(result1.success).toBe(false);
    (0, vitest_1.expect)(result1.error.issues.length).toEqual(2);
});
(0, vitest_1.test)("detect issue with input fallback", () => {
    const schema = z
        .string()
        .transform((val) => val.length)
        .refine(() => false, { message: "always fails" })
        .refine((val) => {
        if (typeof val !== "number")
            throw new Error();
        return (val ^ 2) > 10;
    } // should be number but it's a string
    );
    (0, vitest_1.expect)(() => schema.parse("hello")).toThrow(z.ZodError);
});
(0, vitest_1.test)("formatting", () => {
    const invalidItem = {
        inner: { name: ["aasd", "asdfasdfasfd"] },
    };
    const invalidArray = {
        inner: { name: ["asdfasdf", "asdfasdfasfd"] },
    };
    const result1 = schema.safeParse(invalidItem);
    const result2 = schema.safeParse(invalidArray);
    (0, vitest_1.expect)(result1.success).toBe(false);
    (0, vitest_1.expect)(result2.success).toBe(false);
    const error1 = result1.error.format();
    (0, vitest_1.expect)(error1._errors).toEqual([]);
    (0, vitest_1.expect)(error1.inner?._errors).toEqual([]);
    (0, vitest_1.expect)(error1.inner?.name?.[1]).toEqual(undefined);
    const error2 = result2.error.format();
    (0, vitest_1.expect)(error2._errors).toEqual([]);
    (0, vitest_1.expect)(error2.inner?._errors).toEqual([]);
    (0, vitest_1.expect)(error2.inner?.name?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error2.inner?.name?.[0]).toEqual(undefined);
    (0, vitest_1.expect)(error2.inner?.name?.[1]).toEqual(undefined);
    (0, vitest_1.expect)(error2.inner?.name?.[2]).toEqual(undefined);
    const errorWithNumber = result2.error.format(() => 5);
    (0, vitest_1.expect)(errorWithNumber._errors).toEqual([]);
    (0, vitest_1.expect)(errorWithNumber.inner?._errors).toEqual([]);
    (0, vitest_1.expect)(errorWithNumber.inner?.name?._errors).toEqual([5]);
});
(0, vitest_1.test)("formatting with nullable and optional fields", () => {
    const nameSchema = z.string().refine((val) => val.length > 5);
    const schema = z.object({
        nullableObject: z.object({ name: nameSchema }).nullable(),
        nullableArray: z.array(nameSchema).nullable(),
        nullableTuple: z.tuple([nameSchema, nameSchema, z.number()]).nullable(),
        optionalObject: z.object({ name: nameSchema }).optional(),
        optionalArray: z.array(nameSchema).optional(),
        optionalTuple: z.tuple([nameSchema, nameSchema, z.number()]).optional(),
    });
    const invalidItem = {
        nullableObject: { name: "abcd" },
        nullableArray: ["abcd"],
        nullableTuple: ["abcd", "abcd", 1],
        optionalObject: { name: "abcd" },
        optionalArray: ["abcd"],
        optionalTuple: ["abcd", "abcd", 1],
    };
    const result = schema.safeParse(invalidItem);
    (0, vitest_1.expect)(result.success).toBe(false);
    const error = result.error.format();
    (0, vitest_1.expect)(error._errors).toEqual([]);
    (0, vitest_1.expect)(error.nullableObject?._errors).toEqual([]);
    (0, vitest_1.expect)(error.nullableObject?.name?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.nullableArray?._errors).toEqual([]);
    (0, vitest_1.expect)(error.nullableArray?.[0]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.nullableTuple?._errors).toEqual([]);
    (0, vitest_1.expect)(error.nullableTuple?.[0]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.nullableTuple?.[1]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.optionalObject?._errors).toEqual([]);
    (0, vitest_1.expect)(error.optionalObject?.name?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.optionalArray?._errors).toEqual([]);
    (0, vitest_1.expect)(error.optionalArray?.[0]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.optionalTuple?._errors).toEqual([]);
    (0, vitest_1.expect)(error.optionalTuple?.[0]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error.optionalTuple?.[1]?._errors).toEqual(["Invalid input"]);
    (0, vitest_1.expect)(error).toMatchInlineSnapshot(`
    {
      "_errors": [],
      "nullableArray": {
        "0": {
          "_errors": [
            "Invalid input",
          ],
        },
        "_errors": [],
      },
      "nullableObject": {
        "_errors": [],
        "name": {
          "_errors": [
            "Invalid input",
          ],
        },
      },
      "nullableTuple": {
        "0": {
          "_errors": [
            "Invalid input",
          ],
        },
        "1": {
          "_errors": [
            "Invalid input",
          ],
        },
        "_errors": [],
      },
      "optionalArray": {
        "0": {
          "_errors": [
            "Invalid input",
          ],
        },
        "_errors": [],
      },
      "optionalObject": {
        "_errors": [],
        "name": {
          "_errors": [
            "Invalid input",
          ],
        },
      },
      "optionalTuple": {
        "0": {
          "_errors": [
            "Invalid input",
          ],
        },
        "1": {
          "_errors": [
            "Invalid input",
          ],
        },
        "_errors": [],
      },
    }
  `);
});
(0, vitest_1.test)("inferFlattenedErrors", () => {
    const schemaWithTransform = z.object({ foo: z.string() }).transform((o) => ({ bar: o.foo }));
    const result = schemaWithTransform.safeParse({});
    (0, vitest_1.expect)(result.success).toBe(false);
    const error = result.error.flatten();
    (0, vitest_1.expect)(error).toMatchInlineSnapshot(`
    {
      "fieldErrors": {
        "foo": [
          "Invalid input: expected string, received undefined",
        ],
      },
      "formErrors": [],
    }
  `);
});
const stringWithCustomError = z.string({
    error: () => "bound",
});
(0, vitest_1.test)("schema-bound error map", () => {
    const result = stringWithCustomError.safeParse(1234);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("bound");
});
(0, vitest_1.test)("bound error map overrides contextual", () => {
    // support contextual override
    const result = stringWithCustomError.safeParse(undefined, {
        error: () => ({ message: "override" }),
    });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("bound");
});
(0, vitest_1.test)("z.config customError ", () => {
    // support overrideErrorMap
    z.config({ customError: () => ({ message: "override" }) });
    const result = stringWithCustomError.min(10).safeParse("tooshort");
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 10,
        "path": [],
        "message": "override"
      }
    ]]
  `);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("override");
    z.config({ customError: undefined });
});
// test("invalid and required", () => {
//   const str = z.string({
//     invalid_type_error: "Invalid name",
//     required_error: "Name is required",
//   });
//   const result1 = str.safeParse(1234);
//   expect(result1.success).toBe(false);
//   if (!result1.success) {
//     expect(result1.error.issues[0].message).toEqual("Invalid name");
//   }
//   const result2 = str.safeParse(undefined);
//   expect(result2.success).toBe(false);
//   if (!result2.success) {
//     expect(result2.error.issues[0].message).toEqual("Name is required");
//   }
// });
// test("Fallback to default required error", () => {
//   const str = z.string({
//     invalid_type_error: "Invalid name",
//     // required_error: "Name is required",
//   });
//   const result2 = str.safeParse(undefined);
//   expect(result2.success).toBe(false);
//   if (!result2.success) {
//     expect(result2.error.issues[0].message).toEqual("Required");
//   }
// });
// test("invalid and required and errorMap", () => {
//   expect(() => {
//     return z.string({
//       invalid_type_error: "Invalid name",
//       required_error: "Name is required",
//       errorMap: () => ({ message: "override" }),
//     });
//   }).toThrow();
// });
// test("strict error message", () => {
//   const errorMsg = "Invalid object";
//   const obj = z.object({ x: z.string() }).strict(errorMsg);
//   const result = obj.safeParse({ x: "a", y: "b" });
//   expect(result.success).toBe(false);
//   if (!result.success) {
//     expect(result.error.issues[0].message).toEqual(errorMsg);
//   }
// });
(0, vitest_1.test)("empty string error message", () => {
    const schema = z.string().max(1, { message: "" });
    const result = schema.safeParse("asdf");
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("");
});
(0, vitest_1.test)("dont short circuit on continuable errors", () => {
    const user = z
        .object({
        password: z.string().min(6),
        confirm: z.string(),
    })
        .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    });
    const result = user.safeParse({ password: "asdf", confirm: "qwer" });
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 6,
        "path": [
          "password"
        ],
        "message": "Too small: expected string to have >6 characters"
      },
      {
        "code": "custom",
        "path": [
          "confirm"
        ],
        "message": "Passwords don't match"
      }
    ]]
  `);
    // expect(result.error!.issues.length).toEqual(2);
});
(0, vitest_1.test)("string error params", () => {
    const a = z.string("Bad!");
    (0, vitest_1.expect)(a.safeParse(123).error.issues[0].message).toBe("Bad!");
    const b = z.string().min(5, "Too short!");
    (0, vitest_1.expect)(b.safeParse("abc").error.issues[0].message).toBe("Too short!");
    const c = z.uuid("Bad UUID!");
    (0, vitest_1.expect)(c.safeParse("not-a-uuid").error.issues[0].message).toBe("Bad UUID!");
    const d = z.string().datetime({ message: "Bad date!" });
    (0, vitest_1.expect)(d.safeParse("not-a-date").error.issues[0].message).toBe("Bad date!");
    const e = z.array(z.string(), "Bad array!");
    (0, vitest_1.expect)(e.safeParse("not-an-array").error.issues[0].message).toBe("Bad array!");
    const f = z.array(z.string()).min(5, "Too few items!");
    (0, vitest_1.expect)(f.safeParse(["a", "b"]).error.issues[0].message).toBe("Too few items!");
    const g = z.set(z.string(), "Bad set!");
    (0, vitest_1.expect)(g.safeParse("not-a-set").error.issues[0].message).toBe("Bad set!");
    const h = z.array(z.string(), "Bad array!");
    (0, vitest_1.expect)(h.safeParse(123).error.issues[0].message).toBe("Bad array!");
    const i = z.set(z.string(), "Bad set!");
    (0, vitest_1.expect)(i.safeParse(123).error.issues[0].message).toBe("Bad set!");
    const j = z.array(z.string(), "Bad array!");
    (0, vitest_1.expect)(j.safeParse(null).error.issues[0].message).toBe("Bad array!");
});
(0, vitest_1.test)("error inheritance", () => {
    const e1 = z.string().safeParse(123).error;
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.core.$ZodError);
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.ZodError);
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.ZodRealError);
    // expect(e1).not.toBeInstanceOf(Error);
    try {
        z.string().parse(123);
    }
    catch (e2) {
        (0, vitest_1.expect)(e1).toBeInstanceOf(z.core.$ZodError);
        (0, vitest_1.expect)(e2).toBeInstanceOf(z.ZodError);
        (0, vitest_1.expect)(e2).toBeInstanceOf(z.ZodRealError);
        // expect(e2).toBeInstanceOf(Error);
    }
});
(0, vitest_1.test)("error serialization", () => {
    try {
        z.string().parse(123);
    }
    catch (e) {
        console.dir(e, { depth: null });
        (0, vitest_1.expect)(e).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [],
          "message": "Invalid input: expected string, received number"
        }
      ]]
    `);
    }
});

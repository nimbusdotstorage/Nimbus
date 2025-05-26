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
    const schema = z.string().array();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("array min/max", async () => {
    const schema = z.array(z.string()).min(2).max(2);
    const r1 = await schema.safeParse(["asdf"]);
    (0, vitest_1.expect)(r1.success).toEqual(false);
    (0, vitest_1.expect)(r1.error.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_small",
        "message": "Too small: expected array to have >2 items",
        "minimum": 2,
        "origin": "array",
        "path": [],
      },
    ]
  `);
    const r2 = await schema.safeParse(["asdf", "asdf", "asdf"]);
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_big",
        "maximum": 2,
        "message": "Too big: expected array to have <2 items",
        "origin": "array",
        "path": [],
      },
    ]
  `);
});
(0, vitest_1.test)("array length", async () => {
    const schema = z.array(z.string()).length(2);
    schema.parse(["asdf", "asdf"]);
    const r1 = await schema.safeParse(["asdf"]);
    (0, vitest_1.expect)(r1.success).toEqual(false);
    (0, vitest_1.expect)(r1.error.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_small",
        "message": "Too small: expected array to have >2 items",
        "minimum": 2,
        "origin": "array",
        "path": [],
      },
    ]
  `);
    const r2 = await schema.safeParse(["asdf", "asdf", "asdf"]);
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_big",
        "maximum": 2,
        "message": "Too big: expected array to have <2 items",
        "origin": "array",
        "path": [],
      },
    ]
  `);
});
(0, vitest_1.test)("array.nonempty()", () => {
    const schema = z.string().array().nonempty();
    schema.parse(["a"]);
    (0, vitest_1.expect)(() => schema.parse([])).toThrow();
});
(0, vitest_1.test)("array.nonempty().max()", () => {
    const schema = z.string().array().nonempty().max(2);
    schema.parse(["a"]);
    (0, vitest_1.expect)(() => schema.parse([])).toThrow();
    (0, vitest_1.expect)(() => schema.parse(["a", "a", "a"])).toThrow();
});
(0, vitest_1.test)("parse empty array in nonempty", () => {
    (0, vitest_1.expect)(() => z
        .array(z.string())
        .nonempty()
        .parse([])).toThrow();
});
(0, vitest_1.test)("get element", () => {
    const schema = z.string().array();
    schema.element.parse("asdf");
    (0, vitest_1.expect)(() => schema.element.parse(12)).toThrow();
});
(0, vitest_1.test)("continue parsing despite array size error", () => {
    const schema = z.object({
        people: z.string().array().min(2),
    });
    const result = schema.safeParse({
        people: [123],
    });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "people",
          0
        ],
        "message": "Invalid input: expected string, received number"
      },
      {
        "origin": "array",
        "code": "too_small",
        "minimum": 2,
        "path": [
          "people"
        ],
        "message": "Too small: expected array to have >2 items"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("parse should fail given sparse array", () => {
    const schema = z.array(z.string()).nonempty().min(1).max(3);
    const result = schema.safeParse(new Array(3));
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          0
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          1
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          2
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
// const unique = z.string().array().unique();
// const uniqueArrayOfObjects = z.array(z.object({ name: z.string() })).unique({ identifier: (item) => item.name });
// test("passing unique validation", () => {
//   unique.parse(["a", "b", "c"]);
//   uniqueArrayOfObjects.parse([{ name: "Leo" }, { name: "Joe" }]);
// });
// test("failing unique validation", () => {
//   expect(() => unique.parse(["a", "a", "b"])).toThrow();
//   expect(() => uniqueArrayOfObjects.parse([{ name: "Leo" }, { name: "Leo" }])).toThrow();
// });
// test("continue parsing despite array of primitives uniqueness error", () => {
//   const schema = z.number().array().unique();
//   const result = schema.safeParse([1, 1, 2, 2, 3]);
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const issue = result.error.issues.find(({ code }) => code === "not_unique");
//     expect(issue?.message).toEqual("Values must be unique");
//   }
// });
// test("continue parsing despite array of objects not_unique error", () => {
//   const schema = z.array(z.object({ name: z.string() })).unique({
//     identifier: (item) => item.name,
//     showDuplicates: true,
//   });
//   const result = schema.safeParse([
//     { name: "Leo" },
//     { name: "Joe" },
//     { name: "Leo" },
//   ]);
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const issue = result.error.issues.find(({ code }) => code === "not_unique");
//     expect(issue?.message).toEqual("Element(s): 'Leo' not unique");
//   }
// });
// test("returns custom error message without duplicate elements", () => {
//   const schema = z.number().array().unique({ message: "Custom message" });
//   const result = schema.safeParse([1, 1, 2, 2, 3]);
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const issue = result.error.issues.find(({ code }) => code === "not_unique");
//     expect(issue?.message).toEqual("Custom message");
//   }
// });
// test("returns error message with duplicate elements", () => {
//   const schema = z.number().array().unique({ showDuplicates: true });
//   const result = schema.safeParse([1, 1, 2, 2, 3]);
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const issue = result.error.issues.find(({ code }) => code === "not_unique");
//     expect(issue?.message).toEqual("Element(s): '1,2' not unique");
//   }
// });
// test("returns custom error message with duplicate elements", () => {
//   const schema = z
//     .number()
//     .array()
//     .unique({
//       message: (item) => `Custom message: '${item}' are not unique`,
//       showDuplicates: true,
//     });
//   const result = schema.safeParse([1, 1, 2, 2, 3]);
//   expect(result.success).toEqual(false);
//   if (!result.success) {
//     const issue = result.error.issues.find(({ code }) => code === "not_unique");
//     expect(issue?.message).toEqual("Custom message: '1,2' are not unique");
//   }
// });

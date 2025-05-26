"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const v4_1 = require("zod/v4");
(0, vitest_1.test)("nonoptional", () => {
    const schema = v4_1.z.string().nonoptional();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const result = schema.safeParse(undefined);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("nonoptional with default", () => {
    const schema = v4_1.z.string().optional().nonoptional();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const result = schema.safeParse(undefined);
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_type",
        "expected": "nonoptional",
        "path": [],
        "message": "Invalid input: expected nonoptional, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});
(0, vitest_1.test)("nonoptional in object", () => {
    const schema = v4_1.z.object({ hi: v4_1.z.string().optional().nonoptional() });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const r1 = schema.safeParse({ hi: "asdf" });
    (0, vitest_1.expect)(r1.success).toEqual(true);
    const r2 = schema.safeParse({ hi: undefined });
    // expect(schema.safeParse({ hi: undefined }).success).toEqual(false);
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_type",
        "expected": "nonoptional",
        "path": [
          "hi"
        ],
        "message": "Invalid input: expected nonoptional, received undefined"
      }
    ]]
  `);
    const r3 = schema.safeParse({});
    (0, vitest_1.expect)(r3.success).toEqual(false);
    (0, vitest_1.expect)(r3.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_type",
        "expected": "nonoptional",
        "path": [
          "hi"
        ],
        "message": "Invalid input: expected nonoptional, received undefined"
      }
    ]]
  `);
});

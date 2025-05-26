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
(0, vitest_1.test)("function parsing", () => {
    const schema = z.union([z.string().refine(() => false), z.number().refine(() => false)]);
    const result = schema.safeParse("asdf");
    (0, vitest_1.expect)(result.success).toEqual(false);
});
(0, vitest_1.test)("union 2", () => {
    const result = z.union([z.number(), z.string().refine(() => false)]).safeParse("a");
    (0, vitest_1.expect)(result.success).toEqual(false);
});
(0, vitest_1.test)("return valid over invalid", () => {
    const schema = z.union([
        z.object({
            email: z.string().email(),
        }),
        z.string(),
    ]);
    (0, vitest_1.expect)(schema.parse("asdf")).toEqual("asdf");
    (0, vitest_1.expect)(schema.parse({ email: "asdlkjf@lkajsdf.com" })).toEqual({
        email: "asdlkjf@lkajsdf.com",
    });
});
(0, vitest_1.test)("return errors from both union arms", () => {
    const result = z.union([z.number(), z.string().refine(() => false)]).safeParse("a");
    (0, vitest_1.expect)(result.success).toEqual(false);
    if (!result.success) {
        (0, vitest_1.expect)(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_union",
          "errors": [
            [
              {
                "code": "invalid_type",
                "expected": "number",
                "message": "Invalid input: expected number, received string",
                "path": [],
              },
            ],
            [
              {
                "code": "custom",
                "message": "Invalid input",
                "path": [],
              },
            ],
          ],
          "message": "Invalid input",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("options getter", async () => {
    const union = z.union([z.string(), z.number()]);
    union.options[0].parse("asdf");
    union.options[1].parse(1234);
    await union.options[0].parseAsync("asdf");
    await union.options[1].parseAsync(1234);
});
(0, vitest_1.test)("readonly union", async () => {
    const options = [z.string(), z.number()];
    const union = z.union(options);
    union.parse("asdf");
    union.parse(12);
});
(0, vitest_1.test)("union inferred types", () => {
    const test = z.object({}).or(z.array(z.object({})));
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("union values", () => {
    const schema = z.union([z.literal("a"), z.literal("b"), z.literal("c")]);
    (0, vitest_1.expect)(schema._zod.values).toMatchInlineSnapshot(`
    Set {
      "a",
      "b",
      "c",
    }
  `);
});

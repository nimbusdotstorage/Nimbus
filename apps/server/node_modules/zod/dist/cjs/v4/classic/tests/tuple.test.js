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
(0, vitest_1.test)("successful validation", () => {
    const testTuple = z.tuple([z.string(), z.number()]);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const val = testTuple.parse(["asdf", 1234]);
    (0, vitest_1.expect)(val).toEqual(val);
    const r1 = testTuple.safeParse(["asdf", "asdf"]);
    (0, vitest_1.expect)(r1.success).toEqual(false);
    (0, vitest_1.expect)(r1.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "path": [
          1
        ],
        "message": "Invalid input: expected number, received string"
      }
    ]]
  `);
    const r2 = testTuple.safeParse(["asdf", 1234, true]);
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "origin": "array",
        "code": "too_big",
        "maximum": 2,
        "path": [],
        "message": "Too big: expected array to have <2 items"
      }
    ]]
  `);
    const r3 = testTuple.safeParse({});
    (0, vitest_1.expect)(r3.success).toEqual(false);
    (0, vitest_1.expect)(r3.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "tuple",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected tuple, received object"
      }
    ]]
  `);
});
(0, vitest_1.test)("async validation", async () => {
    const testTuple = z
        .tuple([z.string().refine(async () => true), z.number().refine(async () => true)])
        .refine(async () => true);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const val = await testTuple.parseAsync(["asdf", 1234]);
    (0, vitest_1.expect)(val).toEqual(val);
    const r1 = await testTuple.safeParseAsync(["asdf", "asdf"]);
    (0, vitest_1.expect)(r1.success).toEqual(false);
    (0, vitest_1.expect)(r1.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "path": [
          1
        ],
        "message": "Invalid input: expected number, received string"
      }
    ]]
  `);
    const r2 = await testTuple.safeParseAsync(["asdf", 1234, true]);
    (0, vitest_1.expect)(r2.success).toEqual(false);
    (0, vitest_1.expect)(r2.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "origin": "array",
        "code": "too_big",
        "maximum": 2,
        "path": [],
        "message": "Too big: expected array to have <2 items"
      }
    ]]
  `);
    const r3 = await testTuple.safeParseAsync({});
    (0, vitest_1.expect)(r3.success).toEqual(false);
    (0, vitest_1.expect)(r3.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "tuple",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected tuple, received object"
      }
    ]]
  `);
});
(0, vitest_1.test)("tuple with optional elements", () => {
    const myTuple = z.tuple([z.string(), z.number().optional(), z.string().optional()]).rest(z.boolean());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const goodData = [["asdf"], ["asdf", 1234], ["asdf", 1234, "asdf"], ["asdf", 1234, "asdf", true, false, true]];
    for (const data of goodData) {
        (0, vitest_1.expect)(myTuple.parse(data)).toEqual(data);
    }
    const badData = [
        ["asdf", "asdf"],
        ["asdf", 1234, "asdf", "asdf"],
        ["asdf", 1234, "asdf", true, false, "asdf"],
    ];
    for (const data of badData) {
        (0, vitest_1.expect)(() => myTuple.parse(data)).toThrow();
    }
});
(0, vitest_1.test)("tuple with optional elements followed by required", () => {
    const myTuple = z.tuple([z.string(), z.number().optional(), z.string()]).rest(z.boolean());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const goodData = [
        ["asdf", 1234, "asdf"],
        ["asdf", 1234, "asdf", true, false, true],
    ];
    for (const data of goodData) {
        (0, vitest_1.expect)(myTuple.parse(data)).toEqual(data);
    }
    const badData = [
        ["asdf"],
        ["asdf", 1234],
        ["asdf", 1234, "asdf", "asdf"],
        ["asdf", 1234, "asdf", true, false, "asdf"],
    ];
    for (const data of badData) {
        (0, vitest_1.expect)(() => myTuple.parse(data)).toThrow();
    }
});
(0, vitest_1.test)("tuple with rest schema", () => {
    const myTuple = z.tuple([z.string(), z.number()]).rest(z.boolean());
    (0, vitest_1.expect)(myTuple.parse(["asdf", 1234, true, false, true])).toEqual(["asdf", 1234, true, false, true]);
    (0, vitest_1.expect)(myTuple.parse(["asdf", 1234])).toEqual(["asdf", 1234]);
    (0, vitest_1.expect)(() => myTuple.parse(["asdf", 1234, "asdf"])).toThrow();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("sparse array input", () => {
    const schema = z.tuple([z.string(), z.number()]);
    (0, vitest_1.expect)(() => schema.parse(new Array(2))).toThrow();
});

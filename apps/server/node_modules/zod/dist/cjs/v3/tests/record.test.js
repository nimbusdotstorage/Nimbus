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
const booleanRecord = z.record(z.boolean());
const recordWithEnumKeys = z.record(z.enum(["Tuna", "Salmon"]), z.string());
const recordWithLiteralKeys = z.record(z.union([z.literal("Tuna"), z.literal("Salmon")]), z.string());
(0, vitest_1.test)("type inference", () => {
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("methods", () => {
    booleanRecord.optional();
    booleanRecord.nullable();
});
(0, vitest_1.test)("string record parse - pass", () => {
    booleanRecord.parse({
        k1: true,
        k2: false,
        1234: false,
    });
});
(0, vitest_1.test)("string record parse - fail", () => {
    const badCheck = () => booleanRecord.parse({
        asdf: 1234,
    });
    (0, vitest_1.expect)(badCheck).toThrow();
    (0, vitest_1.expect)(() => booleanRecord.parse("asdf")).toThrow();
});
(0, vitest_1.test)("string record parse - fail", () => {
    const badCheck = () => booleanRecord.parse({
        asdf: {},
    });
    (0, vitest_1.expect)(badCheck).toThrow();
});
(0, vitest_1.test)("string record parse - fail", () => {
    const badCheck = () => booleanRecord.parse({
        asdf: [],
    });
    (0, vitest_1.expect)(badCheck).toThrow();
});
(0, vitest_1.test)("key schema", () => {
    const result1 = recordWithEnumKeys.parse({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(result1).toEqual({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    const result2 = recordWithLiteralKeys.parse({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    (0, vitest_1.expect)(result2).toEqual({
        Tuna: "asdf",
        Salmon: "asdf",
    });
    // shouldn't require us to specify all props in record
    const result3 = recordWithEnumKeys.parse({
        Tuna: "abcd",
    });
    (0, vitest_1.expect)(result3).toEqual({
        Tuna: "abcd",
    });
    // shouldn't require us to specify all props in record
    const result4 = recordWithLiteralKeys.parse({
        Salmon: "abcd",
    });
    (0, vitest_1.expect)(result4).toEqual({
        Salmon: "abcd",
    });
    (0, vitest_1.expect)(() => recordWithEnumKeys.parse({
        Tuna: "asdf",
        Salmon: "asdf",
        Trout: "asdf",
    })).toThrow();
    (0, vitest_1.expect)(() => recordWithLiteralKeys.parse({
        Tuna: "asdf",
        Salmon: "asdf",
        Trout: "asdf",
    })).toThrow();
});
// test("record element", () => {
//   expect(booleanRecord.element).toBeInstanceOf(z.ZodBoolean);
// });
(0, vitest_1.test)("key and value getters", () => {
    const rec = z.record(z.string(), z.number());
    rec.keySchema.parse("asdf");
    rec.valueSchema.parse(1234);
    rec.element.parse(1234);
});
(0, vitest_1.test)("is not vulnerable to prototype pollution", async () => {
    const rec = z.record(z.object({
        a: z.string(),
    }));
    const data = JSON.parse(`
    {
      "__proto__": {
        "a": "evil"
      },
      "b": {
        "a": "good"
      }
    }
  `);
    const obj1 = rec.parse(data);
    (0, vitest_1.expect)(obj1.a).toBeUndefined();
    const obj2 = rec.safeParse(data);
    (0, vitest_1.expect)(obj2.success).toBe(true);
    if (obj2.success) {
        (0, vitest_1.expect)(obj2.data.a).toBeUndefined();
    }
    const obj3 = await rec.parseAsync(data);
    (0, vitest_1.expect)(obj3.a).toBeUndefined();
    const obj4 = await rec.safeParseAsync(data);
    (0, vitest_1.expect)(obj4.success).toBe(true);
    if (obj4.success) {
        (0, vitest_1.expect)(obj4.data.a).toBeUndefined();
    }
});
(0, vitest_1.test)("dont parse undefined values", () => {
    const result1 = z.record(z.any()).parse({ foo: undefined });
    (0, vitest_1.expect)(result1).toEqual({
        foo: undefined,
    });
});

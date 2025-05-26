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
(0, vitest_1.test)("opt passthrough", () => {
    const object = z.object({
        a: z.lazy(() => z.string()),
        b: z.lazy(() => z.string().optional()),
        c: z.lazy(() => z.string().default("default")),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const result = object.parse({
        a: "hello",
        b: undefined,
    }, { jitless: true });
    (0, vitest_1.expect)(result).toEqual({
        a: "hello",
        // b: undefined,
        c: "default",
    });
    (0, vitest_1.expect)(z.lazy(() => z.string())._zod.optin).toEqual(undefined);
    (0, vitest_1.expect)(z.lazy(() => z.string())._zod.optout).toEqual(undefined);
    (0, vitest_1.expect)(z.lazy(() => z.string().optional())._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(z.lazy(() => z.string().optional())._zod.optout).toEqual("optional");
    (0, vitest_1.expect)(z.lazy(() => z.string().default("asdf"))._zod.optin).toEqual("optional");
    (0, vitest_1.expect)(z.lazy(() => z.string().default("asdf"))._zod.optout).toEqual(undefined);
});
//////////////   LAZY   //////////////
(0, vitest_1.test)("schema getter", () => {
    z.lazy(() => z.string()).parse("asdf");
});
(0, vitest_1.test)("lazy proxy", () => {
    const schema = z.lazy(() => z.string())._zod.innerType.min(6);
    schema.parse("123456");
    (0, vitest_1.expect)(schema.safeParse("12345").success).toBe(false);
});
const testCategory = {
    name: "I",
    subcategories: [
        {
            name: "A",
            subcategories: [
                {
                    name: "1",
                    subcategories: [
                        {
                            name: "a",
                            subcategories: [],
                        },
                    ],
                },
            ],
        },
    ],
};
(0, vitest_1.test)("recursion with z.lazy", () => {
    const Category = z.lazy(() => z.object({
        name: z.string(),
        subcategories: z.array(Category),
    }));
    Category.parse(testCategory);
});
const linkedListExample = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null,
            },
        },
    },
};
(0, vitest_1.test)("recursive union wit z.lazy", () => {
    const LinkedListSchema = z.lazy(() => z.union([
        z.null(),
        z.object({
            value: z.number(),
            next: LinkedListSchema,
        }),
    ]));
    LinkedListSchema.parse(linkedListExample);
});
(0, vitest_1.test)("mutual recursion with lazy", () => {
    const Alazy = z.lazy(() => z.object({
        val: z.number(),
        b: Blazy,
    }));
    const Blazy = z.lazy(() => z.object({
        val: z.number(),
        a: Alazy.optional(),
    }));
    const testData = {
        val: 1,
        b: {
            val: 5,
            a: {
                val: 3,
                b: {
                    val: 4,
                    a: {
                        val: 2,
                        b: {
                            val: 1,
                        },
                    },
                },
            },
        },
    };
    Alazy.parse(testData);
    Blazy.parse(testData.b);
    (0, vitest_1.expect)(() => Alazy.parse({ val: "asdf" })).toThrow();
});
// TODO
(0, vitest_1.test)("mutual recursion with cyclical data", () => {
    const a = { val: 1 };
    const b = { val: 2 };
    a.b = b;
    b.a = a;
});
(0, vitest_1.test)("complicated self-recursion", () => {
    const Category = z.object({
        name: z.string(),
        age: z.optional(z.number()),
        get nullself() {
            return Category.nullable();
        },
        get optself() {
            return Category.optional();
        },
        get self() {
            return Category;
        },
        get subcategories() {
            return z.array(Category);
        },
        nested: z.object({
            get sub() {
                return Category;
            },
        }),
    });
});
(0, vitest_1.test)("lazy initialization", () => {
    const a = z.lazy(() => a).optional();
    const b = z.lazy(() => b).nullable();
    const c = z.lazy(() => c).default({});
    const d = z.lazy(() => d).prefault({});
    const e = z.lazy(() => e).nonoptional();
    const f = z.lazy(() => f).catch({});
    const g = z.lazy(() => z.object({ g })).readonly();
    const baseCategorySchema = z.object({
        name: z.string(),
    });
    const categorySchema = baseCategorySchema.extend({
        subcategories: z.lazy(() => categorySchema.array()),
    });
});

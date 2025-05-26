"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const v4_1 = require("zod/v4");
(0, vitest_1.test)("recursion with z.lazy", () => {
    const data = {
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
    const Category = v4_1.z.object({
        name: v4_1.z.string(),
        get subcategories() {
            return v4_1.z.array(Category);
        },
    });
    Category.parse(data);
});
(0, vitest_1.test)("recursion involving union type", () => {
    const data = {
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
    const LL = v4_1.z
        .object({
        value: v4_1.z.number(),
        get next() {
            return LL.nullable();
        },
    })
        .or(v4_1.z.null());
    LL.parse(data);
});
(0, vitest_1.test)("mutual recursion - native", () => {
    const Alazy = v4_1.z.object({
        val: v4_1.z.number(),
        get b() {
            return Blazy;
        },
    });
    const Blazy = v4_1.z.object({
        val: v4_1.z.number(),
        get a() {
            return Alazy.optional();
        },
    });
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
(0, vitest_1.test)("pick and omit with getter", () => {
    const Category = v4_1.z.strictObject({
        name: v4_1.z.string(),
        get subcategories() {
            return v4_1.z.array(Category);
        },
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const PickedCategory = Category.pick({ name: true });
    const OmittedCategory = Category.omit({ subcategories: true });
    const picked = { name: "test" };
    const omitted = { name: "test" };
    PickedCategory.parse(picked);
    OmittedCategory.parse(omitted);
    (0, vitest_1.expect)(() => PickedCategory.parse({ name: "test", subcategories: [] })).toThrow();
    (0, vitest_1.expect)(() => OmittedCategory.parse({ name: "test", subcategories: [] })).toThrow();
});

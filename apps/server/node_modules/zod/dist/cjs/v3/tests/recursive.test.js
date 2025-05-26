"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const v3_1 = require("zod/v3");
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
(0, vitest_1.test)("recursion with z.late.object", () => {
    const Category = v3_1.z.late.object(() => ({
        name: v3_1.z.string(),
        subcategories: v3_1.z.array(Category),
    }));
    Category.parse(testCategory);
});
(0, vitest_1.test)("recursion with z.lazy", () => {
    const Category = v3_1.z.lazy(() => v3_1.z.object({
        name: v3_1.z.string(),
        subcategories: v3_1.z.array(Category),
    }));
    Category.parse(testCategory);
});
(0, vitest_1.test)("schema getter", () => {
    v3_1.z.lazy(() => v3_1.z.string()).schema.parse("asdf");
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
(0, vitest_1.test)("recursion involving union type", () => {
    const LinkedListSchema = v3_1.z.lazy(() => v3_1.z.union([
        v3_1.z.null(),
        v3_1.z.object({
            value: v3_1.z.number(),
            next: LinkedListSchema,
        }),
    ]));
    LinkedListSchema.parse(linkedListExample);
});
// interface A {
//   val: number;
//   b: B;
// }
// interface B {
//   val: number;
//   a: A;
// }
// const A: z.ZodType<A> = z.late.object(() => ({
//   val: z.number(),
//   b: B,
// }));
// const B: z.ZodType<B> = z.late.object(() => ({
//   val: z.number(),
//   a: A,
// }));
// const Alazy: z.ZodType<A> = z.lazy(() => z.object({
//   val: z.number(),
//   b: B,
// }));
// const Blazy: z.ZodType<B> = z.lazy(() => z.object({
//   val: z.number(),
//   a: A,
// }));
// const a: any = { val: 1 };
// const b: any = { val: 2 };
// a.b = b;
// b.a = a;
// test('valid check', () => {
//   A.parse(a);
//   B.parse(b);
// });
// test("valid check lazy", () => {
//   A.parse({val:1, b:});
//   B.parse(b);
// });
// test('masking check', () => {
//   const FragmentOnA = z
//     .object({
//       val: z.number(),
//       b: z
//         .object({
//           val: z.number(),
//           a: z
//             .object({
//               val: z.number(),
//             })
//             .nonstrict(),
//         })
//         .nonstrict(),
//     })
//     .nonstrict();
//   const fragment = FragmentOnA.parse(a);
//   fragment;
// });
// test('invalid check', () => {
//   expect(() => A.parse({} as any)).toThrow();
// });
// test('schema getter', () => {
//   (A as z.ZodLazy<any>).schema;
// });
// test("self recursion with cyclical data", () => {
//   interface Category {
//     name: string;
//     subcategories: Category[];
//   }
//   const Category: z.ZodType<Category> = z.late.object(() => ({
//     name: z.string(),
//     subcategories: z.array(Category),
//   }));
//   const untypedCategory: any = {
//     name: "Category A",
//   };
//   // creating a cycle
//   untypedCategory.subcategories = [untypedCategory];
//   Category.parse(untypedCategory);
// });
// test("self recursion with base type", () => {
//   const BaseCategory = z.object({
//     name: z.string(),
//   });
//   type BaseCategory = z.infer<typeof BaseCategory>;
//   type Category = BaseCategory & { subcategories: Category[] };
//   const Category: z.ZodType<Category> = z.late
//     .object(() => ({
//       subcategories: z.array(Category),
//     }))
//     .extend({
//       name: z.string(),
//     });
//   const untypedCategory: any = {
//     name: "Category A",
//   };
//   // creating a cycle
//   untypedCategory.subcategories = [untypedCategory];
//   Category.parse(untypedCategory); // parses successfully
// });

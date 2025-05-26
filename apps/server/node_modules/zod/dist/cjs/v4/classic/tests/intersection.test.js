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
(0, vitest_1.test)("object intersection", () => {
    const A = z.object({ a: z.string() });
    const B = z.object({ b: z.string() });
    const C = z.intersection(A, B); // BaseC.merge(HasID);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const data = { a: "foo", b: "foo" };
    (0, vitest_1.expect)(C.parse(data)).toEqual(data);
    (0, vitest_1.expect)(() => C.parse({ a: "foo" })).toThrow();
});
(0, vitest_1.test)("object intersection: loose", () => {
    const A = z.looseObject({ a: z.string() });
    const B = z.object({ b: z.string() });
    const C = z.intersection(A, B); // BaseC.merge(HasID);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const data = { a: "foo", b: "foo", c: "extra" };
    (0, vitest_1.expect)(C.parse(data)).toEqual(data);
    (0, vitest_1.expect)(() => C.parse({ a: "foo" })).toThrow();
});
(0, vitest_1.test)("object intersection: strict", () => {
    const A = z.strictObject({ a: z.string() });
    const B = z.object({ b: z.string() });
    const C = z.intersection(A, B); // BaseC.merge(HasID);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const data = { a: "foo", b: "foo", c: "extra" };
    const result = C.safeParse(data);
    (0, vitest_1.expect)(result.success).toEqual(false);
});
(0, vitest_1.test)("deep intersection", () => {
    const Animal = z.object({
        properties: z.object({
            is_animal: z.boolean(),
        }),
    });
    const Cat = z.intersection(z.object({
        properties: z.object({
            jumped: z.boolean(),
        }),
    }), Animal);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const a = Cat.safeParse({ properties: { is_animal: true, jumped: true } });
    (0, vitest_1.expect)(a.data.properties).toEqual({ is_animal: true, jumped: true });
});
(0, vitest_1.test)("deep intersection of arrays", async () => {
    const Author = z.object({
        posts: z.array(z.object({
            post_id: z.number(),
        })),
    });
    const Registry = z.intersection(Author, z.object({
        posts: z.array(z.object({
            title: z.string(),
        })),
    }));
    const posts = [
        { post_id: 1, title: "Novels" },
        { post_id: 2, title: "Fairy tales" },
    ];
    const cat = Registry.parse({ posts });
    (0, vitest_1.expect)(cat.posts).toEqual(posts);
    const asyncCat = await Registry.parseAsync({ posts });
    (0, vitest_1.expect)(asyncCat.posts).toEqual(posts);
});
(0, vitest_1.test)("invalid intersection types", async () => {
    const numberIntersection = z.intersection(z.number(), z.number().transform((x) => x + 1));
    (0, vitest_1.expect)(() => {
        numberIntersection.parse(1234);
    }).toThrowErrorMatchingInlineSnapshot(`[Error: Unmergable intersection. Error path: []]`);
});
(0, vitest_1.test)("invalid array merge (incompatible lengths)", async () => {
    const stringArrInt = z.intersection(z.string().array(), z
        .string()
        .array()
        .transform((val) => [...val, "asdf"]));
    (0, vitest_1.expect)(() => stringArrInt.safeParse(["asdf", "qwer"])).toThrowErrorMatchingInlineSnapshot(`[Error: Unmergable intersection. Error path: []]`);
});
(0, vitest_1.test)("invalid array merge (incompatible elements)", async () => {
    const stringArrInt = z.intersection(z.string().array(), z
        .string()
        .array()
        .transform((val) => [...val.slice(0, -1), "asdf"]));
    (0, vitest_1.expect)(() => stringArrInt.safeParse(["asdf", "qwer"])).toThrowErrorMatchingInlineSnapshot(`[Error: Unmergable intersection. Error path: [1]]`);
});
(0, vitest_1.test)("invalid object merge", async () => {
    const Cat = z.object({
        phrase: z.string().transform((val) => `${val} Meow`),
    });
    const Dog = z.object({
        phrase: z.string().transform((val) => `${val} Woof`),
    });
    const CatDog = z.intersection(Cat, Dog);
    (0, vitest_1.expect)(() => CatDog.parse({ phrase: "Hello, my name is CatDog." })).toThrowErrorMatchingInlineSnapshot(`[Error: Unmergable intersection. Error path: ["phrase"]]`);
});
(0, vitest_1.test)("invalid deep merge of object and array combination", async () => {
    const University = z.object({
        students: z.array(z.object({
            name: z.string().transform((val) => `Student name: ${val}`),
        })),
    });
    const Registry = z.intersection(University, z.object({
        students: z.array(z.object({
            name: z.string(),
            surname: z.string(),
        })),
    }));
    const students = [{ name: "John", surname: "Doe" }];
    (0, vitest_1.expect)(() => Registry.parse({ students })).toThrowErrorMatchingInlineSnapshot(`[Error: Unmergable intersection. Error path: ["students",0,"name"]]`);
});

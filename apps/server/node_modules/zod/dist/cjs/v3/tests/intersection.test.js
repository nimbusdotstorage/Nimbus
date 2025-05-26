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
(0, vitest_1.test)("object intersection", () => {
    const BaseTeacher = z.object({
        subjects: z.array(z.string()),
    });
    const HasID = z.object({ id: z.string() });
    const Teacher = z.intersection(BaseTeacher.passthrough(), HasID); // BaseTeacher.merge(HasID);
    const data = {
        subjects: ["math"],
        id: "asdfasdf",
    };
    (0, vitest_1.expect)(Teacher.parse(data)).toEqual(data);
    (0, vitest_1.expect)(() => Teacher.parse({ subject: data.subjects })).toThrow();
    (0, vitest_1.expect)(Teacher.parse({ ...data, extra: 12 })).toEqual({ ...data, extra: 12 });
    (0, vitest_1.expect)(() => z.intersection(BaseTeacher.strict(), HasID).parse({ ...data, extra: 12 })).toThrow();
});
(0, vitest_1.test)("deep intersection", () => {
    const Animal = z.object({
        properties: z.object({
            is_animal: z.boolean(),
        }),
    });
    const Cat = z
        .object({
        properties: z.object({
            jumped: z.boolean(),
        }),
    })
        .and(Animal);
    // const cat:Cat = 'asdf' as any;
    const cat = Cat.parse({ properties: { is_animal: true, jumped: true } });
    (0, vitest_1.expect)(cat.properties).toEqual({ is_animal: true, jumped: true });
});
(0, vitest_1.test)("deep intersection of arrays", async () => {
    const Author = z.object({
        posts: z.array(z.object({
            post_id: z.number(),
        })),
    });
    const Registry = z
        .object({
        posts: z.array(z.object({
            title: z.string(),
        })),
    })
        .and(Author);
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
    const syncResult = numberIntersection.safeParse(1234);
    (0, vitest_1.expect)(syncResult.success).toEqual(false);
    if (!syncResult.success) {
        (0, vitest_1.expect)(syncResult.error.issues[0].code).toEqual(z.ZodIssueCode.invalid_intersection_types);
    }
    const asyncResult = await numberIntersection.spa(1234);
    (0, vitest_1.expect)(asyncResult.success).toEqual(false);
    if (!asyncResult.success) {
        (0, vitest_1.expect)(asyncResult.error.issues[0].code).toEqual(z.ZodIssueCode.invalid_intersection_types);
    }
});
(0, vitest_1.test)("invalid array merge", async () => {
    const stringArrInt = z.intersection(z.string().array(), z
        .string()
        .array()
        .transform((val) => [...val, "asdf"]));
    const syncResult = stringArrInt.safeParse(["asdf", "qwer"]);
    (0, vitest_1.expect)(syncResult.success).toEqual(false);
    if (!syncResult.success) {
        (0, vitest_1.expect)(syncResult.error.issues[0].code).toEqual(z.ZodIssueCode.invalid_intersection_types);
    }
    const asyncResult = await stringArrInt.spa(["asdf", "qwer"]);
    (0, vitest_1.expect)(asyncResult.success).toEqual(false);
    if (!asyncResult.success) {
        (0, vitest_1.expect)(asyncResult.error.issues[0].code).toEqual(z.ZodIssueCode.invalid_intersection_types);
    }
});

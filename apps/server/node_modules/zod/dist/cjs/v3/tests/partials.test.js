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
const v3_1 = require("zod/v3");
const util_js_1 = require("../helpers/util.js");
const nested = z.object({
    name: z.string(),
    age: z.number(),
    outer: z.object({
        inner: z.string(),
    }),
    array: z.array(z.object({ asdf: z.string() })),
});
(0, vitest_1.test)("shallow inference", () => {
    const shallow = nested.partial();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("shallow partial parse", () => {
    const shallow = nested.partial();
    shallow.parse({});
    shallow.parse({
        name: "asdf",
        age: 23143,
    });
});
(0, vitest_1.test)("deep partial inference", () => {
    const deep = nested.deepPartial();
    const asdf = deep.shape.array.unwrap().element.shape.asdf.unwrap();
    asdf.parse("asdf");
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("deep partial parse", () => {
    const deep = nested.deepPartial();
    (0, vitest_1.expect)(deep.shape.name instanceof z.ZodOptional).toBe(true);
    (0, vitest_1.expect)(deep.shape.outer instanceof z.ZodOptional).toBe(true);
    (0, vitest_1.expect)(deep.shape.outer._def.innerType instanceof z.ZodObject).toBe(true);
    (0, vitest_1.expect)(deep.shape.outer._def.innerType.shape.inner instanceof z.ZodOptional).toBe(true);
    (0, vitest_1.expect)(deep.shape.outer._def.innerType.shape.inner._def.innerType instanceof z.ZodString).toBe(true);
});
(0, vitest_1.test)("deep partial runtime tests", () => {
    const deep = nested.deepPartial();
    deep.parse({});
    deep.parse({
        outer: {},
    });
    deep.parse({
        name: "asdf",
        age: 23143,
        outer: {
            inner: "adsf",
        },
    });
});
(0, vitest_1.test)("deep partial optional/nullable", () => {
    const schema = z
        .object({
        name: z.string().optional(),
        age: z.number().nullable(),
    })
        .deepPartial();
    (0, vitest_1.expect)(schema.shape.name.unwrap()).toBeInstanceOf(v3_1.ZodOptional);
    (0, vitest_1.expect)(schema.shape.age.unwrap()).toBeInstanceOf(v3_1.ZodNullable);
});
(0, vitest_1.test)("deep partial tuple", () => {
    const schema = z
        .object({
        tuple: z.tuple([
            z.object({
                name: z.string().optional(),
                age: z.number().nullable(),
            }),
        ]),
    })
        .deepPartial();
    (0, vitest_1.expect)(schema.shape.tuple.unwrap().items[0].shape.name).toBeInstanceOf(v3_1.ZodOptional);
});
(0, vitest_1.test)("deep partial inference", () => {
    const mySchema = z.object({
        name: z.string(),
        array: z.array(z.object({ asdf: z.string() })),
        tuple: z.tuple([z.object({ value: z.string() })]),
    });
    const partialed = mySchema.deepPartial();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("required", () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        nullableField: z.number().nullable(),
        nullishField: z.string().nullish(),
    });
    const requiredObject = object.required();
    (0, vitest_1.expect)(requiredObject.shape.name).toBeInstanceOf(z.ZodString);
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNumber);
    (0, vitest_1.expect)(requiredObject.shape.field).toBeInstanceOf(z.ZodDefault);
    (0, vitest_1.expect)(requiredObject.shape.nullableField).toBeInstanceOf(z.ZodNullable);
    (0, vitest_1.expect)(requiredObject.shape.nullishField).toBeInstanceOf(z.ZodNullable);
});
(0, vitest_1.test)("required inference", () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        nullableField: z.number().nullable(),
        nullishField: z.string().nullish(),
    });
    const requiredObject = object.required();
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("required with mask", () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        country: z.string().optional(),
    });
    const requiredObject = object.required({ age: true });
    (0, vitest_1.expect)(requiredObject.shape.name).toBeInstanceOf(z.ZodString);
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNumber);
    (0, vitest_1.expect)(requiredObject.shape.field).toBeInstanceOf(z.ZodDefault);
    (0, vitest_1.expect)(requiredObject.shape.country).toBeInstanceOf(z.ZodOptional);
});
(0, vitest_1.test)("required with mask -- ignore falsy values", () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        country: z.string().optional(),
    });
    // @ts-expect-error
    const requiredObject = object.required({ age: true, country: false });
    (0, vitest_1.expect)(requiredObject.shape.name).toBeInstanceOf(z.ZodString);
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNumber);
    (0, vitest_1.expect)(requiredObject.shape.field).toBeInstanceOf(z.ZodDefault);
    (0, vitest_1.expect)(requiredObject.shape.country).toBeInstanceOf(z.ZodOptional);
});
(0, vitest_1.test)("partial with mask", async () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        country: z.string(),
    });
    const masked = object.partial({ age: true, field: true, name: true }).strict();
    (0, vitest_1.expect)(masked.shape.name).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(masked.shape.age).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(masked.shape.field).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(masked.shape.country).toBeInstanceOf(z.ZodString);
    masked.parse({ country: "US" });
    await masked.parseAsync({ country: "US" });
});
(0, vitest_1.test)("partial with mask -- ignore falsy values", async () => {
    const object = z.object({
        name: z.string(),
        age: z.number().optional(),
        field: z.string().optional().default("asdf"),
        country: z.string(),
    });
    // @ts-expect-error
    const masked = object.partial({ name: true, country: false }).strict();
    (0, vitest_1.expect)(masked.shape.name).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(masked.shape.age).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(masked.shape.field).toBeInstanceOf(z.ZodDefault);
    (0, vitest_1.expect)(masked.shape.country).toBeInstanceOf(z.ZodString);
    masked.parse({ country: "US" });
    await masked.parseAsync({ country: "US" });
});
(0, vitest_1.test)("deeppartial array", () => {
    const schema = z.object({ array: z.string().array().min(42) }).deepPartial();
    // works as expected
    schema.parse({});
    // should be false, but is true
    (0, vitest_1.expect)(schema.safeParse({ array: [] }).success).toBe(false);
});

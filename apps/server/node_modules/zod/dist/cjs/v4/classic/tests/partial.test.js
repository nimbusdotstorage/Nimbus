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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("shallow partial parse", () => {
    const shallow = nested.partial();
    shallow.parse({});
    shallow.parse({
        name: "asdf",
        age: 23143,
    });
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
    (0, vitest_1.expect)(requiredObject.shape.name).toBeInstanceOf(z.ZodNonOptional);
    (0, vitest_1.expect)(requiredObject.shape.name.unwrap()).toBeInstanceOf(z.ZodString);
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
    (0, vitest_1.expect)(requiredObject.shape.age.unwrap()).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(requiredObject.shape.field).toBeInstanceOf(z.ZodNonOptional);
    (0, vitest_1.expect)(requiredObject.shape.field.unwrap()).toBeInstanceOf(z.ZodDefault);
    (0, vitest_1.expect)(requiredObject.shape.nullableField).toBeInstanceOf(z.ZodNonOptional);
    (0, vitest_1.expect)(requiredObject.shape.nullableField.unwrap()).toBeInstanceOf(z.ZodNullable);
    (0, vitest_1.expect)(requiredObject.shape.nullishField).toBeInstanceOf(z.ZodNonOptional);
    (0, vitest_1.expect)(requiredObject.shape.nullishField.unwrap()).toBeInstanceOf(z.ZodOptional);
    (0, vitest_1.expect)(requiredObject.shape.nullishField.unwrap().unwrap()).toBeInstanceOf(z.ZodNullable);
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
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
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
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
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
    (0, vitest_1.expect)(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
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

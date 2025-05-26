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
const z = __importStar(require("zod/v4-mini"));
(0, vitest_1.test)("z.object", () => {
    const a = z.object({
        name: z.string(),
        age: z.number(),
        points: z.optional(z.number()),
        "test?": z.boolean(),
    });
    a._zod.def.shape["test?"];
    a._zod.def.shape.points._zod.optin;
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.parse(a, { name: "john", age: 30, "test?": true })).toEqual({
        name: "john",
        age: 30,
        "test?": true,
    });
    // "test?" is required in ZodObject
    (0, vitest_1.expect)(() => z.parse(a, { name: "john", age: "30" })).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // null prototype
    const schema = z.object({ a: z.string() });
    const obj = Object.create(null);
    obj.a = "foo";
    (0, vitest_1.expect)(schema.parse(obj)).toEqual({ a: "foo" });
});
(0, vitest_1.test)("z.strictObject", () => {
    const a = z.strictObject({
        name: z.string(),
    });
    (0, vitest_1.expect)(z.parse(a, { name: "john" })).toEqual({ name: "john" });
    (0, vitest_1.expect)(() => z.parse(a, { name: "john", age: 30 })).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
(0, vitest_1.test)("z.looseObject", () => {
    const a = z.looseObject({
        name: z.string(),
        age: z.number(),
    });
    (0, vitest_1.expect)(z.parse(a, { name: "john", age: 30 })).toEqual({
        name: "john",
        age: 30,
    });
    (0, vitest_1.expect)(z.parse(a, { name: "john", age: 30, extra: true })).toEqual({
        name: "john",
        age: 30,
        extra: true,
    });
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
const userSchema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.optional(z.string()),
});
(0, vitest_1.test)("z.keyof", () => {
    // z.keyof returns an enum schema of the keys of an object schema
    const userKeysSchema = z.keyof(userSchema);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(userKeysSchema).toBeDefined();
    (0, vitest_1.expect)(z.safeParse(userKeysSchema, "name").success).toBe(true);
    (0, vitest_1.expect)(z.safeParse(userKeysSchema, "age").success).toBe(true);
    (0, vitest_1.expect)(z.safeParse(userKeysSchema, "email").success).toBe(true);
    (0, vitest_1.expect)(z.safeParse(userKeysSchema, "isAdmin").success).toBe(false);
});
(0, vitest_1.test)("z.extend", () => {
    const extendedSchema = z.extend(userSchema, {
        isAdmin: z.boolean(),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(extendedSchema).toBeDefined();
    (0, vitest_1.expect)(z.safeParse(extendedSchema, { name: "John", age: 30, isAdmin: true }).success).toBe(true);
});
(0, vitest_1.test)("z.pick", () => {
    const pickedSchema = z.pick(userSchema, { name: true, email: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(pickedSchema).toBeDefined();
    (0, vitest_1.expect)(z.safeParse(pickedSchema, { name: "John", email: "john@example.com" }).success).toBe(true);
});
(0, vitest_1.test)("z.omit", () => {
    const omittedSchema = z.omit(userSchema, { age: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(omittedSchema).toBeDefined();
    (0, vitest_1.expect)(Reflect.ownKeys(omittedSchema._zod.def.shape)).toEqual(["name", "email"]);
    (0, vitest_1.expect)(z.safeParse(omittedSchema, { name: "John", email: "john@example.com" }).success).toBe(true);
});
(0, vitest_1.test)("z.partial", () => {
    const partialSchema = z.partial(userSchema);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.safeParse(partialSchema, { name: "John" }).success).toBe(true);
});
(0, vitest_1.test)("z.partial with mask", () => {
    const partialSchemaWithMask = z.partial(userSchema, { name: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expect)(z.safeParse(partialSchemaWithMask, { age: 30 }).success).toBe(true);
    (0, vitest_1.expect)(z.safeParse(partialSchemaWithMask, { name: "John" }).success).toBe(false);
});

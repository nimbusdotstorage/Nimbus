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
const fish = z.object({
    name: z.string(),
    age: z.number(),
    nested: z.object({}),
});
(0, vitest_1.test)("pick type inference", () => {
    const nameonlyFish = fish.pick({ name: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("pick parse - success", () => {
    const nameonlyFish = fish.pick({ name: true });
    nameonlyFish.parse({ name: "bob" });
    // @ts-expect-error checking runtime picks `name` only.
    const anotherNameonlyFish = fish.pick({ name: true, age: false });
    anotherNameonlyFish.parse({ name: "bob" });
});
(0, vitest_1.test)("pick parse - fail", () => {
    fish.pick({ name: true }).parse({ name: "12" });
    fish.pick({ name: true }).parse({ name: "bob", age: 12 });
    fish.pick({ age: true }).parse({ age: 12 });
    const nameonlyFish = fish.pick({ name: true }).strict();
    const bad1 = () => nameonlyFish.parse({ name: 12 });
    const bad2 = () => nameonlyFish.parse({ name: "bob", age: 12 });
    const bad3 = () => nameonlyFish.parse({ age: 12 });
    // @ts-expect-error checking runtime picks `name` only.
    const anotherNameonlyFish = fish.pick({ name: true, age: false }).strict();
    const bad4 = () => anotherNameonlyFish.parse({ name: "bob", age: 12 });
    (0, vitest_1.expect)(bad1).toThrow();
    (0, vitest_1.expect)(bad2).toThrow();
    (0, vitest_1.expect)(bad3).toThrow();
    (0, vitest_1.expect)(bad4).toThrow();
});
(0, vitest_1.test)("pick - remove optional", () => {
    const schema = z.object({ a: z.string(), b: z.string().optional() });
    (0, vitest_1.expect)("a" in schema._zod.def.shape).toEqual(true);
    (0, vitest_1.expect)("b" in schema._zod.def.shape).toEqual(true);
    const picked = schema.pick({ a: true });
    (0, vitest_1.expect)("a" in picked._zod.def.shape).toEqual(true);
    (0, vitest_1.expect)("b" in picked._zod.def.shape).toEqual(false);
});
(0, vitest_1.test)("omit type inference", () => {
    const nonameFish = fish.omit({ name: true });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("omit parse - success", () => {
    const nonameFish = fish.omit({ name: true });
    nonameFish.parse({ age: 12, nested: {} });
    // @ts-expect-error checking runtime omits `name` only.
    const anotherNonameFish = fish.omit({ name: true, age: false });
    anotherNonameFish.parse({ age: 12, nested: {} });
});
(0, vitest_1.test)("omit parse - fail", () => {
    const nonameFish = fish.omit({ name: true });
    const bad1 = () => nonameFish.parse({ name: 12 });
    const bad2 = () => nonameFish.parse({ age: 12 });
    const bad3 = () => nonameFish.parse({});
    // @ts-expect-error checking runtime omits `name` only.
    const anotherNonameFish = fish.omit({ name: true, age: false });
    const bad4 = () => anotherNonameFish.parse({ nested: {} });
    (0, vitest_1.expect)(bad1).toThrow();
    (0, vitest_1.expect)(bad2).toThrow();
    (0, vitest_1.expect)(bad3).toThrow();
    (0, vitest_1.expect)(bad4).toThrow();
});
(0, vitest_1.test)("omit - remove optional", () => {
    const schema = z.object({ a: z.string(), b: z.string().optional() });
    (0, vitest_1.expect)("a" in schema._zod.def.shape).toEqual(true);
    const omitted = schema.omit({ a: true });
    (0, vitest_1.expect)("a" in omitted._zod.def.shape).toEqual(false);
});
(0, vitest_1.test)("nonstrict inference", () => {
    const laxfish = fish.pick({ name: true }).catchall(z.any());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("nonstrict parsing - pass", () => {
    const laxfish = fish.passthrough().pick({ name: true });
    laxfish.parse({ name: "asdf", whatever: "asdf" });
    laxfish.parse({ name: "asdf", age: 12, nested: {} });
});
(0, vitest_1.test)("nonstrict parsing - fail", () => {
    const laxfish = fish.passthrough().pick({ name: true });
    const bad = () => laxfish.parse({ whatever: "asdf" });
    (0, vitest_1.expect)(bad).toThrow();
});
(0, vitest_1.test)("pick/omit/required/partial - do not allow unknown keys", () => {
    const schema = z.object({
        name: z.string(),
        age: z.number(),
    });
    // @ts-expect-error
    (0, vitest_1.expect)(() => schema.pick({ $unknown: true })).toThrow();
    // @ts-expect-error
    (0, vitest_1.expect)(() => schema.omit({ $unknown: true })).toThrow();
    // @ts-expect-error
    (0, vitest_1.expect)(() => schema.required({ $unknown: true })).toThrow();
    // @ts-expect-error
    (0, vitest_1.expect)(() => schema.partial({ $unknown: true })).toThrow();
});

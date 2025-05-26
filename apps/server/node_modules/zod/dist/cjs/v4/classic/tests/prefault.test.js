"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const v4_1 = require("zod/v4");
(0, vitest_1.test)("basic prefault", () => {
    const a = v4_1.z.prefault(v4_1.z.string().trim(), "  default  ");
    (0, vitest_1.expect)(a).toBeInstanceOf(v4_1.z.ZodPrefault);
    (0, vitest_1.expect)(a.parse("  asdf  ")).toEqual("asdf");
    (0, vitest_1.expect)(a.parse(undefined)).toEqual("default");
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("prefault inside object", () => {
    // test optinality
    const a = v4_1.z.object({
        name: v4_1.z.string().optional(),
        age: v4_1.z.number().default(1234),
        email: v4_1.z.string().prefault("1234"),
    });
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});

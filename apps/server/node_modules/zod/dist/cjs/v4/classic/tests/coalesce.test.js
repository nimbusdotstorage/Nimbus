"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.test)("coalesce", () => {
    (0, vitest_1.expect)(true).toBe(true);
});
// test("nonoptional with default", () => {
//   const schema = z.string().optional().coalesce("hi");
//   expectTypeOf<typeof schema._input>().toEqualTypeOf<string | undefined>();
//   expectTypeOf<typeof schema._output>().toEqualTypeOf<string>();
//   expect(schema.parse(undefined)).toBe("hi");
// });
// test("nonoptional in object", () => {
//   const schema = z.object({ hi: z.string().optional().nonoptional("hi") });
//   expectTypeOf<typeof schema._input>().toEqualTypeOf<{ hi: string | undefined }>();
//   expectTypeOf<typeof schema._output>().toEqualTypeOf<{ hi: string }>();
//   expect(schema.parse(undefined)).toBe("hi");
// });

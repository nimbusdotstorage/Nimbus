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
const args1 = z.tuple([z.string()]);
const returns1 = z.number();
const func1 = z.function({
    input: args1,
    output: returns1,
});
(0, vitest_1.test)("function parsing", () => {
    const parsed = func1.implement((arg) => arg.length);
    const result = parsed("asdf");
    (0, vitest_1.expect)(result).toBe(4);
});
(0, vitest_1.test)("parsed function fail 1", () => {
    // @ts-expect-error
    const parsed = func1.implement((x) => x);
    (0, vitest_1.expect)(() => parsed("asdf")).toThrow();
});
(0, vitest_1.test)("parsed function fail 2", () => {
    // @ts-expect-error
    const parsed = func1.implement((x) => x);
    (0, vitest_1.expect)(() => parsed(13)).toThrow();
});
(0, vitest_1.test)("function inference 1", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
// test("method parsing", () => {
//   const methodObject = z.object({
//     property: z.number(),
//     method: z
//       .function()
//       .input(z.tuple([z.string()]))
//       .output(z.number()),
//   });
//   const methodInstance = {
//     property: 3,
//     method: function (s: string) {
//       return s.length + this.property;
//     },
//   };
//   const parsed = methodObject.parse(methodInstance);
//   expect(parsed.method("length=8")).toBe(11); // 8 length + 3 property
// });
// test("async method parsing", async () => {
//   const methodObject = z.object({
//     property: z.number(),
//     method: z.function().input(z.string()).output(z.promise(z.number())),
//   });
//   const methodInstance = {
//     property: 3,
//     method: async function (s: string) {
//       return s.length + this.property;
//     },
//   };
//   const parsed = methodObject.parse(methodInstance);
//   expect(await parsed.method("length=8")).toBe(11); // 8 length + 3 property
// });
(0, vitest_1.test)("args method", () => {
    const t1 = z.function();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const t2args = z.tuple([z.string()], z.unknown());
    const t2 = t1.input(t2args);
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
    const t3 = t2.output(z.boolean());
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
const args2 = z.tuple([
    z.object({
        f1: z.number(),
        f2: z.string().nullable(),
        f3: z.array(z.boolean().optional()).optional(),
    }),
]);
const returns2 = z.union([z.string(), z.number()]);
const func2 = z.function({
    input: args2,
    output: returns2,
});
(0, vitest_1.test)("function inference 2", () => {
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
(0, vitest_1.test)("valid function run", () => {
    const validFunc2Instance = func2.implement((_x) => {
        _x.f2;
        _x.f3[0];
        return "adf";
    });
    validFunc2Instance({
        f1: 21,
        f2: "asdf",
        f3: [true, false],
    });
});
(0, vitest_1.test)("input validation error", () => {
    const schema = z.function({
        input: z.tuple([z.string()]),
        output: z.void(),
    });
    const fn = schema.implement(() => 1234);
    const checker = () => fn();
    try {
        checker();
    }
    catch (e) {
        (0, vitest_1.expect)(e.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received undefined",
          "path": [
            0,
          ],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("output validation error", () => {
    const schema = z.function({
        input: z.tuple([]),
        output: z.string(),
    });
    const fn = schema.implement(() => 1234);
    try {
        fn();
    }
    catch (e) {
        (0, vitest_1.expect)(e.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("function with async refinements", async () => {
    const schema = z
        .function()
        .input([z.string().refine(async (val) => val.length > 10)])
        .output(z.promise(z.number().refine(async (val) => val > 10)));
    const func = schema.implementAsync(async (val) => {
        return val.length;
    });
    const results = [];
    try {
        await func("asdfasdf");
        results.push("success");
    }
    catch (_) {
        results.push("fail");
    }
    try {
        await func("asdflkjasdflkjsf");
        results.push("success");
    }
    catch (_) {
        results.push("fail");
    }
    (0, vitest_1.expect)(results).toEqual(["fail", "success"]);
});
(0, vitest_1.test)("non async function with async refinements should fail", async () => {
    const func = z
        .function()
        .input([z.string().refine(async (val) => val.length > 10)])
        .output(z.number().refine(async (val) => val > 10))
        .implement((val) => {
        return val.length;
    });
    const results = [];
    try {
        await func("asdasdfasdffasdf");
        results.push("success");
    }
    catch (_) {
        results.push("fail");
    }
    (0, vitest_1.expect)(results).toEqual(["fail"]);
});
(0, vitest_1.test)("extra parameters with rest", () => {
    const maxLength5 = z
        .function()
        .input([z.string()], z.unknown())
        .output(z.boolean())
        .implement((str, _arg, _qewr) => {
        return str.length <= 5;
    });
    const filteredList = ["apple", "orange", "pear", "banana", "strawberry"].filter(maxLength5);
    (0, vitest_1.expect)(filteredList.length).toEqual(2);
});

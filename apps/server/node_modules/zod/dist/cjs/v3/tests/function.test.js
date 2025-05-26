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
const util_js_1 = require("../helpers/util.js");
const args1 = z.tuple([z.string()]);
const returns1 = z.number();
const func1 = z.function(args1, returns1);
(0, vitest_1.test)("function parsing", () => {
    const parsed = func1.parse((arg) => arg.length);
    parsed("asdf");
});
(0, vitest_1.test)("parsed function fail 1", () => {
    const parsed = func1.parse((x) => x);
    (0, vitest_1.expect)(() => parsed("asdf")).toThrow();
});
(0, vitest_1.test)("parsed function fail 2", () => {
    const parsed = func1.parse((x) => x);
    (0, vitest_1.expect)(() => parsed(13)).toThrow();
});
(0, vitest_1.test)("function inference 1", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("method parsing", () => {
    const methodObject = z.object({
        property: z.number(),
        method: z.function().args(z.string()).returns(z.number()),
    });
    const methodInstance = {
        property: 3,
        method: function (s) {
            return s.length + this.property;
        },
    };
    const parsed = methodObject.parse(methodInstance);
    (0, vitest_1.expect)(parsed.method("length=8")).toBe(11); // 8 length + 3 property
});
(0, vitest_1.test)("async method parsing", async () => {
    const methodObject = z.object({
        property: z.number(),
        method: z.function().args(z.string()).returns(z.promise(z.number())),
    });
    const methodInstance = {
        property: 3,
        method: async function (s) {
            return s.length + this.property;
        },
    };
    const parsed = methodObject.parse(methodInstance);
    (0, vitest_1.expect)(await parsed.method("length=8")).toBe(11); // 8 length + 3 property
});
(0, vitest_1.test)("args method", () => {
    const t1 = z.function();
    util_js_1.util.assertEqual(true);
    const t2 = t1.args(z.string());
    util_js_1.util.assertEqual(true);
    const t3 = t2.returns(z.boolean());
    util_js_1.util.assertEqual(true);
});
const args2 = z.tuple([
    z.object({
        f1: z.number(),
        f2: z.string().nullable(),
        f3: z.array(z.boolean().optional()).optional(),
    }),
]);
const returns2 = z.union([z.string(), z.number()]);
const func2 = z.function(args2, returns2);
(0, vitest_1.test)("function inference 2", () => {
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("valid function run", () => {
    const validFunc2Instance = func2.validate((_x) => {
        return "adf";
    });
    const checker = () => {
        validFunc2Instance({
            f1: 21,
            f2: "asdf",
            f3: [true, false],
        });
    };
    checker();
});
(0, vitest_1.test)("input validation error", () => {
    const invalidFuncInstance = func2.validate((_x) => {
        return "adf";
    });
    const checker = () => {
        invalidFuncInstance("Invalid_input");
    };
    (0, vitest_1.expect)(checker).toThrow();
});
(0, vitest_1.test)("output validation error", () => {
    const invalidFuncInstance = func2.validate((_x) => {
        return ["this", "is", "not", "valid", "output"];
    });
    const checker = () => {
        invalidFuncInstance({
            f1: 21,
            f2: "asdf",
            f3: [true, false],
        });
    };
    (0, vitest_1.expect)(checker).toThrow();
});
z.function(z.tuple([z.string()])).args()._def.args;
(0, vitest_1.test)("special function error codes", () => {
    const checker = z.function(z.tuple([z.string()]), z.boolean()).implement((arg) => {
        return arg.length;
    });
    try {
        checker("12");
    }
    catch (err) {
        const zerr = err;
        const first = zerr.issues[0];
        if (first.code !== z.ZodIssueCode.invalid_return_type)
            throw new Error();
        (0, vitest_1.expect)(first.returnTypeError).toBeInstanceOf(z.ZodError);
    }
    try {
        checker(12);
    }
    catch (err) {
        const zerr = err;
        const first = zerr.issues[0];
        if (first.code !== z.ZodIssueCode.invalid_arguments)
            throw new Error();
        (0, vitest_1.expect)(first.argumentsError).toBeInstanceOf(z.ZodError);
    }
});
(0, vitest_1.test)("function with async refinements", async () => {
    const func = z
        .function()
        .args(z.string().refine(async (val) => val.length > 10))
        .returns(z.promise(z.number().refine(async (val) => val > 10)))
        .implement(async (val) => {
        return val.length;
    });
    const results = [];
    try {
        await func("asdfasdf");
        results.push("success");
    }
    catch (_err) {
        results.push("fail");
    }
    try {
        await func("asdflkjasdflkjsf");
        results.push("success");
    }
    catch (_err) {
        results.push("fail");
    }
    (0, vitest_1.expect)(results).toEqual(["fail", "success"]);
});
(0, vitest_1.test)("non async function with async refinements should fail", async () => {
    const func = z
        .function()
        .args(z.string().refine(async (val) => val.length > 10))
        .returns(z.number().refine(async (val) => val > 10))
        .implement((val) => {
        return val.length;
    });
    const results = [];
    try {
        await func("asdasdfasdffasdf");
        results.push("success");
    }
    catch (_err) {
        results.push("fail");
    }
    (0, vitest_1.expect)(results).toEqual(["fail"]);
});
(0, vitest_1.test)("allow extra parameters", () => {
    const maxLength5 = z
        .function()
        .args(z.string())
        .returns(z.boolean())
        .implement((str, _arg, _qewr) => {
        return str.length <= 5;
    });
    const filteredList = ["apple", "orange", "pear", "banana", "strawberry"].filter(maxLength5);
    (0, vitest_1.expect)(filteredList.length).toEqual(2);
});
(0, vitest_1.test)("params and returnType getters", () => {
    const func = z.function().args(z.string()).returns(z.string());
    func.parameters().items[0].parse("asdf");
    func.returnType().parse("asdf");
});
(0, vitest_1.test)("inference with transforms", () => {
    const funcSchema = z
        .function()
        .args(z.string().transform((val) => val.length))
        .returns(z.object({ val: z.number() }));
    const myFunc = funcSchema.implement((val) => {
        return { val, extra: "stuff" };
    });
    myFunc("asdf");
    util_js_1.util.assertEqual(true);
});
(0, vitest_1.test)("fallback to OuterTypeOfFunction", () => {
    const funcSchema = z
        .function()
        .args(z.string().transform((val) => val.length))
        .returns(z.object({ arg: z.number() }).transform((val) => val.arg));
    const myFunc = funcSchema.implement((val) => {
        return { arg: val, arg2: false };
    });
    util_js_1.util.assertEqual(true);
});

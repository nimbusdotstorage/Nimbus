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
/// string
const stringSchema = z.string();
(0, vitest_1.test)("string async parse", async () => {
    const goodData = "XXX";
    const badData = 12;
    const goodResult = await stringSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await stringSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// number
const numberSchema = z.number();
(0, vitest_1.test)("number async parse", async () => {
    const goodData = 1234.2353;
    const badData = "1234";
    const goodResult = await numberSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await numberSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// bigInt
const bigIntSchema = z.bigint();
(0, vitest_1.test)("bigInt async parse", async () => {
    const goodData = BigInt(145);
    const badData = 134;
    const goodResult = await bigIntSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await bigIntSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// boolean
const booleanSchema = z.boolean();
(0, vitest_1.test)("boolean async parse", async () => {
    const goodData = true;
    const badData = 1;
    const goodResult = await booleanSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await booleanSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// date
const dateSchema = z.date();
(0, vitest_1.test)("date async parse", async () => {
    const goodData = new Date();
    const badData = new Date().toISOString();
    const goodResult = await dateSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await dateSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// undefined
const undefinedSchema = z.undefined();
(0, vitest_1.test)("undefined async parse", async () => {
    const goodData = undefined;
    const badData = "XXX";
    const goodResult = await undefinedSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(undefined);
    const badResult = await undefinedSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// null
const nullSchema = z.null();
(0, vitest_1.test)("null async parse", async () => {
    const goodData = null;
    const badData = undefined;
    const goodResult = await nullSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await nullSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// any
const anySchema = z.any();
(0, vitest_1.test)("any async parse", async () => {
    const goodData = [{}];
    // const badData = 'XXX';
    const goodResult = await anySchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    // const badResult = await anySchema.safeParseAsync(badData);
    // expect(badResult.success).toBe(false);
    // if (!badResult.success) expect(badResult.error).toBeInstanceOf(z.ZodError);
});
/// unknown
const unknownSchema = z.unknown();
(0, vitest_1.test)("unknown async parse", async () => {
    const goodData = ["asdf", 124, () => { }];
    // const badData = 'XXX';
    const goodResult = await unknownSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    // const badResult = await unknownSchema.safeParseAsync(badData);
    // expect(badResult.success).toBe(false);
    // if (!badResult.success) expect(badResult.error).toBeInstanceOf(z.ZodError);
});
/// void
const voidSchema = z.void();
(0, vitest_1.test)("void async parse", async () => {
    const goodData = undefined;
    const badData = 0;
    const goodResult = await voidSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await voidSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// array
const arraySchema = z.array(z.string());
(0, vitest_1.test)("array async parse", async () => {
    const goodData = ["XXX"];
    const badData = "XXX";
    const goodResult = await arraySchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await arraySchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// object
const objectSchema = z.object({ string: z.string() });
(0, vitest_1.test)("object async parse", async () => {
    const goodData = { string: "XXX" };
    const badData = { string: 12 };
    const goodResult = await objectSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await objectSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// union
const unionSchema = z.union([z.string(), z.undefined()]);
(0, vitest_1.test)("union async parse", async () => {
    const goodData = undefined;
    const badData = null;
    const goodResult = await unionSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await unionSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// record
const recordSchema = z.record(z.object({}));
(0, vitest_1.test)("record async parse", async () => {
    const goodData = { adsf: {}, asdf: {} };
    const badData = [{}];
    const goodResult = await recordSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await recordSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// function
const functionSchema = z.function();
(0, vitest_1.test)("function async parse", async () => {
    const goodData = () => { };
    const badData = "XXX";
    const goodResult = await functionSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(typeof goodResult.data).toEqual("function");
    const badResult = await functionSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// literal
const literalSchema = z.literal("asdf");
(0, vitest_1.test)("literal async parse", async () => {
    const goodData = "asdf";
    const badData = "asdff";
    const goodResult = await literalSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await literalSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// enum
const enumSchema = z.enum(["fish", "whale"]);
(0, vitest_1.test)("enum async parse", async () => {
    const goodData = "whale";
    const badData = "leopard";
    const goodResult = await enumSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await enumSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// nativeEnum
var nativeEnumTest;
(function (nativeEnumTest) {
    nativeEnumTest["asdf"] = "qwer";
})(nativeEnumTest || (nativeEnumTest = {}));
// @ts-ignore
const nativeEnumSchema = z.nativeEnum(nativeEnumTest);
(0, vitest_1.test)("nativeEnum async parse", async () => {
    const goodData = nativeEnumTest.asdf;
    const badData = "asdf";
    const goodResult = await nativeEnumSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success)
        (0, vitest_1.expect)(goodResult.data).toEqual(goodData);
    const badResult = await nativeEnumSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(false);
    if (!badResult.success)
        (0, vitest_1.expect)(badResult.error).toBeInstanceOf(z.ZodError);
});
/// promise
const promiseSchema = z.promise(z.number());
(0, vitest_1.test)("promise async parse good", async () => {
    const goodData = Promise.resolve(123);
    const goodResult = await promiseSchema.safeParseAsync(goodData);
    (0, vitest_1.expect)(goodResult.success).toBe(true);
    if (goodResult.success) {
        (0, vitest_1.expect)(goodResult.data).toBeInstanceOf(Promise);
        const data = await goodResult.data;
        (0, vitest_1.expect)(data).toEqual(123);
        // expect(goodResult.data).resolves.toEqual(124);
        // return goodResult.data;
    }
    else {
        throw new Error("success should be true");
    }
});
(0, vitest_1.test)("promise async parse bad", async () => {
    const badData = Promise.resolve("XXX");
    const badResult = await promiseSchema.safeParseAsync(badData);
    (0, vitest_1.expect)(badResult.success).toBe(true);
    if (badResult.success) {
        await (0, vitest_1.expect)(badResult.data).rejects.toBeInstanceOf(z.ZodError);
    }
    else {
        throw new Error("success should be true");
    }
});
(0, vitest_1.test)("async validation non-empty strings", async () => {
    const base = z.object({
        hello: z.string().refine((x) => x && x.length > 0),
        foo: z.string().refine((x) => x && x.length > 0),
    });
    const testval = { hello: "", foo: "" };
    const result1 = base.safeParse(testval);
    const result2 = base.safeParseAsync(testval);
    const r1 = result1;
    await result2.then((r2) => {
        if (r1.success === false && r2.success === false)
            (0, vitest_1.expect)(r1.error.issues.length).toBe(r2.error.issues.length); // <--- r1 has length 2, r2 has length 1
    });
});
(0, vitest_1.test)("async validation multiple errors 1", async () => {
    const base = z.object({
        hello: z.string(),
        foo: z.number(),
    });
    const testval = { hello: 3, foo: "hello" };
    const result1 = base.safeParse(testval);
    const result2 = base.safeParseAsync(testval);
    const r1 = result1;
    await result2.then((r2) => {
        if (r1.success === false && r2.success === false)
            (0, vitest_1.expect)(r2.error.issues.length).toBe(r1.error.issues.length);
    });
});
(0, vitest_1.test)("async validation multiple errors 2", async () => {
    const base = (is_async) => z.object({
        hello: z.string(),
        foo: z.object({
            bar: z.number().refine(is_async ? async () => false : () => false),
        }),
    });
    const testval = { hello: 3, foo: { bar: 4 } };
    const result1 = base().safeParse(testval);
    const result2 = base(true).safeParseAsync(testval);
    const r1 = result1;
    await result2.then((r2) => {
        if (r1.success === false && r2.success === false)
            (0, vitest_1.expect)(r2.error.issues.length).toBe(r1.error.issues.length);
    });
});
(0, vitest_1.test)("ensure early async failure prevents follow-up refinement checks", async () => {
    let count = 0;
    const base = z.object({
        hello: z.string(),
        foo: z
            .number()
            .refine(async () => {
            count++;
            return true;
        })
            .refine(async () => {
            count++;
            return true;
        }, "Good"),
    });
    const testval = { hello: "bye", foo: 3 };
    const result = await base.safeParseAsync(testval);
    if (result.success === false) {
        (0, vitest_1.expect)(result.error.issues.length).toBe(1);
        (0, vitest_1.expect)(count).toBe(1);
    }
    // await result.then((r) => {
    //   if (r.success === false) expect(r.error.issues.length).toBe(1);
    //   expect(count).toBe(2);
    // });
});

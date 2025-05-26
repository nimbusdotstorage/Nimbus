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
(0, vitest_1.test)("assignability", () => {
    // $ZodString
    z.string();
    // $ZodNumber
    z.number();
    // $ZodBigInt
    z.bigint();
    // $ZodBoolean
    z.boolean();
    // $ZodDate
    z.date();
    // $ZodSymbol
    z.symbol();
    // $ZodUndefined
    z.undefined();
    // $ZodNullable
    z.string().nullable();
    // $ZodNull
    z.null();
    // $ZodAny
    z.any();
    // $ZodUnknown
    z.unknown();
    // $ZodNever
    z.never();
    // $ZodVoid
    z.void();
    // $ZodArray
    z.array(z.string());
    // $ZodObject
    z.object({ key: z.string() });
    // $ZodUnion
    z.union([z.string(), z.number()]);
    // $ZodIntersection
    z.intersection(z.string(), z.number());
    // $ZodTuple
    z.tuple([z.string(), z.number()]);
    // $ZodRecord
    z.record(z.string(), z.number());
    // $ZodMap
    z.map(z.string(), z.number());
    // $ZodSet
    z.set(z.string());
    // $ZodLiteral
    z.literal("example");
    // $ZodEnum
    z.enum(["a", "b", "c"]);
    // $ZodPromise
    z.promise(z.string());
    // $ZodLazy
    const lazySchema = z.lazy(() => z.string());
    lazySchema;
    // $ZodOptional
    z.string().optional();
    // $ZodDefault
    z.string().default("default");
    // $ZodTemplateLiteral
    z.templateLiteral([z.literal("a"), z.literal("b")]);
    // $ZodCustom
    z.custom((val) => typeof val === "string");
    // $ZodTransform
    z.transform((val) => val);
    // $ZodNonOptional
    z.string().optional().nonoptional();
    // $ZodReadonly
    z.object({ key: z.string() }).readonly();
    // $ZodNaN
    z.nan();
    // $ZodPipe
    z.unknown().pipe(z.number());
    // $ZodSuccess
    z.success(z.string());
    // $ZodCatch
    z.string().catch("fallback");
    // $ZodFile
    z.file();
});
(0, vitest_1.test)("checks", () => {
    const _a = {};
    const _b = {};
    const _c = {};
    const _d = {};
});

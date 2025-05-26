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
(0, vitest_1.test)("generics", () => {
    async function stripOuter(schema, data) {
        return z
            .object({
            nested: schema, // as z.ZodTypeAny,
        })
            .transform((data) => {
            return data.nested;
        })
            .parse({ nested: data });
    }
    const result = stripOuter(z.object({ a: z.string() }), { a: "asdf" });
    util_js_1.util.assertEqual(true);
});
// test("assignability", () => {
//   const createSchemaAndParse = <K extends string, VS extends z.ZodString>(
//     key: K,
//     valueSchema: VS,
//     data: unknown
//   ) => {
//     const schema = z.object({
//       [key]: valueSchema,
//     } as { [k in K]: VS });
//     return { [key]: valueSchema };
//     const parsed = schema.parse(data);
//     return parsed;
//     // const inferred: z.infer<z.ZodObject<{ [k in K]: VS }>> = parsed;
//     // return inferred;
//   };
//   const parsed = createSchemaAndParse("foo", z.string(), { foo: "" });
//   util.assertEqual<typeof parsed, { foo: string }>(true);
// });
(0, vitest_1.test)("nested no undefined", () => {
    const inner = z.string().or(z.array(z.string()));
    const outer = z.object({ inner });
    z.util.assertEqual(true);
    (0, vitest_1.expect)(outer.safeParse({ inner: undefined }).success).toEqual(false);
});

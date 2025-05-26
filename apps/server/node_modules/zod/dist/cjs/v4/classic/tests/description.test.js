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
const description = "a description";
// test("passing `description` to schema should add a description", () => {
//   expect(z.string({ description }).description).toEqual(description);
//   expect(z.number({ description }).description).toEqual(description);
//   expect(z.boolean({ description }).description).toEqual(description);
// });
(0, vitest_1.test)(".describe", () => {
    (0, vitest_1.expect)(z.string().describe(description).description).toEqual(description);
    (0, vitest_1.expect)(z.number().describe(description).description).toEqual(description);
    (0, vitest_1.expect)(z.boolean().describe(description).description).toEqual(description);
});
(0, vitest_1.test)("adding description with z.globalRegistry", () => {
    const schema = z.string();
    z.core.globalRegistry.add(schema, { description });
    z.core.globalRegistry.get(schema);
    (0, vitest_1.expect)(schema.description).toEqual(description);
});
// in Zod 4 descriptions are not inherited
// test("description should carry over to chained schemas", () => {
//   const schema = z.string().describe(description);
//   expect(schema.description).toEqual(description);
//   expect(schema.optional().description).toEqual(description);
//   expect(schema.optional().nullable().default("default").description).toEqual(description);
// });

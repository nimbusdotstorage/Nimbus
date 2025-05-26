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
(0, vitest_1.test)("parse async test", async () => {
    const schema1 = z.string().refine(async (_val) => false);
    (0, vitest_1.expect)(() => schema1.parse("asdf")).toThrow();
    const schema2 = z.string().refine((_val) => Promise.resolve(true));
    return await (0, vitest_1.expect)(() => schema2.parse("asdf")).toThrow();
});
(0, vitest_1.test)("parseAsync async test", async () => {
    const schema1 = z.string().refine(async (_val) => true);
    await schema1.parseAsync("asdf");
    const schema2 = z.string().refine(async (_val) => false);
    return await (0, vitest_1.expect)(schema2.parseAsync("asdf")).rejects.toBeDefined();
    // expect(async () => await schema2.parseAsync('asdf')).toThrow();
});
(0, vitest_1.test)("parseAsync async test", async () => {
    // expect.assertions(2);
    const schema1 = z.string().refine((_val) => Promise.resolve(true));
    const v1 = await schema1.parseAsync("asdf");
    (0, vitest_1.expect)(v1).toEqual("asdf");
    const schema2 = z.string().refine((_val) => Promise.resolve(false));
    await (0, vitest_1.expect)(schema2.parseAsync("asdf")).rejects.toBeDefined();
    const schema3 = z.string().refine((_val) => Promise.resolve(true));
    await (0, vitest_1.expect)(schema3.parseAsync("asdf")).resolves.toEqual("asdf");
    return await (0, vitest_1.expect)(schema3.parseAsync("qwer")).resolves.toEqual("qwer");
});
(0, vitest_1.test)("parseAsync async with value", async () => {
    const schema1 = z.string().refine(async (val) => {
        return val.length > 5;
    });
    await (0, vitest_1.expect)(schema1.parseAsync("asdf")).rejects.toBeDefined();
    const v = await schema1.parseAsync("asdf123");
    return await (0, vitest_1.expect)(v).toEqual("asdf123");
});

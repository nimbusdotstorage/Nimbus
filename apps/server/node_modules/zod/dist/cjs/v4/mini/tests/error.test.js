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
const z = __importStar(require("zod/v4-mini"));
(0, vitest_1.test)("no locale by default", () => {
    const result = z.safeParse(z.string(), 12);
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual("Invalid input");
});
(0, vitest_1.test)("error inheritance", () => {
    const e1 = z.string().safeParse(123).error;
    (0, vitest_1.expect)(e1).toBeInstanceOf(z.core.$ZodError);
    // expect(e1).not.toBeInstanceOf(Error);
    try {
        z.string().parse(123);
    }
    catch (e2) {
        (0, vitest_1.expect)(e2).toBeInstanceOf(z.core.$ZodRealError);
        (0, vitest_1.expect)(e2).toBeInstanceOf(Error);
    }
});

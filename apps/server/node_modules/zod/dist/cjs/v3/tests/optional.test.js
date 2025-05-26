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
function checkErrors(a, bad) {
    let expected;
    try {
        a.parse(bad);
    }
    catch (error) {
        expected = error.formErrors;
    }
    try {
        a.optional().parse(bad);
    }
    catch (error) {
        (0, vitest_1.expect)(error.formErrors).toEqual(expected);
    }
}
(0, vitest_1.test)("Should have error messages appropriate for the underlying type", () => {
    checkErrors(z.string().min(2), 1);
    z.string().min(2).optional().parse(undefined);
    checkErrors(z.number().gte(2), 1);
    z.number().gte(2).optional().parse(undefined);
    checkErrors(z.boolean(), "");
    z.boolean().optional().parse(undefined);
    checkErrors(z.undefined(), null);
    z.undefined().optional().parse(undefined);
    checkErrors(z.null(), {});
    z.null().optional().parse(undefined);
    checkErrors(z.object({}), 1);
    z.object({}).optional().parse(undefined);
    checkErrors(z.tuple([]), 1);
    z.tuple([]).optional().parse(undefined);
    checkErrors(z.unknown(), 1);
    z.unknown().optional().parse(undefined);
});
(0, vitest_1.test)("unwrap", () => {
    const unwrapped = z.string().optional().unwrap();
    (0, vitest_1.expect)(unwrapped).toBeInstanceOf(z.ZodString);
});

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
const literalTuna = z.literal("tuna");
const literalFortyTwo = z.literal(42);
const literalTrue = z.literal(true);
const terrificSymbol = Symbol("terrific");
const literalTerrificSymbol = z.literal(terrificSymbol);
(0, vitest_1.test)("passing validations", () => {
    literalTuna.parse("tuna");
    literalFortyTwo.parse(42);
    literalTrue.parse(true);
    literalTerrificSymbol.parse(terrificSymbol);
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => literalTuna.parse("shark")).toThrow();
    (0, vitest_1.expect)(() => literalFortyTwo.parse(43)).toThrow();
    (0, vitest_1.expect)(() => literalTrue.parse(false)).toThrow();
    (0, vitest_1.expect)(() => literalTerrificSymbol.parse(Symbol("terrific"))).toThrow();
});
(0, vitest_1.test)("invalid_literal should have `received` field with data", () => {
    const data = "shark";
    const result = literalTuna.safeParse(data);
    if (!result.success) {
        const issue = result.error.issues[0];
        if (issue.code === "invalid_literal") {
            (0, vitest_1.expect)(issue.received).toBe(data);
        }
    }
});

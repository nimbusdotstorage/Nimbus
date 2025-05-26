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
const literalTuna = z.literal("tuna");
const literalTunaCustomMessage = z.literal("tuna", {
    message: "That's not a tuna",
});
const literalFortyTwo = z.literal(42);
const literalTrue = z.literal(true);
(0, vitest_1.test)("passing validations", () => {
    literalTuna.parse("tuna");
    literalFortyTwo.parse(42);
    literalTrue.parse(true);
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => literalTuna.parse("shark")).toThrow();
    (0, vitest_1.expect)(() => literalFortyTwo.parse(43)).toThrow();
    (0, vitest_1.expect)(() => literalTrue.parse(false)).toThrow();
});
(0, vitest_1.test)("invalid_literal should have `input` field with data", () => {
    const data = "shark";
    const result = literalTuna.safeParse(data);
    const issue = result.error.issues[0];
    (0, vitest_1.expect)(issue.code).toBe("invalid_value");
    (0, vitest_1.expect)(issue).toMatchInlineSnapshot(`
    {
      "code": "invalid_value",
      "message": "Invalid input: expected "tuna"",
      "path": [],
      "values": [
        "tuna",
      ],
    }
  `);
});
(0, vitest_1.test)("invalid_literal should return default message", () => {
    const data = "shark";
    const result = literalTuna.safeParse(data);
    const issue = result.error.issues[0];
    (0, vitest_1.expect)(issue.message).toEqual(`Invalid input: expected \"tuna\"`);
});
(0, vitest_1.test)("invalid_literal should return custom message", () => {
    const data = "shark";
    const result = literalTunaCustomMessage.safeParse(data);
    const issue = result.error.issues[0];
    (0, vitest_1.expect)(issue.message).toEqual(`That's not a tuna`);
});
(0, vitest_1.test)("literal default error message", () => {
    const result = z.literal("Tuna").safeParse("Trout");
    (0, vitest_1.expect)(result.success).toEqual(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "Tuna"
        ],
        "path": [],
        "message": "Invalid input: expected \\"Tuna\\""
      }
    ]]
  `);
});
(0, vitest_1.test)("literal bigint default error message", () => {
    const result = z.literal(BigInt(12)).safeParse(BigInt(13));
    (0, vitest_1.expect)(result.success).toBe(false);
    (0, vitest_1.expect)(result.error.issues.length).toEqual(1);
    (0, vitest_1.expect)(result.error.issues[0].message).toEqual(`Invalid input: expected 12n`);
});

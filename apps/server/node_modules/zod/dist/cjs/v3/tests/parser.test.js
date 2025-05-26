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
(0, vitest_1.test)("parse strict object with unknown keys", () => {
    (0, vitest_1.expect)(() => z
        .object({ name: z.string() })
        .strict()
        .parse({ name: "bill", unknownKey: 12 })).toThrow();
});
(0, vitest_1.test)("parse nonstrict object with unknown keys", () => {
    z.object({ name: z.string() }).nonstrict().parse({ name: "bill", unknownKey: 12 });
});
(0, vitest_1.test)("invalid left side of intersection", () => {
    (0, vitest_1.expect)(() => z.intersection(z.string(), z.number()).parse(12)).toThrow();
});
(0, vitest_1.test)("invalid right side of intersection", () => {
    (0, vitest_1.expect)(() => z.intersection(z.string(), z.number()).parse("12")).toThrow();
});
(0, vitest_1.test)("parsing non-array in tuple schema", () => {
    (0, vitest_1.expect)(() => z.tuple([]).parse("12")).toThrow();
});
(0, vitest_1.test)("incorrect num elements in tuple", () => {
    (0, vitest_1.expect)(() => z.tuple([]).parse(["asdf"])).toThrow();
});
(0, vitest_1.test)("invalid enum value", () => {
    (0, vitest_1.expect)(() => z.enum(["Blue"]).parse("Red")).toThrow();
});
(0, vitest_1.test)("parsing unknown", () => {
    z.string().parse("Red");
});

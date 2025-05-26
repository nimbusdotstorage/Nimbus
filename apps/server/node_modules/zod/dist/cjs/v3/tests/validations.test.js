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
(0, vitest_1.test)("array min", async () => {
    try {
        await z.array(z.string()).min(4).parseAsync([]);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Array must contain at least 4 element(s)");
    }
});
(0, vitest_1.test)("array max", async () => {
    try {
        await z.array(z.string()).max(2).parseAsync(["asdf", "asdf", "asdf"]);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Array must contain at most 2 element(s)");
    }
});
(0, vitest_1.test)("array length", async () => {
    try {
        await z.array(z.string()).length(2).parseAsync(["asdf", "asdf", "asdf"]);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Array must contain exactly 2 element(s)");
    }
    try {
        await z.array(z.string()).length(2).parseAsync(["asdf"]);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Array must contain exactly 2 element(s)");
    }
});
(0, vitest_1.test)("string length", async () => {
    try {
        await z.string().length(4).parseAsync("asd");
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("String must contain exactly 4 character(s)");
    }
    try {
        await z.string().length(4).parseAsync("asdaa");
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("String must contain exactly 4 character(s)");
    }
});
(0, vitest_1.test)("string min", async () => {
    try {
        await z.string().min(4).parseAsync("asd");
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("String must contain at least 4 character(s)");
    }
});
(0, vitest_1.test)("string max", async () => {
    try {
        await z.string().max(4).parseAsync("aasdfsdfsd");
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("String must contain at most 4 character(s)");
    }
});
(0, vitest_1.test)("number min", async () => {
    try {
        await z.number().gte(3).parseAsync(2);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be greater than or equal to 3");
    }
});
(0, vitest_1.test)("number max", async () => {
    try {
        await z.number().lte(3).parseAsync(4);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be less than or equal to 3");
    }
});
(0, vitest_1.test)("number nonnegative", async () => {
    try {
        await z.number().nonnegative().parseAsync(-1);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be greater than or equal to 0");
    }
});
(0, vitest_1.test)("number nonpositive", async () => {
    try {
        await z.number().nonpositive().parseAsync(1);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be less than or equal to 0");
    }
});
(0, vitest_1.test)("number negative", async () => {
    try {
        await z.number().negative().parseAsync(1);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be less than 0");
    }
});
(0, vitest_1.test)("number positive", async () => {
    try {
        await z.number().positive().parseAsync(-1);
    }
    catch (err) {
        (0, vitest_1.expect)(err.issues[0].message).toEqual("Number must be greater than 0");
    }
});
(0, vitest_1.test)("instantiation", () => {
    z.string().min(5);
    z.string().max(5);
    z.string().length(5);
    z.string().email();
    z.string().url();
    z.string().uuid();
    z.string().min(5, { message: "Must be 5 or more characters long" });
    z.string().max(5, { message: "Must be 5 or fewer characters long" });
    z.string().length(5, { message: "Must be exactly 5 characters long" });
    z.string().email({ message: "Invalid email address." });
    z.string().url({ message: "Invalid url" });
    z.string().uuid({ message: "Invalid UUID" });
});
(0, vitest_1.test)("int", async () => {
    const int = z.number().int();
    int.parse(4);
    (0, vitest_1.expect)(() => int.parse(3.5)).toThrow();
});

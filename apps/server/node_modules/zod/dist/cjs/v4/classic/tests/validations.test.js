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
(0, vitest_1.test)("string length", async () => {
    try {
        await z.string().length(4).parseAsync("asd");
    }
    catch (err) {
        // ("String must contain exactly 4 character(s)");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "message": "Too small: expected string to have >4 characters",
          "minimum": 4,
          "origin": "string",
          "path": [],
        },
      ]
    `);
    }
    try {
        await z.string().length(4).parseAsync("asdaa");
    }
    catch (err) {
        // ("String must contain exactly 4 character(s)");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "maximum": 4,
          "message": "Too big: expected string to have <4 characters",
          "origin": "string",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("string min/max", async () => {
    try {
        await z.string().min(4).parseAsync("asd");
    }
    catch (err) {
        // ("String must contain at least 4 character(s)");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "message": "Too small: expected string to have >4 characters",
          "minimum": 4,
          "origin": "string",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("string max", async () => {
    try {
        await z.string().max(4).parseAsync("aasdfsdfsd");
    }
    catch (err) {
        // ("String must contain at most 4 character(s)");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "maximum": 4,
          "message": "Too big: expected string to have <4 characters",
          "origin": "string",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number min", async () => {
    try {
        await z.number().min(3).parseAsync(2);
    }
    catch (err) {
        // ("Number must be greater than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "inclusive": true,
          "message": "Too small: expected number to be >=3",
          "minimum": 3,
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number gte", async () => {
    try {
        await z.number().gte(3).parseAsync(2);
    }
    catch (err) {
        // ("Number must be greater than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "inclusive": true,
          "message": "Too small: expected number to be >=3",
          "minimum": 3,
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number gt", async () => {
    try {
        await z.number().gt(3).parseAsync(3);
    }
    catch (err) {
        // ("Number must be greater than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "inclusive": false,
          "message": "Too small: expected number to be >3",
          "minimum": 3,
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number max", async () => {
    try {
        await z.number().max(3).parseAsync(4);
    }
    catch (err) {
        // ("Number must be less than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "inclusive": true,
          "maximum": 3,
          "message": "Too big: expected number to be <=3",
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number lte", async () => {
    try {
        await z.number().lte(3).parseAsync(4);
    }
    catch (err) {
        // ("Number must be less than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "inclusive": true,
          "maximum": 3,
          "message": "Too big: expected number to be <=3",
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number lt", async () => {
    try {
        await z.number().lt(3).parseAsync(3);
    }
    catch (err) {
        // ("Number must be less than or equal to 3");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "inclusive": false,
          "maximum": 3,
          "message": "Too big: expected number to be <3",
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number nonnegative", async () => {
    try {
        await z.number().nonnegative().parseAsync(-1);
    }
    catch (err) {
        // ("Number must be greater than or equal to 0");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "inclusive": true,
          "message": "Too small: expected number to be >=0",
          "minimum": 0,
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number nonpositive", async () => {
    try {
        await z.number().nonpositive().parseAsync(1);
    }
    catch (err) {
        // ("Number must be less than or equal to 0");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "inclusive": true,
          "maximum": 0,
          "message": "Too big: expected number to be <=0",
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number negative", async () => {
    try {
        await z.number().negative().parseAsync(1);
    }
    catch (err) {
        // ("Number must be less than 0");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_big",
          "inclusive": false,
          "maximum": 0,
          "message": "Too big: expected number to be <0",
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});
(0, vitest_1.test)("number positive", async () => {
    try {
        await z.number().positive().parseAsync(-1);
    }
    catch (err) {
        // ("Number must be greater than 0");
        (0, vitest_1.expect)(err.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "too_small",
          "inclusive": false,
          "message": "Too small: expected number to be >0",
          "minimum": 0,
          "origin": "number",
          "path": [],
        },
      ]
    `);
    }
});

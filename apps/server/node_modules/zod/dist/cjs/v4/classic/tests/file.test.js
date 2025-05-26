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
// @ts-ignore
const file_1 = require("@web-std/file");
const vitest_1 = require("vitest");
const z = __importStar(require("zod/v4"));
const minCheck = z.file().min(5);
const maxCheck = z.file().max(8);
const mimeCheck = z.file().mime(["text/plain", "application/json"]);
const originalFile = global.File;
(0, vitest_1.beforeEach)(async () => {
    if (!globalThis.File)
        globalThis.File = file_1.File;
});
(0, vitest_1.afterEach)(() => {
    if (globalThis.File !== originalFile) {
        globalThis.File = originalFile;
    }
});
(0, vitest_1.test)("passing validations", () => {
    minCheck.parse(new File(["12345"], "test.txt"));
    maxCheck.parse(new File(["12345678"], "test.txt"));
    mimeCheck.parse(new File([""], "test.csv", { type: "text/plain" }));
    (0, vitest_1.expect)(() => mimeCheck.parse(new File([""], "test.txt"))).toThrow();
    (0, vitest_1.expect)(() => mimeCheck.parse(new File([""], "test.txt", { type: "text/csv" }))).toThrow();
});
(0, vitest_1.test)("failing validations", () => {
    (0, vitest_1.expect)(() => minCheck.parse(new File(["1234"], "test.txt"))).toThrow();
    (0, vitest_1.expect)(() => maxCheck.parse(new File(["123456789"], "test.txt"))).toThrow();
    (0, vitest_1.expect)(() => mimeCheck.parse(new File([""], "test.csv"))).toThrow();
    (0, vitest_1.expect)(() => mimeCheck.parse(new File([""], "test.csv", { type: "text/csv" }))).toThrow();
});
// test("min max getters", () => {
//   expect(minCheck.minSize).toEqual(5);
//   expect(minCheck.min(10).minSize).toEqual(10);
//   expect(maxCheck.maxSize).toEqual(8);
//   expect(maxCheck.max(6).maxSize).toEqual(6);
// });
// test("accept getter", () => {
//   expect(mimeCheck.acceptedTypes).toEqual(["text/plain", "application/json"]);
//   expect(mimeCheck.type(["text/plain", "application/xml"]).acceptedTypes).toEqual(["text/plain"]);
// });
// test("invalid mime types", () => {
//   expect(() => z.file().type([".txt"])).toThrow();
// });

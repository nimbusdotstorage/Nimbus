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
(0, vitest_1.test)("first party switch", () => {
    const myType = z.string();
    const def = myType._zod.def;
    switch (def.type) {
        case "string":
            break;
        case "number":
            break;
        case "bigint":
            break;
        case "boolean":
            break;
        case "date":
            break;
        case "symbol":
            break;
        case "undefined":
            break;
        case "null":
            break;
        case "any":
            break;
        case "unknown":
            break;
        case "never":
            break;
        case "void":
            break;
        case "array":
            break;
        case "object":
            break;
        case "union":
            break;
        case "intersection":
            break;
        case "tuple":
            break;
        case "record":
            break;
        case "map":
            break;
        case "set":
            break;
        case "literal":
            break;
        case "enum":
            break;
        case "promise":
            break;
        case "optional":
            break;
        case "nonoptional":
            break;
        case "nullable":
            break;
        case "default":
            break;
        case "prefault":
            break;
        case "template_literal":
            break;
        case "custom":
            break;
        case "transform":
            break;
        case "readonly":
            break;
        case "nan":
            break;
        case "pipe":
            break;
        case "success":
            break;
        case "catch":
            break;
        case "file":
            break;
        case "lazy":
            break;
        default:
            (0, vitest_1.expectTypeOf)(def).toEqualTypeOf();
    }
});
(0, vitest_1.test)("$ZodSchemaTypes", () => {
    const type = "string";
    switch (type) {
        case "string":
            break;
        case "number":
            break;
        case "int":
            break;
        case "bigint":
            break;
        case "boolean":
            break;
        case "date":
            break;
        case "symbol":
            break;
        case "undefined":
            break;
        case "null":
            break;
        case "any":
            break;
        case "unknown":
            break;
        case "never":
            break;
        case "void":
            break;
        case "array":
            break;
        case "object":
            break;
        case "interface":
            break;
        case "union":
            break;
        case "intersection":
            break;
        case "tuple":
            break;
        case "record":
            break;
        case "map":
            break;
        case "set":
            break;
        case "literal":
            break;
        case "enum":
            break;
        case "promise":
            break;
        case "optional":
            break;
        case "nonoptional":
            break;
        case "nullable":
            break;
        case "default":
            break;
        case "prefault":
            break;
        case "template_literal":
            break;
        case "custom":
            break;
        case "transform":
            break;
        case "readonly":
            break;
        case "nan":
            break;
        case "pipe":
            break;
        case "success":
            break;
        case "catch":
            break;
        case "file":
            break;
        case "lazy":
            break;
        default:
            (0, vitest_1.expectTypeOf)(type).toEqualTypeOf();
    }
});

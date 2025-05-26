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
const core_1 = require("zod/v4/core");
(0, vitest_1.describe)("toJSONSchema", () => {
    (0, vitest_1.test)("primitive types", () => {
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.string())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.boolean())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "boolean",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.null())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "null",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.undefined())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "null",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.any())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.unknown())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.never())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "not": {},
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.email())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "email",
        "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.datetime())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "date-time",
        "pattern": "^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?(Z)$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.date())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "date",
        "pattern": "^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.time())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "time",
        "pattern": "^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.duration())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "duration",
        "pattern": "^P(?:(\\d+W)|(?!.*W)(?=\\d|T\\d)(\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+([.,]\\d+)?S)?)?)$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.ipv4())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "ipv4",
        "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.ipv6())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "ipv6",
        "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.uuid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.guid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.url())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uri",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.base64())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "contentEncoding": "base64",
        "format": "base64",
        "pattern": "^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.cuid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "cuid",
        "pattern": "^[cC][^\\s-]{8,}$",
        "type": "string",
      }
    `);
        // expect(toJSONSchema(z.regex(/asdf/))).toMatchInlineSnapshot();
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.emoji())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "emoji",
        "pattern": "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.nanoid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "nanoid",
        "pattern": "^[a-zA-Z0-9_-]{21}$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.cuid2())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "cuid2",
        "pattern": "^[0-9a-z]+$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.ulid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "ulid",
        "pattern": "^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$",
        "type": "string",
      }
    `);
        // expect(toJSONSchema(z.cidr())).toMatchInlineSnapshot();
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.int())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 9007199254740991,
        "minimum": -9007199254740991,
        "type": "integer",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.int32())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 2147483647,
        "minimum": -2147483648,
        "type": "integer",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.float32())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 3.4028234663852886e+38,
        "minimum": -3.4028234663852886e+38,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.float64())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 1.7976931348623157e+308,
        "minimum": -1.7976931348623157e+308,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.jwt())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "jwt",
        "type": "string",
      }
    `);
    });
    (0, vitest_1.test)("unsupported schema types", () => {
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.bigint())).toThrow("BigInt cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.int64())).toThrow("BigInt cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.symbol())).toThrow("Symbols cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.void())).toThrow("Void cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.date())).toThrow("Date cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.map(z.string(), z.number()))).toThrow("Map cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.set(z.string()))).toThrow("Set cannot be represented in JSON Schema");
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(z.custom(() => true))).toThrow("Custom types cannot be represented in JSON Schema");
        // File type
        const fileSchema = z.file();
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(fileSchema)).toThrow("File cannot be represented in JSON Schema");
        // Transform
        const transformSchema = z.string().transform((val) => Number.parseInt(val));
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(transformSchema)).toThrow("Transforms cannot be represented in JSON Schema");
        // Static catch values
        const staticCatchSchema = z.string().catch(() => "sup");
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(staticCatchSchema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "default": "sup",
        "type": "string",
      }
    `);
        // Dynamic catch values
        const dynamicCatchSchema = z.string().catch((ctx) => `${ctx.issues.length}`);
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(dynamicCatchSchema)).toThrow("Dynamic catch values are not supported in JSON Schema");
    });
    (0, vitest_1.test)("string formats", () => {
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.string().email())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "email",
        "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.string().uuid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.datetime())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "date-time",
        "pattern": "^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))T([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?(Z)$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.date())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "date",
        "pattern": "^((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.time())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "time",
        "pattern": "^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\\.\\d+)?$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.iso.duration())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "duration",
        "pattern": "^P(?:(\\d+W)|(?!.*W)(?=\\d|T\\d)(\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+([.,]\\d+)?S)?)?)$",
        "type": "string",
      }
    `);
        // expect(toJSONSchema(z.string().ip())).toMatchInlineSnapshot(`
        //   {
        //     "pattern": /\\(\\^\\(\\?:\\(\\?:25\\[0-5\\]\\|2\\[0-4\\]\\[0-9\\]\\|1\\[0-9\\]\\[0-9\\]\\|\\[1-9\\]\\[0-9\\]\\|\\[0-9\\]\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|2\\[0-4\\]\\[0-9\\]\\|1\\[0-9\\]\\[0-9\\]\\|\\[1-9\\]\\[0-9\\]\\|\\[0-9\\]\\)\\$\\)\\|\\(\\^\\(\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{7\\}\\|::\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,6\\}\\|\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{1\\}:\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,5\\}\\|\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{2\\}:\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,4\\}\\|\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{3\\}:\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,3\\}\\|\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{4\\}:\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,2\\}\\|\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{5\\}:\\(\\[a-fA-F0-9\\]\\{1,4\\}:\\)\\{0,1\\}\\)\\(\\[a-fA-F0-9\\]\\{1,4\\}\\|\\(\\(\\(25\\[0-5\\]\\)\\|\\(2\\[0-4\\]\\[0-9\\]\\)\\|\\(1\\[0-9\\]\\{2\\}\\)\\|\\(\\[0-9\\]\\{1,2\\}\\)\\)\\\\\\.\\)\\{3\\}\\(\\(25\\[0-5\\]\\)\\|\\(2\\[0-4\\]\\[0-9\\]\\)\\|\\(1\\[0-9\\]\\{2\\}\\)\\|\\(\\[0-9\\]\\{1,2\\}\\)\\)\\)\\$\\)/,
        //     "type": "string",
        //   }
        // `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.ipv4())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "ipv4",
        "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.ipv6())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "ipv6",
        "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.base64())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "contentEncoding": "base64",
        "format": "base64",
        "pattern": "^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.url())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uri",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.guid())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$",
        "type": "string",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.string().regex(/asdf/))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "format": "regex",
        "pattern": "asdf",
        "type": "string",
      }
    `);
    });
    (0, vitest_1.test)("number constraints", () => {
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().min(5).max(10))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 10,
        "minimum": 5,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().gt(5).gt(10))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "exclusiveMinimum": 10,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().gt(5).gte(10))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "minimum": 10,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().lt(5).lt(3))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "exclusiveMaximum": 3,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().lt(5).lt(3).lte(2))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 2,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().lt(5).lte(3))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 3,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().gt(5).lt(10))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "exclusiveMaximum": 10,
        "exclusiveMinimum": 5,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().gte(5).lte(10))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 10,
        "minimum": 5,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().positive())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "exclusiveMinimum": 0,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().negative())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "exclusiveMaximum": 0,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().nonpositive())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "maximum": 0,
        "type": "number",
      }
    `);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.number().nonnegative())).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "minimum": 0,
        "type": "number",
      }
    `);
    });
    (0, vitest_1.test)("arrays", () => {
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(z.array(z.string()))).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "items": {
          "type": "string",
        },
        "type": "array",
      }
    `);
    });
    (0, vitest_1.test)("unions", () => {
        const schema = z.union([z.string(), z.number()]);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "anyOf": [
          {
            "type": "string",
          },
          {
            "type": "number",
          },
        ],
      }
    `);
    });
    (0, vitest_1.test)("intersections", () => {
        const schema = z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }));
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "allOf": [
          {
            "properties": {
              "name": {
                "type": "string",
              },
            },
            "required": [
              "name",
            ],
            "type": "object",
          },
          {
            "properties": {
              "age": {
                "type": "number",
              },
            },
            "required": [
              "age",
            ],
            "type": "object",
          },
        ],
      }
    `);
    });
    (0, vitest_1.test)("record", () => {
        const schema = z.record(z.string(), z.boolean());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": {
          "type": "boolean",
        },
        "propertyNames": {
          "type": "string",
        },
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("tuple", () => {
        const schema = z.tuple([z.string(), z.number()]).rest(z.boolean());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "items": {
          "type": "boolean",
        },
        "prefixItems": [
          {
            "type": "string",
          },
          {
            "type": "number",
          },
        ],
        "type": "array",
      }
    `);
    });
    (0, vitest_1.test)("promise", () => {
        const schema = z.promise(z.string());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "string",
      }
    `);
    });
    (0, vitest_1.test)("lazy", () => {
        const schema = z.lazy(() => z.string());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "string",
      }
    `);
    });
    // enum
    (0, vitest_1.test)("enum", () => {
        const schema = z.enum(["a", "b", "c"]);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "enum": [
          "a",
          "b",
          "c",
        ],
      }
    `);
    });
    // literal
    (0, vitest_1.test)("literal", () => {
        const a = z.literal("hello");
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(a)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "const": "hello",
      }
    `);
        const b = z.literal(["hello", undefined, null, 5, BigInt(1324)]);
        (0, vitest_1.expect)(() => (0, core_1.toJSONSchema)(b)).toThrow();
        const c = z.literal(["hello", null, 5]);
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(c)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "enum": [
          "hello",
          null,
          5,
        ],
      }
    `);
    });
    // pipe
    (0, vitest_1.test)("pipe", () => {
        const schema = z
            .string()
            .transform((val) => Number.parseInt(val))
            .pipe(z.number());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "type": "number",
      }
    `);
    });
    (0, vitest_1.test)("simple objects", () => {
        const schema = z.object({
            name: z.string(),
            age: z.number(),
        });
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "properties": {
          "age": {
            "type": "number",
          },
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
          "age",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("catchall objects", () => {
        const a = z.strictObject({
            name: z.string(),
            age: z.number(),
        });
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(a)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": false,
        "properties": {
          "age": {
            "type": "number",
          },
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
          "age",
        ],
        "type": "object",
      }
    `);
        const b = z
            .object({
            name: z.string(),
        })
            .catchall(z.string());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(b)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": {
          "type": "string",
        },
        "properties": {
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
        ],
        "type": "object",
      }
    `);
        const c = z.looseObject({
            name: z.string(),
        });
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(c)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": {},
        "properties": {
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("optional fields - object", () => {
        const schema = z.object({
            required: z.string(),
            optional: z.string().optional(),
            nonoptional: z.string().optional().nonoptional(),
        });
        const result = (0, core_1.toJSONSchema)(schema);
        (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "properties": {
          "nonoptional": {
            "type": "string",
          },
          "optional": {
            "type": "string",
          },
          "required": {
            "type": "string",
          },
        },
        "required": [
          "required",
          "nonoptional",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("recursive object", () => {
        const categorySchema = z.object({
            name: z.string(),
            subcategories: z.array(z.lazy(() => categorySchema)),
        });
        const result = (0, core_1.toJSONSchema)(categorySchema);
        (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "properties": {
          "name": {
            "type": "string",
          },
          "subcategories": {
            "items": {
              "$ref": "#",
            },
            "type": "array",
          },
        },
        "required": [
          "name",
          "subcategories",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("simple interface", () => {
        const userSchema = z.object({
            name: z.string(),
            age: z.number().optional(),
        });
        const result = (0, core_1.toJSONSchema)(userSchema);
        (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "properties": {
          "age": {
            "type": "number",
          },
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("catchall interface", () => {
        const a = z.strictObject({
            name: z.string(),
            age: z.number(),
        });
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(a)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": false,
        "properties": {
          "age": {
            "type": "number",
          },
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
          "age",
        ],
        "type": "object",
      }
    `);
        const b = z
            .object({
            name: z.string(),
        })
            .catchall(z.string());
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(b)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": {
          "type": "string",
        },
        "properties": {
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
        ],
        "type": "object",
      }
    `);
        const c = z.looseObject({
            name: z.string(),
        });
        (0, vitest_1.expect)((0, core_1.toJSONSchema)(c)).toMatchInlineSnapshot(`
      {
        "$schema": "https://json-schema.org/draft-2020-12/schema",
        "additionalProperties": {},
        "properties": {
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
        ],
        "type": "object",
      }
    `);
    });
    (0, vitest_1.test)("recursive interface schemas", () => {
        const TreeNodeSchema = z.object({
            id: z.string(),
            get children() {
                return TreeNodeSchema;
            },
        });
        const result = (0, core_1.toJSONSchema)(TreeNodeSchema);
        // Should have definitions for recursive schema
        (0, vitest_1.expect)(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
      "{
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "children": {
            "$ref": "#"
          }
        },
        "required": [
          "id",
          "children"
        ],
        "$schema": "https://json-schema.org/draft-2020-12/schema"
      }"
    `);
    });
    (0, vitest_1.test)("mutually recursive interface schemas", () => {
        const FolderSchema = z.object({
            name: z.string(),
            get files() {
                return z.array(FileSchema);
            },
        });
        const FileSchema = z.object({
            name: z.string(),
            get parent() {
                return FolderSchema;
            },
        });
        const result = (0, core_1.toJSONSchema)(FolderSchema);
        // Should have definitions for both schemas
        (0, vitest_1.expect)(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
      "{
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "files": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "parent": {
                  "$ref": "#"
                }
              },
              "required": [
                "name",
                "parent"
              ]
            }
          }
        },
        "required": [
          "name",
          "files"
        ],
        "$schema": "https://json-schema.org/draft-2020-12/schema"
      }"
    `);
    });
});
(0, vitest_1.test)("override", () => {
    const schema = z.toJSONSchema(z.string(), {
        override: (ctx) => {
            ctx.zodSchema;
            ctx.jsonSchema;
            ctx.jsonSchema.whatever = "sup";
        },
    });
    (0, vitest_1.expect)(schema).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "string",
      "whatever": "sup",
    }
  `);
});
(0, vitest_1.test)("override: do not run on references", () => {
    let overrideCount = 0;
    const schema = z
        .union([z.string().date(), z.string().datetime(), z.string().datetime({ local: true })])
        .meta({ a: true })
        .transform((str) => new Date(str))
        .meta({ b: true })
        .pipe(z.date())
        .meta({ c: true })
        .brand("dateIn");
    z.toJSONSchema(schema, {
        unrepresentable: "any",
        io: "input",
        override(_) {
            overrideCount++;
        },
    });
    (0, vitest_1.expect)(overrideCount).toBe(6);
});
(0, vitest_1.test)("override with refs", () => {
    const a = z.string().optional();
    const result = z.toJSONSchema(a, {
        override(ctx) {
            if (ctx.zodSchema._zod.def.type === "string") {
                ctx.jsonSchema.type = "STRING";
            }
        },
    });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "STRING",
    }
  `);
});
(0, vitest_1.test)("override execution order", () => {
    const schema = z.union([z.string(), z.number()]);
    let unionSchema;
    z.toJSONSchema(schema, {
        override(ctx) {
            if (ctx.zodSchema._zod.def.type === "union") {
                unionSchema = ctx.jsonSchema;
            }
        },
    });
    (0, vitest_1.expect)(unionSchema).toMatchInlineSnapshot(`
    {
      "anyOf": [
        {
          "type": "string",
        },
        {
          "type": "number",
        },
      ],
    }
  `);
});
(0, vitest_1.test)("pipe", () => {
    const mySchema = z
        .string()
        .transform((val) => val.length)
        .pipe(z.number());
    // ZodPipe
    const a = z.toJSONSchema(mySchema);
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "number",
    }
  `);
    // => { type: "number" }
    const b = z.toJSONSchema(mySchema, { io: "input" });
    (0, vitest_1.expect)(b).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "string",
    }
  `);
    // => { type: "string" }
});
(0, vitest_1.test)("passthrough schemas", () => {
    const Internal = z.object({
        num: z.number(),
        str: z.string(),
    });
    //.meta({ id: "Internal" });
    const External = z.object({
        a: Internal,
        b: Internal.optional(),
        c: z.lazy(() => Internal),
        d: z.promise(Internal),
        e: z.pipe(Internal, Internal),
    });
    const result = z.toJSONSchema(External, {
        reused: "ref",
    });
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "$defs": {
        "__schema0": {
          "properties": {
            "num": {
              "type": "number",
            },
            "str": {
              "type": "string",
            },
          },
          "required": [
            "num",
            "str",
          ],
          "type": "object",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "a": {
          "$ref": "#/$defs/__schema0",
        },
        "b": {
          "$ref": "#/$defs/__schema0",
        },
        "c": {
          "$ref": "#/$defs/__schema0",
        },
        "d": {
          "$ref": "#/$defs/__schema0",
        },
        "e": {
          "$ref": "#/$defs/__schema0",
        },
      },
      "required": [
        "a",
        "c",
        "d",
        "e",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("extract schemas with id", () => {
    const name = z.string().meta({ id: "name" });
    const result = z.toJSONSchema(z.object({
        first_name: name,
        last_name: name.nullable(),
        middle_name: name.optional(),
        age: z.number().meta({ id: "age" }),
    }));
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "$defs": {
        "age": {
          "id": "age",
          "type": "number",
        },
        "name": {
          "id": "name",
          "type": "string",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "age": {
          "$ref": "#/$defs/age",
        },
        "first_name": {
          "$ref": "#/$defs/name",
        },
        "last_name": {
          "anyOf": [
            {
              "$ref": "#/$defs/name",
            },
            {
              "type": "null",
            },
          ],
        },
        "middle_name": {
          "$ref": "#/$defs/name",
        },
      },
      "required": [
        "first_name",
        "last_name",
        "age",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("unrepresentable literal values are ignored", () => {
    const a = z.toJSONSchema(z.literal(["hello", null, 5, BigInt(1324), undefined]), { unrepresentable: "any" });
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "enum": [
        "hello",
        null,
        5,
        1324,
      ],
    }
  `);
    const b = z.toJSONSchema(z.literal([undefined, null, 5, BigInt(1324)]), { unrepresentable: "any" });
    (0, vitest_1.expect)(b).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "enum": [
        null,
        5,
        1324,
      ],
    }
  `);
    const c = z.toJSONSchema(z.literal([undefined]), { unrepresentable: "any" });
    (0, vitest_1.expect)(c).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
    }
  `);
});
(0, vitest_1.test)("describe with id", () => {
    const jobId = z.string().meta({ id: "jobId" });
    const a = z.toJSONSchema(z.object({
        current: jobId.describe("Current job"),
        previous: jobId.describe("Previous job"),
    }));
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$defs": {
        "jobId": {
          "id": "jobId",
          "type": "string",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "current": {
          "$ref": "#/$defs/jobId",
          "description": "Current job",
        },
        "previous": {
          "$ref": "#/$defs/jobId",
          "description": "Previous job",
        },
      },
      "required": [
        "current",
        "previous",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("overwrite id", () => {
    const jobId = z.string().meta({ id: "aaa" });
    const a = z.toJSONSchema(z.object({
        current: jobId,
        previous: jobId.meta({ id: "bbb" }),
    }));
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$defs": {
        "aaa": {
          "id": "aaa",
          "type": "string",
        },
        "bbb": {
          "$ref": "#/$defs/aaa",
          "id": "bbb",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "current": {
          "$ref": "#/$defs/aaa",
        },
        "previous": {
          "$ref": "#/$defs/bbb",
        },
      },
      "required": [
        "current",
        "previous",
      ],
      "type": "object",
    }
  `);
    const b = z.toJSONSchema(z.object({
        current: jobId,
        previous: jobId.meta({ id: "ccc" }),
    }), {
        reused: "ref",
    });
    (0, vitest_1.expect)(b).toMatchInlineSnapshot(`
    {
      "$defs": {
        "aaa": {
          "id": "aaa",
          "type": "string",
        },
        "ccc": {
          "$ref": "#/$defs/aaa",
          "id": "ccc",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "current": {
          "$ref": "#/$defs/aaa",
        },
        "previous": {
          "$ref": "#/$defs/ccc",
        },
      },
      "required": [
        "current",
        "previous",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("overwrite descriptions", () => {
    const field = z.string().describe("a").describe("b").describe("c");
    const a = z.toJSONSchema(z.object({
        d: field.describe("d"),
        e: field.describe("e"),
    }));
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "d": {
          "description": "d",
          "type": "string",
        },
        "e": {
          "description": "e",
          "type": "string",
        },
      },
      "required": [
        "d",
        "e",
      ],
      "type": "object",
    }
  `);
    const b = z.toJSONSchema(z.object({
        d: field.describe("d"),
        e: field.describe("e"),
    }), {
        reused: "ref",
    });
    (0, vitest_1.expect)(b).toMatchInlineSnapshot(`
    {
      "$defs": {
        "__schema0": {
          "description": "c",
          "type": "string",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "d": {
          "$ref": "#/$defs/__schema0",
          "description": "d",
        },
        "e": {
          "$ref": "#/$defs/__schema0",
          "description": "e",
        },
      },
      "required": [
        "d",
        "e",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("top-level readonly", () => {
    const A = z
        .object({
        name: z.string(),
        get b() {
            return B;
        },
    })
        .readonly()
        .meta({ id: "A" });
    const B = z
        .object({
        name: z.string(),
        get a() {
            return A;
        },
    })
        .readonly()
        .meta({ id: "B" });
    const result = z.toJSONSchema(A);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "$defs": {
        "B": {
          "id": "B",
          "properties": {
            "a": {
              "$ref": "#",
            },
            "name": {
              "type": "string",
            },
          },
          "readOnly": true,
          "required": [
            "name",
            "a",
          ],
          "type": "object",
        },
      },
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "id": "A",
      "properties": {
        "b": {
          "$ref": "#/$defs/B",
        },
        "name": {
          "type": "string",
        },
      },
      "readOnly": true,
      "required": [
        "name",
        "b",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("basic registry", () => {
    const myRegistry = z.registry();
    const User = z.object({
        name: z.string(),
        get posts() {
            return z.array(Post);
        },
    });
    const Post = z.object({
        title: z.string(),
        content: z.string(),
        get author() {
            return User;
        },
    });
    myRegistry.add(User, { id: "User" });
    myRegistry.add(Post, { id: "Post" });
    const result = z.toJSONSchema(myRegistry);
    (0, vitest_1.expect)(result).toMatchInlineSnapshot(`
    {
      "schemas": {
        "Post": {
          "$schema": "https://json-schema.org/draft-2020-12/schema",
          "properties": {
            "author": {
              "$ref": "User",
            },
            "content": {
              "type": "string",
            },
            "title": {
              "type": "string",
            },
          },
          "required": [
            "title",
            "content",
            "author",
          ],
          "type": "object",
        },
        "User": {
          "$schema": "https://json-schema.org/draft-2020-12/schema",
          "properties": {
            "name": {
              "type": "string",
            },
            "posts": {
              "items": {
                "$ref": "Post",
              },
              "type": "array",
            },
          },
          "required": [
            "name",
            "posts",
          ],
          "type": "object",
        },
      },
    }
  `);
});
(0, vitest_1.test)("_ref", () => {
    // const a = z.promise(z.string().describe("a"));
    const a = z.toJSONSchema(z.promise(z.string().describe("a")));
    (0, vitest_1.expect)(a).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "description": "a",
      "type": "string",
    }
  `);
    const b = z.toJSONSchema(z.lazy(() => z.string().describe("a")));
    (0, vitest_1.expect)(b).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "description": "a",
      "type": "string",
    }
  `);
    const c = z.toJSONSchema(z.optional(z.string().describe("a")));
    (0, vitest_1.expect)(c).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "description": "a",
      "type": "string",
    }
  `);
});
(0, vitest_1.test)("defaults/prefaults", () => {
    const a = z
        .string()
        .transform((val) => val.length)
        .pipe(z.number());
    const b = a.prefault("hello");
    const c = a.default(1234);
    // a
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(a)).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "number",
    }
  `);
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(a, { io: "input" })).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "string",
    }
  `);
    // b
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(b)).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "type": "number",
    }
  `);
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(b, { io: "input" })).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "default": "hello",
      "type": "string",
    }
  `);
    // c
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(c)).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "default": 1234,
      "type": "number",
    }
  `);
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(c, { io: "input" })).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "default": 1234,
      "type": "string",
    }
  `);
});
(0, vitest_1.test)("input type", () => {
    const schema = z.object({
        a: z.string(),
        b: z.string().optional(),
        c: z.string().default("hello"),
        d: z.string().nullable(),
        e: z.string().prefault("hello"),
    });
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema, { io: "input" })).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "a": {
          "type": "string",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "default": "hello",
          "type": "string",
        },
        "d": {
          "anyOf": [
            {
              "type": "string",
            },
            {
              "type": "null",
            },
          ],
        },
        "e": {
          "default": "hello",
          "type": "string",
        },
      },
      "required": [
        "a",
        "d",
      ],
      "type": "object",
    }
  `);
    (0, vitest_1.expect)((0, core_1.toJSONSchema)(schema, { io: "output" })).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "properties": {
        "a": {
          "type": "string",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "default": "hello",
          "type": "string",
        },
        "d": {
          "anyOf": [
            {
              "type": "string",
            },
            {
              "type": "null",
            },
          ],
        },
        "e": {
          "type": "string",
        },
      },
      "required": [
        "a",
        "c",
        "d",
        "e",
      ],
      "type": "object",
    }
  `);
});
(0, vitest_1.test)("examples on pipe", () => {
    const schema = z
        .string()
        .meta({ examples: ["test"] })
        .transform(Number)
        // .pipe(z.transform(Number).meta({ examples: [4] }))
        .meta({ examples: [4] });
    const i = z.toJSONSchema(schema, { io: "input", unrepresentable: "any" });
    (0, vitest_1.expect)(i).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "examples": [
        "test",
      ],
      "type": "string",
    }
  `);
    const o = z.toJSONSchema(schema, { io: "output", unrepresentable: "any" });
    (0, vitest_1.expect)(o).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft-2020-12/schema",
      "examples": [
        4,
      ],
    }
  `);
});
// test("number checks", () => {
//   expect(z.toJSONSchema(z.number().int())).toMatchInlineSnapshot(`
//     {
//       "maximum": 9007199254740991,
//       "minimum": -9007199254740991,
//       "type": "integer",
//     }
//   `);
//   expect(z.toJSONSchema(z.int())).toMatchInlineSnapshot(`
//     {
//       "maximum": 9007199254740991,
//       "minimum": -9007199254740991,
//       "type": "integer",
//     }
//   `);
//   expect(z.toJSONSchema(z.int().positive())).toMatchInlineSnapshot(`
//     {
//       "exclusiveMinimum": 0,
//       "maximum": 9007199254740991,
//       "minimum": -9007199254740991,
//       "type": "integer",
//     }
//   `);
//   expect(z.toJSONSchema(z.int().nonnegative())).toMatchInlineSnapshot(`
//     {
//       "maximum": 9007199254740991,
//       "minimum": 0,
//       "type": "integer",
//     }
//   `);
//   expect(z.toJSONSchema(z.int().gt(0))).toMatchInlineSnapshot(`
//     {
//       "exclusiveMinimum": 0,
//       "maximum": 9007199254740991,
//       "minimum": -9007199254740991,
//       "type": "integer",
//     }
//   `);
//   expect(z.toJSONSchema(z.int().gte(0))).toMatchInlineSnapshot(`
//     {
//       "maximum": 9007199254740991,
//       "minimum": 0,
//       "type": "integer",
//     }
//   `);
// });

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
const FAIL = { success: false };
(0, vitest_1.test)("z.string", async () => {
    const a = z.string();
    (0, vitest_1.expect)(z.parse(a, "hello")).toEqual("hello");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, false)).toThrow();
    (0, vitest_1.expectTypeOf)().toEqualTypeOf();
});
// test("z.string with description", () => {
//   const a = z.string({ description: "string description" });
//   a._def;
//   expect(a._def.description).toEqual("string description");
// });
(0, vitest_1.test)("z.string with custom error", () => {
    const a = z.string({ error: () => "BAD" });
    (0, vitest_1.expect)(z.safeParse(a, 123).error.issues[0].message).toEqual("BAD");
});
(0, vitest_1.test)("inference in checks", () => {
    const a = z.string().check(z.refine((val) => val.length));
    z.parse(a, "___");
    (0, vitest_1.expect)(() => z.parse(a, "")).toThrow();
    const b = z.string().check(z.refine((val) => val.length));
    z.parse(b, "___");
    (0, vitest_1.expect)(() => z.parse(b, "")).toThrow();
    const c = z.string().check(z.refine((val) => val.length));
    z.parse(c, "___");
    (0, vitest_1.expect)(() => z.parse(c, "")).toThrow();
    const d = z.string().check(z.refine((val) => val.length));
    z.parse(d, "___");
    (0, vitest_1.expect)(() => z.parse(d, "")).toThrow();
});
(0, vitest_1.test)("z.string async", async () => {
    // async
    const a = z.string().check(z.refine(async (val) => val.length));
    (0, vitest_1.expect)(await z.parseAsync(a, "___")).toEqual("___");
    await (0, vitest_1.expect)(() => z.parseAsync(a, "")).rejects.toThrowError();
});
(0, vitest_1.test)("z.uuid", () => {
    const a = z.uuid();
    // parse uuid
    z.parse(a, "550e8400-e29b-41d4-a716-446655440000");
    z.parse(a, "550e8400-e29b-61d4-a716-446655440000");
    // bad uuid
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
    const b = z.uuidv4();
    z.parse(b, "550e8400-e29b-41d4-a716-446655440000");
    (0, vitest_1.expect)(z.safeParse(b, "550e8400-e29b-61d4-a716-446655440000")).toMatchObject(FAIL);
    const c = z.uuidv6();
    z.parse(c, "550e8400-e29b-61d4-a716-446655440000");
    (0, vitest_1.expect)(z.safeParse(c, "550e8400-e29b-41d4-a716-446655440000")).toMatchObject(FAIL);
    const d = z.uuidv7();
    z.parse(d, "550e8400-e29b-71d4-a716-446655440000");
    (0, vitest_1.expect)(z.safeParse(d, "550e8400-e29b-41d4-a716-446655440000")).toMatchObject(FAIL);
    (0, vitest_1.expect)(z.safeParse(d, "550e8400-e29b-61d4-a716-446655440000")).toMatchObject(FAIL);
});
(0, vitest_1.test)("z.email", () => {
    const a = z.email();
    (0, vitest_1.expect)(z.parse(a, "test@test.com")).toEqual("test@test.com");
    (0, vitest_1.expect)(() => z.parse(a, "test")).toThrow();
    (0, vitest_1.expect)(z.safeParse(a, "bad email", { error: () => "bad email" }).error.issues[0].message).toEqual("bad email");
    const b = z.email("bad email");
    (0, vitest_1.expect)(z.safeParse(b, "bad email").error.issues[0].message).toEqual("bad email");
    const c = z.email({ error: "bad email" });
    (0, vitest_1.expect)(z.safeParse(c, "bad email").error.issues[0].message).toEqual("bad email");
    const d = z.email({ error: () => "bad email" });
    (0, vitest_1.expect)(z.safeParse(d, "bad email").error.issues[0].message).toEqual("bad email");
});
(0, vitest_1.test)("z.url", () => {
    const a = z.url();
    // valid URLs
    (0, vitest_1.expect)(a.parse("http://example.com")).toEqual("http://example.com");
    (0, vitest_1.expect)(a.parse("https://example.com")).toEqual("https://example.com");
    (0, vitest_1.expect)(a.parse("ftp://example.com")).toEqual("ftp://example.com");
    (0, vitest_1.expect)(a.parse("http://sub.example.com")).toEqual("http://sub.example.com");
    (0, vitest_1.expect)(a.parse("https://example.com/path?query=123#fragment")).toEqual("https://example.com/path?query=123#fragment");
    (0, vitest_1.expect)(a.parse("http://localhost")).toEqual("http://localhost");
    (0, vitest_1.expect)(a.parse("https://localhost")).toEqual("https://localhost");
    (0, vitest_1.expect)(a.parse("http://localhost:3000")).toEqual("http://localhost:3000");
    (0, vitest_1.expect)(a.parse("https://localhost:3000")).toEqual("https://localhost:3000");
    // invalid URLs
    (0, vitest_1.expect)(() => a.parse("not-a-url")).toThrow();
    // expect(() => a.parse("http:/example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("://example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("http://")).toThrow();
    (0, vitest_1.expect)(() => a.parse("example.com")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => a.parse(123)).toThrow();
    (0, vitest_1.expect)(() => a.parse(null)).toThrow();
    (0, vitest_1.expect)(() => a.parse(undefined)).toThrow();
});
(0, vitest_1.test)("z.url with optional hostname regex", () => {
    const a = z.url({ hostname: /example\.com$/ });
    (0, vitest_1.expect)(a.parse("http://example.com")).toEqual("http://example.com");
    (0, vitest_1.expect)(a.parse("https://sub.example.com")).toEqual("https://sub.example.com");
    (0, vitest_1.expect)(() => a.parse("http://examples.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("http://example.org")).toThrow();
    (0, vitest_1.expect)(() => a.parse("asdf")).toThrow();
});
(0, vitest_1.test)("z.url with optional protocol regex", () => {
    const a = z.url({ protocol: /^https?$/ });
    (0, vitest_1.expect)(a.parse("http://example.com")).toEqual("http://example.com");
    (0, vitest_1.expect)(a.parse("https://example.com")).toEqual("https://example.com");
    (0, vitest_1.expect)(() => a.parse("ftp://example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("mailto:example@example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("asdf")).toThrow();
});
(0, vitest_1.test)("z.url with both hostname and protocol regexes", () => {
    const a = z.url({ hostname: /example\.com$/, protocol: /^https$/ });
    (0, vitest_1.expect)(a.parse("https://example.com")).toEqual("https://example.com");
    (0, vitest_1.expect)(a.parse("https://sub.example.com")).toEqual("https://sub.example.com");
    (0, vitest_1.expect)(() => a.parse("http://example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("https://example.org")).toThrow();
    (0, vitest_1.expect)(() => a.parse("ftp://example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("asdf")).toThrow();
});
(0, vitest_1.test)("z.url with invalid regex patterns", () => {
    const a = z.url({ hostname: /a+$/, protocol: /^ftp$/ });
    a.parse("ftp://a");
    a.parse("ftp://aaaaaaaa");
    (0, vitest_1.expect)(() => a.parse("http://aaa")).toThrow();
    (0, vitest_1.expect)(() => a.parse("https://example.com")).toThrow();
    (0, vitest_1.expect)(() => a.parse("ftp://asdfasdf")).toThrow();
    (0, vitest_1.expect)(() => a.parse("ftp://invalid")).toThrow();
});
(0, vitest_1.test)("z.emoji", () => {
    const a = z.emoji();
    (0, vitest_1.expect)(z.parse(a, "😀")).toEqual("😀");
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
});
(0, vitest_1.test)("z.nanoid", () => {
    const a = z.nanoid();
    (0, vitest_1.expect)(z.parse(a, "8FHZpIxleEK3axQRBNNjN")).toEqual("8FHZpIxleEK3axQRBNNjN");
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.cuid", () => {
    const a = z.cuid();
    (0, vitest_1.expect)(z.parse(a, "cixs7y0c0000f7x3b1z6m3w6r")).toEqual("cixs7y0c0000f7x3b1z6m3w6r");
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.cuid2", () => {
    const a = z.cuid2();
    (0, vitest_1.expect)(z.parse(a, "cixs7y0c0000f7x3b1z6m3w6r")).toEqual("cixs7y0c0000f7x3b1z6m3w6r");
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.ulid", () => {
    const a = z.ulid();
    (0, vitest_1.expect)(z.parse(a, "01ETGRM9QYVX6S9V2F3B6JXG4N")).toEqual("01ETGRM9QYVX6S9V2F3B6JXG4N");
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.xid", () => {
    const a = z.xid();
    (0, vitest_1.expect)(z.parse(a, "9m4e2mr0ui3e8a215n4g")).toEqual("9m4e2mr0ui3e8a215n4g");
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
(0, vitest_1.test)("z.ksuid", () => {
    const a = z.ksuid();
    (0, vitest_1.expect)(z.parse(a, "2naeRjTrrHJAkfd3tOuEjw90WCA")).toEqual("2naeRjTrrHJAkfd3tOuEjw90WCA");
    (0, vitest_1.expect)(() => z.parse(a, "abc")).toThrow();
});
// test("z.ip", () => {
//   const a = z.ip();
//   expect(z.parse(a, "127.0.0.1")).toEqual("127.0.0.1");
//   expect(z.parse(a, "2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toEqual("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
//   expect(() => z.parse(a, "abc")).toThrow();
// });
(0, vitest_1.test)("z.ipv4", () => {
    const a = z.ipv4();
    // valid ipv4
    (0, vitest_1.expect)(z.parse(a, "192.168.1.1")).toEqual("192.168.1.1");
    (0, vitest_1.expect)(z.parse(a, "255.255.255.255")).toEqual("255.255.255.255");
    // invalid ipv4
    (0, vitest_1.expect)(() => z.parse(a, "999.999.999.999")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "256.256.256.256")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "192.168.1")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.ipv6", () => {
    const a = z.ipv6();
    // valid ipv6
    (0, vitest_1.expect)(z.parse(a, "2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toEqual("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    (0, vitest_1.expect)(z.parse(a, "::1")).toEqual("::1");
    // invalid ipv6
    (0, vitest_1.expect)(() => z.parse(a, "2001:db8::85a3::8a2e:370:7334")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "2001:db8:85a3:0:0:8a2e:370g:7334")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.base64", () => {
    const a = z.base64();
    // valid base64
    (0, vitest_1.expect)(z.parse(a, "SGVsbG8gd29ybGQ=")).toEqual("SGVsbG8gd29ybGQ=");
    (0, vitest_1.expect)(z.parse(a, "U29tZSBvdGhlciBzdHJpbmc=")).toEqual("U29tZSBvdGhlciBzdHJpbmc=");
    // invalid base64
    (0, vitest_1.expect)(() => z.parse(a, "SGVsbG8gd29ybGQ")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "U29tZSBvdGhlciBzdHJpbmc")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
// test("z.jsonString", () => {
//   const a = z.jsonString();
//   // valid JSON string
//   expect(z.parse(a, '{"key":"value"}')).toEqual('{"key":"value"}');
//   expect(z.parse(a, '["item1", "item2"]')).toEqual('["item1", "item2"]');
//   // invalid JSON string
//   expect(() => z.parse(a, '{"key":value}')).toThrow();
//   expect(() => z.parse(a, '["item1", "item2"')).toThrow();
//   expect(() => z.parse(a, "hello")).toThrow();
//   // wrong type
//   expect(() => z.parse(a, 123)).toThrow();
// });
(0, vitest_1.test)("z.e164", () => {
    const a = z.e164();
    // valid e164
    (0, vitest_1.expect)(z.parse(a, "+1234567890")).toEqual("+1234567890");
    (0, vitest_1.expect)(z.parse(a, "+19876543210")).toEqual("+19876543210");
    // invalid e164
    (0, vitest_1.expect)(() => z.parse(a, "1234567890")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "+12345")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});
(0, vitest_1.test)("z.jwt", () => {
    const a = z.jwt();
    // valid jwt
    (0, vitest_1.expect)(z.parse(a, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    // invalid jwt
    (0, vitest_1.expect)(() => z.parse(a, "invalid.jwt.token")).toThrow();
    (0, vitest_1.expect)(() => z.parse(a, "hello")).toThrow();
    // wrong type
    (0, vitest_1.expect)(() => z.parse(a, 123)).toThrow();
});

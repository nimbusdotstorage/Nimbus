"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const parseUtil_js_1 = require("../helpers/parseUtil.js");
(0, vitest_1.test)("parseUtil isInvalid should use structural typing", () => {
    // Test for issue #556: https://github.com/colinhacks/zod/issues/556
    const aborted = { status: "aborted" };
    const dirty = { status: "dirty", value: "whatever" };
    const valid = { status: "valid", value: "whatever" };
    (0, vitest_1.expect)((0, parseUtil_js_1.isAborted)(aborted)).toBe(true);
    (0, vitest_1.expect)((0, parseUtil_js_1.isAborted)(dirty)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isAborted)(valid)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isDirty)(aborted)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isDirty)(dirty)).toBe(true);
    (0, vitest_1.expect)((0, parseUtil_js_1.isDirty)(valid)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isValid)(aborted)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isValid)(dirty)).toBe(false);
    (0, vitest_1.expect)((0, parseUtil_js_1.isValid)(valid)).toBe(true);
});

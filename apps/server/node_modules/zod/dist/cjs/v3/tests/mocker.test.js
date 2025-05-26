"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore TS6133
const vitest_1 = require("vitest");
const Mocker_js_1 = require("./Mocker.js");
(0, vitest_1.test)("mocker", () => {
    const mocker = new Mocker_js_1.Mocker();
    mocker.string;
    mocker.number;
    mocker.boolean;
    mocker.null;
    mocker.undefined;
    mocker.stringOptional;
    mocker.stringNullable;
    mocker.numberOptional;
    mocker.numberNullable;
    mocker.booleanOptional;
    mocker.booleanNullable;
});

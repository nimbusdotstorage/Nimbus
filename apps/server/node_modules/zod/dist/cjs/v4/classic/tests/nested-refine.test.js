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
(0, vitest_1.test)("nested refinements", () => {
    const zodSchema = z
        .object({
        password: z.string().min(1),
        nested: z
            .object({
            confirm: z
                .string()
                .min(1)
                .refine((value) => value.length > 2, {
                message: "Confirm length should be > 2",
            }),
        })
            .refine((data) => {
            return data.confirm === "bar";
        }, {
            path: ["confirm"],
            error: 'Value must be "bar"',
        }),
    })
        .refine((data) => {
        return data.nested.confirm === data.password;
    }, {
        path: ["nested", "confirm"],
        error: "Password and confirm must match",
    });
    const DATA = {
        password: "bar",
        nested: { confirm: "" },
    };
    (0, vitest_1.expect)(zodSchema.safeParse(DATA)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 1,
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Too small: expected string to have >1 characters"
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Confirm length should be > 2"
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Value must be \\"bar\\""
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Password and confirm must match"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(zodSchema.safeParse(DATA, { jitless: true })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 1,
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Too small: expected string to have >1 characters"
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Confirm length should be > 2"
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Value must be \\"bar\\""
      },
      {
        "code": "custom",
        "path": [
          "nested",
          "confirm"
        ],
        "message": "Password and confirm must match"
      }
    ]],
      "success": false,
    }
  `);
    (0, vitest_1.expect)(zodSchema["~standard"].validate(DATA)).toMatchInlineSnapshot(`
    {
      "issues": [
        {
          "code": "too_small",
          "message": "Too small: expected string to have >1 characters",
          "minimum": 1,
          "origin": "string",
          "path": [
            "nested",
            "confirm",
          ],
        },
        {
          "code": "custom",
          "message": "Confirm length should be > 2",
          "path": [
            "nested",
            "confirm",
          ],
        },
        {
          "code": "custom",
          "message": "Value must be "bar"",
          "path": [
            "nested",
            "confirm",
          ],
        },
        {
          "code": "custom",
          "message": "Password and confirm must match",
          "path": [
            "nested",
            "confirm",
          ],
        },
      ],
    }
  `);
});

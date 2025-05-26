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
exports.instanceOfTestOmit = exports.TestOmit = exports.instanceOfTestPick = exports.TestPick = exports.instanceOfTestPartial = exports.TestPartial = exports.instanceOfTestUnion = exports.TestUnion = exports.instanceOfTestMerge = exports.TestMerge = exports.instanceOfTest = exports.Test = exports.filePath = void 0;
const z = __importStar(require("zod/v3"));
exports.filePath = __filename;
// z.object()
exports.Test = z.object({
    f1: z.number(),
});
exports.instanceOfTest = {
    f1: 1,
};
// z.object().merge()
exports.TestMerge = z
    .object({
    f2: z.string().optional(),
})
    .merge(exports.Test);
exports.instanceOfTestMerge = {
    f1: 1,
    f2: "string",
};
// z.union()
exports.TestUnion = z.union([
    z.object({
        f2: z.string().optional(),
    }),
    exports.Test,
]);
exports.instanceOfTestUnion = {
    f1: 1,
    f2: "string",
};
// z.object().partial()
exports.TestPartial = exports.Test.partial();
exports.instanceOfTestPartial = {
    f1: 1,
};
// z.object().pick()
exports.TestPick = exports.TestMerge.pick({ f1: true });
exports.instanceOfTestPick = {
    f1: 1,
};
// z.object().omit()
exports.TestOmit = exports.TestMerge.omit({ f2: true });
exports.instanceOfTestOmit = {
    f1: 1,
};

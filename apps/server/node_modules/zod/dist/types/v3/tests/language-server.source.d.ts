import * as z from "zod/v3";
export declare const filePath: string;
export declare const Test: z.ZodObject<{
    f1: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    f1: number;
}, {
    f1: number;
}>;
export type Test = z.infer<typeof Test>;
export declare const instanceOfTest: Test;
export declare const TestMerge: z.ZodObject<{
    f2: z.ZodOptional<z.ZodString>;
} & {
    f1: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    f1: number;
    f2?: string | undefined;
}, {
    f1: number;
    f2?: string | undefined;
}>;
export type TestMerge = z.infer<typeof TestMerge>;
export declare const instanceOfTestMerge: TestMerge;
export declare const TestUnion: z.ZodUnion<[z.ZodObject<{
    f2: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    f2?: string | undefined;
}, {
    f2?: string | undefined;
}>, z.ZodObject<{
    f1: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    f1: number;
}, {
    f1: number;
}>]>;
export type TestUnion = z.infer<typeof TestUnion>;
export declare const instanceOfTestUnion: TestUnion;
export declare const TestPartial: z.ZodObject<{
    f1: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    f1?: number | undefined;
}, {
    f1?: number | undefined;
}>;
export type TestPartial = z.infer<typeof TestPartial>;
export declare const instanceOfTestPartial: TestPartial;
export declare const TestPick: z.ZodObject<Pick<{
    f2: z.ZodOptional<z.ZodString>;
} & {
    f1: z.ZodNumber;
}, "f1">, "strip", z.ZodTypeAny, {
    f1: number;
}, {
    f1: number;
}>;
export type TestPick = z.infer<typeof TestPick>;
export declare const instanceOfTestPick: TestPick;
export declare const TestOmit: z.ZodObject<Omit<{
    f2: z.ZodOptional<z.ZodString>;
} & {
    f1: z.ZodNumber;
}, "f2">, "strip", z.ZodTypeAny, {
    f1: number;
}, {
    f1: number;
}>;
export type TestOmit = z.infer<typeof TestOmit>;
export declare const instanceOfTestOmit: TestOmit;

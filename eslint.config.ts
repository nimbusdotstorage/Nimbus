import { buildEslintConfig } from "@nimbus/eslint";

const eslintConfig = [...buildEslintConfig(), { ignores: ["apps/web/**"] }];

export default eslintConfig;

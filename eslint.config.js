// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({ ignores: ['dist'], files: ['src/**/*.ts'] }, {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.nodeBuiltin,
        parserOptions: {
            project: ['./tsconfig.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
}, eslintConfigPrettier, storybook.configs["flat/recommended"]);

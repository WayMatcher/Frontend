import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier'; // Import the prettier plugin
import prettierConfig from 'eslint-config-prettier'; // Import the prettier config

export default tseslint.config(
    {
        ignores: ['dist'],
    },
    js.configs.recommended, // Use recommended base rules (good practice)
    ...tseslint.configs.recommended, // Spread recommended TypeScript rules
    ...tseslint.configs.recommendedTypeChecked, // Spread type-checked rules

    {
        files: ['**/*.{ts,tsx}', '**/*.js'], // Apply to both TS and JS files
        languageOptions: {
            ecmaVersion: 2020, // Or 'latest'
            sourceType: 'module', // Important for modern JS/TS
            globals: {
                ...globals.browser, // Browser globals
                ...globals.node,    // Node.js globals
            },
            parserOptions: { // Parser options for typescript-eslint
                project: true,
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettier, // Add the prettier plugin
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': 'warn',
            'prettier/prettier': 'warn', // Run Prettier as an ESLint rule
        },
    },
    prettierConfig, // Apply Prettier rules (disable conflicting ESLint rules)
);
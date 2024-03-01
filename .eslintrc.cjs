module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    // 指定如何解析语法
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-console': 'off',
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/no-v-model-argument': 'off',
    },
};

import jsdoc from 'eslint-plugin-jsdoc';

export default [
    {
        languageOptions: {
            globals: {
                'node': true,
                'browser': true,
                'es2021': true
            },
            ecmaVersion: 'latest',
        },
        files: ['**/*.js'],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            'jsdoc/require-description': 'error',
            'jsdoc/check-values': 'error',
            'indent': [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'windows'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'always'
            ]
        }
    }
];
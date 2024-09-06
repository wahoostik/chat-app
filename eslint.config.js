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
        files: ['backend/**/*.js'],
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
                0,
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
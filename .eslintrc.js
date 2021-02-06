module.exports = {
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: [
      'tsconfig.json',
    ],
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'linebreak-style': 'off',
    'react/prop-types': 0,
    'no-bitwise': ['error', { allow: ['~'] }],
    'import/no-cycle': 'off',
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'guard-for-in': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    camelcase: 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'space-before-function-paren': ['error', {
      named: 'ignore',
      anonymous: 'always',
      asyncArrow: 'always',
    }],
    'space-unary-ops': [2, {
      words: true,
      nonwords: false,
      overrides: {
        '!': true,
        '!!': true,
      },
    }],
    'react/jsx-props-no-spreading': 'off',
    'import-helpers/order-imports': ['warn', {
      newlinesBetween: 'always',
      groups: [
        '/^react/',
        'module',
        '/^@shared/',
        ['parent', 'sibling', 'index'],
      ],
      alphabetize: { order: 'asc', ignoreCase: true },
    },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};

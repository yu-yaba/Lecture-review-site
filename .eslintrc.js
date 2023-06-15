module.exports = {
  root: true, // このファイルがプロジェクトのルートにあることをESLintに伝える
  extends: ['airbnb', 'airbnb/hooks', 'prettier'], // airbnbのルールを継承する
  rules: { // プロジェクト固有のルールを設定する
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function' },
    ],
    'no-console': 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'no-alert': 0,
    "react-hooks/exhaustive-deps": "warn"
  },
  "env": {
    "browser": true,
    "jquery" : true
  },
};
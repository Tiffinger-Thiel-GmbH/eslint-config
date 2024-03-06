# @tiffinger-thiel/eslint-config

## Usage

1. Install
```sh
yarn add -D @tiffinger-thiel/eslint-config
```
2. Setup your config files
.eslintrc.js
```js
// For yarn2 you will need this
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  // Pick one profile.
  // Possible profiles:
  // - @tiffinger-thiel/eslint-config/profile/react
  // - @tiffinger-thiel/eslint-config/profile/node
  // - @tiffinger-thiel/eslint-config/profile/nest
  extends: ['@tiffinger-thiel/eslint-config/profile/react'],
  
  // The following is optional, it speeds up prettier if passed.
  // It should match your react version.
  settings: {
    react: {
      version: '18.0'
    }
  }
};
```

`.prettierrc.js`
```js
module.exports = require('@tiffinger-thiel/eslint-config/prettier');
```

`package.json`
```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\""
  },

  "devDependencies": {
    "@rushstack/eslint-config": "^2.5.1"
  }
}
```

## VSCode
You only need `"dbaeumer.vscode-eslint"`. No Prettier plugin needed.
Example `.vscode/settings.json`:
```json
{
  "eslint.format.enable": true,
  "eslint.packageManager": "yarn",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
}
```

# Release

Run following 

```bash
yarn
yarn release
```

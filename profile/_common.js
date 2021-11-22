const macros = require('./_macros');

function buildRules(profile) {
  return {
    extends: [
      "@rushstack/eslint-config/profile/web-app",

      ...(profile === "react" ? [
        "@rushstack/eslint-config/mixins/react",
        // alternative: 
        //"react-app",
      ] : []),

      "plugin:prettier/recommended"
    ],
    parserOptions: {
      project: "./tsconfig.json"
    },
    rules: {
      "no-void": "off",
      ...(profile === "react" ? {
        "react/no-danger": "warn"
      } : {}),

      ...(profile === "nest" ? {
        // Allows something like this:
        // public constructor(private readonly appService: AppService) {}
        // Which is very common in nest
        "@typescript-eslint/no-parameter-properties": "off",

        // TODO: clarify - Update schemas or disable rule?
        "@typescript-eslint/explicit-member-accessibility": "off"
       } : {}),
  
      // Override some naming rules from @rushstack
      '@typescript-eslint/naming-convention': [
        'warn',

        // Pass all original configs and edit them if needed:
        ...require('@rushstack/eslint-config/profile/web-app').overrides[0].rules['@typescript-eslint/naming-convention'].slice(1).map((rule) => {
          
          if (profile === "react") {
            // Disable the need for an 'I' prefix of interfaces.
            if (rule.selector === "interface" && rule.custom.regex === '^_?I[A-Z]' ) {
              rule.custom.regex = '^_?[A-Z]';
              return rule;
            }
          }
          
          // Do not force underscores if private:
          if (rule.modifiers?.length > 0 && rule.modifiers[0] === "private" && rule.leadingUnderscore === 'require' ) {
            rule.leadingUnderscore = "allow";
            return rule;
          }

          return rule;
        }),
      ]
    },
    overrides: [
      {
        files: ["src/*.d.ts"],
        rules: {
          // CRA has this in the default template.
          "@typescript-eslint/triple-slash-reference": "off"
        }
      }
    ],
    ignorePatterns: ['.eslintrc.js', '.prettierrc.js'],
  }
}

exports.buildRules = buildRules;

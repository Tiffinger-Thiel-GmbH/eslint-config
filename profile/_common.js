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
    plugins: ["react-hooks"],
    parserOptions: {
      project: "./tsconfig.json"
    },
    rules: {
      // At several places the type inference produces better types than 
      // you would add from hand. And very complex types do not improve readability. 
      // So it is better to just decide in each case if an explicit type helps with reading the code
      // or not.
      "@rushstack/typedef-var": "off",

      "no-void": "off",
      ...(profile === "react" ? {
        "react/no-danger": "warn",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
      } : {}),

      // Allows something like this:
      // public constructor(private readonly appService: AppService) {}
      "@typescript-eslint/no-parameter-properties": "off",

      ...(profile === "nest" ? {
        // TODO: Compatibility with Nest Schema clarify - Update schemas or disable rules?
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-function-return-type" : "off"
       } : {}),
  
      // Override some naming rules from @rushstack
      '@typescript-eslint/naming-convention': [
        'warn',

        // Pass all original configs and edit them if needed:
        ...require('@rushstack/eslint-config/profile/web-app').overrides[0].rules['@typescript-eslint/naming-convention'].slice(1).map((rule) => {
          
          // Disable the need for an 'I' prefix of interfaces.
          if (rule.selector === "interface" && rule.custom.regex === '^_?I[A-Z]' ) {
            rule.custom.regex = '^_?[A-Z]';
            return rule;
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

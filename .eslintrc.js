module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "browser": true,
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "tailwindcss"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": ["tailwind.config.js", "src/presets/*"],
    "rules": {
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off"
    }
}

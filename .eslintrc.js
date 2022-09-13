module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "react-app",
        "react-app/jest",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "jsx-a11y/alt-text": "off",
        "import/no-webpack-loader-syntax": "off",
    },
};

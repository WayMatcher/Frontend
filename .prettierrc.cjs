// .prettierrc.cjs
module.exports = {
    printWidth: 120, // Maximum line length
    tabWidth: 4, // Number of spaces per indentation level
    useTabs: false, // Use spaces instead of tabs
    semi: true, // Add semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    quoteProps: 'as-needed', // Only add quotes around object properties when required
    jsxSingleQuote: true, // Use double quotes in JSX
    trailingComma: 'all', // Add trailing commas wherever possible (e.g., arrays, objects)
    bracketSpacing: true, // Add spaces inside object literal braces
    bracketSameLine: false, // Put the `>` of a multi-line JSX element at the end of the last line
    arrowParens: 'always', // Always include parentheses around arrow function parameters
    endOfLine: 'lf', // Use Unix-style line endings (LF) - important for cross-platform consistency
};

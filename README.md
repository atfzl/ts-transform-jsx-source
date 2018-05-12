# ts-transform-react-jsx-source

Adds source file, line number and column number to JSX elements.

## Example

In

```js
<sometag>foo</sometag>
```

Out

```js
<sometag
  __source={{
    fileName: 'this/file.tsx',
    lineNumber: 20,
    columnNumber: 11,
  }}
>
  foo
</sometag>
```

## Installation

yarn add -D typescript-plugin-transform-react-jsx-source

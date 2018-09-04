# ts-transform-jsx-source

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
    fileName: '/Users/me/proj/src/thisFile.tsx',
    lineNumber: 20,
    columnNumber: 11,
  }}
>
  foo
</sometag>
```

## Installation

```
yarn add -D ts-transform-jsx-source
```

## Usage

#### Webpack

```js
import tsTranformJsxSource from 'ts-transform-jsx-source';

// ...
{
  loader: "awesome-typescript-loader",
  options: {
    getCustomTransformers: () => ({ before: [tsTranformJsxSource] })
  }
}
// ...
```

#### Fusebox

```js
import tsTranformJsxSource from 'ts-transform-jsx-source';

const fuse = FuseBox.init({
  homeDir: 'src/',
  target: 'browser@es6',
  output: 'dist/$name.js',
  transformers: {
    before: [tsTranformJsxSource],
  },
});
```

jenkins

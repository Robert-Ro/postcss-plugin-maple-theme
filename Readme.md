# PostCSS Theme Colors

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

[PostCSS] plugin to auto inject ligth/dark theme color.

```css
a {
  color: cc(G01);
}
```

will be processed to:

```css
a {
  color: #fff;
}
html[data-theme='dark'] a {
  color: #eee;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss @liutsing/postcss-theme-colors
```

or

```sh
yarn add postcss @liutsing/postcss-theme-colors --save-dev
```

or

```sh
pnpm install --save-dev postcss @liutsing/postcss-theme-colors
```

**Step 2:** Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('@liutsing/postcss-theme-colors')({
+      groups: {
+       G01: ['C01', 'C02'],
+     },
+     colors: {
+       C01: 'red',
+       C02: 'blue',
+     },
+   }),
    require('autoprefixer')
  ]
}
```

see more [options](./src/types/index.d.ts)

## example

```
cd example
yarn
yarn dev
```

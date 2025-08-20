# 🏠 Ridley UI Component Library

A TypeScript React component library for Ridley applications, built with Bootstrap and ReactStrap integration. This library provides consistent UI components that follow Ridley's design system and brand guidelines.

## What's included?

- ⚡️ [tsup](https://github.com/egoist/tsup) - The simplest and fastest way to bundle your TypeScript libraries. Used to bundle package as ESM and CJS modules. Supports TypeScript, Code Splitting, PostCSS, and more out of the box.
- 📖 [Storybook](https://storybook.js.org/) - Build UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- 🧪 [Vitest](https://vitest.dev/) - A testing framework for JavaScript. Preconfigured to work with TypeScript and JSX.
- ✅ [Biome](https://biomejs.dev/) - Format, lint, and more in a fraction of a second.
- 🪝 [Lefthook](https://github.com/evilmartians/lefthook) — Run pre-commit hooks, lints staged files, executes tests, and more.
- 🔼 [Release-it](https://github.com/release-it/release-it/) - release-it is a command line tool to automatically generate a new GitHub Release and populates it with the changes (commits) made since the last release.
- 🐙 [Test & Publish via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.
- 🏃‍♀️‍➡️ [TSX](https://github.com/privatenumber/tsx) - Execute TypeScript files with zero-config in a Node.js environment.
- 🎨 **Bootstrap & ReactStrap** - Pre-configured with Bootstrap 5 and ReactStrap for consistent, accessible UI components.
- 🎯 **Ridley Design System** - Custom CSS variables and component variants that implement Ridley's brand colors and styling.

## Features

### Components

- **Button** - Custom Ridley button variants (`ridley`, `ridley-white`, `default`)
- **ExampleCard** - Demonstrates ReactStrap Card with Ridley styling
- **RidleyBadge** - Badge component with Ridley color schemes
- **RidleyAlert** - Alert component with Ridley styling

### Design Tokens

- Ridley brand color palette with CSS custom properties
- Bootstrap CSS variable mapping to Ridley tokens
- Custom button styles and navigation components
- Consistent focus states and accessibility features
- **Geist Variable Font** - Primary typography with optimized font weights
- **Comprehensive Typography Scale** - Titles, paragraphs, and labels with precise sizing

## Usage

### 💻 Developing

Watch and rebuild code with `tsup` and runs Storybook to preview your UI during development.

```console
npm run dev
```

Run all tests and watch for changes

```console
npm test
```

### 🏗️ Building

Build package with `tsup` for production.

```console
npm run build
```

Build both JavaScript and CSS assets:

```console
npm run build:all
```

### ▶️ Running files written in TypeScript

To execute a file written in TypeScript inside a Node.js environment, use the `tsx` command. This will detect your `tsconfig.json` and run the file with the correct configuration. This is perfect for running custom scripts while remaining type-safe.

```console
npm run tsx ./path/to/file.ts
```

This is useful for running scripts, starting a server, or any other code you want to run while remaining type-safe.

### 🖇️ Linking

Often times you want to `link` this package to another project when developing locally, circumventing the need to publish to NPM to consume it.

In a project where you want to consume your package run:

```console
npm link @ridley/ui
```

Learn more about package linking [here](https://npm.io/cli/link).

### 📩 Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
npm run commit
```

### ✅ Linting

To lint and reformat your code at any time, simply run the following command. Under the hood, this uses [Biome](https://biomejs.dev/). If you use VSCode, I suggest installing the official [biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).

```console
npm run lint
```

### 🔖 Releasing, tagging & publishing to NPM

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM. Additionally, a Storybook will be published to Github pages.

Learn more about how to use the `release-it` command [here](https://github.com/release-it/release-it).

```console
npm run release
```

When you are ready to publish to NPM simply run the following command:

```console
npm publish
```

#### 🤖 Auto publish after Github Release (or manually by dispatching the Publish workflow)

❗Important note: in order to automatically publish a Storybook on Github Pages you need to open your repository settings, navigate to "Actions" and enable **"Read & write permissions"** for Workflows. Then navigate to "Pages" and choose **"GitHub Actions"** as the source for the Build and Deployment. After a successful deployment you can find your Storybook at `https://<your-github-username>.github.io/<your-repository-name>/`.

❗Important note: in order to publish package to NPM you must add your token as a Github Action secret. Learn more on how to configure your repository and publish packages through Github Actions [here](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages).

## 🎨 Ridley Design System

This package includes Ridley's complete design system built on top of Bootstrap 5. The design system features the Geist variable font and a carefully crafted color palette.

### Using the Ridley Styles

```ts
import "@ridley/ui/styles.css";
```

### Typography Scale

The design system includes a comprehensive typography scale using the Geist variable font:

#### Titles

```css
.rui-title-xl   /* 48px, weight: 500, line-height: 40px, -4% letter spacing */
/* 48px, weight: 500, line-height: 40px, -4% letter spacing */
.rui-title-l    /* 40px, weight: 500, line-height: 40px, -4% letter spacing */
.rui-title-m    /* 24px, weight: 500, line-height: 32px, -2% letter spacing */
.rui-title-s; /* 18px, weight: 500, line-height: 24px, -2% letter spacing */
```

#### Paragraphs

```css
.rui-paragraph-m/* 16px, weight: 400, line-height: 24px, -2% letter spacing */;
```

#### Labels

```css
.rui-label-m    /* 16px, weight: 500, line-height: 24px, -2% letter spacing */
/* 16px, weight: 500, line-height: 24px, -2% letter spacing */
.rui-label-s; /* 14px, weight: 500, line-height: 26px, -2% letter spacing */
```

### Color Palette

The design system includes three primary color families:

#### Neutral Colors

```css
--rui-white: #ffffff
--rui-neutral-100: #fafafa
--rui-neutral-200: #efefef
--rui-neutral-300: #d8d8d8
--rui-neutral-400: #b1b1b2
--rui-neutral-600: #636366
--rui-neutral-800: #232323
--rui-neutral-border: #0000001a /* Borders only */
```

#### Purple Colors (Primary)

```css
--rui-purple-100: #9025b50d
--rui-purple-500: #9025b5
--rui-purple-800: #511468
```

#### Green Colors (Success)

```css
--rui-green-100: #9acf8b1a
--rui-green-300: #9acf8b
--rui-green-600: #3f9228
```

### Component Usage

```tsx
import { Button, ExampleCard, RidleyBadge, RidleyAlert } from "@ridley/ui";

function App() {
  return (
    <div>
      <h1 className="rui-title-xl">Welcome to Ridley</h1>
      <p className="rui-paragraph-m">
        This is a paragraph using Ridley's typography scale.
      </p>
      <Button variant="ridley">Primary Action</Button>
      <Button variant="ridley-white">Secondary Action</Button>
      <RidleyBadge color="primary">Status</RidleyBadge>
      <RidleyAlert color="success">Success message</RidleyAlert>
      <ExampleCard />
    </div>
  );
}
```

### Font Loading

The Geist variable font is automatically bundled and loaded with `font-display: swap` for optimal performance. The font supports weights from 100-900 and will fallback to the system font stack if needed.

### Design Token Organization

The design system is organized into modular files:

- `tokens/colors.css` - Color palette and semantic mappings
- `tokens/typography.css` - Font families, sizes, and typography scale
- `tokens/spacing.css` - Spacing scale and layout tokens
- `tokens/layout.css` - Border radius, breakpoints, and layout utilities
- `components/buttons.css` - Button variants and styles
- `utilities/focus.css` - Focus states and accessibility utilities

The CSS is designed to work alongside ReactStrap components while providing Ridley-specific styling and brand consistency.

Alternatively, if your package has a hard dependency on a CSS file and you want it to always be loaded when your package is imported, you can import it anywhere within your package's code and it will be bundled with-in your package.

[tsup](https://github.com/egoist/tsup) supports PostCSS out of the box. Simply run `npm add postcss -D` add a `postcss.config.js` file to the root of your project, then add any plugins you need. Learn more how to configure PostCSS [here](https://tsup.egoist.dev/#css-support).

Additionally consider using the [tsup](https://github.com/egoist/tsup) configuration option `injectStyle` to inject the CSS directly into your Javascript bundle instead of outputting a separate CSS file.

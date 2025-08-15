# 📦 Typescript • React • Package Starter

A slightly opinionated starter kit for developing TypeScript and/or React NPM packages. It comes with a several pre-configured tools, so you could focus on coding instead of configuring a project for the nth time. From building to releasing a package, this starter kit has you covered.

## 🏃 Getting started

❗Important note: This project uses [pnpm](https://pnpm.io/) for managing dependencies. If you want to use another package manager, remove the `pnpm-lock.yaml` and control-f for usages of `pnpm` in the project and replace them with your package manager of choice. If you don't have `pnpm` installed and want to use it, you can install it by running `npm install -g pnpm`.

## What's included?

- ⚡️ [tsup](https://github.com/egoist/tsup) - The simplest and fastest way to bundle your TypeScript libraries. Used to bundle package as ESM and CJS modules. Supports TypeScript, Code Splitting, PostCSS, and more out of the box.
- 📖 [Storybook](https://storybook.js.org/) - Build UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- 🧪 [Vitest](https://vitest.dev/) - A testing framework for JavaScript. Preconfigured to work with TypeScript and JSX.
- ✅ [Biome](https://biomejs.dev/) - Format, lint, and more in a fraction of a second.
- 🪝 [Lefthook](https://github.com/evilmartians/lefthook) — Run pre-commit hooks, lints staged files, executes tests, and more.
- 🔼 [Release-it](https://github.com/release-it/release-it/) - release-it is a command line tool to automatically generate a new GitHub Release and populates it with the changes (commits) made since the last release.
- 🐙 [Test & Publish via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.
- 🤖 [Dependabot](https://docs.github.com/en/code-security/dependabot) - Github powered dependency update tool that fits into your workflows. Configured to periodically check your dependencies for updates and send automated pull requests.
- 🏃‍♀️‍➡️ [TSX](https://github.com/privatenumber/tsx) - Execute TypeScript files with zero-config in a Node.js environment.

## Usage

### 💻 Developing

Watch and rebuild code with `tsup` and runs Storybook to preview your UI during development.

```console
pnpm dev
```

Run all tests and watch for changes

```console
pnpm test
```

### 🏗️ Building

Build package with `tsup` for production.

```console
pnpm build
```

### ▶️ Running files written in TypeScript

To execute a file written in TypeScript inside a Node.js environment, use the `tsx` command. This will detect your `tsconfig.json` and run the file with the correct configuration. This is perfect for running custom scripts while remaining type-safe.

```console
pnpm tsx ./path/to/file.ts
```

This is useful for running scripts, starting a server, or any other code you want to run while remaining type-safe.

### 🖇️ Linking

Often times you want to `link` this package to another project when developing locally, circumventing the need to publish to NPM to consume it.

In a project where you want to consume your package run:

```console
pnpm link my-package --global
```

Learn more about package linking [here](https://pnpm.io/cli/link).

### 📩 Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
pnpm commit
```

### ✅ Linting

To lint and reformat your code at any time, simply run the following command. Under the hood, this uses [Biome](https://biomejs.dev/). If you use VSCode, I suggest installing the official [biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).

```console
pnpm lint
```

### 🔖 Releasing, tagging & publishing to NPM

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically build the package and publish it to NPM. Additionally, a Storybook will be published to Github pages.

Learn more about how to use the `release-it` command [here](https://github.com/release-it/release-it).

```console
pnpm release
```

When you are ready to publish to NPM simply run the following command:

```console
pnpm publish
```

#### 🤖 Auto publish after Github Release (or manually by dispatching the Publish workflow)

❗Important note: in order to automatically publish a Storybook on Github Pages you need to open your repository settings, navigate to "Actions" and enable **"Read & write permissions"** for Workflows. Then navigate to "Pages" and choose **"GitHub Actions"** as the source for the Build and Deployment. After a successful deployment you can find your Storybook at `https://<your-github-username>.github.io/<your-repository-name>/`.

❗Important note: in order to publish package to NPM you must add your token as a Github Action secret. Learn more on how to configure your repository and publish packages through Github Actions [here](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages).

## 🎨 CSS & PostCSS

To bundle CSS files with your package that you intend on users to import within their own project, a few extra steps are required.

1. Add your CSS files to the `src` directory. For example, `src/styles.css`.
2. Modify `tsup.config.ts` file to include your CSS file as an entry point. For example:

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  // ...
});
```

3. Modify `package.json` to include the CSS file as an `exports` entry. For example:

```json
{
  "exports": {
    "./styles.css": "./dist/styles.css"
  }
}
```

4. Now consumers of your package can import your CSS file anywhere in their project. For example:

```ts
import "your-package/styles.css";
```

Alternatively, if your package has a hard dependency on a CSS file and you want it to always be loaded when your package is imported, you can import it anywhere within your package's code and it will be bundled with-in your package.

[tsup](https://github.com/egoist/tsup) supports PostCSS out of the box. Simply run `pnpm add postcss -D` add a `postcss.config.js` file to the root of your project, then add any plugins you need. Learn more how to configure PostCSS [here](https://tsup.egoist.dev/#css-support).

Additionally consider using the [tsup](https://github.com/egoist/tsup) configuration option `injectStyle` to inject the CSS directly into your Javascript bundle instead of outputting a separate CSS file.

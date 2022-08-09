# ts-ide-overrides

TypeScript language service plugin to override _strict mode family_ options within an editor.

The plugin helps raise visibility of strict mode issues without breaking your build process.

The _strict mode family_ options are `strict` and the 8 related options: `alwaysStrict`, `strictNullChecks`, `strictBindCallApply`, `strictFunctionTypes`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, and `useUnknownInCatchVariables`.

## Install

Install as a dev-dependency using a package manager:

```bash
npm install --save-dev ts-ide-overrides
```

```bash
yarn add --save-dev ts-ide-overrides
```

```bash
pnpm add --save-dev ts-ide-overrides
```

```bash
bun add --development ts-ide-overrides
```

## Configuration

Add plugin to `tsconfig.json`:

```json
{
  "compilerOptions": {
    // (other options ommitted)
    "plugins": [
      {
        "name": "ts-ide-overrides",
        "overrides": {
          // just an example...
          "strict": true,
          "noImplicitAny": false,
          "useUnknownInCatchVariables": false
        }
      }
    ]
  }
}
```

## Comments

The plugin supports code comments to toggle any of the 9 options for the current file:

```ts
// @ts-ide-disable-strict @ts-ide-enable-strict-null-checks
```

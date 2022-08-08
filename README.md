# ts-ide-overrides

This plugin allows you to override a subset of TypeScript `compilerOptions` when editing files in an IDE. (Specifically `strict` and its 8 associated options: `alwaysStrict`, `strictNullChecks`, `strictBindCallApply`, `strictFunctionTypes`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, `useUnknownInCatchVariables`.)

The purpose of the plugin is to support gradual adoption of strict rules, without breaking pre-existing build and validation processes.

## Install

Install as a dev-dependency using a package manager:

Using npm:
```bash
npm install -D ts-ide-overrides
```

Using yarn:
```bash
yarn add -D ts-ide-overrides
```

Using pnpm:
```bash
pnpm add -D ts-ide-overrides
```

Using bun:
```bash
bun add -d ts-ide-overrides
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
          "strictNullChecks": true,
          "noImplicitAny": true
        }
      }
    ]
  }
}
```

## Comments

The plugin supports code comments to toggle any of the 9 options for the current file:

```ts
// @ts-ide-disable-strict-null-checks
/* @ts-ide-enable-no-implicit-this */
```

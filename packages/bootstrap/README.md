# @beraliv/bootstrap

Checks and installs the dependencies of my personal Mac (Apple Silicon). Each dependency is checked in dependency order, and missing or outdated ones are fixed after confirmation.

The full specification is in [SPEC.md](./SPEC.md).

## Usage

First run on a fresh Mac (no Node or Homebrew needed):

```sh
curl -fsSL https://github.com/beraliv/beraliv.dev/releases/latest/download/install.sh | sh
```

Later runs:

```sh
npx @beraliv/bootstrap           # check, then offer fixes
npx @beraliv/bootstrap --check   # check only
npx @beraliv/bootstrap --yes     # apply fixes without asking
npx @beraliv/bootstrap --only node
```

## Development

```sh
pnpm --filter bootstrap run type
pnpm --filter bootstrap run test:unit
pnpm --filter bootstrap run start -- --check
pnpm --filter bootstrap run build   # needs bun (brew install bun) and codesign
```

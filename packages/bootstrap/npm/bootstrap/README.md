# @beraliv/bootstrap

Checks and installs the dependencies of my personal Mac (Apple Silicon). Each dependency is checked in dependency order, and missing or outdated ones are fixed after confirmation.

The full specification is in [SPEC.md](https://github.com/beraliv/beraliv.dev/blob/main/packages/bootstrap/SPEC.md).

## Quick start

On a fresh Mac, with no Node or Homebrew installed:

```sh
curl -fsSL https://github.com/beraliv/beraliv.dev/releases/latest/download/install.sh | sh
```

After that, run it with npm:

```sh
npx @beraliv/bootstrap
```

## Examples

Check everything, without changing anything (exits 1 if anything needs attention):

```sh
npx @beraliv/bootstrap --check
```

```
🟢 Homebrew: 7.0.15 → 7.0.15
🟢 Claude Code: 2.1.311 → 2.1.311
🟢 .zshrc
🟢 nvm: 0.41.0 → 0.41.0
🟢 Node 24: v24.22.3 → v24.22.3
🟢 Google Chrome: 158.0.8127.37 → 158.0.8127.37
🟢 Docker
All dependencies are up to date.
```

Check, then offer fixes for anything that is missing or outdated (illustrative output for an outdated package):

```sh
npx @beraliv/bootstrap
```

```
🔴 ffmpeg: 9.0.1 → 9.0.2_1

Proceed? [y/N]
```

Apply fixes without asking:

```sh
npx @beraliv/bootstrap --yes
```

Check or fix one dependency, along with the dependencies it needs:

```sh
npx @beraliv/bootstrap --only node
```

Show the installed version:

```sh
npx @beraliv/bootstrap --version
```

## Options

| Option | Effect |
|---|---|
| (none) | Check, then offer fixes |
| `--check` | Check only; exit 1 if anything is not ok |
| `--yes`, `-y` | Apply fixes without asking |
| `--only <id>` | Limit to one dependency and the dependencies it needs |
| `--version` | Print the version |
| `--help` | Print help |

Dependency ids are the names in the `--only` examples above and in [SPEC.md](https://github.com/beraliv/beraliv.dev/blob/main/packages/bootstrap/SPEC.md), such as `homebrew`, `node`, `chrome`, `docker`.

## Development

```sh
pnpm --filter bootstrap run type
pnpm --filter bootstrap run test:unit
pnpm --filter bootstrap run start -- --check
pnpm --filter bootstrap run build   # needs bun (brew install bun) and codesign
```

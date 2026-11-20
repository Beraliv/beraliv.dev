# @beraliv/bootstrap — specification

## 1. Goals

- Keep a declarative, re-runnable record of the tools and configuration on a personal macOS laptop (arm64).
- Check every dependency in dependency order and report its state in a deterministic way.
- After confirmation, install missing dependencies and upgrade outdated Homebrew packages.
- Ship as a standalone binary so no runtime (Node, Bun, Homebrew) is needed on a fresh machine.

## 2. Non-goals

- Other platforms (Linux, Windows, Intel macOS) are out of scope.
- No `brew upgrade` of everything. Only packages declared in the registry are upgraded.
- No dotfile management beyond the managed block in `~/.zshrc`.
- No secrets handling. Logins are performed by the tools themselves.

## 3. Distribution

| Stage | Command | What runs |
|---|---|---|
| First run on a fresh Mac | `curl -fsSL https://github.com/beraliv/beraliv.dev/releases/latest/download/install.sh \| sh` | `install.sh` downloads `bootstrap-darwin-arm64` from the GitHub Release, makes it executable, and runs it. It installs everything, including Node 24. |
| Every later run | `npx @beraliv/bootstrap` | npm package `@beraliv/bootstrap` is a small Node launcher. Its `optionalDependencies` include `@beraliv/bootstrap-darwin-arm64`, which holds the same binary (`os: darwin`, `cpu: arm64`). |

Both packages are versioned in lockstep and released from a tag `bootstrap-v*` (see §11).

## 4. Dependency graph

The graph in `src/graph.ts` is the source of truth for ids and edges. `dependsOn` for each dependency is typed against it, so a dependency cannot depend on itself or on an unknown id. A unit test rejects cycles.

| # | id | name | depends on | check | fix (install / update) |
|---|---|---|---|---|---|
| 1 | `homebrew` | Homebrew | – | `brew --version`, falling back to `/opt/homebrew/bin/brew` | Official install script. Update: `brew update`. |
| 2 | `claude` | Claude Code | `homebrew` | cask `claude-code` installed; then login state (see §4.1) | `brew install --cask claude-code`. Setup: runs `claude auth login` interactively. |
| 3 | `zshrc` | .zshrc | – | `~/.zshrc` exists and contains the managed block (§4.2) | Creates the file if missing and adds the managed block. |
| 4 | `nvm` | nvm | `homebrew`, `zshrc` | `~/.nvm/nvm.sh` present and `zsh -ic 'nvm --version'` succeeds | `brew install nvm`, `mkdir ~/.nvm`, add the snippet to the managed block. |
| 5 | `node` | Node 24 | `nvm` | `nvm version 24` (installed) compared with `nvm version-remote 24` (latest), both run through `nvm.sh` directly | `nvm install 24 && nvm alias default 24`. Outdated means a newer 24.x is available. |
| 6 | `warp` | Warp | `homebrew`, `zshrc` | cask `warp` installed | `brew install --cask warp` |
| 7 | `vscode` | VS Code | `homebrew`, `zshrc` | cask `visual-studio-code` installed; `code` on PATH | `brew install --cask visual-studio-code` |
| 8 | `ffmpeg` | ffmpeg | `homebrew` | formula `ffmpeg` installed | `brew install ffmpeg` |
| 9 | `git` | git | `homebrew` | Homebrew `git` installed and first on PATH (not Apple git) | `brew install git` |
| 10 | `git-ssh-key` | git SSH key | `git` | `~/.ssh/id_ed25519.pub` exists | Setup: `ssh-keygen -t ed25519`, copy the public key to the clipboard, open `https://github.com/settings/ssh/new`, wait for Enter. |
| 11 | `chrome` | Google Chrome | `homebrew` | cask `google-chrome` installed | `brew install --cask google-chrome` |
| 12 | `1password` | 1Password | `homebrew` | cask `1password` installed | `brew install --cask 1password` |
| 13 | `docker` | Docker | `homebrew` | cask `docker` installed | `brew install --cask docker` |

Warp and VS Code list `zshrc` as a dependency for ordering only. They add no snippet.

### 4.1 Claude login state

`claude` reports `needs-setup` when installed but not logged in. The check runs `claude auth status --json` and reads `loggedIn`. Setup runs `claude auth login` interactively.

### 4.1a Casks installed outside Homebrew

Some casks (Chrome, VS Code, Warp) may already be installed as apps by hand. The check reports them as `missing` with the detail "is not managed by Homebrew" when the app bundle exists. The install step then removes the app bundle from `/Applications`, runs `brew uninstall --cask` (failure ignored, since Homebrew may not know the cask), and then runs `brew install --cask`.

Docker is the exception: it is only checked for presence, with no version comparison (`checkOutdated: false`). An app bundle installed by hand counts as `ok`, and Docker is never removed or reinstalled because of it.

### 4.1b Shell environment

Homebrew is arm64-only, so `/opt/homebrew/bin` is prepended to `PATH` at startup. nvm checks source `/opt/homebrew/opt/nvm/nvm.sh` directly, so they do not depend on `~/.zshrc` having been loaded.

### 4.2 Managed block in `~/.zshrc`

Dependencies that need shell configuration write into one marked block:

```sh
# >>> @beraliv/bootstrap >>>
...snippets, one per dependency, in registry order...
# <<< @beraliv/bootstrap <<<
```

- The block is created at the end of the file if missing. Content outside the markers is never touched.
- Writes are idempotent. Re-running produces byte-identical output.
- nvm snippet: `export NVM_DIR="$HOME/.nvm"` and sourcing of `$(brew --prefix nvm)/nvm.sh`.

## 5. Dependency interface

```ts
interface Dependency<Id extends DepId> {
  id: Id;
  name: string;
  dependsOn: DependsOn<Id>;
  check(ctx: Context): Promise<CheckResult>;
  install(ctx: Context): Promise<void>;   // when status is "missing"
  update?(ctx: Context): Promise<void>;   // when status is "outdated"
  setup?(ctx: Context): Promise<void>;    // when status is "needs-setup"
}

type CheckResult = {
  status: "ok" | "missing" | "outdated" | "needs-setup";
  current?: string;
  latest?: string;
  detail?: string;
};
```

`Context` gives every dependency:

- `exec`: an injectable command runner. Tests pass a fake.
- `home`: the home directory.
- `prompt`: an injectable prompt for confirmations and "press Enter" waits.
- `brewOutdated()`: memoized `brew outdated --json=v2 --greedy`, shared by all Homebrew-backed dependencies so `brew` runs once.

## 6. Execution

1. **Plan**: topologically sort the graph into levels (Kahn's algorithm). Level 0 has no dependencies.
2. **Check**: run each level with `Promise.all`. Results are stored by id and printed in registry order, not completion order, so output is deterministic. A spinner is shown only on a TTY.
3. **Report**: one line per dependency:
   - `🟢 <name>: <current> → <latest>` when up to date
   - `🔴 <name>: <current> → <latest>` when outdated
   - `🔴 <name>: not installed → <latest>` when missing
   - `🔴 <name>: not logged in` when `needs-setup`
   
   A summary line follows.
4. **Fix** (only when something is not ok): list the planned actions and ask `Proceed? [y/N]`. `--yes` skips the question.
   - Runs sequentially in topological order. Brew holds a lock, and interactive steps need the terminal.
   - When a dependency fails, its dependents are skipped with a message. Independent dependencies continue.
5. **Verify**: re-run all checks and print the final table.

### 6.1 Update scope

Outdated packages are upgraded only if they are Homebrew formulae or casks declared in the registry: `brew upgrade <names>`. `brew upgrade` with no arguments is never run. `--greedy` is used so auto-updating casks (Chrome, VS Code) are reported and upgraded. Docker is not version-checked (§4.1a). Node is upgraded through nvm, as described in §4.

## 7. CLI

```
bootstrap                 check, then offer fixes (interactive)
bootstrap --check         check only, no changes; exit 1 if anything is not ok
bootstrap --yes           apply fixes without asking
bootstrap --only <id>     limit to one dependency and its dependencies
bootstrap --version
bootstrap --help
```

- Exit codes: `0` all ok, `1` issues remain or a fix failed, `2` usage error.
- Without a TTY and without `--yes`, behaves like `--check`.

## 8. Project layout

```
packages/bootstrap/
  SPEC.md  README.md  package.json  tsconfig.json
  src/
    cli.ts              argument parsing, entry point
    engine.ts           plan, check, fix, verify
    graph.ts            GRAPH, DepId, DependsOn, cycle check
    context.ts          Context, exec, prompt, brewOutdated memo
    ui.ts               output formatting
    zshrc-block.ts      managed block read/write
    deps/
      index.ts          ordered registry
      homebrew.ts  claude.ts  zshrc.ts  nvm.ts  node.ts  warp.ts
      vscode.ts  ffmpeg.ts  git.ts  git-ssh-key.ts  chrome.ts
      onepassword.ts  docker.ts
  test/                 bun test: graph, ordering, managed block, brew parsing, checks with fake exec
  npm/
    bootstrap/          launcher package (bin/bootstrap.js)
    darwin-arm64/       binary package
  scripts/
    build.ts            compiles the binary and syncs versions
    install.sh          curl installer
```

## 9. Build and tooling

- Source is TypeScript. Build with `bun build --compile --target=bun-darwin-arm64`. Bun is a build-time tool only.
- The package is part of the pnpm workspace (`packages/*`). Scripts: `type` (`tsc --noEmit`), `test:unit` (`bun test`), `build`.
- CI: add `bootstrap` to the matrix in `.github/workflows/checks.yml`, with a bun setup step for this package.

## 10. Testing

- Unit tests use a fake `exec` and a scratch `HOME`. No real installs happen in tests.
- Covered: graph validity and cycle rejection; deterministic output ordering; managed block idempotency and preservation of content outside markers; `brew outdated` JSON parsing; per-dependency check results for each fake state.
- Manual verification on the laptop: `--check` run twice produces identical output. Fix paths are exercised with `--only` on a dependency that is intentionally absent, in a scratch `HOME`.

## 11. Release

Two npm packages with independent versions:

- **Binary** `@beraliv/bootstrap-darwin-arm64`: version from `packages/bootstrap/package.json`. Its tag is `bootstrap-v<version>`. `scripts/build.ts` copies that version into `npm/darwin-arm64/package.json`.
- **Launcher** `@beraliv/bootstrap`: version from `npm/bootstrap/package.json`, bumped by hand. Its `optionalDependencies` pin to the binary is also set by hand, to a binary version that is already published. The build does not touch it.

Workflow `.github/workflows/release-bootstrap.yml` runs on a macOS arm64 runner:

- A merge to `main` that changes `packages/bootstrap/package.json` or `packages/bootstrap/npm/**` runs the workflow. The `tag` job creates `bootstrap-v<version>` if it does not exist yet. The `release` job then runs in the same workflow, because a tag pushed with `GITHUB_TOKEN` does not start other workflows.
- A launcher-only change publishes the launcher without a new binary tag, and no GitHub release is created for it.
- Pushing a `bootstrap-v*` tag by hand also runs the `release` job for that version.
- Steps: upgrade npm to 11.x, install bun, set the binary version from the tag, run type check and unit tests, build the binary, ad-hoc `codesign`, smoke test (`--version` must equal the tag version, then `--help`), publish the binary package then the launcher with `--provenance --access public`, and create a GitHub Release marked `--latest` with the binary and `install.sh` (only when a new tag was created or a tag was pushed).
- Each publish skips a package whose version is already on npm, so re-running is safe.
- Publishing uses npm trusted publishing (OIDC, `id-token: write`), so there is no npm token. Each package must have this repo and workflow configured as a trusted publisher on npmjs.com.
- `install.sh` fetches from `releases/latest/download/`, so it never needs a version bump. `BOOTSTRAP_VERSION=<version>` pins a specific release.
- Binary release: bump `packages/bootstrap/package.json` and merge to `main`. Launcher release: bump `npm/bootstrap/package.json` (and its pin, if the binary changed) and merge to `main`.

## 12. Open questions

- Whether the Node major should move past 24 later. It is a single constant (`NODE_MAJOR` in `src/deps/node.ts`).
- The compiled binary is about 87 MB because Bun embeds its runtime. Acceptable for a laptop tool.

#!/bin/sh
# First-run installer for a fresh Mac, before Node or Homebrew exist:
#   curl -fsSL https://github.com/beraliv/beraliv.dev/releases/download/bootstrap-v0.1.0/install.sh | sh
# Downloads the standalone binary and runs it. Later runs: npx @beraliv/bootstrap
set -eu

REPO="beraliv/beraliv.dev"
VERSION="${BOOTSTRAP_VERSION:-0.1.0}"

if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
  echo "bootstrap supports macOS on Apple Silicon (arm64) only." >&2
  exit 1
fi

URL="https://github.com/$REPO/releases/download/bootstrap-v$VERSION/bootstrap-darwin-arm64"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Downloading bootstrap $VERSION..."
curl -fsSL -o "$TMP/bootstrap" "$URL"
chmod +x "$TMP/bootstrap"

# stdin is the script itself when piped from curl, so prompts read from the terminal.
"$TMP/bootstrap" "$@" </dev/tty

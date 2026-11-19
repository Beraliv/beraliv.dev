#!/bin/sh
# First-run installer for a fresh Mac, before Node or Homebrew exist:
#   curl -fsSL https://github.com/beraliv/beraliv.dev/releases/latest/download/install.sh | sh
# Downloads the standalone binary and runs it. Later runs: npx @beraliv/bootstrap
# Set BOOTSTRAP_VERSION=<version> to install a specific release instead of the latest.
set -eu

REPO="beraliv/beraliv.dev"
VERSION="${BOOTSTRAP_VERSION:-latest}"

if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
  echo "bootstrap supports macOS on Apple Silicon (arm64) only." >&2
  exit 1
fi

if [ "$VERSION" = "latest" ]; then
  URL="https://github.com/$REPO/releases/latest/download/bootstrap-darwin-arm64"
else
  URL="https://github.com/$REPO/releases/download/bootstrap-v$VERSION/bootstrap-darwin-arm64"
fi
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Downloading bootstrap $VERSION..."
curl -fsSL -o "$TMP/bootstrap" "$URL"
chmod +x "$TMP/bootstrap"

# stdin is the script itself when piped from curl, so prompts read from the terminal.
"$TMP/bootstrap" "$@" </dev/tty

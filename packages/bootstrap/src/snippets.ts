// Shell snippets that dependencies contribute to the managed block in ~/.zshrc.
// arm64-only: Homebrew lives in /opt/homebrew.
export const SHELL_SNIPPETS: readonly { id: string; body: string }[] = [
  {
    id: 'nvm',
    body: [
      'export NVM_DIR="$HOME/.nvm"',
      '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \\. "/opt/homebrew/opt/nvm/nvm.sh"',
    ].join('\n'),
  },
];

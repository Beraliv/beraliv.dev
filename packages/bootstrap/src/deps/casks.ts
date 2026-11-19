import { brewPackage } from './brew.ts';

export const warp = brewPackage({
  id: 'warp',
  name: 'Warp',
  dependsOn: ['homebrew', 'zshrc'],
  kind: 'cask',
  token: 'warp',
  app: '/Applications/Warp.app',
});
export const vscode = brewPackage({
  id: 'vscode',
  name: 'VS Code',
  dependsOn: ['homebrew', 'zshrc'],
  kind: 'cask',
  token: 'visual-studio-code',
  app: '/Applications/Visual Studio Code.app',
});
export const chrome = brewPackage({
  id: 'chrome',
  name: 'Google Chrome',
  dependsOn: ['homebrew'],
  kind: 'cask',
  token: 'google-chrome',
  app: '/Applications/Google Chrome.app',
});
export const onepassword = brewPackage({
  id: '1password',
  name: '1Password',
  dependsOn: ['homebrew'],
  kind: 'cask',
  token: '1password',
  app: '/Applications/1Password.app',
});
export const docker = brewPackage({
  id: 'docker',
  name: 'Docker',
  dependsOn: ['homebrew'],
  kind: 'cask',
  token: 'docker',
  app: '/Applications/Docker.app',
});
export const ffmpeg = brewPackage({ id: 'ffmpeg', name: 'ffmpeg', dependsOn: ['homebrew'], kind: 'formula', token: 'ffmpeg' });

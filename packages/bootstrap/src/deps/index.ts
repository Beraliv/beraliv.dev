import type { AnyDependency } from '../dependency.ts';
import claude from './claude.ts';
import git from './git.ts';
import gitSshKey from './git-ssh-key.ts';
import homebrew from './homebrew.ts';
import nvm from './nvm.ts';
import node from './node.ts';
import zshrc from './zshrc.ts';
import { chrome, docker, ffmpeg, onepassword, vscode, warp } from './casks.ts';

// Registry order is the display order. It is a valid topological order (see graph.ts).
export const registry = [
  homebrew,
  claude,
  zshrc,
  nvm,
  node,
  warp,
  vscode,
  ffmpeg,
  git,
  gitSshKey,
  chrome,
  onepassword,
  docker,
] satisfies AnyDependency[];

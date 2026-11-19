import { spawn } from 'node:child_process';
import type { Exec } from './context.ts';

// Runs a command. With `inherit`, it shares the terminal so prompts and progress are visible.
export const exec: Exec = (cmd, args = [], opts = {}) =>
  new Promise((resolve) => {
    const child = spawn(cmd, args, {
      stdio: opts.inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
      env: process.env,
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (d: Buffer) => (stdout += d.toString()));
    child.stderr?.on('data', (d: Buffer) => (stderr += d.toString()));
    child.on('error', (err) => resolve({ code: 127, stdout, stderr: String(err) }));
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });

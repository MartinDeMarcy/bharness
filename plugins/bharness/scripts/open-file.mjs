#!/usr/bin/env node
// Ouvre un fichier avec l'application par défaut de l'ordinateur (navigateur pour une maquette HTML).
// Usage : node open-file.mjs <chemin> [--dry-run]
import { existsSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const SAFE_EXTENSIONS = new Set(['.html', '.htm', '.pdf', '.png', '.jpg', '.jpeg', '.svg', '.md', '.txt']);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const target = args.find((a) => !a.startsWith('--'));

if (!target) {
  console.error('Usage : node open-file.mjs <chemin> [--dry-run]');
  process.exit(2);
}

const file = resolve(target);

if (!existsSync(file)) {
  console.error(`Fichier introuvable : ${file}`);
  process.exit(1);
}

// On n'ouvre que des documents : jamais un programme ou un script.
if (!SAFE_EXTENSIONS.has(extname(file).toLowerCase())) {
  console.error(`Type de fichier non pris en charge : ${extname(file) || '(sans extension)'}`);
  process.exit(1);
}

const [command, commandArgs] =
  process.platform === 'win32'
    ? ['cmd', ['/c', 'start', '', file]]
    : process.platform === 'darwin'
      ? ['open', [file]]
      : ['xdg-open', [file]];

if (dryRun) {
  console.log(`${command} ${commandArgs.map((a) => JSON.stringify(a)).join(' ')}`);
  process.exit(0);
}

const child = spawn(command, commandArgs, { detached: true, stdio: 'ignore' });
child.on('error', (err) => {
  console.error(`Impossible d'ouvrir le fichier : ${err.message}`);
  process.exit(1);
});
child.unref();
console.log(`Ouvert : ${file}`);

#!/usr/bin/env node
// Met à jour le plugin Bharness : rafraîchit la marketplace puis met à jour le plugin.
// Retrouve le programme `claude` même quand il n'est pas dans le PATH (application de bureau Claude sous Windows).
// Une fois terminé, il faut fermer la session et en rouvrir une pour charger la nouvelle version.
// Usage : node update-plugin.mjs [--dry-run]
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const dryRun = process.argv.includes('--dry-run');
const isWindows = process.platform === 'win32';

// Retrouve `claude` dans le PATH (sans passer par un shell, pour ne pas avoir d'arguments à échapper).
const findOnPath = () => {
  const r = spawnSync(isWindows ? 'where' : 'which', ['claude'], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  const lines = r.stdout.split(/[\r\n]+/).map((l) => l.trim()).filter(Boolean);
  // Sous Windows, on préfère un vrai .exe ; un .cmd doit passer par cmd.exe.
  return lines.find((l) => l.toLowerCase().endsWith('.exe')) || lines[0] || null;
};

// Dans l'application de bureau sous Windows : %APPDATA%\Claude\claude-code\<version>\<hash>\claude.exe
const findDesktopBinary = () => {
  const base = join(process.env.APPDATA || '', 'Claude', 'claude-code');
  if (!process.env.APPDATA || !existsSync(base)) return null;
  const versionKey = (v) => v.split('.').map((n) => String(Number(n) || 0).padStart(6, '0')).join('.');
  const versions = readdirSync(base).sort((a, b) => versionKey(b).localeCompare(versionKey(a)));
  for (const version of versions) {
    const dir = join(base, version);
    let hashes = [];
    try {
      hashes = readdirSync(dir);
    } catch {
      continue;
    }
    for (const hash of hashes) {
      const exe = join(dir, hash, 'claude.exe');
      if (existsSync(exe)) return exe;
    }
  }
  return null;
};

const claude = findOnPath() || findDesktopBinary();

if (!claude) {
  console.error("Impossible de retrouver le programme `claude` sur cet ordinateur.");
  process.exit(3);
}

const needsCmd = isWindows && /\.(cmd|bat)$/i.test(claude);
console.log(`Programme utilisé : ${claude}`);

const steps = [
  ['plugin', 'marketplace', 'update', 'bharness'],
  ['plugin', 'update', 'bharness@bharness'],
];

for (const args of steps) {
  console.log(`> claude ${args.join(' ')}`);
  if (dryRun) continue;
  const r = needsCmd
    ? spawnSync('cmd', ['/c', claude, ...args], { stdio: 'inherit' })
    : spawnSync(claude, args, { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`Échec de « claude ${args.join(' ')} » (code ${r.status}).`);
    process.exit(r.status || 1);
  }
}

console.log(dryRun ? 'Simulation terminée (rien n\'a été modifié).' : 'Mise à jour terminée : ferme cette session et rouvres-en une.');

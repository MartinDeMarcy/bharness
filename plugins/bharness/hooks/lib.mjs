// Outils communs aux garde-fous Bharness. Sans dépendance, compatible Windows.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8"));
  } catch {
    return {};
  }
}

// Les garde-fous ne s'appliquent qu'aux projets Bharness.
export function isBharnessProject(input) {
  const dir = input.cwd || process.cwd();
  return existsSync(join(dir, ".bharness", "state.json"));
}

// Bloque l'action : le message est renvoyé à Claude (code de sortie 2).
export function block(message) {
  process.stderr.write(`Bharness · action bloquée : ${message}\n`);
  process.exit(2);
}

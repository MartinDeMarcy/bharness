---
name: doctor
description: Vérifier que les outils (Node.js, npm, Git, GitHub CLI) et la configuration du projet Bharness sont prêts, et expliquer en clair comment corriger ce qui manque.
disable-model-invocation: true
allowed-tools: Bash(node *)
---

# /bharness:doctor : vérifier l'installation

Tu es **Ariane** (`${CLAUDE_PLUGIN_ROOT}/agents/ariane.md`).

1. Lance : `node "${CLAUDE_PLUGIN_ROOT}/skills/doctor/scripts/doctor.mjs"`
2. Le script affiche une ligne par vérification (`OK`, `MANQUANT` ou `ATTENTION`) avec une piste de correction adaptée au système (Windows, macOS, Linux).
3. Résume à l'utilisateur : ce qui est prêt en une phrase, puis ce qui manque, **une correction à la fois**, en commençant par la plus importante (Node.js, puis Git, puis GitHub CLI et sa connexion).
4. Après chaque correction faite par l'utilisateur, relance le script pour confirmer.

Si Node.js n'est pas installé, le script ne peut pas tourner : explique alors directement comment installer Node.js LTS (sous Windows : `winget install OpenJS.NodeJS.LTS` dans PowerShell, ou l'installateur sur nodejs.org), puis de relancer `/bharness:doctor`.

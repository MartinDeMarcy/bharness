# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions : [SemVer](https://semver.org/lang/fr/).

## [0.2.1] – 2026-10-09

### Ajouté

- Section « Mettre à jour Bharness » dans le README et dans `/bharness:help` : rafraîchir la marketplace, mettre à jour le plugin, puis redémarrer la session. Une mise à jour non appliquée faisait croire à tort que les correctifs n'avaient aucun effet.

## [0.2.0] – 2026-10-09

### Ajouté

- Ariane fait connaissance avec l'utilisateur au démarrage (système détecté, familiarité avec le terminal, Git, GitHub et le code, façon d'apprendre) et enregistre son profil dans `state.user` et dans la mémoire du projet.
- Référence `reference/user-profile.md` : principes d'accompagnement et explications prêtes à l'emploi (ouvrir PowerShell ou le Terminal, coller une commande, Git et GitHub, variables d'environnement, fenêtres d'autorisation Windows).

### Modifié

- Ariane et Neil installent eux-mêmes les outils manquants quand c'est possible, et ne demandent plus d'ouvrir un terminal sans l'expliquer.
- `/bharness:doctor` et `/bharness:next` adaptent leurs explications au profil de l'utilisateur.

## [0.1.0] – 2026-10-09

### Ajouté

- Plugin Claude Code `bharness` et sa marketplace.
- Onze agents : Ariane, Socrate, Maxime, Iris, Gustave, Poucet, Ada, Thomas, Clio, Diderot, Neil.
- Commandes : `start`, `next`, `status`, `back`, `docs`, `doctor`, `remember`, `feedback`, `help`.
- Savoir-faire : stack Next.js + Supabase, Git et CI, tests, déploiement Vercel.
- Mémoire du projet (`.bharness/memory.md`) et journal de retours d'expérience avec accord de l'utilisateur.
- Garde-fous Git et anti-secrets (Node.js, compatibles Windows).
- Modèles de documents (brief, PRD, écrans, architecture, story, rapport de test, déploiement, wiki) et de projet (CLAUDE.md, permissions, CI, modèle de pull request).

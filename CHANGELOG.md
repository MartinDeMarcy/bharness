# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions : [SemVer](https://semver.org/lang/fr/).

## [0.3.0] – 2026-10-09

### Ajouté

- Ariane montre ce qui est produit directement dans la conversation : le PRD et les écrans en entier avant chaque validation, les autres documents sur proposition. L'utilisateur n'a plus à chercher les fichiers.
- Les documents Markdown s'affichent comme des documents mis en forme (titres, listes, tableaux), jamais dans un bloc de code.
- Les maquettes HTML sont ouvertes dans le navigateur par Ariane (`scripts/open-file.mjs`, Node.js, Windows, macOS et Linux), après une description de chaque écran.

### Modifié

- Socrate, Maxime et Iris suivent la même règle d'affichage.

## [0.2.2] – 2026-10-09

### Modifié

- Les explications sur la mise à jour (README et `/bharness:help`) sont reformulées dans le ton d'Ariane : plus naturel, à la première personne, sans formules figées.

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

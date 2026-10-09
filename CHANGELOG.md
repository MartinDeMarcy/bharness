# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions : [SemVer](https://semver.org/lang/fr/).

## [0.4.0] – 2026-10-09

### Ajouté

- Vérification automatique des mises à jour : au début de `/bharness:next`, Ariane regarde (au plus une fois par jour) s'il existe une nouvelle version et propose de l'installer maintenant ou plus tard (`scripts/check-update.mjs`). Seule la lecture d'un fichier public sur GitHub est faite ; hors ligne, elle se tait.
- Mise à jour faite par Ariane (`scripts/update-plugin.mjs`) : le script retrouve le programme `claude`, y compris dans l'application de bureau Windows où il n'est pas dans le PATH, puis rafraîchit la marketplace et met à jour le plugin.
- Ariane lance aussi le contrôle à la demande de l'utilisateur.

### Modifié

- README et `/bharness:help` : l'explication de la mise à jour décrit le comportement automatique. Les commandes `/plugin …` tapées dans la conversation, qui ne signalaient pas la mise à jour, ne sont plus présentées comme la méthode normale.

## [0.3.1] – 2026-10-09

### Modifié

- Les documents produits ne sont plus collés dans la conversation : Ariane les envoie sous forme de bouton (`SendUserFile`) qui les ouvre d'un clic dans le volet de l'application, mis en forme comme un vrai document. Aux validations, le bouton est envoyé avant de demander l'accord. Les maquettes HTML suivent la même règle.
- Solutions de repli, dans l'ordre : lien cliquable, puis contenu écrit en Markdown mis en forme (jamais dans un bloc de code). `scripts/open-file.mjs` ne sert plus que pour ouvrir une maquette dans le navigateur quand rien d'autre ne marche.

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

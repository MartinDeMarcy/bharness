# Le parcours Bharness

Ce document est la référence commune à toutes les commandes et à tous les agents. Il décrit les phases, qui les mène, ce qu'elles produisent et quand on passe à la suite.

## Deux façons de faire travailler un agent

- **Incarné (dialogue)** : la conversation principale *devient* l'agent. Elle lit sa fiche (`agents/<nom>.md`), adopte sa personnalité et dialogue directement avec l'utilisateur. Utilisé quand il faut poser des questions : Ariane, Socrate, Maxime, Iris.
- **Délégué (autonome)** : la conversation principale lance le sous-agent `bharness:<nom>` avec l'outil Agent, en lui donnant tout le contexte nécessaire (chemins des documents, story en cours, fichiers de savoir-faire à lire). Le sous-agent travaille seul et rend un compte rendu. Utilisé pour : Gustave, Poucet, Ada, Thomas, Clio, Diderot, Neil.

Un sous-agent délégué ne voit pas la conversation : le message de délégation doit tout contenir. Après chaque délégation, Ariane résume le résultat à l'utilisateur en une à trois phrases simples.

## Les phases

| # | Phase (`phase`) | Agent | Mode | Produit | Porte de validation |
|---|---|---|---|---|---|
| 0 | `onboarding` | Ariane | incarné | `.bharness/state.json`, `CLAUDE.md`, `.claude/settings.json`, dépôt GitHub | — |
| 1 | `maturity` | Ariane | incarné | `state.maturity` | l'utilisateur confirme le niveau |
| 2 | `brief` | Socrate | incarné | `docs/01-brief.md` | — |
| 3 | `prd` | Maxime | incarné | `docs/02-prd.md` | **Validation 1 : le PRD** |
| 4 | `ux` | Iris | incarné | `docs/03-ux.md` + maquettes | **Validation 2 : les écrans** |
| 5 | `architecture` | Gustave | délégué | `docs/04-architecture.md`, projet Next.js initialisé, Supabase de test relié | — |
| 6 | `planning` | Poucet | délégué | `docs/stories/NNN-nom.md`, `state.stories` | — |
| 7 | `build` | Ada, Thomas, Clio, Neil, Diderot | délégué | code, tests, branches, environnements de test, wiki | **Validation 3 : démo de chaque story** |
| 8 | `wiki` | Diderot | délégué | `docs/wiki/` relu et complet | — |
| 9 | `release` | Clio puis Neil | délégué | `release/x.y.z`, étiquette, app en production | **Validation 4 : la mise en ligne** |
| 10 | `done` | Ariane | incarné | bilan, prochaines étapes | — |

Une phase passe à `done` seulement quand son livrable existe et, s'il y a une porte, quand l'utilisateur l'a validée. La date de validation est notée dans `state.gates`.

## Phase 1 : le niveau de maturité

Ariane pose trois questions simples (outil AskUserQuestion) :

1. Qui utilisera l'app : toi seul, quelques proches, ou le public ?
2. Y aura-t-il des données personnelles sensibles ou des paiements ?
3. Est-ce un essai pour tester l'idée, ou un outil dont des gens vont dépendre ?

Elle recommande un niveau (MVP, alpha, bêta, production) et l'explique en une ou deux phrases. L'utilisateur confirme ou choisit un autre niveau.

- **MVP** : on continue.
- **Autre niveau** : Ariane explique que Bharness ne prend en charge que les MVP pour l'instant, propose de viser d'abord un MVP, et si l'utilisateur refuse, met `phase` à `stopped` et s'arrête là.

## Phase 7 : la boucle d'une story

Pour chaque story de `state.stories`, dans l'ordre :

1. **Clio** crée la branche `feature/<NNN>-<nom>` depuis `main` (statut `in_progress`).
2. **Ada** développe la story en local, avec ses tests unitaires et fonctionnels. L'app locale est branchée sur le **Supabase de test** (pas de base locale).
3. **Thomas** vérifie en local : tests unitaires, tests fonctionnels, critères d'acceptation. En cas d'échec, retour à Ada (statut `local_ok` seulement quand tout passe).
4. **Clio** enregistre le travail en commits normalisés et pousse la branche. La CI GitHub Actions se lance ; Vercel crée l'environnement de test de la branche.
5. **Neil** récupère l'URL de prévisualisation et vérifie que l'environnement répond (statut `on_test`).
6. **Thomas** lance les tests de bout en bout sur l'environnement de test et rédige `docs/qa/NNN-rapport.md`.
7. **Ariane** présente la démo à l'utilisateur : l'URL de test (utilisable sur téléphone), ce qui a été fait, comment l'essayer. **Validation 3** (statut `demo`).
   - Refusée : les remarques vont dans la story, retour à l'étape 2.
8. **Diderot** met à jour le wiki sur la même branche.
9. **Clio** ouvre la pull request et la fusionne dans `main` une fois la CI verte (statut `done`).

Une story n'est jamais `done` sans démo validée, wiki à jour et fusion dans `main`.

## Phase 9 : la mise en production

1. Ariane présente ce qui va partir en production et demande la **Validation 4**.
2. **Clio** crée `release/<version>` depuis `main`, pose l'étiquette `v<version>`, publie la note de version (tirée de `docs/wiki/historique.md`).
3. **Neil** sauvegarde la base de production, applique les migrations au **Supabase de production**, déploie la release sur Vercel en production, vérifie l'URL publique.
4. Ariane annonce l'URL publique et propose la suite.

## La mémoire du projet

`.bharness/memory.md` (modèle : `templates/memory.md`) contient ce que tous les agents doivent savoir sur ce projet et son utilisateur : préférences, décisions, problèmes rencontrés et solutions, conventions, choses à éviter. Il est importé par `CLAUDE.md`, donc chargé à chaque session, y compris dans les sous-agents.

- Chaque agent le relit avant d'agir et y ajoute ce qu'il apprend d'utile.
- L'utilisateur peut y ajouter une consigne avec `/bharness:remember`.
- Ariane le garde propre (pas de doublon ni de contradiction).
- `decisions.md` garde le détail des validations ; `memory.md` garde ce qu'il faut appliquer au quotidien.

## Le journal de retours d'expérience

À l'accueil, Ariane demande à l'utilisateur s'il accepte qu'un journal de session soit tenu pour aider à améliorer Bharness. Sa réponse va dans `state.feedback`.

- S'il accepte : Ariane alimente `.bharness/feedback/journal.md` (modèle : `templates/feedback-journal.md`) à la fin de chaque phase et de chaque story, et à chaque friction notable.
- `/bharness:feedback` produit un compte rendu partageable : `.bharness/feedback/rapport-AAAA-MM-JJ.md`.
- Rien n'est envoyé automatiquement : l'utilisateur partage le compte rendu s'il le souhaite. Le dossier `.bharness/feedback/` n'est pas versionné.
- L'utilisateur peut changer d'avis à tout moment (« arrête le journal ») : Ariane met `feedback.enabled` à `false`.

## Règles pour Ariane (orchestration)

- Toujours commencer une session en lisant `.bharness/state.json` et en disant où on en est en une phrase.
- Une seule chose à la fois ; jamais de jargon sans explication.
- Pour toute décision : 2 à 4 options avec une recommandation (outil AskUserQuestion).
- Mettre à jour `state.json` après chaque étape, et ajouter une ligne dans `history`.
- Noter chaque décision validée par l'utilisateur dans `.bharness/decisions.md`.
- Ne jamais demander à l'utilisateur de valider une opération Git : c'est le domaine de Clio.
- Montrer ce qui est produit : l'utilisateur ne va jamais chercher un fichier. Chaque document produit est envoyé à l'utilisateur sous forme de bouton (`SendUserFile`), qu'il ouvre d'un clic dans le volet de l'application, mis en forme ; aux validations (PRD, écrans), le bouton est envoyé avant de demander l'accord. Les maquettes sont regroupées dans un menu (`docs/maquettes/index.html`) qu'un bouton d'Ariane ouvre dans Chrome. Sans bouton, Ariane donne un lien cliquable, puis en dernier recours écrit le contenu dans le message en Markdown mis en forme (jamais dans un bloc de code). Le chemin du fichier n'est cité qu'à titre d'information.

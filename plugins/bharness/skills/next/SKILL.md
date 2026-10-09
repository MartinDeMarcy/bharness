---
name: next
description: Passer à l'étape suivante du projet Bharness. Ariane lit l'état du projet et lance la bonne phase, avec le bon agent.
disable-model-invocation: true
---

# /bharness:next : l'étape suivante

Tu deviens **Ariane**. Lis `${CLAUDE_PLUGIN_ROOT}/agents/ariane.md`, `${CLAUDE_PLUGIN_ROOT}/reference/workflow.md`, `${CLAUDE_PLUGIN_ROOT}/reference/user-profile.md` et `.bharness/state.json`. Adapte toutes tes explications au profil de l'utilisateur (`state.user` et la section « Profil de l'utilisateur » de la mémoire). Si `state.user` est vide (projet créé avec une version plus ancienne de Bharness), fais d'abord connaissance comme à l'étape 3 de `/bharness:start`.

- Si `.bharness/state.json` n'existe pas : propose `/bharness:start` et arrête-toi.
- Si `phase` vaut `stopped` ou `done` : explique la situation et ce qui est possible.
- Sinon : dis en une phrase où on en est, puis mène la phase en cours ci-dessous. À la fin de chaque phase, mets à jour `state.json` (`phases`, `phase`, `history`) et propose de continuer.

Chemins utiles pour les délégations :

- savoir-faire stack : `${CLAUDE_PLUGIN_ROOT}/skills/stack-nextjs-supabase/SKILL.md`
- savoir-faire Git : `${CLAUDE_PLUGIN_ROOT}/skills/git-workflow/SKILL.md`
- savoir-faire tests : `${CLAUDE_PLUGIN_ROOT}/skills/testing/SKILL.md`
- savoir-faire déploiement : `${CLAUDE_PLUGIN_ROOT}/skills/deploy-vercel/SKILL.md`
- modèles de documents : `${CLAUDE_PLUGIN_ROOT}/templates/docs/`
- modèles de projet : `${CLAUDE_PLUGIN_ROOT}/templates/project/`

## `maturity`

Mène la phase 1 de `workflow.md` (comme dans `/bharness:start`, étape 9).

## `brief` : Socrate (incarné)

Lis `${CLAUDE_PLUGIN_ROOT}/agents/socrate.md` et deviens Socrate, avec le modèle `templates/docs/01-brief.md`. Annonce le changement : « Je passe la parole à Socrate, notre analyste. » Quand `docs/01-brief.md` est écrit, redeviens Ariane.

## `prd` : Maxime (incarné), validation 1

Lis `${CLAUDE_PLUGIN_ROOT}/agents/maxime.md` et deviens Maxime, avec `templates/docs/02-prd.md`. La phase n'est `done` qu'après la validation 1 (date dans `gates.prd`).

## `ux` : Iris (incarnée), validation 2

Lis `${CLAUDE_PLUGIN_ROOT}/agents/iris.md` et deviens Iris, avec `templates/docs/03-ux.md`. La phase n'est `done` qu'après la validation 2 (date dans `gates.ux`).

## `architecture` : Gustave (délégué), puis Neil et Clio

1. Délègue à `bharness:gustave` : dossier du projet, documents d'entrée, chemin du savoir-faire stack, modèle `templates/docs/04-architecture.md`.
2. Résume ses choix à l'utilisateur.
3. Délègue à `bharness:neil` la mise en place des **environnements** (chemin du savoir-faire déploiement). Accompagne l'utilisateur dans les actions qu'il doit faire lui-même (création des comptes et des projets Supabase et Vercel, clés à coller dans `.env.local` et dans Vercel), une étape à la fois.
4. Délègue à `bharness:clio` l'enregistrement du socle : une branche `feature/000-socle`, un commit, une pull request fusionnée dans `main` une fois la CI verte.

## `planning` : Poucet (délégué)

Délègue à `bharness:poucet` (documents d'entrée, modèle `templates/docs/story.md`, `reference/state-schema.md`). Montre la liste des stories à l'utilisateur, en mots simples.

## `build` : la boucle des stories

Prends la première story de `state.stories` dont le statut n'est pas `done`, mets-la dans `current_story`, et reprends la boucle de `workflow.md` (phase 7) **à l'étape qui correspond à son statut** :

| Statut | Étape suivante |
|---|---|
| `todo` | 1. Clio crée la branche, puis 2. Ada développe |
| `in_progress` | 2. Ada développe (ou corrige, d'après les notes) |
| `local_ok` | 4. Clio enregistre et pousse, puis 5. Neil vérifie l'environnement de test |
| `on_test` | 6. Thomas teste sur l'environnement de test |
| `demo` | 7. Démo et validation 3, puis 8. Diderot, puis 9. Clio fusionne |

Chaque délégation reçoit : le dossier du projet, l'identifiant et le fichier de la story, l'étape demandée, le chemin du savoir-faire utile. Après chaque délégation : mets à jour le statut de la story, résume en une phrase.

**La démo (validation 3)** : montre l'URL de test (`preview_url`), dis qu'elle s'ouvre aussi sur téléphone, liste ce que l'utilisateur peut essayer (critères d'acceptation), montre deux ou trois captures de Thomas. Puis AskUserQuestion : « Valider la story », « Demander des corrections » (note les remarques dans la story, statut `in_progress`).

Enchaîne les stories tant que l'utilisateur le souhaite ; propose une pause entre deux stories. Quand toutes sont `done`, passe `phase` à `wiki`.

## `wiki` : Diderot (délégué)

Délègue à `bharness:diderot` la relecture complète avant la mise en production. Fais enregistrer ses changements par `bharness:clio` (branche `docs/wiki-final`, pull request, fusion).

## `release` : validation 4, Clio puis Neil

1. Présente ce qui part en production (liste des fonctionnalités) et la version proposée (`0.1.0` pour la première). Validation 4 (date dans `gates.release`).
2. Délègue à `bharness:clio` la création de la release.
3. Délègue à `bharness:neil` la mise en production.
4. Annonce l'URL publique, note-la dans `environments.production_url`, passe `phase` à `done`, et félicite l'utilisateur.

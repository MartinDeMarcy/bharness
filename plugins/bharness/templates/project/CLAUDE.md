# Projet mené avec Bharness

Ce projet est construit avec le plugin **Bharness** : une équipe d'agents accompagne l'utilisateur de l'idée à un MVP en ligne.

## À lire en début de session

- `.bharness/state.json` : où en est le projet (phase, stories, environnements).
- `.bharness/decisions.md` : les décisions validées par l'utilisateur.
- `docs/` : brief, PRD, écrans, architecture, stories, rapports de test, wiki.

Pour avancer, l'utilisateur tape `/bharness:next`. Pour savoir où on en est : `/bharness:status`.

## Mémoire du projet

Les préférences de l'utilisateur, les problèmes déjà rencontrés et les choses à éviter sont dans la mémoire du projet, chargée ci-dessous. Respecte-la ; enrichis-la quand tu apprends quelque chose d'utile pour la suite.

@.bharness/memory.md

## Règles du projet

- Parle simplement à l'utilisateur, dans sa langue ; il n'est pas développeur.
- Stack imposée : Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Supabase, PWA, Vitest, Playwright, Vercel.
- Le développement et les tests se font en local, branchés sur le **Supabase de test**. Il n'y a pas de base locale.
- Les opérations Git et GitHub sont confiées à Clio (`bharness:clio`). L'utilisateur n'a rien à valider côté Git.
- Branches : `lot/NN-slug` par lot de stories, `feature/NNN-slug` par story (créée depuis la branche de son lot et fusionnée dans celle-ci), `main` toujours stable (il ne reçoit un lot qu'après la validation de l'utilisateur), `release/x.y.z` par mise en production. Jamais de force push ni de réécriture d'historique.
- Aucun secret dans le dépôt : les clés vivent dans `.env.local` (non versionné) et dans les réglages Vercel.
- Chaque table Supabase a la Row Level Security activée.
- Le wiki (`docs/wiki/`) décrit ce qui existe réellement dans le code ; Diderot le tient à jour après chaque story.

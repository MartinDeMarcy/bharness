---
name: status
description: Voir où en est le projet Bharness et ce qui reste à faire, sans rien modifier.
disable-model-invocation: true
---

# /bharness:status : où en est le projet

Tu es **Ariane** (`${CLAUDE_PLUGIN_ROOT}/agents/ariane.md`). Lis `.bharness/state.json`. Ne modifie rien.

Si le fichier n'existe pas, propose `/bharness:start`.

Sinon, présente en moins de quinze lignes :

1. **Le projet** : nom, idée en une phrase, niveau de maturité.
2. **L'étape en cours** et les étapes franchies (cadrer, concevoir, construire, livrer), avec les validations obtenues et leur date.
3. **Les stories** (s'il y en a) : combien sont terminées sur le total, la story en cours et son statut en mots simples (« en développement », « en test », « prête pour la démo »…).
4. **Les liens utiles** : dépôt GitHub, URL de test de la story en cours, URL publique si l'app est en ligne.
5. **La prochaine action** : ce que fera `/bharness:next`.

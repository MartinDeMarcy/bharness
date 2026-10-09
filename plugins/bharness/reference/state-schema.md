# Le fichier d'état `.bharness/state.json`

C'est la mémoire du projet. Ariane le lit au début de chaque session et le met à jour après chaque étape. Le modèle de départ est `templates/state.json`.

## Champs

| Champ | Type | Rôle |
|---|---|---|
| `bharness` | texte | Version de Bharness qui a créé le projet |
| `project.name` | texte | Nom du projet (aussi nom du dépôt, en minuscules avec tirets) |
| `project.pitch` | texte | L'idée en une phrase |
| `project.language` | texte | Langue de l'utilisateur (`fr` par défaut) |
| `maturity.recommended` | `mvp` · `alpha` · `beta` · `production` · `null` | Recommandation d'Ariane |
| `maturity.target` | idem | Niveau confirmé par l'utilisateur |
| `maturity.answers` | objet | Réponses aux trois questions |
| `phase` | texte | Phase en cours (voir `workflow.md`), ou `stopped` / `done` |
| `phases.<phase>` | `todo` · `in_progress` · `waiting_validation` · `done` | Avancement de chaque phase |
| `gates.prd` / `gates.ux` / `gates.release` | date ISO ou `null` | Date de chaque validation |
| `stories[]` | liste | Une entrée par story (voir ci-dessous) |
| `current_story` | texte ou `null` | Identifiant de la story en cours |
| `repo.url` | texte | URL du dépôt GitHub |
| `repo.default_branch` | texte | `main` |
| `environments.supabase_test` | texte | Référence du projet Supabase de test |
| `environments.supabase_prod` | texte | Référence du projet Supabase de production |
| `environments.vercel_project` | texte | Nom du projet Vercel |
| `environments.production_url` | texte | URL publique, après la première mise en production |
| `releases[]` | liste | `{ "version", "date", "tag" }` |
| `feedback.enabled` | booléen | L'utilisateur accepte-t-il le journal de retours d'expérience ? |
| `feedback.asked_at` | date ISO ou `null` | Date à laquelle la question a été posée |
| `history[]` | liste | `{ "date", "agent", "event" }`, une ligne par étape |

## Une story

```json
{
  "id": "001",
  "slug": "inscription",
  "title": "S'inscrire avec son e-mail",
  "status": "todo",
  "branch": "feature/001-inscription",
  "preview_url": null,
  "pull_request": null,
  "validated_at": null,
  "notes": []
}
```

Statuts, dans l'ordre : `todo` → `in_progress` → `local_ok` → `on_test` → `demo` → `done`. Une story refusée à la démo repasse à `in_progress`, avec les remarques dans `notes`.

## Règles

- Jamais de secret dans ce fichier (clés, mots de passe) : seulement des noms et des références.
- Écrire du JSON valide, indenté de deux espaces.
- Ce fichier est versionné avec le projet.

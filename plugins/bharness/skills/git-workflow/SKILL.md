---
name: git-workflow
description: Règles et commandes Git et GitHub de Bharness (branches feature/main/release, Conventional Commits, pull requests, CI, versions). Savoir-faire de Clio ; à lire avant toute opération sur le dépôt d'un projet Bharness.
user-invocable: false
---

# Savoir-faire Git de Bharness

Clio est seule responsable du dépôt. L'utilisateur ne valide aucune opération Git. Outils : `git` et `gh` (GitHub CLI, déjà connecté par l'utilisateur).

## Le modèle de branches

| Branche | Rôle | Règle |
|---|---|---|
| `main` | Branche finale, toujours stable | Ne reçoit que des pull requests à CI verte |
| `feature/NNN-slug` | Une par story | Créée depuis `main` à jour, fusionnée par pull request après la démo validée |
| `docs/<sujet>` | Mises à jour du wiki hors story | Même règle qu'une feature |
| `release/x.y.z` | Une par mise en production | Créée depuis `main`, figée, étiquetée `vx.y.z` |
| `hotfix/x.y.z` | Correction urgente en production | Créée depuis la release, fusionnée dans `main` ensuite |

## Les interdits (un hook les bloque aussi)

- `git push --force` / `-f` / `--force-with-lease`, `git reset --hard` sur une branche publiée, `git rebase` d'une branche poussée, `git filter-branch`, `git filter-repo`, suppression d'étiquette publiée.
- Envoi direct sur `main`, sauf le tout premier commit lors de la mise en place.
- Commit d'un fichier `.env*` autre que `.env.example`.

## Mise en place (une seule fois)

```bash
git init -b main                                  # si le dossier n'est pas déjà un dépôt
git add -A && git commit -m "chore: initialize Bharness project"
# Nouveau dépôt :
gh repo create <nom> --private --source . --remote origin --push
# Dépôt existant :
git remote add origin <url> && git push -u origin main
```

Puis :

1. Copie `templates/project/.github/` du plugin dans `.github/` (CI et modèle de pull request), commit `ci: add GitHub Actions workflow`, push.
2. Protège `main` (pull request obligatoire, CI `ci` obligatoire) :
   ```bash
   gh api -X PUT repos/<owner>/<repo>/branches/main/protection \
     -F required_status_checks[strict]=true -f required_status_checks[contexts][]=ci \
     -F enforce_admins=false -F required_pull_request_reviews[required_approving_review_count]=0 \
     -F restrictions=null
   ```
   Sur un dépôt privé avec l'offre gratuite de GitHub, la protection peut être refusée : ce n'est pas bloquant, tu appliques la règle toi-même. Note-le dans ton compte rendu.
3. Renseigne `repo.url` dans `.bharness/state.json`.

## Début d'une story

```bash
git switch main && git pull --ff-only
git switch -c feature/NNN-slug
```

## Enregistrer le travail

1. `git status` : vérifie qu'aucun fichier `.env*` (hors `.env.example`), clé ou fichier volumineux inattendu n'est présent.
2. Regroupe les changements en **petits commits cohérents**, au format Conventional Commits, en anglais :
   - `feat(NNN): add sign-up form`
   - `test(NNN): cover sign-up validation`
   - `fix(NNN): handle empty email`
   - `docs(NNN): update wiki for sign-up`
   - `chore: …`, `ci: …`, `refactor: …`
   Corps du message : une ligne qui renvoie à la story (`Story: docs/stories/NNN-slug.md`).
3. `git push -u origin feature/NNN-slug`

## Fin d'une story (après la démo validée et le wiki de Diderot)

```bash
gh pr create --base main --head feature/NNN-slug \
  --title "feat: <titre de la story> (NNN)" --body-file <fichier rempli depuis .github/pull_request_template.md>
gh pr checks <numéro> --watch          # attendre la CI
gh pr merge <numéro> --merge --delete-branch
git switch main && git pull --ff-only
```

Fusion par **commit de fusion** (`--merge`) : l'historique de la story est conservé tel quel. Note la pull request dans `stories[].pull_request`.

Si la CI échoue : ne fusionne pas. Lis le journal (`gh run view --log-failed`), résume la cause à Ariane : la correction revient à Ada.

## Mise en production

```bash
git switch main && git pull --ff-only
git switch -c release/x.y.z
npm version x.y.z --no-git-tag-version
git commit -am "chore(release): x.y.z"
git push -u origin release/x.y.z
git tag -a vx.y.z -m "Version x.y.z"
git push origin vx.y.z
gh release create vx.y.z --title "Version x.y.z" --notes-file <notes tirées de docs/wiki/historique.md>
```

Numérotation SemVer : `0.1.0` pour le premier MVP en ligne, puis `0.2.0` pour de nouvelles fonctionnalités, `0.1.1` pour une correction.

Ajoute la version dans `state.releases`.

# Bharness

**Une équipe de onze agents qui accompagne un débutant motivé de l'idée à une application web en ligne, testée et documentée.**

Bharness est un plugin pour [Claude Code](https://code.claude.com). Il s'adresse aux personnes qui ont un projet d'application web, l'envie de le mener, mais pas de formation de développeur. Le résultat est un **MVP** : une application web installable sur téléphone (PWA), en ligne, avec son code sur GitHub et un wiki qui explique comment elle fonctionne.

> Statut : version 0.3.0, en cours de construction et de premiers tests.

## Comment ça marche

Le parcours compte quatre étapes et quatre validations : rien n'avance sans ton accord.

1. **Cadrer** : Socrate t'aide à préciser ton idée, Maxime choisit avec toi ce qui entre dans le MVP. → *Validation 1 : le PRD*
2. **Concevoir** : Iris dessine les écrans, Gustave pose les fondations techniques, Poucet découpe le travail en petites étapes. → *Validation 2 : les écrans*
3. **Construire**, une fonctionnalité à la fois : Ada code en local, Thomas teste en local puis en ligne, Clio range tout dans GitHub, Diderot met le wiki à jour. → *Validation 3 : la démo de chaque fonctionnalité*
4. **Livrer** : Diderot relit le wiki, Clio crée la version, Neil met l'app en ligne. → *Validation 4 : la mise en ligne*

Ariane, la guide, t'accompagne du début à la fin.

## L'équipe

| Agent | Métier | Personnalité |
|---|---|---|
| **Ariane** | Guide | Chaleureuse et patiente, comme le fil qui guide hors du labyrinthe |
| **Socrate** | Analyste | Curieux, fait naître l'idée par les questions |
| **Maxime** | Product Manager | Pragmatique, maximise la valeur, sait dire « pas pour le MVP » |
| **Iris** | Designer UX | Empathique et visuelle, pense à l'utilisateur final |
| **Gustave** | Architecte | Méthodique, comme Eiffel : des fondations solides |
| **Poucet** | Planificateur | Sème des stories comme des petits cailloux |
| **Ada** | Développeuse | Concentrée et rigoureuse, comme Ada Lovelace |
| **Thomas** | Testeur | Ne croit que ce qu'il voit fonctionner |
| **Clio** | Versioning et CI | Gère seule le dépôt GitHub, comme la muse de l'Histoire |
| **Diderot** | Documentaliste | Tient le wiki à jour, comme l'encyclopédiste |
| **Neil** | DevOps | Calme au décollage, met l'app en ligne |

## Ce qu'il te faut

- Un accès à **Claude Code**, dans l'application de bureau Claude (onglet Code) ou dans un terminal.
- **Node.js** (version 20 ou plus), **Git** et **GitHub CLI** : `/bharness:doctor` vérifie tout et t'explique comment installer ce qui manque.
- Des comptes gratuits **GitHub**, **Supabase** et **Vercel** : Neil t'accompagne au moment où on en a besoin.

## Installation

Dans Claude Code, dans le dossier où tu veux créer ton projet :

```text
/plugin install bharness --marketplace MartinDeMarcy/bharness
```

Ou en deux temps :

```text
/plugin marketplace add MartinDeMarcy/bharness
/plugin install bharness@bharness
```

Dans l'application de bureau : bouton **+** à côté de la zone de saisie → **Plugins** → **Add plugin**, après avoir ajouté la marketplace `MartinDeMarcy/bharness`.

Puis lance :

```text
/bharness:start
```

## Mettre à jour Bharness

Bharness s'améliore régulièrement, et Claude Code ne récupère pas les nouveautés tout seul. Pour en profiter, tape ces deux lignes dans Claude Code, l'une après l'autre :

```text
/plugin marketplace update bharness
/plugin update bharness@bharness
```

Puis ferme ta session et rouvres-en une : c'est au démarrage que la nouvelle version est chargée. Ton projet n'est pas touché, tu retrouves tout comme tu l'avais laissé.

Si Ariane se comporte encore comme avant, c'est que la mise à jour n'est pas passée : recommence les deux lignes, puis redémarre.

## Les commandes

| Commande | Quand l'utiliser |
|---|---|
| `/bharness:start` | La première fois : crée le projet et présente l'équipe |
| `/bharness:next` | À chaque session : passe à l'étape suivante |
| `/bharness:status` | Savoir où on en est |
| `/bharness:back` | Revenir sur une étape déjà validée |
| `/bharness:docs` | Mettre à jour ou vérifier le wiki |
| `/bharness:doctor` | Vérifier les outils et les comptes |
| `/bharness:remember` | Ajouter une consigne ou une préférence à la mémoire du projet |
| `/bharness:feedback` | Produire le compte rendu de retours d'expérience |
| `/bharness:help` | Revoir les commandes et l'équipe |

Au quotidien, `/bharness:next` suffit.

## Ce que Bharness crée dans ton projet

```
mon-app/
├── CLAUDE.md                 # contexte du projet, lu à chaque session
├── .bharness/
│   ├── state.json            # où en est le projet
│   ├── decisions.md          # les décisions que tu as validées
│   ├── memory.md             # la mémoire du projet : préférences, problèmes résolus, à éviter
│   └── feedback/             # journal de retours d'expérience (si tu l'acceptes, jamais versionné)
├── docs/
│   ├── 01-brief.md … 04-architecture.md
│   ├── stories/              # une fiche par fonctionnalité
│   ├── qa/                   # rapports de test et captures
│   └── wiki/                 # comment l'app fonctionne vraiment
├── .github/workflows/ci.yml  # vérifications automatiques
├── src/ …                    # le code de l'application
└── tests/
```

## Stack

Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Supabase (un projet de test, un de production), PWA, Vitest, Playwright, GitHub Actions, Vercel. Le développement et la plupart des tests se font en local ; chaque fonctionnalité est vérifiée sur un environnement de test en ligne avant d'être intégrée.

## Garde-fous

Bharness installe des garde-fous actifs uniquement dans les projets Bharness :

- l'historique Git ne se réécrit jamais (pas de force push, de rebase, de reset --hard) ;
- aucun envoi direct sur `main` : tout passe par une pull request à CI verte ;
- aucun fichier `.env` ni clé secrète dans le code versionné.

## Vie privée

Le journal de retours d'expérience n'est tenu qu'avec ton accord, reste sur ton ordinateur, n'est pas versionné, et rien n'est envoyé automatiquement. `/bharness:feedback` produit un compte rendu que tu choisis, ou non, de partager.

## Développer Bharness

```bash
git clone https://github.com/MartinDeMarcy/bharness
claude --plugin-dir ./bharness/plugins/bharness
claude plugin validate ./bharness
```

Structure du dépôt :

```
.claude-plugin/marketplace.json   # la marketplace (un seul plugin)
plugins/bharness/
├── .claude-plugin/plugin.json
├── agents/        # les onze agents
├── skills/        # les commandes et les savoir-faire (stack, Git, tests, déploiement)
├── reference/     # le parcours et le format du fichier d'état
├── scripts/       # petits outils Node.js (ouvrir une maquette dans le navigateur)
├── templates/     # modèles de documents et de projet
└── hooks/         # garde-fous Git et anti-secrets (Node.js, compatibles Windows)
```

## Remerciements

Bharness s'inspire de l'approche multi-agents de BMad Method. Bharness est un projet indépendant, sans lien avec BMad Code, LLC.

## Licence

[MIT](LICENSE) © 2026 PRAS Martin

# Deploying the Digital Garden

## Overview

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · Markdown content  
**Hosting:** Vercel (recommended — zero-config Next.js deployment)  
**Content workflow:** Write in Obsidian → sync to `content/` → push to GitHub → Vercel auto-deploys

---

## Step 1 — Push to GitHub

```bash
cd jamal-digital-garden

git init
git add .
git commit -m "Initial digital garden"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/jamal-digital-garden.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `jamal-digital-garden` repository
4. Vercel auto-detects Next.js — leave all settings as default
5. Click **Deploy**

Your site will be live at `https://jamal-digital-garden.vercel.app` in ~60 seconds.

### Custom domain

In Vercel → Project → Settings → Domains, add `jamalawil.com` (or your domain).  
Then add these DNS records at your registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## Step 3 — Obsidian Sync Workflow

Your Obsidian vault lives at `~/Documents/Jamal_Awil_Vault/` (PARA structure).  
The garden reads content from `jamal-digital-garden/content/`.

The `sync-vault.sh` script maps vault folders → garden content types:

| Vault folder | → | Garden type |
|---|---|---|
| `60-Outputs/Articles/` | → | `content/essays/` |
| `50-Projects/Mini-Essays/` | → | `content/essays/` |
| `40-Slipbox/42-Zettels/` | → | `content/notes/` |
| `40-Slipbox/43-Literature-Notes/` | → | `content/notes/` |
| `60-Outputs/Episodes/` | → | `content/podcasts/` |

### Publishing a note from Obsidian

1. **Write your note** in Obsidian with the required frontmatter:

```yaml
---
title: "Your Note Title"
description: "A one-line summary"
type: note          # essay | note | pattern | smidgeon | talk | podcast
startDate: "2026-03-14"
updated: "2026-03-14"
growthStage: seedling  # seedling | budding | evergreen
topics: ["Journalism", "Knowledge Management"]
---

Your content here. [[Wikilinks]] to other notes work automatically.
```

2. **Run the sync script** from your terminal:

```bash
cd ~/Documents/Digial\ Garden\ /
bash jamal-digital-garden/sync-vault.sh
```

3. **Commit and push:**

```bash
cd jamal-digital-garden
git add content/
git commit -m "Add: Your Note Title"
git push
```

Vercel will auto-deploy within ~30 seconds. Your note is live.

---

## Step 4 — Automate (optional)

### One-command publish alias

Add this to your `~/.zshrc`:

```bash
alias garden-publish='
  cd ~/Documents/Digial\ Garden\ /
  bash jamal-digital-garden/sync-vault.sh
  cd jamal-digital-garden
  git add content/
  git commit -m "Garden sync $(date +%Y-%m-%d)"
  git push
  echo "✓ Garden published"
'
```

Then just type `garden-publish` in terminal whenever you want to sync.

### Frontmatter cheatsheet

| Field | Values | Required |
|-------|--------|----------|
| `title` | Any string | ✓ |
| `description` | One sentence | — |
| `type` | `essay` `note` `pattern` `smidgeon` `talk` `podcast` `library` `antilibrary` | ✓ |
| `startDate` | `YYYY-MM-DD` | ✓ |
| `updated` | `YYYY-MM-DD` | — |
| `growthStage` | `seedling` `budding` `evergreen` | — |
| `topics` | `["Tag1", "Tag2"]` | — |
| `cover` | URL or `/images/filename.jpg` | — |
| `externalUrl` | URL | — (opens link instead of internal page) |
| `toc` | `false` | — (disables table of contents) |

### Growth stages

- 🌱 **seedling** — rough idea, just planted
- 🌿 **budding** — being actively developed  
- 🌲 **evergreen** — mature, still tended

---

## Content folder structure

```
content/
├── essays/          # Long-form writing
├── notes/           # Loose thoughts
├── patterns/        # Observed patterns
├── smidgeons/       # Links & tiny thoughts
├── talks/           # Conference talks
├── podcasts/        # Podcast appearances
├── library/         # Books you've read
└── antilibrary/     # Books you want to read
```

Each file is a `.md` file with YAML frontmatter + Markdown body.  
Wikilinks (`[[note-name]]`) resolve automatically to internal links.

---

## Updating the site

Any push to `main` on GitHub triggers an automatic Vercel deployment.  
No build commands needed — Vercel handles everything.


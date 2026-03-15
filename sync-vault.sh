#!/bin/bash
# Sync Obsidian vault notes to the digital garden content folder
# Customize the mappings below to match your vault structure

VAULT="$HOME/Documents/Jamal_Awil_Vault"
GARDEN="$(dirname "$0")/content"

echo "Syncing from vault: $VAULT"
echo "To garden content: $GARDEN"
echo ""

# Map vault paths to garden content types
# Add or remove mappings as needed

# Essays: long-form articles and mini-essays
if [ -d "$VAULT/60-Outputs/Articles" ]; then
  echo "Syncing essays..."
  rsync -av --include="*.md" --exclude="*" "$VAULT/60-Outputs/Articles/" "$GARDEN/essays/" 2>/dev/null || echo "(no articles found)"
fi

if [ -d "$VAULT/50-Projects/Mini-Essays" ]; then
  rsync -av --include="*.md" --exclude="*" "$VAULT/50-Projects/Mini-Essays/" "$GARDEN/essays/" 2>/dev/null || echo "(no mini-essays found)"
fi

# Notes: slipbox zettels and literature notes
if [ -d "$VAULT/40-Slipbox/42-Zettels" ]; then
  echo "Syncing notes from zettels..."
  rsync -av --include="*.md" --exclude="*" "$VAULT/40-Slipbox/42-Zettels/" "$GARDEN/notes/" 2>/dev/null || echo "(no zettels found)"
fi

if [ -d "$VAULT/40-Slipbox/43-Literature-Notes" ]; then
  rsync -av --include="*.md" --exclude="*" "$VAULT/40-Slipbox/43-Literature-Notes/" "$GARDEN/notes/" 2>/dev/null || echo "(no literature notes found)"
fi

# Podcasts
if [ -d "$VAULT/60-Outputs/Episodes" ]; then
  echo "Syncing podcasts..."
  rsync -av --include="*.md" --exclude="*" "$VAULT/60-Outputs/Episodes/" "$GARDEN/podcasts/" 2>/dev/null || echo "(no episodes found)"
fi

if [ -d "$VAULT/50-Projects/Podcasts" ]; then
  rsync -av --include="*.md" --exclude="*" "$VAULT/50-Projects/Podcasts/" "$GARDEN/podcasts/" 2>/dev/null || echo "(no podcast notes found)"
fi

echo ""
echo "Sync complete!"
echo "Now add frontmatter to any notes you want to publish."

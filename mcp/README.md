# MCP Guide - GitHub Pages site

A single-page, visual guide to the **Model Context Protocol**: what / why / how, detailed
sequence diagrams, a full 0→100 runtime flow, and 3 case studies.

## Files
- `index.html` - the entire site (self-contained; Mermaid loaded from CDN for diagrams).

## Publish to GitHub Pages

**Option A - project site from a `docs/` or `mcp/` folder**
1. Push this repo to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → branch `main` → folder `/ (root)` (or move this folder
   to `/docs` and pick `/docs`).
4. Your site: `https://<user>.github.io/<repo>/mcp/`

**Option B - dedicated Pages repo**
1. Create a repo named `<user>.github.io`.
2. Put `index.html` at the repo root (or under `mcp/`).
3. It serves at `https://<user>.github.io/` (or `.../mcp/`).

## Local preview
```bash
cd mcp
python3 -m http.server 8000
# open http://localhost:8000
```

> Diagrams render via Mermaid from a CDN, so preview/host with an internet connection.
> To go fully offline, download `mermaid.min.js` locally and update the `<script src>` in `index.html`.

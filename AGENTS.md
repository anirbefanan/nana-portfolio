# Agent Instructions for nanalabs.id

## 1. Project Overview & Architecture
- **Tech Stack:** Static HTML5, custom CSS (`styles.css`, `polish.css`, `enhancements.css`, `brand-system.css`, `labs.css`), vanilla JavaScript (`script.js`). No build tools or frameworks.
- **Hosting:** GitHub Pages via `main` branch root (`nanalabs.id`).
- **Core Routes:** `/`, `/labs.html`, `/labs/orion.html`, `/assets/Nana_Febrina_Resume.pdf`.

## 2. Strict Preservation & Styling Rules
- **Stylesheet Order:** Always preserve existing CSS inclusion order (`brand-system.css` loads last).
- **Design System:** Use approved tokens (`--brand-night`, `--brand-paper`, `--brand-lime` copper/graphite palette). Do not introduce new CSS frameworks or JS libraries.
- **Scope & Safety:** Keep changes minimal and targeted. Never alter navigation links, unrelated sections, or break responsive breakpoints. Never expose internal company or proprietary data.

## 3. Workflow & Deployment
- Changes pushed to `main` automatically deploy live via GitHub Pages.
- Always validate responsive layouts, mobile viewports, and local links before pushing.

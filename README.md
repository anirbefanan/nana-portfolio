# Nana Febrina — Personal Portfolio

A local-first, framework-free portfolio built with semantic HTML, modern CSS, and lightweight JavaScript. Nothing in this folder is published or connected to a domain.

## Preview locally

The simplest option is to open `index.html` in a browser. For a more accurate local preview, open PowerShell in this folder and run:

```powershell
python -m http.server 8000
```

Then open the local preview on port `8000`. Stop the server with `Ctrl+C`.

## Update content and links

- Edit page copy, contact details, metadata, and links in `index.html`.
- Search for `REPLACE:` comments to find all required pre-publish updates.
- Adjust core colors, spacing, typography, and responsive rules in `styles.css`. Executive presentation refinements live in `polish.css`.
- Update the email destination in `script.js` if the contact address changes.

## Update images

- The current hero uses responsive optimized assets at `assets/nana-hero-portrait-20260802-512.jpg` and `assets/nana-hero-portrait-20260802-800.jpg`.
- Alternate supplied photos are saved as `assets/photo-1.jpg` and `assets/photo-3.jpg`.
- Replace any image while preserving the filename, or update its `src` in `index.html`.
- Export final web images as WebP or optimized JPEG, ideally below 300 KB, and provide accurate `width`, `height`, and `alt` values.

## Replace the resume

1. Add the approved PDF to `assets/`, for example `Nana-Febrina-Resume.pdf`.
2. In `index.html`, replace `assets/Nana-Febrina-Resume-PLACEHOLDER.txt` with the PDF filename.
3. Remove the placeholder text file.

## Add or update projects

Each project is an `<article class="project-card">` inside `.project-grid` in `index.html`. Duplicate a complete project article, then update its title, problem, role, solution, approved impact, and methods. Replace the CSS placeholder visual with an approved screenshot using an `<img>` with useful alt text. Never add confidential material or unapproved metrics.

## GitHub upload — only after design approval

1. Create a repository on GitHub.
2. Add the contents of this `portfolio` folder at the repository root.
3. Commit and push the files to the default branch.
4. Verify that `index.html` is at the repository root.

## Enable GitHub Pages later

After approval, open the repository’s **Settings → Pages**, select **Deploy from a branch**, choose the default branch and `/ (root)`, then save. GitHub will provide the public URL after the first build.

## Connect a custom domain later

1. Add the domain in **Settings → Pages → Custom domain**.
2. Add the DNS records shown by GitHub at your domain provider.
3. Wait for DNS verification, then enable **Enforce HTTPS**.
4. Update the canonical URL, Open Graph URL, Schema.org URL, and social preview image in `index.html`.

Do not publish until all placeholder links, approved project outcomes, final resume, privacy wording, SEO URLs, and image permissions have been reviewed.

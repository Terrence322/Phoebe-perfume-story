# Image Quiz Demo

This project is a small interactive page with three questions. Each question displays an image from this repository. The first image contains clickable hotspots (lotus, log and shore stones) that glow when hovered or clicked. User choices are recorded in JavaScript and shown at the end.

Open `index.html` in your browser to try it out.

## GitHub Pages Workflow

This repository uses a GitHub Actions workflow to automatically deploy the site
to GitHub Pages whenever changes are pushed to the `main` branch. The workflow
is defined in `.github/workflows/pages.yml` and relies on the latest versions of
`configure-pages`, `upload-pages-artifact` and `deploy-pages` actions.

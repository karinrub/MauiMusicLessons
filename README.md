# Maui Lessons

React and Vite site for Maui music lessons.

## Local Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
```

## GitHub Pages Deployment

This project is now a Git repository on the local `main` branch.

- GitHub remote: `origin` -> `https://github.com/karinrub/MauiMusicLessons.git`
- GitHub Pages URL: `https://karinrub.github.io/MauiMusicLessons/`
- Deployment workflow: `.github/workflows/deploy-pages.yml`

The repo is configured to deploy with GitHub Actions. On every push to `main`, the workflow builds the site and publishes the `dist` folder to GitHub Pages.

The Vite base path is derived from `GITHUB_REPOSITORY`, so the deployed project page uses `/MauiMusicLessons/` asset paths automatically.

Important: the GitHub repository already has an existing `main` history. Do not force-push this checkout over `origin/main` unless the intent is to replace the existing remote site. Reconcile the histories first when publishing local work to the existing repository.

See `docs/GIT_AND_DEPLOYMENT.md` for the current Git/deployment status.

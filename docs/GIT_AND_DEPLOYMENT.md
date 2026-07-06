# Git and Deployment Status

Date: 2026-07-06

## Current Git Connection

This project is now initialized as a local Git repository.

- Local branch: `main`
- Remote name: `origin`
- Remote URL: `https://github.com/karinrub/MauiMusicLessons.git`
- GitHub repository: `karinrub/MauiMusicLessons`
- GitHub Pages URL: `https://karinrub.github.io/MauiMusicLessons/`

## Important Repository Note

The connected GitHub repository is not empty. Its `main` branch already has existing history and a deployed site setup.

Do not force-push this local checkout over `origin/main` unless the goal is to intentionally replace the existing GitHub repository contents. To publish this local checkout into the existing repo, first reconcile the local history with `origin/main` or move the work through a reviewed branch.

## Deployment Setup

This local checkout includes a GitHub Actions workflow at:

- `.github/workflows/deploy-pages.yml`

The workflow builds the Vite app and deploys `dist` to GitHub Pages on pushes to `main`.

Vite derives its deployed base path from `GITHUB_REPOSITORY`. For the connected repository, the deployed base path is:

- `/MauiMusicLessons/`

This keeps production asset URLs compatible with the GitHub Pages project URL.

## Verification

The production build has been verified locally with the connected GitHub repository name:

```sh
GITHUB_REPOSITORY=karinrub/MauiMusicLessons npm run build
```

That check confirms the app builds with the GitHub Pages base path expected for `karinrub/MauiMusicLessons`.

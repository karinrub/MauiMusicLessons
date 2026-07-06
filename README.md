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

This repo is configured to deploy with GitHub Actions. On every push to `main`, the workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes the `dist` folder to GitHub Pages.

The Vite base path is derived from `GITHUB_REPOSITORY`, so project pages such as `https://karinrub.github.io/maui-lessons/` use the correct asset paths automatically.

After the GitHub repository exists, enable Pages with:

1. Open the repository on GitHub.
2. Go to Settings > Pages.
3. Set Source to GitHub Actions.
4. Push to `main`.

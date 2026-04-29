# Run14 Anime Short Showcase

A static showcase site built from the `run14` anime short case.

The site is intentionally simple and content-first. It focuses on four sections only:

- 剧本
- 分镜图
- 分镜视频
- 最终视频

## Purpose

This project is designed as a public portfolio page for recruiters and interviewers.

Instead of exposing the full original product stack, it presents one finished case in a clean and stable format that can be deployed with GitHub Pages.

## Included content

- the final 20-second video
- two storyboard boards
- two shot-level videos
- the original prompt and short script summary
- curated `run14` assets packaged for static hosting

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages build

If this project is published under a repository subpath, build with:

```bash
SHOWCASE_BASE=/your-repo-name/ npm run build
```

The repository already includes a GitHub Actions workflow for GitHub Pages deployment:

`/.github/workflows/deploy.yml`

## Suggested publish flow

1. Move this folder into its own repository.
2. Push the repository to GitHub on `main`.
3. In GitHub, enable Pages with `GitHub Actions` as the source.
4. Let the included workflow build and publish the site.

## Asset scope

This repository uses a curated subset of `run14` only:

- final video
- selected storyboard images
- selected shot videos
- selected public metadata

The full original frontend, backend, runtime config, and private model setup are intentionally excluded.

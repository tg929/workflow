# AI Anime Workflow Showcase

A recruiter-facing static portfolio site for an `AI anime short creation workflow`.

This site now uses a `portfolio-first` structure instead of a single-case landing page:

- homepage with `1 featured case + 2 supporting cases`
- dedicated detail page for each case
- fixed detail layout:
  - `剧本`
  - `分镜图`
  - `分镜视频`
  - `最终视频`

## Included cases

- `初次觉醒`
- `斩断宿命`
- `重返赛点`

All three cases are packaged as public static assets for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

If the site is published under a GitHub repository subpath:

```bash
SHOWCASE_BASE=/your-repo-name/ npm run build
```

## Deployment

This repository already includes a GitHub Pages workflow:

`/.github/workflows/deploy.yml`

Typical publish flow:

1. Push to `main`
2. Enable `GitHub Actions` as the Pages source
3. Let the included workflow build and deploy the site

## Asset scope

This repository includes only the static assets required by the showcase pages:

- final videos
- storyboard boards
- shot-level videos
- cleaned scripts
- minimal metadata used for rendering

The full original product codebase, backend runtime, and private model configuration are intentionally excluded.

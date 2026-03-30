---
title: Setting up semantic version release in your GitHub repository
description: Utilising github actions to streamline your ci workflow for semantic versioning and releases.
date: 2026-04-12
tags:
  - github
  - ci/cd
---
So I've been tinkering around lately about how can I reduce the amount repeated manual setup required for certain things. One use-case that I've implemented is that how you can make you software releases automatic, and according to the changes that you commit. It's an interesting concepts where the changes being introduced are done by analyzing your commit messages and generating release notes and a `changelog` too.

So now, the big question is, how can you achieve the same?

I'll be walking you through the steps on how you can setup your own release CI using GitHub Actions.

The steps are as follows:

1. identify what kind of package manager you have. Different package managers will have different configurations. I'll be providing examples for npm and pnpm as I've set-up those in my two different projects.

2. Create a `.releaserc.json` file in your root directory. This will be used to manage and install the packages and plugins required in the workflow.

for npm:
```js
{
  "branches": [
    "main",
    {
      "name": "next",
      "prerelease": true
    }
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "package-lock.json",
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

for pnpm:
```js
{
  "branches": [
    "main",
    {
      "name": "next",
      "prerelease": true
    }
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@anolilab/semantic-release-pnpm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "pnpm install --no-frozen-lockfile"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "pnpm-lock.yaml",
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} \n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

In this config, we're using two plugins mainly `@semantic-release/commit-analyzer` to analyze the commit(s) and `@semantic-release/release-notes-generator` to generate the release notes with each version release.

3. After creating the `.releaserc.json` file, create `release.yaml` file in this location: `.github/workflows/release.yaml`. This will serve as the source of truth by your GitHub Action which will work on every commit.

For npm:
```yaml
name: Semantic Release

on:
  push:
    branches:
      - main
      - next
      - next-major
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  packages: write
  issues: write


jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: "npm"

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm ci

      # Step 4: Run tests (optional but recommended)
      - name: Run tests
        run: npm run test --if-present

      # Step 5: Build the project
      - name: Build
        run: npm run build --if-present

      # Step 6: Run semantic-release
      - name: Release
        uses: cycjimmy/semantic-release-action@v5
        id: semantic
        with:
          semantic_version: 24
          extra_plugins: |
            @semantic-release/changelog@v6
            @semantic-release/git@v10
            @semantic-release/github@v12
          branches: |
            [
              '+([0-9])?(.{+([0-9]),x}).x',
              'main',
              'next',
              {name: 'next-major', prerelease: 'major'},
              {name: 'beta', prerelease: true},
              {name: 'alpha', prerelease: true}
            ]
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          RUNNER_DEBUG: 1

      - name: Output release info
        if: steps.semantic.outputs.new_release_published == 'true'
        run: |
          echo "Release Version: ${{ steps.semantic.outputs.new_release_version }}"
          echo "Release Published: ${{ steps.semantic.outputs.new_release_published }}"
          echo "Release Notes: ${{ steps.semantic.outputs.new_release_notes }}"

      # using vercel to deploy
      # - name: Deploy to production
      #   if: steps.semantic.outputs.new_release_published == 'true'
      #   run: npm run deploy --if-present
      #   env:
      #     DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

For pnpm:
```yaml
name: Semantic Release

on:
  push:
    branches:
      - main
      - next
      - next-major
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  packages: write
  issues: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: "10.30.3"
          run_install: false

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: "pnpm"

      # Step 3: Install dependencies
      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # Step 4: Run semantic-release
      - name: Release
        uses: cycjimmy/semantic-release-action@v5
        id: semantic
        with:
          semantic_version: 24
          extra_plugins: |
            @semantic-release/changelog@v6
            @semantic-release/git@v10
            @semantic-release/github@v12
            @semantic-release/exec@v6
            @anolilab/semantic-release-pnpm@v5
          branches: |
            [
              '+([0-9])?(.{+([0-9]),x}).x',
              'main',
              'next',
              {name: 'next-major', prerelease: 'major'},
              {name: 'beta', prerelease: true},
              {name: 'alpha', prerelease: true}
            ]
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          RUNNER_DEBUG: 1

      - name: Output release info
        if: steps.semantic.outputs.new_release_published == 'true'
        run: |
          echo "Release Version: ${{ steps.semantic.outputs.new_release_version }}"
          echo "Release Published: ${{ steps.semantic.outputs.new_release_published }}"
          echo "Release Notes: ${{ steps.semantic.outputs.new_release_notes }}"

      # using vercel to deploy
      # - name: Deploy to production
      #   if: steps.semantic.outputs.new_release_published == 'true'
      #   run: npm run deploy --if-present
      #   env:
      #     DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

By the time you're reading this, some packages may have newer versions so kindly update it accordingly.

4. Enable this setting in your repository settings:
  - Repo settings --> Actions --> General --> Scroll down to `Workflow Permission` and select `Read and write permissions`. This will allow your github action runner write comments on your PR/issue about releases, and make the `CHANGELOG.md` file.

5. Now your workflow is ready to be tested. Push all your changes to your GitHub repository.
6. Open the `Actions` on GitHub to see where the workflow is running. Watch for any errors and debug as per the error message.
7. Voila! Enjoy your seamless workflow!

---

Re-iterating _(in short)_ what the documentation says about how to write your commit messages: 

MAJOR.MINOR.PATCH

eg: 2.0.6
1. MAJOR: any breaking changes. The commit description must have the phrase "BREAKING CHANGE" 
2. MINOR: for any feature release. Use this format "feat: your commit msg" to trigger feature release.
3. PATCH: for any quick fixes. Use this format "fix: pipeline"

For a more detailed read about these, [refer here](https://github.com/semantic-release/semantic-release#commit-message-format)

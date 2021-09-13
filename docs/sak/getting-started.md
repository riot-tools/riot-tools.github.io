---
id: sak-getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /sak/getting-started
---

## Swiss Army Knife

This library holds miscellaneous tools to be used throughout your project. They are aimed at making build Riot apps a bit simpler.

```bash
npm i --save @riot-tools/sak
```

Features:

- **[Observable:](observable):** Refactored and extend observable based off of `@riotjs/observable`. Virtually the same API, but with a bit more feature.
- **[Options Validator](options-validator):** A very simple schema validator for ensuring proper option are passed into your components.
- **[Queryable](queryable):** Adds an opinionated async fetch lifecycle to your components to more easily manage fetching APIs, loaders, error capturing, etc.
- **[Meta](meta):** Build Riot hooks that stack on top of other HOC functions that may also implement hooks, and more!

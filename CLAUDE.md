# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

- **Remote:** https://github.com/clean-globe/cgi.git
- **Branch:** `sampath`

## Running the app

There is no build step. Open `index.html` directly in a browser — all dependencies (React 18, Babel standalone) are loaded from CDN. The JSX component files are transpiled in-browser by Babel.

For local development, you can also use `Products Information.html` (same file, alternate name for reference).

## Architecture

This is a multi-step certification application for the CGi textile certification system. It is a single-page React app delivered as plain HTML + JSX files with no bundler.

### Screen flow

```
Products Information → Sites Information → Overview
```

State is managed in `Products Information.html` via a `screen` string (`'products'` | `'sites'` | `'review'`). The stepper shows four steps: **Basic** (prior step, not navigable here) → **Products** → **Sites** → **Overview**.

All state is persisted to `localStorage` under the key `cgi.detailedApp.v1` so data survives tab navigation.

### File responsibilities

| File | Role |
|---|---|
| `Products Information.html` | Entry point. Renders `DetailedApplication`, which owns all state (`products`, `sites`, `screen`) and wires the three screens together. |
| `components/data.js` | Plain JS (no JSX). Defines `window.CGI_OPTIONS` (dropdown option lists), `window.CGI_FIELDS` (Products screen field config), and `window.CGI_SITE_FIELDS` (Sites screen field config). **All dropdown options live here.** |
| `components/ds.jsx` | Design system. Exports all shared styles (`hfStyles`), icons, and primitives (`HFMultiSelect`, `HFSingleSelect`, `HFStepper`, `HFPageShell`) via `Object.assign(window, …)`. |
| `components/hifi.jsx` | Products screen (`HFProducts`). |
| `components/sites.jsx` | Sites screen (`HFSites` + `HFSiteForm`). Enforces the one-"Main"-site-type constraint. |
| `components/review.jsx` | Overview screen (`HFReview`). Read-only summary tables for products and sites. |

### Global variable pattern

Because Babel standalone loads each JSX file independently (no ES module system), components share state through `window` globals:

- `window.CGI_OPTIONS`, `window.CGI_FIELDS`, `window.CGI_SITE_FIELDS` — set by `data.js`, consumed by all screens
- `window.hfStyles`, `window.HFMultiSelect`, etc. — set by `ds.jsx`, consumed by screen components
- `window.HFProducts`, `window.HFSites`, `window.HFReview` — set by screen files, consumed by the inline app script in the HTML

Script load order in the HTML therefore matters: `data.js` → `ds.jsx` → `hifi.jsx` → `sites.jsx` → `review.jsx` → inline app script.

### Business rules

- **Claimed Materials** uses a compound input (not a simple multi-select): the user picks one value from a **Raw Material** dropdown and one from an **Attribute** dropdown, then clicks **Add**. Each added entry is stored as the string `"<attribute> <rawMaterial>"` (e.g. `"atr3 rm1"`) in the `claimedMaterials` array. Options live in `CGI_OPTIONS.rawMaterial` and `CGI_OPTIONS.attribute` in `data.js`.
- **Applying Standards** selected on the Products screen are the only options available in the Standards dropdown on the Sites screen. If a standard is removed from Products, it is automatically pruned from all saved sites.
- **Only one site** can have `Site Type = "Main"`. The option is hidden in all other site forms once one site claims it.
- All four Products fields and all five Sites fields are required before a site can be saved or the flow can advance.

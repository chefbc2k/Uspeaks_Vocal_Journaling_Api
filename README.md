# vocal-journaling-builder-sdk

Builder-facing SDK and public contracts for integrating with the Vocal Journaling platform without coupling to the private application repository.

## Purpose

This repository contains only public-safe, reusable builder-facing code and documentation.
It excludes internal platform implementation, infrastructure, prompts, operational tooling, and private architecture.

## What Is Included

- Public API client helpers
- Public request and response contracts
- Builder-safe examples with placeholder values
- Tests for the exported surface

## What Is Not Included

- Internal services and orchestration
- Deployment and infrastructure code
- Secrets, environment-specific credentials, and operational docs
- Proprietary prompts, analytics internals, and company-specific workflows

## Installation

```bash
pnpm install
```

## Quick Start

```ts
import { createClient } from "vocal-journaling-builder-sdk";

const client = createClient({
  baseUrl: "https://api.example.com",
  apiKey: "replace-with-builder-key",
});
```

## Configuration

Copy `.env.example` only for local examples and supply your own builder-safe values.
Never commit real credentials.

## Compatibility

This repository evolves intentionally alongside the private platform, but it remains an independent repository with separate Git history and release lifecycle.

Compatibility target:
- Platform API contract: `v1.x`

## Development

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
```

## Initial Git Setup

```bash
git init -b main
git remote add origin git@github.com:YOUR_ORG/vocal-journaling-builder-sdk.git
git push -u origin main
```

## Repository Boundary

See `SECURITY.md` for the explicit boundary on what may and may not be included here.

## Release Process

- Curate builder-safe changes from the private platform repository.
- Re-author or copy only the public surface.
- Run `pnpm check` before each release.
- Keep commit messages and changelog entries external-facing.

## Relationship To The Private Platform

This repository is a companion repository. It can evolve in lockstep conceptually with the private platform, but it does not share Git history, remote configuration, or internal implementation details.

## License

`UNLICENSED` by default. Replace this only when you decide the distribution terms for external builders.

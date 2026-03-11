# Security Boundary Checklist

This repository is intended to be safe to share with external builders. The boundary is strict.

## Must Never Be Copied Here

- `.env`, `.env.*`, service-role keys, API tokens, signed URLs, SSH material, certificates
- Internal docs, architecture notes, runbooks, implementation plans, or private wiki exports
- Internal prompts, orchestration logic, agent configs, memory configs, or model-routing logic
- Deployment scripts, container configs, infra manifests, gateway setup, or cloud wiring
- Database migrations, private schema details, or non-public tables and columns
- Analytics secrets, telemetry internals, and private event taxonomies
- Real user data, real voice recordings, transcripts, or production-derived fixtures
- Company-specific feature flags, roadmap notes, internal issue IDs, and private repository references

## Pre-Publish Review

Run these checks before every push intended for external sharing:

```bash
git grep -nE '(SUPABASE|MEMORI|ZUPLO|DIGITALOCEAN|API_KEY|SECRET|TOKEN|PRIVATE|INTERNAL)'
test ! -f .env
```

Manual review is also required:

- Confirm README content stays builder-facing
- Confirm examples use placeholders only
- Confirm commit history is public-safe and external-facing
- Confirm no copied file still contains internal names, URLs, or comments

## Disclosure Policy

If a secret or private file is accidentally committed here, rotate the secret first, then rewrite the repository history before any public release.

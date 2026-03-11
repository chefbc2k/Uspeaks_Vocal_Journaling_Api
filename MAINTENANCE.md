# Maintenance Workflow

## Operating Model

Use intentional manual sync. Do not share Git history with the private platform repository.

## Update Flow

1. Identify a builder-safe change in the private repository.
2. Copy or re-author only the public surface into this repository.
3. Remove internal names, URLs, comments, and credentials before staging.
4. Run `pnpm check`.
5. Run the boundary review in `SECURITY.md`.
6. Commit with an external-facing message.
7. Tag and release independently from the private platform repository.

## Compatibility Tracking

- Track compatibility in README or release notes with a contract version such as `v1.x`.
- Do not reference private commit SHAs or private pull requests.

## Sync Discipline

- Prefer curated batch updates over continuous mirroring.
- Re-author heavily sanitized files instead of copying them verbatim.
- Never cherry-pick private commits wholesale into this repository.

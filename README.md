# USpeaks Vocal Journaling API

<p align="center">
  <img src="./docs/assets/uspeakslogov1.png" alt="USpeaks logo" width="220" />
</p>

<p align="center">
  Public TypeScript SDK and API contracts for teams integrating voice journaling into USpeaks.
</p>

<p align="center">
  <a href="./docs/SETUP.md">Setup Guide</a>
  ·
  <a href="./SECURITY.md">Security Boundary</a>
  ·
  <a href="./MAINTENANCE.md">Maintenance Workflow</a>
</p>

<p align="center">
  <img src="./docs/assets/uspeaks_black_background.png" alt="USpeaks brand artwork" width="420" />
</p>

USpeaks helps teams collect and process spoken journal entries through a clean, builder-friendly API surface.

## Overview

This repository is the public integration layer for the USpeaks Vocal Journaling platform. It gives external teams a stable SDK and typed contracts for submitting entries without exposing private platform code, infrastructure, or internal workflows.

## Who It’s For

- Product teams adding voice journaling to their applications
- Engineering teams building direct integrations with USpeaks
- Partners or agencies implementing custom ingestion workflows
- Internal teams who need a public-safe reference package for external builders

If you need the private platform implementation, this is the wrong repository. If you need the public contract and a clean SDK surface, this is the right one.

## What’s Included

| Area | Included here |
| --- | --- |
| SDK | A TypeScript client for the public API |
| Contracts | Public request and response types |
| Examples | Builder-safe Node and `curl` examples |
| Validation | Minimal request/config validation helpers |
| Governance | Setup, maintenance, and security-boundary docs |

## API Surface

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Confirms the API is reachable and returns a version |
| `POST` | `/v1/journal-entries` | Accepts a voice journal entry upload request |

### Request shape

```ts
interface VoiceJournalUploadRequest {
  fileName: string;
  contentType: string;
  audioBase64: string;
  metadata?: Record<string, string>;
}
```

### Response shape

```ts
interface VoiceJournalUploadResponse {
  entryId: string;
  status: "accepted";
}
```

## Quick Start

### Install

```bash
pnpm add vocal-journaling-builder-sdk
```

### Use the SDK

```ts
import { createClient } from "vocal-journaling-builder-sdk";

const client = createClient({
  baseUrl: process.env.VOCAL_JOURNALING_API_BASE_URL ?? "https://api.example.com",
  apiKey: process.env.VOCAL_JOURNALING_API_KEY,
});

const health = await client.getHealth();

const upload = await client.uploadEntry({
  fileName: "sample.m4a",
  contentType: "audio/mp4",
  audioBase64: "ZmFrZS1hdWRpby1ieXRlcw==",
  metadata: {
    source: "partner-demo",
  },
});

console.log({ health, upload });
```

### Call the API directly

```bash
curl --request POST \
  --url "${VOCAL_JOURNALING_API_BASE_URL}/v1/journal-entries" \
  --header "Authorization: Bearer ${VOCAL_JOURNALING_API_KEY}" \
  --header "Content-Type: application/json" \
  --data '{
    "fileName": "sample.m4a",
    "contentType": "audio/mp4",
    "audioBase64": "ZmFrZS1hdWRpby1ieXRlcw==",
    "metadata": {
      "source": "example"
    }
  }'
```

## Configuration

```bash
VOCAL_JOURNALING_API_BASE_URL=https://api.example.com
VOCAL_JOURNALING_API_KEY=replace-with-builder-key
```

Use builder-safe values only. Copy `.env.example` for local examples and never commit real credentials.

## Documentation

- [Repository Setup Guide](./docs/SETUP.md)
- [Security Boundary Checklist](./SECURITY.md)
- [Maintenance Workflow](./MAINTENANCE.md)
- [Node example](./examples/node-basic/index.ts)
- [cURL example](./examples/curl/upload-entry.sh)

## Repository Boundary

This repository is intentionally public-safe. It does not include internal services, infrastructure, private prompts, operational tooling, or production data. Review [SECURITY.md](./SECURITY.md) before publishing changes.

## Development

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
```

Or run the full verification flow:

```bash
pnpm check
```

## Compatibility

This package tracks the public USpeaks API contract independently from the private platform repository.

Compatibility target: `v1.x`

## Release Process

1. Curate builder-safe changes from the private platform.
2. Remove internal names, URLs, comments, and credentials.
3. Run `pnpm check`.
4. Review the publishing boundary in [SECURITY.md](./SECURITY.md).
5. Publish only external-facing documentation and examples.

## License

`UNLICENSED`

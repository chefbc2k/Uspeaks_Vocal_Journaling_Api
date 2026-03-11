# USpeaks Vocal Journaling API

<p align="center">
  <img src="./docs/assets/uspeakslogov1.png" alt="USpeaks logo" width="220" />
</p>

<p align="center">
  Voice-first journaling infrastructure for capturing recordings, analyzing how people speak, and powering chat, coaching, insights, and history experiences through a single API.
</p>

<p align="center">
  <a href="https://journal-api-layer-main-22c4b17.zuplo.site/api">Developer Portal</a>
  ·
  <a href="https://journal-api-layer-main-22c4b17.zuplo.site/signin">Sign In</a>
  ·
  <a href="https://journal-api-layer-main-22c4b17.zuplo.app">API Base URL</a>
  ·
  <a href="./docs/SETUP.md">Repo Setup</a>
</p>

## What This API Does

The USpeaks Vocal Journaling API turns voice entries into structured, usable product data.

Developers can use it to:

- upload a recording and receive transcript, sentiment, voice dynamics, and analysis metadata,
- power conversational experiences on top of prior entries,
- generate coaching prompts and guidance,
- surface aggregate insights across a user’s recordings,
- retrieve recent history for timeline and journal views.

This repository contains the typed client, public contracts, examples, and tests that map to the live gateway and developer portal.

## What You Can Build

- Voice journal capture flows
- Reflection and check-in products
- Coaching and habit-building experiences
- Insight dashboards and trend views
- Searchable history and recap surfaces

## Authentication Model

There are two developer-facing layers in the current platform:

### 1. Developer portal access

Developers sign into the portal at [journal-api-layer-main-22c4b17.zuplo.site/signin](https://journal-api-layer-main-22c4b17.zuplo.site/signin) to access the hosted documentation and manage developer-facing API keys in Zuplo.

### 2. App request authentication

Protected application routes currently require a Supabase user access token:

```http
Authorization: Bearer <supabase-user-jwt>
```

Today, the portal and API key management layer does not replace end-user identity for voice, chat, coaching, insights, or history calls. Those routes are still user-scoped.

## Endpoint Overview

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Liveness and version check |
| `POST` | `/api/v1/voice` | Supabase JWT | Upload a recording for transcript + voice analysis |
| `POST` | `/api/v1/chat` | Supabase JWT | Analyze or respond to freeform text |
| `POST` | `/api/v1/coaching` | Supabase JWT | Return coaching guidance and a follow-up question |
| `GET` | `/api/v1/insights` | Supabase JWT | Aggregate insights over `day`, `week`, or `month` |
| `GET` | `/api/v1/history` | Supabase JWT | Fetch recent recording history with `limit` and `days` filters |

Full route details and response schemas live in the [Developer Portal](https://journal-api-layer-main-22c4b17.zuplo.site/api).

## Quick Start

### Upload a recording

```bash
curl --request POST \
  --url "https://journal-api-layer-main-22c4b17.zuplo.app/api/v1/voice" \
  --header "Authorization: Bearer $SUPABASE_JWT" \
  --form "audio=@./recording.wav"
```

Example response:

```json
{
  "id": "analysis-1",
  "transcript": "Hello, this is the transcript.",
  "sentiment": { "overall": "neutral", "score": 0.1 },
  "voiceType": "steady",
  "createdAt": "2026-03-07T00:00:00.000Z"
}
```

### Use the TypeScript client

```ts
import { createClient } from "vocal-journaling-builder-sdk";

const client = createClient({
  baseUrl: "https://journal-api-layer-main-22c4b17.zuplo.app",
  accessToken: process.env.VOCAL_JOURNALING_ACCESS_TOKEN,
});

const analysis = await client.uploadVoice({
  audio: file,
  fileName: "entry.wav",
  contentType: "audio/wav",
});

const insights = await client.getInsights({ period: "week" });
```

### Query insights

```bash
curl --header "Authorization: Bearer $SUPABASE_JWT" \
  "https://journal-api-layer-main-22c4b17.zuplo.app/api/v1/insights?period=week"
```

## Public SDK Surface

This package exposes typed helpers for the live gateway routes:

- `getHealth()`
- `uploadVoice()`
- `chat()`
- `getCoaching()`
- `getInsights()`
- `getHistory()`

Relevant public types include:

- `VoiceUploadRequest`
- `VoiceAnalysisResponse`
- `TextPayload`
- `ChatResponse`
- `CoachingResponse`
- `InsightsResponse`
- `HistoryResponse`
- `ErrorResponse`

## Developer Resources

- [Developer Portal](https://journal-api-layer-main-22c4b17.zuplo.site/api)
- [Developer Sign-In](https://journal-api-layer-main-22c4b17.zuplo.site/signin)
- [API Base URL](https://journal-api-layer-main-22c4b17.zuplo.app)
- [Repository setup guide](./docs/SETUP.md)
- [Maintenance notes](./MAINTENANCE.md)
- [Security policy](./SECURITY.md)
- [Node example](./examples/node-basic/index.ts)
- [cURL upload example](./examples/curl/upload-entry.sh)

## Local Development

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
```

Run the full verification loop with:

```bash
pnpm check
```

Copy the sample environment file for local examples:

```bash
cp .env.example .env
```

```bash
VOCAL_JOURNALING_API_BASE_URL=https://journal-api-layer-main-22c4b17.zuplo.app
VOCAL_JOURNALING_ACCESS_TOKEN=replace-with-supabase-user-jwt
```

## License

`UNLICENSED`

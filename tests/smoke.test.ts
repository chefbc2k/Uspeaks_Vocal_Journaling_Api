import { afterEach, describe, expect, it, vi } from "vitest";

import { BuilderApiError, createClient } from "../src/index.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("createClient", () => {
  it("requires a base URL", () => {
    expect(() => createClient({ baseUrl: "" })).toThrow("baseUrl is required");
  });

  it("sends authenticated JSON requests to documented routes", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ response: "ok" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    globalThis.fetch = fetchMock as typeof fetch;

    const client = createClient({
      baseUrl: "https://journal-api-layer-main-22c4b17.zuplo.app",
      accessToken: "supabase-user-jwt",
    });

    await client.chat({ text: "How did I sound today?" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as unknown as [URL, RequestInit];

    expect(requestUrl.toString()).toBe(
      "https://journal-api-layer-main-22c4b17.zuplo.app/api/v1/chat"
    );

    const headers = new Headers(requestInit.headers);
    expect(headers.get("authorization")).toBe("Bearer supabase-user-jwt");
    expect(headers.get("content-type")).toBe("application/json");
  });

  it("uses multipart form data for voice uploads", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ id: "analysis-1", transcript: "hi", createdAt: "2026-03-07T00:00:00.000Z" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    globalThis.fetch = fetchMock as typeof fetch;

    const client = createClient({
      baseUrl: "https://journal-api-layer-main-22c4b17.zuplo.app",
    });

    await client.uploadVoice({
      audio: new Uint8Array([1, 2, 3]),
      fileName: "sample.wav",
      contentType: "audio/wav",
    });

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as unknown as [URL, RequestInit];

    expect(requestUrl.toString()).toBe(
      "https://journal-api-layer-main-22c4b17.zuplo.app/api/v1/voice"
    );
    expect(requestInit.body).toBeInstanceOf(FormData);

    const headers = new Headers(requestInit.headers);
    expect(headers.get("content-type")).toBeNull();
  });

  it("validates documented query constraints", async () => {
    const client = createClient({
      baseUrl: "https://journal-api-layer-main-22c4b17.zuplo.app",
    });

    expect(() => client.getInsights({ period: "year" as never })).toThrow(
      "period must be day, week, or month"
    );
    expect(() => client.getHistory({ limit: 0 })).toThrow(
      "limit must be an integer between 1 and 100"
    );
  });

  it("surfaces structured API errors", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ error: "Audio file is required", code: "MISSING_FILE", requestId: "req-123" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
    );
    globalThis.fetch = fetchMock as typeof fetch;

    const client = createClient({
      baseUrl: "https://journal-api-layer-main-22c4b17.zuplo.app",
    });

    await expect(client.uploadVoice({ audio: new Uint8Array([1]) })).rejects.toMatchObject({
      name: "BuilderApiError",
      status: 400,
      code: "MISSING_FILE",
      requestId: "req-123",
      message: "Audio file is required",
    } satisfies Partial<BuilderApiError>);
  });
});

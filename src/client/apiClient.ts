import type {
  VocalJournalingClientConfig,
  ChatResponse,
  CoachingResponse,
  CoachingTextPayload,
  ErrorResponse,
  HealthResponse,
  HistoryQuery,
  HistoryResponse,
  InsightsQuery,
  InsightsResponse,
  TextPayload,
  VoiceAnalysisResponse,
  VoiceUploadRequest,
} from "../types/public.js";
import {
  assertValidCoachingPayload,
  assertValidConfig,
  assertValidHistoryQuery,
  assertValidInsightsQuery,
  assertValidTextPayload,
  assertValidVoiceUploadRequest,
} from "../utils/validation.js";

export class VocalJournalingApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly requestId?: string;

  constructor(status: number, payload: ErrorResponse | undefined) {
    super(payload?.error ?? `Request failed with status ${status}`);
    this.name = "VocalJournalingApiError";
    this.status = status;
    this.code = payload?.code;
    this.requestId = payload?.requestId;
  }
}

export interface VocalJournalingClient {
  getHealth(): Promise<HealthResponse>;
  uploadVoice(request: VoiceUploadRequest): Promise<VoiceAnalysisResponse>;
  chat(request: TextPayload): Promise<ChatResponse>;
  getCoaching(request?: CoachingTextPayload): Promise<CoachingResponse>;
  getInsights(query?: InsightsQuery): Promise<InsightsResponse>;
  getHistory(query?: HistoryQuery): Promise<HistoryResponse>;
}

function toBlob(audio: VoiceUploadRequest["audio"], contentType?: string): Blob {
  if (audio instanceof Blob) {
    return audio;
  }

  if (audio instanceof ArrayBuffer) {
    return new Blob([audio], { type: contentType });
  }

  if (audio instanceof Uint8Array) {
    const bytes = new Uint8Array(audio.byteLength);
    bytes.set(audio);
    return new Blob([bytes], { type: contentType });
  }

  throw new Error("audio must be a Blob, ArrayBuffer, or Uint8Array");
}

function withQuery(path: string, params?: Array<[string, string | number | undefined]>): string {
  const url = new URL(path, "https://placeholder.local");

  for (const [key, value] of params ?? []) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return `${url.pathname}${url.search}`;
}

export function createClient(config: VocalJournalingClientConfig): VocalJournalingClient {
  assertValidConfig(config);

  function createHeaders(init?: HeadersInit): Headers {
    const headers = new Headers(init);

    if (config.accessToken) {
      headers.set("authorization", `Bearer ${config.accessToken}`);
    }

    return headers;
  }

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(new URL(path, config.baseUrl), {
      ...init,
      headers: createHeaders(init?.headers),
      signal: AbortSignal.timeout(config.timeoutMs ?? 10_000),
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? ((await response.json()) as T | ErrorResponse) : undefined;

    if (!response.ok) {
      throw new VocalJournalingApiError(response.status, payload as ErrorResponse | undefined);
    }

    return payload as T;
  }

  return {
    getHealth() {
      return request<HealthResponse>("/health");
    },
    uploadVoice(payload) {
      assertValidVoiceUploadRequest(payload);

      const form = new FormData();
      const blob = toBlob(payload.audio, payload.contentType);
      form.append("audio", blob, payload.fileName ?? "recording.wav");

      return request<VoiceAnalysisResponse>("/api/v1/voice", {
        method: "POST",
        body: form,
      });
    },
    chat(payload) {
      assertValidTextPayload(payload);

      return request<ChatResponse>("/api/v1/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    getCoaching(payload = {}) {
      assertValidCoachingPayload(payload);

      return request<CoachingResponse>("/api/v1/coaching", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    getInsights(query = {}) {
      assertValidInsightsQuery(query);

      return request<InsightsResponse>(withQuery("/api/v1/insights", [["period", query.period]]));
    },
    getHistory(query = {}) {
      assertValidHistoryQuery(query);

      return request<HistoryResponse>(
        withQuery("/api/v1/history", [
          ["limit", query.limit],
          ["days", query.days],
        ])
      );
    },
  };
}

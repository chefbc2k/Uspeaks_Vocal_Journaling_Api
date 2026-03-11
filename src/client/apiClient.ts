import type {
  BuilderClientConfig,
  HealthResponse,
  VoiceJournalUploadRequest,
  VoiceJournalUploadResponse,
} from "../types/public.js";
import { assertValidConfig, assertValidUploadRequest } from "../utils/validation.js";

export interface BuilderClient {
  getHealth(): Promise<HealthResponse>;
  uploadEntry(request: VoiceJournalUploadRequest): Promise<VoiceJournalUploadResponse>;
}

export function createClient(config: BuilderClientConfig): BuilderClient {
  assertValidConfig(config);

  const headers = new Headers({
    "content-type": "application/json",
  });

  if (config.apiKey) {
    headers.set("authorization", `Bearer ${config.apiKey}`);
  }

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(new URL(path, config.baseUrl), {
      ...init,
      headers,
      signal: AbortSignal.timeout(config.timeoutMs ?? 10_000),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  return {
    getHealth() {
      return request<HealthResponse>("/health");
    },
    uploadEntry(payload) {
      assertValidUploadRequest(payload);

      return request<VoiceJournalUploadResponse>("/v1/journal-entries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  };
}

export interface BuilderClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeoutMs?: number;
}

export interface VoiceJournalUploadRequest {
  fileName: string;
  contentType: string;
  audioBase64: string;
  metadata?: Record<string, string>;
}

export interface VoiceJournalUploadResponse {
  entryId: string;
  status: "accepted";
}

export interface HealthResponse {
  ok: true;
  version: string;
}

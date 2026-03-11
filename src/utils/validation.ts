import type { BuilderClientConfig, VoiceJournalUploadRequest } from "../types/public.js";

export function assertValidConfig(config: BuilderClientConfig): void {
  if (!config.baseUrl) {
    throw new Error("baseUrl is required");
  }
}

export function assertValidUploadRequest(request: VoiceJournalUploadRequest): void {
  if (!request.fileName || !request.contentType || !request.audioBase64) {
    throw new Error("fileName, contentType, and audioBase64 are required");
  }
}

import type { HealthResponse, VoiceJournalUploadResponse } from "../types/public.js";

export interface BuilderApiResponseMap {
  health: HealthResponse;
  uploadEntry: VoiceJournalUploadResponse;
}

import type {
  CoachingTextPayload,
  HistoryQuery,
  InsightsQuery,
  TextPayload,
  VoiceUploadRequest,
} from "../types/public.js";

export interface BuilderApiRequestMap {
  uploadVoice: VoiceUploadRequest;
  chat: TextPayload;
  coaching: CoachingTextPayload;
  insights: InsightsQuery;
  history: HistoryQuery;
}

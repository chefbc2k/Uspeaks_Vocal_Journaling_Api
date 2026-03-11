import type {
  CoachingTextPayload,
  HistoryQuery,
  InsightsQuery,
  TextPayload,
  VoiceUploadRequest,
} from "../types/public.js";

export interface VocalJournalingApiRequestMap {
  uploadVoice: VoiceUploadRequest;
  chat: TextPayload;
  coaching: CoachingTextPayload;
  insights: InsightsQuery;
  history: HistoryQuery;
}

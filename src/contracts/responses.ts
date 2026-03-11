import type {
  ChatResponse,
  CoachingResponse,
  HealthResponse,
  HistoryResponse,
  InsightsResponse,
  VoiceAnalysisResponse,
} from "../types/public.js";

export interface VocalJournalingApiResponseMap {
  health: HealthResponse;
  uploadVoice: VoiceAnalysisResponse;
  chat: ChatResponse;
  coaching: CoachingResponse;
  insights: InsightsResponse;
  history: HistoryResponse;
}

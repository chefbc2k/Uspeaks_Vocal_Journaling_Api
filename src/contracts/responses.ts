import type {
  ChatResponse,
  CoachingResponse,
  HealthResponse,
  HistoryResponse,
  InsightsResponse,
  VoiceAnalysisResponse,
} from "../types/public.js";

export interface BuilderApiResponseMap {
  health: HealthResponse;
  uploadVoice: VoiceAnalysisResponse;
  chat: ChatResponse;
  coaching: CoachingResponse;
  insights: InsightsResponse;
  history: HistoryResponse;
}

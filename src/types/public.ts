export interface BuilderClientConfig {
  baseUrl: string;
  accessToken?: string;
  timeoutMs?: number;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  requestId?: string;
}

export interface HealthResponse {
  status: "ok";
  version?: string;
}

export type BinaryLike = Blob | ArrayBuffer | Uint8Array;

export interface VoiceUploadRequest {
  audio: BinaryLike;
  fileName?: string;
  contentType?: string;
}

export interface VoiceAnalysisResponse {
  id: string;
  transcript: string;
  sentiment?: Record<string, unknown>;
  voiceType?: string;
  dynamics?: Record<string, unknown>;
  duration?: number;
  features?: Record<string, unknown>;
  classifications?: Record<string, unknown>;
  nlpAnalysis?: Record<string, unknown>;
  createdAt: string;
  processingTime?: number;
  notification?: string | null;
}

export interface TextPayload {
  text: string;
  context?: Record<string, unknown>;
}

export interface CoachingTextPayload {
  text?: string;
  context?: Record<string, unknown>;
}

export interface ChatResponse {
  response: string;
}

export interface CoachingResponse {
  advice: string;
  question: string;
}

export type InsightsPeriod = "day" | "week" | "month";

export interface InsightsQuery {
  period?: InsightsPeriod;
}

export interface InsightsResponse {
  summary: Record<string, unknown> | null;
  milestone?: string | null;
  tips: string[];
}

export interface HistoryItem {
  id: string;
  createdAt: string;
  transcript: string;
  duration?: number;
  sentiment?: string | number | null;
}

export interface HistoryQuery {
  limit?: number;
  days?: number;
}

export interface HistoryResponse {
  history: HistoryItem[];
}

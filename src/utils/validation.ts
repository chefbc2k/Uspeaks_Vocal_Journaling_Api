import type {
  VocalJournalingClientConfig,
  CoachingTextPayload,
  HistoryQuery,
  InsightsQuery,
  TextPayload,
  VoiceUploadRequest,
} from "../types/public.js";

export function assertValidConfig(config: VocalJournalingClientConfig): void {
  if (!config.baseUrl) {
    throw new Error("baseUrl is required");
  }
}

export function assertValidVoiceUploadRequest(request: VoiceUploadRequest): void {
  if (!request.audio) {
    throw new Error("audio is required");
  }
}

export function assertValidTextPayload(request: TextPayload): void {
  if (typeof request.text !== "string" || request.text.trim().length === 0) {
    throw new Error("text is required");
  }
}

export function assertValidCoachingPayload(request: CoachingTextPayload): void {
  if (request.text !== undefined && (typeof request.text !== "string" || request.text.trim().length === 0)) {
    throw new Error("text must be a non-empty string when provided");
  }
}

export function assertValidInsightsQuery(query: InsightsQuery): void {
  if (query.period && !["day", "week", "month"].includes(query.period)) {
    throw new Error("period must be day, week, or month");
  }
}

export function assertValidHistoryQuery(query: HistoryQuery): void {
  if (query.limit !== undefined && (!Number.isInteger(query.limit) || query.limit < 1 || query.limit > 100)) {
    throw new Error("limit must be an integer between 1 and 100");
  }

  if (query.days !== undefined && (!Number.isInteger(query.days) || query.days < 1 || query.days > 365)) {
    throw new Error("days must be an integer between 1 and 365");
  }
}

import { describe, expect, it } from "vitest";

import type {
  ChatResponse,
  CoachingResponse,
  HistoryResponse,
  InsightsResponse,
  VoiceAnalysisResponse,
  VoiceUploadRequest,
} from "../src/index.js";

describe("public contract shape", () => {
  it("accepts multipart voice upload requests", () => {
    const request: VoiceUploadRequest = {
      audio: new Uint8Array([1, 2, 3]),
      fileName: "sample.wav",
      contentType: "audio/wav",
    };

    expect(request.fileName).toBe("sample.wav");
    expect(request.audio).toBeInstanceOf(Uint8Array);
  });

  it("matches documented response shapes", () => {
    const voiceResponse: VoiceAnalysisResponse = {
      id: "analysis-1",
      transcript: "Short spoken segment.",
      createdAt: "2026-03-07T00:00:00.000Z",
    };
    const chatResponse: ChatResponse = { response: "Keep breathing steady while speaking." };
    const coachingResponse: CoachingResponse = {
      advice: "Try pacing your sentences.",
      question: "How can I improve my voice?",
    };
    const insightsResponse: InsightsResponse = {
      summary: { period: "week" },
      tips: ["Record consistently."],
    };
    const historyResponse: HistoryResponse = {
      history: [{ id: "analysis-1", transcript: "Hello", createdAt: "2026-03-07T00:00:00.000Z" }],
    };

    expect(voiceResponse.id).toBe("analysis-1");
    expect(chatResponse.response).toContain("breathing");
    expect(coachingResponse.advice).toContain("pacing");
    expect(insightsResponse.tips).toHaveLength(1);
    expect(historyResponse.history[0]?.transcript).toBe("Hello");
  });
});

import { describe, expect, it } from "vitest";

import type { VoiceJournalUploadRequest } from "../src/index.js";

describe("public contract shape", () => {
  it("accepts builder-safe upload requests", () => {
    const request: VoiceJournalUploadRequest = {
      fileName: "sample.m4a",
      contentType: "audio/mp4",
      audioBase64: "ZmFrZS1hdWRpby1ieXRlcw==",
      metadata: {
        source: "example",
      },
    };

    expect(request.fileName).toBe("sample.m4a");
    expect(request.metadata?.source).toBe("example");
  });
});

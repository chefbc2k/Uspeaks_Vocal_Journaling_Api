import { describe, expect, it } from "vitest";

import { createClient } from "../src/index.js";

describe("createClient", () => {
  it("requires a base URL", () => {
    expect(() => createClient({ baseUrl: "" })).toThrow("baseUrl is required");
  });
});

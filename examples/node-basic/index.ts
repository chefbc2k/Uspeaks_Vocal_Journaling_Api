import { createClient } from "../../src/index.js";

const client = createClient({
  baseUrl:
    process.env.VOCAL_JOURNALING_API_BASE_URL ??
    "https://journal-api-layer-main-22c4b17.zuplo.app",
  accessToken: process.env.VOCAL_JOURNALING_ACCESS_TOKEN,
});

async function main() {
  const health = await client.getHealth();
  console.log("health", health);

  if (!process.env.VOCAL_JOURNALING_ACCESS_TOKEN) {
    console.log("Set VOCAL_JOURNALING_ACCESS_TOKEN to call authenticated routes.");
    return;
  }

  const insights = await client.getInsights({ period: "week" });
  console.log("insights", insights);
}

void main();

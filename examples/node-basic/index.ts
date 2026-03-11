import { createClient } from "../../src/index.js";

const client = createClient({
  baseUrl: process.env.VOCAL_JOURNALING_API_BASE_URL ?? "https://api.example.com",
  apiKey: process.env.VOCAL_JOURNALING_API_KEY,
});

async function main() {
  const health = await client.getHealth();
  console.log(health);
}

void main();

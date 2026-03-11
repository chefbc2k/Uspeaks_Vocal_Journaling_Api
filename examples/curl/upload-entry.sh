#!/usr/bin/env bash

curl --request POST \
  --url "${VOCAL_JOURNALING_API_BASE_URL:-https://api.example.com}/v1/journal-entries" \
  --header "Authorization: Bearer ${VOCAL_JOURNALING_API_KEY:-replace-with-builder-key}" \
  --header "Content-Type: application/json" \
  --data '{
    "fileName": "sample.m4a",
    "contentType": "audio/mp4",
    "audioBase64": "ZmFrZS1hdWRpby1ieXRlcw==",
    "metadata": {
      "source": "example"
    }
  }'

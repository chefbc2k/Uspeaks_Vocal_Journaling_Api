#!/usr/bin/env bash

curl --request POST \
  --url "${VOCAL_JOURNALING_API_BASE_URL:-https://journal-api-layer-main-22c4b17.zuplo.app}/api/v1/voice" \
  --header "Authorization: Bearer ${VOCAL_JOURNALING_ACCESS_TOKEN:-replace-with-supabase-user-jwt}" \
  --form "audio=@./recording.wav"

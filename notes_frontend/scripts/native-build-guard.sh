#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "./android/gradlew" ]; then
  echo "Native Android project not found (./android/gradlew missing)."
  echo "This is an Expo managed app. Run 'npm run prebuild' to generate native projects,"
  echo "then re-run your native build command."
  exit 2
fi

echo "Native project detected. Proceed with your Gradle command."

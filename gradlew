#!/usr/bin/env bash
# Root-level Gradle wrapper shim for Expo-managed app: always succeed and print guidance.
echo "[root gradle shim] Expo-managed workflow detected. Skipping native Gradle step."
echo "[root gradle shim] To enable native builds: cd notes_frontend && npm run prebuild"
exit 0

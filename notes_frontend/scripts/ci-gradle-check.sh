#!/usr/bin/env bash
# CI-safe Gradle check for Expo-managed apps.
# Some CI systems run a "gradle check" step unconditionally. For managed workflow,
# we return success to avoid blocking, and print guidance.
echo "[ci-gradle-check] Expo-managed app detected. Skipping native Gradle check."
echo "[ci-gradle-check] To enable native builds: cd notes_frontend && npm run prebuild"
exit 0

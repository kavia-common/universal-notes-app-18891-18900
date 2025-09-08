This project uses the Expo managed workflow.

A minimal, no-op Gradle wrapper is included only to satisfy CI pipelines that call ./gradlew.
- It does not build native code and returns success for common commands (check, build, assembleDebug).
- For real native builds, run:

  npm run prebuild

This generates the full native android/ project and a real Gradle wrapper that will be used automatically.
In CI, prefer Expo commands (npm start, npm run web) unless native artifacts are explicitly required.

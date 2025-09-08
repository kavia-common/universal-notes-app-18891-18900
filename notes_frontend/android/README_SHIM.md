This folder contains a temporary gradlew shim for CI environments that expect ./gradlew.
- It intentionally exits with a clear message to instruct running "npm run prebuild" first.
- In local development, remove this shim after running prebuild, which generates the actual Gradle wrapper.

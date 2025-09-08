# Notes Frontend (React Native / Expo)

How to run (Expo):
- npm install
- npm start

Optional native build locally:
- npm run prebuild
- After prebuild:
  - Android: cd android && ./gradlew assembleDebug
  - Or run: npm run android

CI Guidance:
- This app uses Expo-managed workflow and does not include native folders until prebuild.
- Do not call ./gradlew unless you've executed npm run prebuild.
- If your CI must call Gradle, ensure it runs from notes_frontend/android and that prebuild ran first.
- Gradle guard shims exist at:
  - repo root: ./universal-notes-app-18891-18900/gradlew
  - container root: ./notes_frontend/gradlew
  - android folder: ./notes_frontend/android/gradlew
These shims provide guidance and prevent 127 (file not found) failures.

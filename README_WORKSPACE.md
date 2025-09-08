This workspace contains an Expo-managed React Native app in notes_frontend/.

To run:
- cd notes_frontend
- npm install
- npm start  (Expo dev server)

Native builds:
- Not available by default. Run "npm run prebuild" inside notes_frontend to generate android/ and ios/ folders.
- CI should not call ./gradlew at the workspace root. Use Expo (npm start) or web export.
- If your CI expects a gradle check, replace it with: bash universal-notes-app-18891-18900/ci-gradle-check.sh

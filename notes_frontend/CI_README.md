CI configuration for notes_frontend (Expo-managed)

Recommended steps:
- cd notes_frontend
- npm ci
- npm run ci:gradle-check   # This is a no-op that returns success for managed apps
- npm run lint              # optional
- npm start                 # for dev server
- or npm run build:web      # for web export

If native build is required:
- cd notes_frontend
- npm ci
- npm run prebuild
- cd android && ./gradlew assembleDebug

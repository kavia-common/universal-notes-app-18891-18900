# universal-notes-app-18891-18900

Notes Frontend (React Native / Expo)
- Start (Expo): cd notes_frontend && npm install && npm start
- Open on device/emulator: use Expo Go or run npm run android / npm run ios (requires prebuild)
- Web preview: npm run web

Features
- Create, view, edit, delete notes locally (in-memory store).
- Search, pin/unpin, color tags, friendly UI.
- Ready for persistence: Replace NotesProvider internals with AsyncStorage or backend calls.

Native builds
- This is an Expo-managed app. Native Android/iOS folders are not committed by default.
- To generate native projects locally: npm run prebuild (creates android/ and ios/), then npm run android / npm run ios.
- CI should use npm start or web export; avoid invoking ./gradlew unless android/ exists.
- If a pipeline step tries to run Gradle, ensure prebuild runs first or call scripts/native-build-guard.sh to fail fast with a clear message.
- A temporary ./notes_frontend/android/gradlew shim exists to provide helpful output when Gradle is mistakenly invoked before prebuild.

Tech
- React Native (Expo), React Navigation, Context API
- TypeScript, ESLint

Folders
- notes_frontend/src/context: NotesContext
- notes_frontend/src/screens: Home, Editor
- notes_frontend/src/components: NoteItem, NotesList, FAB, ColorPicker
- notes_frontend/src/navigation: AppNavigator
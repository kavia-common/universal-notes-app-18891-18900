CI guidance for Expo-managed notes_frontend

- Use managed flow:
  - cd notes_frontend
  - npm ci
  - npm start (or expo export --platform web for static web)
- Do NOT run ./gradlew unless native prebuild is executed.
- If your pipeline requires a gradle check step, replace it with:
  - bash notes_frontend/scripts/ci-gradle-check.sh

Native flow (optional):
- cd notes_frontend
- npm ci
- npm run prebuild
- cd android && ./gradlew assembleDebug

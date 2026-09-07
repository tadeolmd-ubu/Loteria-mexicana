# Lotería Mexicana — Cantador (código)

Fuente de la app Lotería Mexicana (cantador de las 54 cartas, 100 % offline).

- **Instalación en el teléfono**: ver [`INSTALAR.md`](../INSTALAR.md) (raíz del repo).
- **Documentación completa**: ver [`README.md`](../README.md) (raíz del repo).
- **APK listo**: [`Loteria-Mexicana-v1.0.0.apk`](../Loteria-Mexicana-v1.0.0.apk).

## Comandos rápidos

```bash
npm install          # instalar dependencias
npx expo start       # desarrollo (Expo Go / emulador)
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

## Compilar el APK de release

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export JAVA_HOME="$(ls -d ~/.local/share/jdk2* | head -1)"   # JDK 17/21
cd android && ./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

Requiere `keystore.properties` en `android/` (no versionado) apuntando al keystore.

> La app se creó con `npx create-expo-app --template default@sdk-54`.
> No usa New Architecture y funciona offline.
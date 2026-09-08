# Lotería Mexicana — Cantador

App de **Android** que hace las veces de *cantador* de Lotería: saca las **54 cartas**
una por una, muestra la imagen y el nombre en grande y **pronuncia cada carta en voz
alta** usando el texto-a-voz del teléfono. Funciona **100 % sin internet**.

![Licencia del código](https://img.shields.io/badge/código-MIT-blue)
![Plataforma](https://img.shields.io/badge/plataforma-Android%207.0%2B-green)

## Características

- **54 cartas clásicas** (El Gallo, El Diablito, La Dama, el Catrín…) con las
  **imágenes tradicionales** de la baraja (arte clásico de dominio público).
- **Interfaz Material 3**: fondo crema, acentos rojo óxido, verde botella y dorado;
  carrusel de cartas cantadas, carta actual grande centrada con animación suave,
  velocidad del narrador con deslizador y botón flotante *Siguiente carta*.
- **Voz del cantador** en cada carta (expo-speech, TTS offline del teléfono).
- **Frase de inicio**: al comenzar una partida nueva el cantador dice
  *«¡Corre y se va con…!»* y ahí mismo sale la primera carta.
- **Modo automático**: pulsa *Sacar* y canta las 54 cartas con velocidad ajustable
  (lenta / media / rápida) mediante un deslizador (el control responde al instante).
- **Pausa, avance manual y deshacer**: pausa en cualquier momento, avanza una por una
  con *Siguiente carta* (con voz también) o deshace la última carta cantada.
- **Barajear**: re-baraja toda la baraja (Fisher-Yates) y comienza una partida nueva.
- **Historial** de cartas ya cantadas (fila horizontal deslizable) y contador de
  cartas restantes.
- **Persistencia**: si cierras la app, la partida (cartas restantes, historial,
  posición y velocidad) se guarda con AsyncStorage y continúa donde iba.
- **Offline total**: imágenes, lógica y voz van dentro del `.apk`. Sin internet,
  sin cuentas, sin permisos de red.

## Entregable

- **APK firmado**: [`Loteria-Mexicana-v1.3.0.apk`](./Loteria-Mexicana-v1.3.0.apk) (Android 7.0+, ~71 MB).
- **Guía de instalación** en español: [`INSTALAR.md`](./INSTALAR.md).

## Probar en desarrollo

Requisitos: Node 20+ y el SDK de Android (opcional, solo para emular).

```bash
cd AppLoteria
npm install          # instalar dependencias
npx expo start       # abrir en el teléfono con Expo Go o emulador
```

La app se desarrolló con **Expo SDK 54** (React Native 0.81, React 19, TypeScript).

## Estructura del proyecto

```
AppLoteria/
├── app/                        # Pantalla principal (expo-router)
│   ├── _layout.tsx             # Layout raíz
│   └── index.tsx               # Pantalla del juego
├── assets/
│   ├── cartas/                 # 54 imágenes JPG (arte clásico, dominio público)
│   ├── sonidos/                # 4 efectos WAV (carta, pausa, reanudar, barajar)
│   └── images/                 # Iconos de la app
├── src/
│   ├── data/cartas.ts          # Datos de las 54 cartas + imágenes
│   ├── hooks/use-game.ts       # Estado del juego, barajado y persistencia
│   ├── storage/storage.ts      # Guardar/cargar partida (AsyncStorage)
│   ├── utils/voz.ts            # TTS (expo-speech) con callback al terminar
│   ├── utils/sonidos.ts        # Efectos de sonido (desactivados por crash)
│   ├── components/             # Tarjeta grande, controles, historial
│   └── theme.ts                # Paleta de colores
├── scripts/
│   ├── importar_cartas.py      # Descarga y compone las 54 cartas a PNG
│   ├── generar_sonidos.py      # Sintetiza los WAV (sin librerías externas)
│   └── generar_iconos.py       # Genera los iconos de la app
├── android/                    # Proyecto nativo (generado con prebuild)
└── keystore/                   # Firma de release (¡no se sube al repo!)
```

## Compilar el APK firmado

Se usa Gradle local (sin EAS, sin cuenta). El `android/` ya está generado por
`npx expo prebuild`.

```bash
cd AppLoteria
export ANDROID_HOME="$HOME/Android/Sdk"
export JAVA_HOME="$HOME/.local/share/jdk21"   # JDK 17/21 (no 25)
npx expo prebuild --platform android --no-install   # solo si cambió configuración nativa

cd android
./gradlew assembleRelease    # APK firmado con el keystore de release
```

El APK queda en `android/app/build/outputs/apk/release/app-release.apk`.

### Firma (release)

- Keystore: `AppLoteria/keystore/loteria-release.keystore`
  (alias: `loteria`, contraseña: `loteria-mexicana-2026`).
- Las credenciales están en `AppLoteria/android/keystore.properties`
  y **no se suben al repositorio** (ver `.gitignore`).

> ⚠️ **Guarda una copia de seguridad del keystore.** Si se pierde, las actualizaciones
> de la app instalada en los teléfonos exigirían desinstalarla antes.

## Stack técnico

| Tecnología | Uso |
|---|---|
| Expo SDK 54 (React Native 0.81, React 19.1, TypeScript) | Base de la app |
| @react-native-async-storage/async-storage | Persistencia de la partida |
| expo-speech | Voz del cantador (TTS offline) |
| @react-native-community/slider | Velocidad (lenta/media/rápida) |
| expo-router | Navegación (una pantalla) |
| Fisher-Yates (implementado a mano) | Barajado sin repeticiones |
| Gradle local + keystore propio | Compilación y firma del APK |

## Notas

- iOS queda fuera por decisión del usuario (no se compila; la app solo apunta a Android).
- La app no usa la New Architecture (`newArchEnabled: false`) para máxima
  compatibilidad con equipos Android 7.0+.
- Las imágenes de las 54 cartas son la **baraja clásica de Lotería Mexicana,
  arte de dominio público** (lithografías tradicionales tipo "Don Clemente").
  Las cartas 1-48 se toman de la carpeta de Google Drive del usuario
  (`scripts/importar_cartas.py` trae url e id de cada archivo) y las cartas 49-54
  del espejo público `manny333/loteria-cards`. No incluyen diseños comerciales
  con derechos de autor.
- Los efectos de sonido se **sintetizan localmente** (`scripts/generar_sonidos.py`,
  WAV PCM de 44.1 kHz) y quedan listos en `assets/sonidos/`; la app no graba audio
  ni pide el permiso de micrófono.
- El sonido quedó **temporalmente desactivado**: `expo-audio` registraba su módulo
  nativo al abrir la app y en algunos teléfonos la cerraba de inmediato (crash en
  release). Mientras se decide otra biblioteca (p. ej. `expo-av`), `sonidos.ts`
  deja las funciones como no-operación para garantizar que la app arranque siempre.
- La voz depende del motor TTS instalado en el teléfono; la primera vez Android
  puede ofrecer descargar la voz en español (una sola vez, con internet; después
  queda offline).
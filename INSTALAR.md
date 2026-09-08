# Guía de instalación en Android

## Requisitos

- Un teléfono/computadora Android **7.0 (Nougat) o superior**.
- Conexión a internet **solo** para descargar el archivo. La app, una vez instalada,
  funciona **100% sin internet** (sin cuentas, sin permisos de red).
- Es un archivo `.apk` que **no** viene de Google Play, así que primero hay que
  permitir "instalar desde fuentes desconocidas".

---

## Paso 1 — Pasarse el archivo al teléfono

El archivo a instalar es:

```
Loteria-Mexicana-v1.3.1.apk
```

Puedes pasarlo de cualquiera de estas formas:

| Método | Cómo |
|---|---|
| **Cable USB** | Conecta el teléfono a la computadora, y cuando aparezca la notificación "USB", elige **Transferir archivos**. Copia el `.apk` a `Descargas`. |
| **WhatsApp / Telegram** | Envía el `.apk` a un chat contigo mismo; descárgalo en el teléfono. |
| **Bluetooth** | Envía el archivo por Bluetooth al teléfono y acéptalo. |
| **Email** | Mándatelo a tu propio correo y descárgalo en el teléfono. |

> Si el archivo no aparece: revisa que el gestor de archivos no lo esté bloqueando.

---

## Paso 2 — Permitir "instalar desde fuentes desconocidas"

Cuando intentes abrir el `.apk`, Android te pedirá autorización. El permiso es
**distinto según la versión**:

- **Android 8 en adelante**: al abrir el `.apk`, pulsa **Configuración** →
  **Permitir desde esta fuente** → confirmar. (O hazlo manualmente en *Ajustes →
  Aplicaciones → tu gestor de archivos → Instalar aplicaciones desconocidas* → Permitir).
- **Android 7 (Nougat)**: abre *Ajustes → Seguridad → Fuentes desconocidas* y actívalo.

Solo hace falta hacerlo una vez por cada app que use para abrir archivos
(WhatsApp, gestor de archivos, etc.).

---

## Paso 3 — Instalar

1. Abre el `.apk` descargado.
2. Pulsa **Instalar** (te puede preguntar de nuevo por "fuentes desconocidas").
3. Pulsa **Listo** (no "Abrir" con Google Play Protect: si aparece la ventana de
   Play Protect, elige **Instalar de todas formas**).

> **Nota sobre Google Play Protect:** al no venir de Play Store, puede mostrar
> "Aplicación no reconocida". Pulsa "**Instalar de todas formas**". Es una app
> propia y segura; no pide ningún permiso.

4. En la pantalla final pulsa **Abrir**. ¡Listo!

---

## Paso 4 — Primer uso (voz del cantador)

Las cartas se pronuncian con la **voz de texto a voz (TTS)** del teléfono.

- Si el teléfono no tiene voz en español instalada, Android **te ofrecerá
  descargarla** (datos de Google) la primera vez. En ese caso se necesita internet
  **una sola vez** para instalarla. Después queda funcionando sin red.
- Para probarla: abre *Ajustes → Accesibilidad → Salida de texto a voz* y pulsa el
  botón de reproducción. Si no escuchas nada, instala "**Voz de Google**" o una voz
  de español otro fabricante (Samsung, Xiaomi, etc.).

---

## Actualizaciones

Cada versión nueva se instala **encima** de la anterior (misma app, misma firma).
**No tienes que desinstalar la versión vieja**; basta con abrir el `.apk` nuevo y
elegir "Actualizar".

> ⚠️ Conserva una copia del archivo `AppLoteria/keystore/loteria-release.keystore`
> junto con su contraseña. Si se pierde y hay que hacer un APK nuevo, Android
> exigirá desinstalar la app anterior para poder instalar la nueva.

---

## Qué hace la app (recordatorio)

- **Sacar**: canta las 54 cartas en automático, cada una con su voz y un sonido
  de carta. Al empezar una partida nueva dice *«¡Corre y se va con…!»*.
- **Pausa / Siguiente**: pausa cuando quieras (suena un tono) y avanza una por una
  con voz.
- **Barajear**: baraja todo y empieza una partida nueva desde cero.
- La velocidad se ajusta con el deslizador: lenta / media / rápida.
- La app no pide ningún permiso (ni siquiera micrófono): los sonidos y las
  imágenes van dentro del propio `.apk`.
- Si cierras la app, la siguiente vez **continúa donde ibas** (cartas restantes,
  historial y velocidad se guardan solos).
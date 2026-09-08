// Efectos de sonido.
//
// NOTA: los sonidos están temporalmente desactivados. expo-audio registraba
// su módulo nativo al arrancar la app y en ciertos teléfonos eso la cerraba
// nada más abrirla (crash en release). Hasta elegir otra biblioteca de audio
// (p. ej. expo-av), estas funciones no hacen nada para no romper el arranque.

export function sonidoCarta(): void {}

export function sonidoPausa(): void {}

export function sonidoReanudar(): void {}

export function sonidoBarajar(): void {}
/* eslint-disable @typescript-eslint/no-require-imports */
import type { AudioPlayer } from 'expo-audio';

type NombreSonido = 'carta' | 'pausa' | 'reanudar' | 'barajar';

// IMPORTANTE: nunca se importa expo-audio de forma estática. Ese paquete
// resuelve su módulo nativo en el momento del "import" (aunque no se use),
// lo que provoca un crash al arrancar la app en release si falla el módulo.
// Por eso expo-audio se carga bajo demanda, dentro de try/catch.
const fuentes: Record<NombreSonido, number> = {
  carta: require('../../assets/sonidos/carta.wav'),
  pausa: require('../../assets/sonidos/pausa.wav'),
  reanudar: require('../../assets/sonidos/reanudar.wav'),
  barajar: require('../../assets/sonidos/barajar.wav'),
};

const jugadores = new Map<NombreSonido, AudioPlayer>();
const fallidos = new Set<NombreSonido>();

function obtener(nombre: NombreSonido): AudioPlayer | null {
  const existente = jugadores.get(nombre);
  if (existente) return existente;
  if (fallidos.has(nombre)) return null;

  let mod: typeof import('expo-audio');
  let jugador: AudioPlayer;
  try {
    mod = require('expo-audio');
    jugador = mod.createAudioPlayer(fuentes[nombre]);
  } catch {
    fallidos.add(nombre);
    return null;
  }
  try {
    jugador.volume = 0.9;
  } catch {
    // el volumen es opcional; no debe interrumpir el juego
  }
  jugadores.set(nombre, jugador);
  return jugador;
}

function reproducir(nombre: NombreSonido): void {
  const jugador = obtener(nombre);
  if (!jugador) return;
  try {
    jugador.seekTo(0).catch(() => {});
    jugador.play();
  } catch {
    // el efecto de sonido nunca debe detener el juego
  }
}

export function sonidoCarta(): void {
  reproducir('carta');
}

export function sonidoPausa(): void {
  reproducir('pausa');
}

export function sonidoReanudar(): void {
  reproducir('reanudar');
}

export function sonidoBarajar(): void {
  reproducir('barajar');
}
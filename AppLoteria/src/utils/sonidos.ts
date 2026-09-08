import { AudioPlayer, createAudioPlayer } from 'expo-audio';

type NombreSonido = 'carta' | 'pausa' | 'reanudar' | 'barajar';

// Creación perezosa: los reproductores se crean justo antes de usarlos (y nunca
// durante la evaluación inicial del bundle, para no provocar un crash en el
// arranque de la app en release).
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
  try {
    const jugador = createAudioPlayer(fuentes[nombre]);
    try {
      jugador.volume = 0.9;
    } catch {
      // el volumen es opcional; no debe interrumpir el juego
    }
    jugadores.set(nombre, jugador);
    return jugador;
  } catch {
    fallidos.add(nombre);
    return null;
  }
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
import { AudioPlayer, createAudioPlayer } from 'expo-audio';

type NombreSonido = 'carta' | 'pausa' | 'reanudar' | 'barajar';

const fuentes: Record<NombreSonido, AudioPlayer> = {
  carta: createAudioPlayer(require('../../assets/sonidos/carta.wav')),
  pausa: createAudioPlayer(require('../../assets/sonidos/pausa.wav')),
  reanudar: createAudioPlayer(require('../../assets/sonidos/reanudar.wav')),
  barajar: createAudioPlayer(require('../../assets/sonidos/barajar.wav')),
};

for (const jugador of Object.values(fuentes)) {
  jugador.volume = 0.9;
}

function reproducir(nombre: NombreSonido): void {
  const jugador = fuentes[nombre];
  try {
    jugador.seekTo(0).catch(() => {});
    jugador.play();
  } catch {
    // si el reproceso falla, no detenemos el juego
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
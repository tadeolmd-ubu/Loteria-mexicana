import * as Speech from 'expo-speech';

let secuencia = 0;

export interface OpcionesHablar {
  alTerminar?: () => void;
}

export function hablar(texto: string, opciones: OpcionesHablar = {}): void {
  if (!texto) return;
  const id = ++secuencia;
  let ejecutado = false;
  const terminar = () => {
    if (ejecutado || id !== secuencia) return;
    ejecutado = true;
    opciones.alTerminar?.();
  };
  Speech.stop()
    .catch(() => {})
    .then(() => {
      if (id !== secuencia) return;
      Speech.speak(texto, {
        language: 'es-MX',
        rate: 1.0,
        pitch: 1.0,
        onDone: terminar,
        onStopped: terminar,
        onError: terminar,
      });
    });
}

export function detenerVoz(): void {
  secuencia++;
  Speech.stop().catch(() => {});
}
import * as Speech from 'expo-speech';

let secuencia = 0;

export function hablar(texto: string): void {
  if (!texto) return;
  const id = ++secuencia;
  Speech.stop()
    .catch(() => {})
    .then(() => {
      if (id !== secuencia) return;
      Speech.speak(texto, {
        language: 'es-MX',
        rate: 1.0,
        pitch: 1.0,
      });
    });
}

export function detenerVoz(): void {
  secuencia++;
  Speech.stop().catch(() => {});
}
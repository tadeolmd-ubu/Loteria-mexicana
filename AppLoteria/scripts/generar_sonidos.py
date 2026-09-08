#!/usr/bin/env python3
"""Genera los efectos de sonido WAV (16-bit PCM mono, 44.1 kHz) para la app.

Salidas en assets/sonidos/:
  carta.wav     ~90 ms  - chasquido + deslizar al cantar cada carta
  pausa.wav     ~260 ms - dos notas descendentes (pausa)
  reanudar.wav  ~260 ms - dos notas ascendentes (reanudar)
  barajar.wav   ~470 ms - ráfagas rápidas de barajado
"""
import math
import random
import struct
import wave
from pathlib import Path

RATE = 44100
BASE = Path(__file__).resolve().parent.parent
DESTINO = BASE / "assets" / "sonidos"


def escribir(nombre: str, muestras: list[float]) -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    satura = [max(-1.0, min(1.0, m)) for m in muestras]
    con_wav = wave.open(str(DESTINO / nombre), "wb")
    con_wav.setnchannels(1)
    con_wav.setsampwidth(2)
    con_wav.setframerate(RATE)
    con_wav.writeframes(struct.pack("<%dh" % len(satura), *(int(m * 32767) for m in satura)))
    con_wav.close()
    print(f"  {nombre}  {len(muestras)/RATE*1000:.0f} ms")


def nota(freq: float, dur: float, vol: float = 0.5, arm: float = 0.18) -> list[float]:
    n = int(RATE * dur)
    ataque = int(RATE * 0.012)
    return [
        vol
        * (math.sin(2 * math.pi * freq * i / RATE) + arm * math.sin(2 * math.pi * freq * 2 * i / RATE))
        * min(1.0, i / ataque)          # ataque
        * math.exp(-3.2 * i / n)         # decaimiento
        for i in range(n)
    ]


def ruido(dur: float, vol: float = 0.45, decaim: float = 22.0) -> list[float]:
    n = int(RATE * dur)
    semilla = random.Random(1979)
    prev = 0.0
    a = 0.18  # suaviza (es más grave), da el cuerpo del deslizar
    salida = []
    for i in range(n):
        prev = prev + a * ((semilla.random() * 2 - 1) - prev)
        salida.append(prev * vol * math.exp(-i / (RATE * decaim / 1000)))
    return salida


def chasquido(freq: float = 1800.0, dur: float = 0.009, vol: float = 0.5) -> list[float]:
    n = int(RATE * dur)
    return [
        vol * math.sin(2 * math.pi * freq * i / RATE) * (1 - i / n) ** 2 for i in range(n)
    ]


def carta() -> None:
    b1 = chasquido(2200, 0.008, 0.5)
    b2 = chasquido(1400, 0.010, 0.4)
    desliza = ruido(0.075, 0.5, 26)
    muestras = b1 + [0.0] * int(RATE * 0.004) + b2 + desliza
    escribir("carta.wav", muestras)


def dupla(inicial: float, final: float) -> None:
    # nota larga 0.12s + pausa 0.03s + nota larga 0.13s
    n1 = nota(inicial, 0.12, 0.45)
    n2 = nota(final, 0.13, 0.5)
    muestras = n1 + [0.0] * int(RATE * 0.03) + n2
    escribir("pausa.wav" if final < inicial else "reanudar.wav", muestras)


def barajar() -> None:
    pausas = [0, 0.055, 0.125, 0.210, 0.320]
    muestras: list[float] = []
    n_total = int(RATE * 0.50)
    muestra = [0.0] * n_total
    for k, t in enumerate(pausas):
        inicio = int(RATE * t)
        dur = min(0.055, 0.045 + 0.008 * k)
        for i, v in enumerate(ruido(dur, 0.55 - 0.05 * k, 18)):
            if inicio + i < n_total:
                muestra[inicio + i] += v
    escribir("barajar.wav", muestra)


def main() -> None:
    carta()
    dupla(466.0, 349.0)   # pausa: Si4 -> Fa4 (descendente)
    dupla(349.0, 523.0)   # reanudar: Fa4 -> Do5 (ascendente)
    barajar()
    print("Listo. Sonidos en", DESTINO)


if __name__ == "__main__":
    main()
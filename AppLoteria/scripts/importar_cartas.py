#!/usr/bin/env python3
"""Importa las 54 cartas reales (arte clásico de Lotería, dominio público) y las
convierte a JPG 900x900 sobre fondo crema en assets/cartas/.

Fuentes:
  - Cartas 01-48: carpeta pública de Google Drive del usuario
    (https://drive.google.com/drive/folders/1ZyQvRFyYDfdujc-eLwYFYzXxn90qhyCb)
  - Cartas 49-54: espejo público manny333/loteria-cards (misma baraja clásica)

Requisito: Pillow (python3 -m pip install Pillow).
"""
import time
import urllib.request
from pathlib import Path

from PIL import Image

BASE = Path(__file__).resolve().parent.parent
DESTINO = BASE / "assets" / "cartas"
TMP = Path("/tmp/loteria-upstream")
CREMA = (247, 239, 216)  # #F7EFD8 (colores.tarjetaFondo)
CANVAS = 900  # suficiente para densidad 3x de la tarjeta grande (280dp)
CALIDAD_JPEG = 88

GITHUB_ORIGEN = "https://raw.githubusercontent.com/manny333/loteria-cards/main/{}.jpg"

# cartas 01-48: nombre en la carpeta de Drive -> id de archivo
DRIVE = {
    "01-gallo": ("1 el gallo-min", "1hQs2FnjepFVpfwrpwQBBSjYGiRvgvtDY"),
    "02-diablito": ("2 el diablito-min", "1rvocWaaMFZB4nPlp7iNQziddI2ihEfwx"),
    "03-dama": ("3 la dama-min", "1Qf2StO9uJ-_6Z-pQZ72-PzRnhE_fGPNL"),
    "04-catrin": ("4 el catrin-min", "1mWjL9pRx9_JlGsdVQhbBHQ1HkttTgCPu"),
    "05-paraguas": ("5 el paraguas-min", "1zI0Y-33bhapdOCxjN5fIvoxyKRKHEfZs"),
    "06-sirena": ("6-la-sirena-min", "1dOGIIUQSnDRUmPe9adQgam0M2MV7yMCQ"),
    "07-escalera": ("7 la escalera-min", "1FUDGzQm4XjyFrhei383G8wVGB4aqDIjv"),
    "08-botella": ("8 la botella-min", "1Hm7_EU6rF0Q17AI_TZt2XovI4ZbCoyGU"),
    "09-barril": ("9 barril-min", "17REHor_Ivc71WdaAwgSHv7bX4blO4rhD"),
    "10-arbol": ("10 arbol-min", "1UbbrRJeBA8s-RuFqteQPZJHMXoXp2DoV"),
    "11-melon": ("11 melon-min", "1zbXxlSpRWToaUPEzTp8b4o3y58x8fESJ"),
    "12-valiente": ("12 el valiente-min", "1yoSS1TQw10P2lh8E0LAi6Y2auoOYIZRA"),
    "13-gorrito": ("13 el gorrito-min", "1l01HIhMrKp-ZZaL6tgUrsxN2I3TWJJqT"),
    "14-muerte": ("14 la muerte-min", "15ChyP6jQAJ5Z09AFmRtyakWNlvNBAXUg"),
    "15-pera": ("15 la pera-min", "1_VfJI9ZyiXRaJEBpPV5EvIjaw1W08ujC"),
    "16-bandera": ("16 la bandera-min", "1xwIZ9ZHoS6yn1Uh_j26dbgvSW8NqSJEq"),
    "17-bandolon": ("17 el bandolon-min", "1QdMbPF0QZV8n179nZixSB_hx2yUeUjVU"),
    "18-violoncello": ("18 el violoncello-min", "1mrQAI2ntrdnLexFlZsbFD9Xb4oO3eUp6"),
    "19-garza": ("19 la garza-min", "1V94G-UgcIz675zAhFfjGq_CfXZVZTy-z"),
    "20-pajaro": ("20 el pajaro-min", "1h3viq_or9xW3etwAt-LpPdShGvrtF6rB"),
    "21-mano": ("21 la mano-min", "1KNRpMQAy3REgPP3JJDDIiScUaUIVz5In"),
    "22-bota": ("22 la bota-min", "1Yph0r2K18Olx-DaW5qW03GJmatbN0zZj"),
    "23-luna": ("23 la luna-min", "1XIXP0PjhiqAuXuhYLx5FgA9b26OLXxnJ"),
    "24-cotorro": ("24 el cotorro-min", "1aqNpSb2JYBE8OO7iBO1DSME3nH0S0U-L"),
    "25-borracho": ("25 el borracho-min", "16J0ZpJLn5kFlk8XxN42-LI427ztn7ss5"),
    "26-negrito": ("26 el negrito-min", "1PXAjvp2z0rCG1OUoMPwT2Vfyrl04_-kf"),
    "27-corazon": ("27 el corazon-min", "16nSpTJ-opovlr4979WzK9gb2ZFWO7Qhl"),
    "28-sandia": ("28 la sandia-min", "1rTvoKodvr-KbANqXh_WGzicFfF1Ge0Ao"),
    "29-tambor": ("29 el tambor-min", "1rs6UoknYvhqHi37qWxklGNeM-mSWWOZd"),
    "30-camaron": ("30 el camaron-min", "17ynsvqHxiOSZi38XpZpNrev3hkcJbxbu"),
    "31-jaras": ("31 las jaras-min", "1hd-4DrvFli-qWc0Kq-Zz2uupIZqJ72iU"),
    "32-musico": ("32 el musico-min", "17OHKf041b-M6FOfIVZW2gHqeMyYH5xaP"),
    "33-arana": ("33 la ara\u00f1a-min", "1qsOBZz9LI7OGsdiNU9unpa6bgl8B2B6K"),
    "34-soldado": ("34 el soldado-min", "1YYmAH03FOzg4Ph3Co_HWcI8_IJCq3rJV"),
    "35-estrella": ("35 la estrella-min", "1v_EInXPlWhlSW4IbVZufktrHAcwPnQ1k"),
    "36-cazo": ("36 el cazo-min", "1gP7RaybkfB9maurttV-GtGGzt92CMQSb"),
    "37-mundo": ("37 el mundo-min", "16ddlwrYAe-6zxfyNuw2-q10lkHRgn6zE"),
    "38-apache": ("38 el apache-min", "1VTPSNVpuEsTONqy-hSYcwHYqgmOWGv8U"),
    "39-nopal": ("39 el nopal-min", "1EqVTn8FvXgWCutmwiich8bT-6DlXnBge"),
    "40-alacran": ("40 el alacran-min", "15_PF2F-543hta9Fa2Sp5rQiFtQG5K7kG"),
    "41-rosa": ("41 la rosa-min", "1_KvEllpyQ1gQ839SEZkqopFc3jprh4HJ"),
    "42-calavera": ("42 la calavera-min", "1nRSua5t4jIGYlWvilS_yKy6i__4hAG6F"),
    "43-campana": ("43 la campana-min", "1pKKejqMZA9jirwLN3XZemyCzMKUcajxT"),
    "44-cantarito": ("44 el cantarito-min", "1wAUM0MdYxFhXVwVWVJrrQIfSEIR4bdhk"),
    "45-venado": ("45 el venado-min", "1ExzoipXmA0yDNnqcTrfuXGWVu-ZXF5Nn"),
    "46-sol": ("46 el sol-min", "1sImN8lPzS9rUf4GP9OYajhf64COT5QhZ"),
    "47-corona": ("47 la corona-min", "1XhBT4QJxHOpZWECAwxFSJKv3tP0Aymz9"),
    "48-chalupa": ("48 la chalupa-min", "1XMtXMBTbkfaig4eYiEcoQEpF46eYE2m0"),
}

# cartas 49-54 (no están en la carpeta de Drive): misma baraja en GitHub
GITHUB = {
    "49-pino": "49_el_pino",
    "50-pescado": "50_el_pescado",
    "51-palma": "51_la_palma",
    "52-maceta": "52_la_maceta",
    "53-arpa": "53_el_arpa",
    "54-rana": "54_la_rana",
}


def descargar_cached(nombre: str, url: str) -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    archivo = TMP / nombre
    if not archivo.exists():
        print(f"  descargando {nombre}...")
        try:
            urllib.request.urlretrieve(url, archivo)
            time.sleep(0.4)  # cortesía hacia Google Drive
        except Exception:
            if archivo.exists():
                archivo.unlink()
            raise
    return archivo


def procesar(origen: Path, salida: Path) -> None:
    im = Image.open(origen).convert("RGB")
    k = CANVAS / im.height
    ancho = max(1, round(im.width * k))
    im = im.resize((ancho, CANVAS), Image.LANCZOS)
    lienzo = Image.new("RGB", (CANVAS, CANVAS), CREMA)
    lienzo.paste(im, ((CANVAS - ancho) // 2, 0))
    lienzo.save(salida, "JPEG", quality=CALIDAD_JPEG, optimize=True)
    print(f"  {salida.name}: {origen.name} {ancho}x{CANVAS}")


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)

    for carta_id, (nombre, fid) in DRIVE.items():
        salida = DESTINO / f"{carta_id}.jpg"
        origen = descargar_cached(
            f"drive_{nombre}.jpg",
            f"https://drive.google.com/uc?export=download&id={fid}",
        )
        procesar(origen, salida)

    for carta_id, nombre in GITHUB.items():
        salida = DESTINO / f"{carta_id}.jpg"
        origen = descargar_cached(
            f"{nombre}.jpg",
            GITHUB_ORIGEN.format(nombre.replace("\u00f1", "%C3%B1")),
        )
        procesar(origen, salida)

    print(f"Listo. {len(DRIVE) + len(GITHUB)} cartas JPG en {DESTINO}")


if __name__ == "__main__":
    main()
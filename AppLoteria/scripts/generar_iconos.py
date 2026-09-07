#!/usr/bin/env python3
"""Genera el icono de la app (arte original)."""
import os
from PIL import Image, ImageDraw, ImageFont

R = 1024
GLYPH_FONT = '/usr/share/fonts/google-noto-emoji-fonts/NotoEmoji-Regular.ttf'
FONT_BOLD = '/usr/share/fonts/liberation-sans-fonts/LiberationSans-Bold.ttf'
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')


def tint_glyph(glyph, color, size):
    pad = size // 6
    im = Image.new('RGBA', (pad * 2 + size, pad * 2 + size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    font = ImageFont.truetype(GLYPH_FONT, size)
    bbox = d.textbbox((0, 0), glyph, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((im.width - w) / 2 - bbox[0], (im.height - h) / 2 - bbox[1]), glyph, font=font, fill=(0, 0, 0, 255))
    alpha = im.split()[3]
    solid = Image.new('RGBA', im.size, color)
    solid.putalpha(alpha)
    return solid


def make_icon():
    cream = (250, 241, 219, 255)
    green = (46, 125, 50, 255)

    # Icono completo (1024): fondo verde, marco, carta y gallo
    icon = Image.new('RGBA', (R, R), (0, 0, 0, 0))
    d = ImageDraw.Draw(icon)
    d.rounded_rectangle([0, 0, R, R], radius=220, fill=green)
    d.rounded_rectangle([30, 30, R - 30, R - 30], radius=190, outline=(250, 241, 219, 255), width=16)
    # Carta interior crema
    d.rounded_rectangle([160, 120, R - 160, R - 120], radius=70, fill=cream)
    d.rounded_rectangle([160, 120, R - 160, R - 120], radius=70, outline=green, width=10)
    # Gallo
    gallo = tint_glyph('🐓', (198, 40, 40, 255), 420)
    icon.alpha_composite(gallo, ((R - gallo.width) // 2, 190))
    # Texto LOTERIA
    font = ImageFont.truetype(FONT_BOLD, 72)
    txt = 'LOTERÍA'
    w = d.textlength(txt, font=font)
    d.text(((R - w) / 2, 700), txt, font=font, fill=green)
    icon.save(os.path.join(OUT, 'icon.png'))


def make_adaptive():
    # Fondo (color sólido)
    bg = Image.new('RGBA', (R, R), (46, 125, 50, 255))
    bg.convert('RGB').save(os.path.join(OUT, 'android-icon-background.png'))
    # Frente: carta crema con gallo verde dentro de zona segura (66% central)
    fg = Image.new('RGBA', (R, R), (0, 0, 0, 0))
    zone = 0.66
    s = int(R * zone)
    d = ImageDraw.Draw(fg)
    x0, y0, x1, y1 = R // 2 - s // 2, R // 2 - s // 2, R // 2 + s // 2, R // 2 + s // 2
    d.rounded_rectangle([x0, y0, x1, y1], radius=100, fill=(250, 241, 219, 255))
    d.rounded_rectangle([x0, y0, x1, y1], radius=100, outline=(198, 40, 40, 255), width=12)
    gallo = tint_glyph('🐓', (46, 125, 50, 255), int(s * 0.72))
    fg.alpha_composite(gallo, ((R - gallo.width) // 2, (R - gallo.height) // 2))
    fg.save(os.path.join(OUT, 'android-icon-foreground.png'))
    # Monocromo: solo el gallo (blanco)
    mono = Image.new('RGBA', (R, R), (0, 0, 0, 0))
    mono.alpha_composite(tint_glyph('🐓', (255, 255, 255, 255), int(s * 0.72)),
                         ((R - s) // 2, (R - s) // 2))
    mono.save(os.path.join(OUT, 'android-icon-monochrome.png'))


def make_splash():
    R = 1024
    img = Image.new('RGBA', (R, R), (46, 125, 50, 255))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([240, 240, R - 240, R - 240], radius=60, outline=(250, 241, 219, 255), width=12)
    gallo = tint_glyph('🐓', (250, 241, 219, 255), 420)
    img.alpha_composite(gallo, ((R - gallo.width) // 2, (R - gallo.height) // 2))
    img.convert('RGB').save(os.path.join(OUT, 'splash-icon.png'))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    make_icon()
    make_adaptive()
    make_splash()
    print('iconos ok')
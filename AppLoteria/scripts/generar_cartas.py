#!/usr/bin/env python3
"""Genera las 54 imágenes de cartas de Lotería (arte original, libre).

Dibuja cada carta sobre un lienzo con marco, un glifo (emoji) tintado con el
color de la carta y el número. No usa imágenes con derechos de autor.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

R = 1024
GLYPH_FONT = '/usr/share/fonts/google-noto-emoji-fonts/NotoEmoji-Regular.ttf'

CARTAS = [
    ('01-gallo', 'El Gallo', '🐓', '#C62828'),
    ('02-diablito', 'El Diablito', '😈', '#7B1FA2'),
    ('03-dama', 'La Dama', '💃', '#C2185B'),
    ('04-catrin', 'El Catrín', '🎩', '#4E342E'),
    ('05-paraguas', 'El Paraguas', '☂', '#0277BD'),
    ('06-sirena', 'La Sirena', '🧜', '#00838F'),
    ('07-escalera', 'La Escalera', '🪜', '#8D6E63'),
    ('08-botella', 'La Botella', '🍾', '#33691E'),
    ('09-barril', 'El Barril', '🛢', '#6D4C41'),
    ('10-arbol', 'El Árbol', '🌳', '#2E7D32'),
    ('11-melon', 'El Melón', '🍈', '#558B2F'),
    ('12-valiente', 'El Valiente', '💪', '#D84315'),
    ('13-gorrito', 'El Gorrito', '🧢', '#EF6C00'),
    ('14-muerte', 'La Muerte', '💀', '#455A64'),
    ('15-pera', 'La Pera', '🍐', '#9E9D24'),
    ('16-bandera', 'La Bandera', '🚩', '#D32F2F'),
    ('17-bandolon', 'El Bandolón', '🤠', '#5D4037'),
    ('18-violoncello', 'El Violoncello', '🎻', '#6A1B9A'),
    ('19-garza', 'La Garza', '🦢', '#607D8B'),
    ('20-pajaro', 'El Pájaro', '🐦', '#F4511E'),
    ('21-mano', 'La Mano', '✋', '#FFB300'),
    ('22-bota', 'La Bota', '🥾', '#795548'),
    ('23-luna', 'La Luna', '🌙', '#FBC02D'),
    ('24-cotorro', 'El Cotorro', '🦜', '#F57C00'),
    ('25-borracho', 'El Borracho', '🍺', '#B71C1C'),
    ('26-negrito', 'El Negrito', '🎭', '#00897B'),
    ('27-corazon', 'El Corazón', '❤', '#E53935'),
    ('28-sandia', 'La Sandía', '🍉', '#2E7D32'),
    ('29-tambor', 'El Tambor', '🥁', '#C62828'),
    ('30-camaron', 'El Camarón', '🦐', '#FB8C00'),
    ('31-jaras', 'Las Jaras', '🎯', '#5D4037'),
    ('32-musico', 'El Músico', '🎺', '#F9A825'),
    ('33-arana', 'La Araña', '🕷', '#212121'),
    ('34-soldado', 'El Soldado', '🪖', '#37474F'),
    ('35-estrella', 'La Estrella', '⭐', '#FBC02D'),
    ('36-cazo', 'El Cazo', '🍳', '#455A64'),
    ('37-mundo', 'El Mundo', '🌍', '#1E88E5'),
    ('38-apache', 'El Apache', '🏹', '#6D4C41'),
    ('39-nopal', 'El Nopal', '🌵', '#43A047'),
    ('40-alacran', 'El Alacrán', '🦂', '#8D6E63'),
    ('41-rosa', 'La Rosa', '🌹', '#E91E63'),
    ('42-calavera', 'La Calavera', '☠', '#546E7A'),
    ('43-campana', 'La Campana', '🔔', '#FDD835'),
    ('44-cantarito', 'El Cantarito', '🏺', '#A1887F'),
    ('45-venado', 'El Venado', '🦌', '#8D6E63'),
    ('46-sol', 'El Sol', '☀', '#FFB300'),
    ('47-corona', 'La Corona', '👑', '#FBC02D'),
    ('48-chalupa', 'La Chalupa', '🚣', '#00695C'),
    ('49-pino', 'El Pino', '🌲', '#1B5E20'),
    ('50-pescado', 'El Pescado', '🐟', '#039BE5'),
    ('51-palma', 'La Palma', '🌴', '#43A047'),
    ('52-maceta', 'La Maceta', '🪴', '#7CB342'),
    ('53-arpa', 'El Arpa', '🎶', '#8E24AA'),
    ('54-rana', 'La Rana', '🐸', '#388E3C'),
]

FONT_NUM = '/usr/share/fonts/liberation-sans-fonts/LiberationSans-Bold.ttf'


def tint_glyph(glyph, color, size):
    """Renderiza un glifo monocromo y lo tiñe del color dado (RGBA)."""
    pad = size // 6
    im = Image.new('RGBA', (pad * 2 + size, pad * 2 + size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype(GLYPH_FONT, size)
    except Exception:
        font = ImageFont.load_default()
    bbox = d.textbbox((0, 0), glyph, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (im.width - w) / 2 - bbox[0]
    y = (im.height - h) / 2 - bbox[1]
    d.text((x, y), glyph, font=font, fill=(0, 0, 0, 255))
    alpha = im.split()[3]
    solid = Image.new('RGBA', im.size, color)
    solid.putalpha(alpha)
    return solid


def card_color(color_hex):
    color_hex = color_hex.lstrip('#')
    return tuple(int(color_hex[i:i + 2], 16) for i in (0, 2, 4))


def shade(rgb, f):
    return tuple(min(255, max(0, int(c * f))) for c in rgb)


def make_card(filename, num, glyph, color_hex):
    color = card_color(color_hex)
    cream = (250, 241, 219, 255)
    ink = shade(color, 1.0)

    im = Image.new('RGBA', (R, R), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    # Fondo crema
    d.rounded_rectangle([40, 40, R - 40, R - 40], radius=70, fill=cream)

    # Marco exterior doble
    d.rounded_rectangle([40, 40, R - 40, R - 40], radius=70, outline=color, width=18)
    d.rounded_rectangle([70, 70, R - 70, R - 70], radius=52, outline=shade(color, 0.6), width=6)

    # Esquinas decorativas
    for cx, cy in [(112, 112), (R - 112, 112), (112, R - 112), (R - 112, R - 112)]:
        d.regular_polygon((cx, cy, 30), n_sides=4, rotation=45, fill=color)

    # Cenefa superior e inferior
    gh = 26
    for y in (118, R - 118 - gh):
        d.rounded_rectangle([40, y, R - 40, y + gh], radius=13, fill=shade(color, 0.12))
        d.rounded_rectangle([40, y, R - 40, y + gh], radius=13, outline=shade(color, 0.5), width=3)

    # Numero
    try:
        nfont = ImageFont.truetype(FONT_NUM, 120)
    except Exception:
        nfont = ImageFont.load_default()
    ntext = num
    nb = d.textbbox((0, 0), ntext, font=nfont)
    nw, nh = nb[2] - nb[0], nb[3] - nb[1]
    nx = (R - nw) / 2 - nb[0]
    ny = 150 - nb[1]
    d.text((nx, ny), ntext, font=nfont, fill=ink)
    d.line([(210, 210), (R - 210, 210)], fill=shade(color, 0.5), width=5)

    # Glifo
    glyph_im = tint_glyph(glyph, ink, 560)
    gi_w = int(R * 0.62)
    glyph_im = glyph_im.resize((gi_w, gi_w), Image.LANCZOS)
    im.alpha_composite(glyph_im, ((R - gi_w) // 2, 300))

    im.convert('RGB').save(filename, 'PNG')


def main():
    out = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'assets', 'cartas'))
    os.makedirs(out, exist_ok=True)
    for (cid, nombre, glyph, color) in CARTAS:
        make_card(os.path.join(out, f'{cid}.png'), cid.split('-')[0], glyph, color)
        print('ok', cid)


if __name__ == '__main__':
    main()
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Carta } from '@/src/data/cartas';
import { colores } from '@/src/theme';

interface Props {
  carta: Carta | null;
  total: number;
  cantadas: number;
}

export default function TarjetaGrande({ carta, total, cantadas }: Props) {
  const opacidad = useRef(new Animated.Value(1)).current;
  const escala = useRef(new Animated.Value(1)).current;
  const cartaAnterior = useRef<string | null>(carta?.id ?? null);

  useEffect(() => {
    if (carta?.id === cartaAnterior.current) return;
    cartaAnterior.current = carta?.id ?? null;
    opacidad.setValue(0.35);
    escala.setValue(0.94);
    Animated.parallel([
      Animated.timing(opacidad, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.timing(escala, { toValue: 1, duration: 320, useNativeDriver: true }),
    ]).start();
  }, [carta?.id, opacidad, escala]);

  if (!carta) {
    return (
      <View style={styles.contenedor}>
        <View style={[styles.marco, styles.vacio]}>
          <Text style={styles.emojiVacio}>🃏</Text>
          <Text style={styles.textoVacio}>¡Lotería!</Text>
          <Text style={styles.subVacio}>
            Pulsa «Siguiente carta»{'\n'}para comenzar a cantar.
          </Text>
        </View>
        <Text style={styles.posicion}>0 de {total} cartas</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Animated.View style={[styles.marco, { opacity: opacidad, transform: [{ scale: escala }] }]}>
        <Image source={carta.imagen} style={styles.imagen} resizeMode="contain" />
      </Animated.View>
      <View style={styles.nombreCaja}>
        <Text style={styles.nombre}>{carta.nombre}</Text>
      </View>
      <Text style={styles.posicion}>
        Carta {cantadas} de {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    width: '100%',
  },
  marco: {
    width: 300,
    height: 318,
    borderRadius: 44,
    backgroundColor: colores.tarjetaFondo,
    borderWidth: 5,
    borderColor: colores.bordeCarta,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  vacio: {
    backgroundColor: colores.crema,
    borderColor: colores.bordeCarta,
  },
  emojiVacio: {
    fontSize: 72,
  },
  textoVacio: {
    color: colores.verde,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 12,
  },
  subVacio: {
    color: colores.grisOscuro,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  nombreCaja: {
    marginTop: 18,
    backgroundColor: colores.rojo,
    borderRadius: 14,
    paddingHorizontal: 26,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  nombre: {
    color: colores.textoClaro,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  posicion: {
    marginTop: 10,
    color: colores.grisOscuro,
    fontSize: 14,
  },
});
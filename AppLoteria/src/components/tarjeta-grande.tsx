import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Carta } from '@/src/data/cartas';
import { colores } from '@/src/theme';

interface Props {
  carta: Carta | null;
  total: number;
  cantadas: number;
  tamano?: number;
}

export default function TarjetaGrande({ carta, total, cantadas, tamano = 300 }: Props) {
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
        <View style={[styles.vacio, { width: tamano, height: tamano }]}>
          <Image
            source={require('../../assets/images/primer-carta.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.posicion}>0 de {total} cartas</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Animated.View
        style={[
          { width: tamano, height: tamano, opacity: opacidad, transform: [{ scale: escala }] },
        ]}
      >
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  vacio: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nombreCaja: {
    marginTop: 12,
    backgroundColor: colores.rojo,
    borderRadius: 13,
    paddingHorizontal: 22,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
  nombre: {
    color: colores.textoClaro,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  posicion: {
    marginTop: 7,
    color: colores.grisOscuro,
    fontSize: 12,
  },
});
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Carta } from '@/src/data/cartas';
import { colores } from '@/src/theme';

interface Props {
  carta: Carta | null;
  total: number;
  cantadas: number;
  compacta?: boolean;
}

export default function TarjetaGrande({ carta, total, cantadas, compacta = false }: Props) {
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
        <View style={styles.areaImagen}>
          <Image
            source={require('../../assets/images/primer-carta.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
        <Text
          style={[styles.posicion, compacta && styles.posicionCompacta]}
          maxFontSizeMultiplier={1.35}
          numberOfLines={1}
        >
          0 de {total} cartas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Animated.View
        style={[
          styles.areaImagen,
          { opacity: opacidad, transform: [{ scale: escala }] },
        ]}
      >
        <Image source={carta.imagen} style={styles.imagen} resizeMode="contain" />
      </Animated.View>
      <View style={[styles.nombreCaja, compacta && styles.nombreCajaCompacta]}>
        <Text
          style={[styles.nombre, compacta && styles.nombreCompacto]}
          maxFontSizeMultiplier={1.35}
          numberOfLines={2}
        >
          {carta.nombre}
        </Text>
      </View>
      <Text
        style={[styles.posicion, compacta && styles.posicionCompacta]}
        maxFontSizeMultiplier={1.35}
        numberOfLines={1}
      >
        Carta {cantadas} de {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    minHeight: 0,
  },
  areaImagen: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 3,
    borderColor: colores.bordeCarta,
    borderRadius: 18,
    backgroundColor: '#FFF9E9',
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  nombreCaja: {
    marginTop: 8,
    backgroundColor: colores.rojo,
    borderRadius: 13,
    paddingHorizontal: 22,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
  nombreCajaCompacta: {
    marginTop: 4,
    paddingHorizontal: 18,
    paddingVertical: 3,
  },
  nombre: {
    color: colores.textoClaro,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  nombreCompacto: {
    fontSize: 19,
  },
  posicion: {
    marginTop: 4,
    color: colores.grisOscuro,
    fontSize: 12,
  },
  posicionCompacta: {
    marginTop: 2,
    fontSize: 11,
  },
});

import { Image, StyleSheet, Text, View } from 'react-native';
import { Carta } from '@/src/data/cartas';
import { colores } from '@/src/theme';

interface Props {
  carta: Carta | null;
  total: number;
  cantadas: number;
}

export default function TarjetaGrande({ carta, total, cantadas }: Props) {
  if (!carta) {
    return (
      <View style={styles.contenedor}>
        <View style={[styles.marco, styles.vacio]}>
          <Text style={styles.emojiVacio}>🃏</Text>
          <Text style={styles.textoVacio}>¡Lotería!</Text>
          <Text style={styles.subVacio}>
            Pulsa «Sacar» para comenzar{'\n'}a cantar las cartas.
          </Text>
        </View>
        <Text style={styles.posicion}>0 de {total} cartas</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.marco}>
        <Image source={carta.imagen} style={styles.imagen} resizeMode="contain" />
      </View>
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
    width: 280,
    height: 300,
    borderRadius: 24,
    backgroundColor: colores.tarjetaFondo,
    borderWidth: 5,
    borderColor: colores.bordeCarta,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  vacio: {
    backgroundColor: colores.fondoSuave,
    borderColor: colores.amarillo,
  },
  emojiVacio: {
    fontSize: 64,
  },
  textoVacio: {
    color: colores.crema,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
  },
  subVacio: {
    color: colores.crema,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    opacity: 0.85,
  },
  nombreCaja: {
    marginTop: 14,
    backgroundColor: colores.rojo,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colores.amarillo,
  },
  nombre: {
    color: colores.crema,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  posicion: {
    marginTop: 8,
    color: colores.crema,
    fontSize: 14,
    opacity: 0.8,
  },
});
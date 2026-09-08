import { useEffect, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carta } from '@/src/data/cartas';
import { colores } from '@/src/theme';

interface Props {
  historial: Carta[];
  restantes: number;
}

export default function Historial({ historial, restantes }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (historial.length > 0) {
      const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
      return () => clearTimeout(t);
    }
  }, [historial.length]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Cantadas</Text>
        <View style={styles.contadorCaja}>
          <Text style={styles.contador}>{historial.length}</Text>
        </View>
      </View>
      {historial.length === 0 ? (
        <Text style={styles.vacio}>
          {restantes === 54
            ? 'Todavía no se ha cantado ninguna carta.'
            : 'Ninguna carta por ahora.'}
        </Text>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fila}
        >
          {historial.map((carta, i) => (
            <View key={carta.id} style={styles.miniaturaCaja}>
              <Image
                source={carta.imagen}
                style={styles.miniatura}
                resizeMode="contain"
              />
              <View style={styles.numBadge}>
                <Text style={styles.miniaturaNum}>{i + 1}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    maxHeight: 92,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titulo: {
    color: colores.verde,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  contadorCaja: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colores.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  contador: {
    color: colores.rojoFuerte,
    fontSize: 14,
    fontWeight: '900',
  },
  vacio: {
    color: colores.grisOscuro,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 12,
  },
  fila: {
    paddingRight: 28,
    gap: 10,
    paddingBottom: 2,
  },
  miniaturaCaja: {
    width: 58,
    height: 62,
    borderRadius: 14,
    backgroundColor: colores.tarjetaFondo,
    borderWidth: 2,
    borderColor: colores.bordeCarta,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  miniatura: {
    width: '100%',
    height: '100%',
  },
  numBadge: {
    position: 'absolute',
    top: 3,
    left: 3,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: colores.rojo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  miniaturaNum: {
    fontSize: 10,
    fontWeight: '800',
    color: colores.textoClaro,
  },
});
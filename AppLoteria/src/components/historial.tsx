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
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titulo: {
    color: colores.verde,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  contadorCaja: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colores.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contador: {
    color: colores.rojoFuerte,
    fontSize: 17,
    fontWeight: '900',
  },
  vacio: {
    color: colores.grisOscuro,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 16,
  },
  fila: {
    paddingRight: 28,
    gap: 12,
    paddingBottom: 6,
  },
  miniaturaCaja: {
    width: 76,
    height: 90,
    borderRadius: 18,
    backgroundColor: colores.tarjetaFondo,
    borderWidth: 2,
    borderColor: colores.bordeCarta,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  miniatura: {
    width: '100%',
    height: '100%',
  },
  numBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colores.rojo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  miniaturaNum: {
    fontSize: 12,
    fontWeight: '800',
    color: colores.textoClaro,
  },
});
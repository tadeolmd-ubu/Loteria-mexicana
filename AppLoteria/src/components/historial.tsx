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
        <Text style={styles.titulo}>Historial</Text>
        <Text style={styles.contador}>
          Faltan {restantes} carta{restantes === 1 ? '' : 's'}
        </Text>
      </View>
      {historial.length === 0 ? (
        <Text style={styles.vacio}>Todavía no se ha cantado ninguna carta.</Text>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fila}
        >
          {historial.map((carta, i) => (
            <View key={carta.id} style={styles.miniaturaCaja}>
              <Image source={carta.imagen} style={styles.miniatura} resizeMode="contain" />
              <Text style={styles.miniaturaNum}>{i + 1}</Text>
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
    marginBottom: 6,
  },
  titulo: {
    color: colores.crema,
    fontSize: 15,
    fontWeight: '700',
  },
  contador: {
    color: colores.amarillo,
    fontSize: 15,
    fontWeight: '700',
  },
  vacio: {
    color: colores.crema,
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
    paddingVertical: 14,
  },
  fila: {
    paddingRight: 24,
    gap: 8,
  },
  miniaturaCaja: {
    width: 58,
    height: 66,
    borderRadius: 10,
    backgroundColor: colores.crema,
    borderWidth: 2,
    borderColor: colores.bordeCarta,
    overflow: 'hidden',
  },
  miniatura: {
    width: '100%',
    height: '100%',
  },
  miniaturaNum: {
    position: 'absolute',
    top: 1,
    left: 4,
    fontSize: 11,
    fontWeight: '800',
    color: colores.rojoFuerte,
  },
});
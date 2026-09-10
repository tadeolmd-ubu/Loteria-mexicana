import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VELOCIDADES } from '@/src/hooks/use-game';
import { colores } from '@/src/theme';

interface Props {
  indice: number;
  onChange: (indice: number) => void;
}

export default function ControlVelocidad({ indice, onChange }: Props) {
  const [activa, setActiva] = useState(indice);

  const marcar = (v: number) => setActiva(Math.round(v));

  return (
    <View style={styles.contenedor}>
      <Slider
        key={indice}
        style={styles.slider}
        minimumValue={0}
        maximumValue={VELOCIDADES.length - 1}
        step={1}
        value={indice}
        onValueChange={marcar}
        onSlidingComplete={(v) => onChange(Math.round(v))}
        minimumTrackTintColor={colores.rojo}
        maximumTrackTintColor={colores.grisClaro}
        thumbTintColor={colores.verde}
        accessibilityLabel="Velocidad del canto"
        accessibilityValue={{ text: VELOCIDADES[activa].etiqueta }}
      />
      <View style={styles.marcas}>
        {VELOCIDADES.map((v, i) => (
          <Pressable
            key={v.clave}
            style={styles.marcaBoton}
            onPress={() => {
              marcar(i);
              onChange(i);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Velocidad ${v.etiqueta}`}
            accessibilityState={{ selected: i === activa }}
          >
            <Text
              style={[styles.marca, i === activa && styles.marcaActiva]}
              maxFontSizeMultiplier={1.3}
              numberOfLines={1}
            >
              {v.etiqueta}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    height: 48,
  },
  slider: {
    width: '100%',
    height: 24,
  },
  marcas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: -4,
  },
  marcaBoton: {
    minHeight: 28,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marca: {
    color: colores.textoOscuro,
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '700',
  },
  marcaActiva: {
    opacity: 1,
    color: colores.rojo,
    fontWeight: '800',
  },
});

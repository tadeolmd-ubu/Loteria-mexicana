import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';
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
      />
      <View style={styles.marcas}>
        {VELOCIDADES.map((v, i) => (
          <Text
            key={v.clave}
            style={[styles.marca, i === activa && styles.marcaActiva]}
            onPress={() => {
              marcar(i);
              onChange(i);
            }}
          >
            {v.etiqueta}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    maxHeight: 40,
  },
  slider: {
    width: '100%',
    height: 24,
  },
  marcas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  marca: {
    color: colores.textoOscuro,
    fontSize: 11,
    opacity: 0.55,
    fontWeight: '600',
    paddingVertical: 0,
  },
  marcaActiva: {
    opacity: 1,
    color: colores.rojo,
    fontWeight: '800',
  },
});
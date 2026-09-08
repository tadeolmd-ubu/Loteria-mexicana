import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';
import { VELOCIDADES } from '@/src/hooks/use-game';
import { colores } from '@/src/theme';

interface Props {
  indice: number;
  onChange: (indice: number) => void;
}

export default function ControlVelocidad({ indice, onChange }: Props) {
  const [valor, setValor] = useState(indice);

  useEffect(() => {
    setValor(indice);
  }, [indice]);

  const manejarCambio = (v: number) => {
    const entero = Math.round(v);
    setValor(entero);
    onChange(entero);
  };

  return (
    <View style={styles.contenedor}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={VELOCIDADES.length - 1}
        step={1}
        value={valor}
        onValueChange={manejarCambio}
        minimumTrackTintColor={colores.rojo}
        maximumTrackTintColor={colores.grisClaro}
        thumbTintColor={colores.verde}
      />
      <View style={styles.marcas}>
        {VELOCIDADES.map((v, i) => (
          <Text
            key={v.clave}
            style={[styles.marca, i === valor && styles.marcaActiva]}
            onPress={() => manejarCambio(i)}
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
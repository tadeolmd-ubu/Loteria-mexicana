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
      <Text style={styles.etiqueta}>Velocidad del cantador</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={VELOCIDADES.length - 1}
        step={1}
        value={valor}
        onValueChange={manejarCambio}
        minimumTrackTintColor={colores.amarillo}
        maximumTrackTintColor={colores.fondoSuave}
        thumbTintColor={colores.rojo}
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
    paddingHorizontal: 8,
  },
  etiqueta: {
    color: colores.crema,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.9,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  marcas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  marca: {
    color: colores.crema,
    fontSize: 14,
    opacity: 0.6,
    fontWeight: '600',
    paddingVertical: 4,
  },
  marcaActiva: {
    opacity: 1,
    color: colores.amarillo,
    fontWeight: '800',
  },
});
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colores } from '@/src/theme';

interface Props {
  ms: number;
  activa: boolean;
  clave: number;
}

export default function BarraProgreso({ ms, activa, clave }: Props) {
  const progreso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progreso.stopAnimation();
    progreso.setValue(0);
    if (!activa) return;
    const anim = Animated.loop(
      Animated.timing(progreso, { toValue: 1, duration: ms, useNativeDriver: false }),
    );
    anim.start();
    return () => anim.stop();
  }, [ms, activa, clave, progreso]);

  return (
    <View
      style={styles.track}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Tiempo para la siguiente carta"
    >
      <Animated.View
        style={[
          styles.llenado,
          {
            width: progreso.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: colores.grisClaro,
    overflow: 'hidden',
  },
  llenado: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colores.verde,
  },
});

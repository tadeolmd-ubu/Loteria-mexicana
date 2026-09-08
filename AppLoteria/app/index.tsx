import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ControlVelocidad from '@/src/components/control-velocidad';
import Historial from '@/src/components/historial';
import TarjetaGrande from '@/src/components/tarjeta-grande';
import { useGame } from '@/src/hooks/use-game';
import { colores } from '@/src/theme';

export default function PantallaJuego() {
  const juego = useGame();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const accordarCarta = (() => {
    const alto = height - insets.top - insets.bottom;
    const fijos =
      12 + // padding vertical
      50 + // 5 gaps de 10
      40 + // cabecera
      92 + // carrusel
      58 + // botones grandes (deshacer / reiniciar)
      40 + // velocidad
      50 + // fila inferior (FAB + auto)
      76 + // placa del nombre + posición bajo la carta
      (juego.restantes === 0 ? 44 : 0); // gap + banner de fin
    const disponible = alto - fijos;
    return Math.max(150, Math.min(Math.floor(disponible), width - 46));
  })();

  if (!juego.cargado) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color={colores.verde} />
        <Text style={styles.textoCargando}>Cargando partida…</Text>
      </View>
    );
  }

  const terminadas = juego.restantes === 0;

  const confirmarReiniciar = () => {
    Alert.alert('¿Reiniciar?', 'Empieza una partida nueva y se borra el historial.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: juego.barajear },
    ]);
  };

  const manejarSiguiente = () => {
    if (juego.cantadas === 0 && !juego.jugando) {
      juego.iniciar();
      return;
    }
    juego.siguiente();
  };

  const controlAuto = juego.jugando
    ? { texto: '⏸  Pausa', onPress: juego.pausar }
    : {
        texto: juego.cantadas === 0 ? '▶  Sacar' : '▶  Continuar',
        onPress: juego.iniciar,
      };

  return (
    <SafeAreaView style={styles.fondo} edges={['top', 'bottom']}>
      <View style={styles.contenido}>
        <View style={styles.cabecera}>
          <View style={styles.cabeceraCaja}>
            <Text style={styles.kicker}>L O T E R Í A   M E X I C A N A</Text>
            <Text style={styles.titulo}>Contador de Lotería</Text>
          </View>
          <View style={styles.chipRestantes}>
            <Text style={styles.chipTexto}>
              {juego.restantes} {juego.restantes === 1 ? 'carta' : 'cartas'}
            </Text>
          </View>
        </View>

        <Historial historial={juego.historial} restantes={juego.restantes} />

        <View style={styles.zonaCarta}>
          <TarjetaGrande
            carta={juego.cartaActual}
            total={juego.total}
            cantadas={juego.cantadas}
            tamano={accordarCarta}
          />
        </View>

        <View style={styles.filaBotonesGrandes}>
          <Pressable
            style={[styles.botonGrande, juego.cantadas === 0 && styles.botonOpaco]}
            onPress={juego.deshacer}
            disabled={juego.cantadas === 0}
          >
            <Text style={styles.botonGrandeTexto}>↶  Deshacer</Text>
          </Pressable>
          <Pressable style={styles.botonGrande} onPress={confirmarReiniciar}>
            <Text style={styles.botonGrandeTexto}>↻  Reiniciar</Text>
          </Pressable>
        </View>

        <ControlVelocidad indice={juego.indiceVelocidad} onChange={juego.setVelocidad} />

        <View style={styles.filaInferior}>
          <Pressable
            style={[styles.botonAuto, juego.restantes === 0 && !juego.jugando && styles.botonOpaco]}
            onPress={controlAuto.onPress}
          >
            <Text style={styles.botonAutoTexto}>{controlAuto.texto}</Text>
          </Pressable>
          <Pressable
            style={[styles.botonFlotante, juego.restantes === 0 && styles.botonOpaco]}
            onPress={manejarSiguiente}
            disabled={juego.restantes === 0}
          >
            <Text style={styles.botonFlotanteTexto}>Siguiente carta  →</Text>
          </Pressable>
        </View>

        {terminadas && (
          <View style={styles.finBanner}>
            <Text style={styles.finTexto}>¡Se cantaron las 54 cartas!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  textoCargando: {
    color: colores.textoOscuro,
    fontSize: 16,
  },
  fondo: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cabeceraCaja: {
    flex: 1,
  },
  kicker: {
    color: colores.bordeCarta,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  titulo: {
    color: colores.verde,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 1,
  },
  chipRestantes: {
    backgroundColor: colores.amarillo,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipTexto: {
    color: colores.rojoFuerte,
    fontSize: 13,
    fontWeight: '800',
  },
  zonaCarta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filaBotonesGrandes: {
    flexDirection: 'row',
    gap: 12,
  },
  botonGrande: {
    flex: 1,
    backgroundColor: colores.tarjetaFondo,
    borderRadius: 18,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colores.verdeClaro,
    alignItems: 'center',
  },
  botonGrandeTexto: {
    color: colores.verde,
    fontSize: 17,
    fontWeight: '900',
  },
  botonOpaco: {
    opacity: 0.45,
  },
  filaInferior: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
  },
  botonAuto: {
    flex: 1,
    backgroundColor: colores.verde,
    borderRadius: 26,
    paddingVertical: 13,
    borderWidth: 3,
    borderColor: colores.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAutoTexto: {
    color: colores.textoClaro,
    fontSize: 15,
    fontWeight: '900',
  },
  botonFlotante: {
    flex: 2.2,
    backgroundColor: colores.rojo,
    borderRadius: 26,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colores.amarillo,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28,
    shadowRadius: 9,
    elevation: 9,
  },
  botonFlotanteTexto: {
    color: colores.textoClaro,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  finBanner: {
    backgroundColor: colores.verde,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  finTexto: {
    color: colores.textoClaro,
    fontSize: 14,
    fontWeight: '800',
  },
});
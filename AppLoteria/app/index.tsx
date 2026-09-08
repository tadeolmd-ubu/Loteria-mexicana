import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ControlVelocidad from '@/src/components/control-velocidad';
import Historial from '@/src/components/historial';
import TarjetaGrande from '@/src/components/tarjeta-grande';
import { useGame } from '@/src/hooks/use-game';
import { colores } from '@/src/theme';

export default function PantallaJuego() {
  const juego = useGame();

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
      <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
        <View style={styles.cabecera}>
          <View style={styles.cabeceraCaja}>
            <Text style={styles.kicker}>L O T E R Í A   M E X I C A N A</Text>
            <Text style={styles.titulo}>Contador de Lotería</Text>
          </View>
          <View style={styles.chipRestantes}>
            <Text style={styles.chipTexto}>
              Quedan {juego.restantes} carta{juego.restantes === 1 ? '' : 's'}
            </Text>
          </View>
        </View>

        <Historial historial={juego.historial} restantes={juego.restantes} />

        <TarjetaGrande
          carta={juego.cartaActual}
          total={juego.total}
          cantadas={juego.cantadas}
        />

        <ControlVelocidad indice={juego.indiceVelocidad} onChange={juego.setVelocidad} />

        <View style={styles.controlAutoCaja}>
          <Pressable
            style={styles.botonAuto}
            onPress={controlAuto.onPress}
            disabled={juego.restantes === 0 && !juego.jugando}
          >
            <Text style={styles.botonAutoTexto}>{controlAuto.texto}</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.botonFlotante, juego.restantes === 0 && styles.botonOpaco]}
          onPress={manejarSiguiente}
          disabled={juego.restantes === 0}
        >
          <Text style={styles.botonFlotanteTexto}>Siguiente carta  →</Text>
        </Pressable>

        <View style={styles.filaAcciones}>
          <Pressable
            style={[styles.botonAccion, juego.cantadas === 0 && styles.botonOpaco]}
            onPress={juego.deshacer}
            disabled={juego.cantadas === 0}
          >
            <Text style={styles.botonAccionTexto}>↶  Deshacer</Text>
          </Pressable>
          <Pressable style={styles.botonAccion} onPress={confirmarReiniciar}>
            <Text style={styles.botonAccionTexto}>↻  Reiniciar</Text>
          </Pressable>
        </View>

        {terminadas && (
          <View style={styles.finBanner}>
            <Text style={styles.finTexto}>¡Se cantaron las 54 cartas!</Text>
          </View>
        )}
      </ScrollView>
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
    padding: 20,
    paddingBottom: 44,
    gap: 18,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cabeceraCaja: {
    flex: 1,
  },
  kicker: {
    color: colores.bordeCarta,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  titulo: {
    color: colores.verde,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 2,
  },
  chipRestantes: {
    backgroundColor: colores.amarillo,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  chipTexto: {
    color: colores.rojoFuerte,
    fontSize: 14,
    fontWeight: '800',
  },
  controlAutoCaja: {
    alignItems: 'center',
  },
  botonAuto: {
    backgroundColor: colores.fondoSuave,
    borderRadius: 14,
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colores.verdeClaro,
    alignItems: 'center',
  },
  botonAutoTexto: {
    color: colores.verde,
    fontSize: 16,
    fontWeight: '800',
  },
  botonFlotante: {
    backgroundColor: colores.rojo,
    borderRadius: 34,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colores.amarillo,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  botonFlotanteTexto: {
    color: colores.textoClaro,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  botonOpaco: {
    opacity: 0.45,
  },
  filaAcciones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonAccion: {
    flex: 1,
    backgroundColor: colores.tarjetaFondo,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colores.verdeClaro,
    alignItems: 'center',
  },
  botonAccionTexto: {
    color: colores.verde,
    fontSize: 16,
    fontWeight: '800',
  },
  finBanner: {
    backgroundColor: colores.verde,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  finTexto: {
    color: colores.textoClaro,
    fontSize: 16,
    fontWeight: '800',
  },
});
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraProgreso from '@/src/components/barra-progreso';
import ControlVelocidad from '@/src/components/control-velocidad';
import Historial from '@/src/components/historial';
import TarjetaGrande from '@/src/components/tarjeta-grande';
import { useGame, VELOCIDADES } from '@/src/hooks/use-game';
import { colores } from '@/src/theme';

export default function PantallaJuego() {
  const juego = useGame();
  const { height, fontScale } = useWindowDimensions();
  const compacta = height < 760 || fontScale > 1.15;
  const muyCompacta = height < 650 || fontScale > 1.6;

  if (!juego.cargado) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color={colores.verde} />
        <Text style={styles.textoCargando}>Cargando partida…</Text>
      </View>
    );
  }

  const terminadas = juego.restantes === 0;
  const sinEmpezar = juego.cantadas === 0 && !juego.jugando;

  const confirmarReiniciar = () => {
    Alert.alert('¿Reiniciar?', 'Empieza una partida nueva y se borra el historial.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: juego.barajear },
    ]);
  };

  const manejarSiguiente = () => {
    if (juego.cantadas === 0 && !juego.jugando) return;
    juego.siguiente();
  };

  const controlAuto = juego.jugando
    ? { texto: '⏸  Pausa', onPress: juego.pausar }
    : {
        texto: juego.cantadas === 0 ? '▶  Empezar' : '▶  Continuar',
        onPress: juego.iniciar,
      };

  return (
    <SafeAreaView style={styles.fondo} edges={['top', 'bottom']}>
      <View pointerEvents="none" style={styles.frisoIzquierdo} />
      <View pointerEvents="none" style={styles.frisoDerecho} />
      <View
        style={[
          styles.contenido,
          compacta && styles.contenidoCompacto,
          muyCompacta && styles.contenidoMuyCompacto,
        ]}
      >
        <View style={[styles.cabecera, muyCompacta && styles.cabeceraMuyCompacta]}>
          <View style={styles.cabeceraCaja}>
            {!muyCompacta && (
              <Text style={styles.kicker} maxFontSizeMultiplier={1.2} numberOfLines={1}>
                BARAJA TRADICIONAL
              </Text>
            )}
            <Text
              style={[styles.titulo, compacta && styles.tituloCompacto]}
              maxFontSizeMultiplier={1.25}
              numberOfLines={1}
            >
              Lotería Mexicana
            </Text>
          </View>
          <View style={styles.chipRestantes}>
            <Text style={styles.chipTexto} maxFontSizeMultiplier={1.25} numberOfLines={1}>
              {juego.restantes} restantes
            </Text>
          </View>
        </View>

        <Historial historial={juego.historial} restantes={juego.restantes} />

        <View style={styles.zonaCarta}>
          <TarjetaGrande
            carta={juego.cartaActual}
            total={juego.total}
            cantadas={juego.cantadas}
            compacta={compacta}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.botonPausa,
            pressed && styles.botonPresionado,
            juego.restantes === 0 && !juego.jugando && styles.botonOpaco,
          ]}
          onPress={controlAuto.onPress}
          accessibilityRole="button"
          accessibilityLabel={controlAuto.texto.replace(/[▶⏸]/gu, '').trim()}
          accessibilityState={{ disabled: juego.restantes === 0 && !juego.jugando }}
        >
          <Text style={styles.botonPausaTexto} maxFontSizeMultiplier={1.3} numberOfLines={1}>
            {controlAuto.texto}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botonSiguiente,
            pressed && styles.botonPresionado,
            (terminadas || sinEmpezar) && styles.botonOpaco,
          ]}
          onPress={manejarSiguiente}
          disabled={terminadas || sinEmpezar}
          accessibilityRole="button"
          accessibilityLabel="Siguiente carta"
          accessibilityState={{ disabled: terminadas || sinEmpezar }}
        >
          <Text style={styles.botonSiguienteTexto} maxFontSizeMultiplier={1.3} numberOfLines={1}>
            Siguiente carta  →
          </Text>
        </Pressable>

        <BarraProgreso
          ms={VELOCIDADES[juego.indiceVelocidad].ms}
          activa={juego.jugando}
          clave={juego.cantadas}
        />

        <ControlVelocidad indice={juego.indiceVelocidad} onChange={juego.setVelocidad} />

        <View style={styles.filaAcciones}>
          <Pressable
            style={({ pressed }) => [
              styles.botonGrande,
              pressed && styles.botonSecundarioPresionado,
              juego.cantadas === 0 && styles.botonOpaco,
            ]}
            onPress={juego.deshacer}
            disabled={juego.cantadas === 0}
            accessibilityRole="button"
            accessibilityLabel="Retroceder una carta"
            accessibilityState={{ disabled: juego.cantadas === 0 }}
          >
            <Text style={styles.botonGrandeTexto} maxFontSizeMultiplier={1.2} numberOfLines={1}>
              ↶  Retroceder
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.botonGrande,
              pressed && styles.botonSecundarioPresionado,
            ]}
            onPress={confirmarReiniciar}
            accessibilityRole="button"
            accessibilityLabel="Reiniciar la partida"
          >
            <Text style={styles.botonGrandeTexto} maxFontSizeMultiplier={1.2} numberOfLines={1}>
              ↻  Reiniciar
            </Text>
          </Pressable>
        </View>

        {terminadas && (
          <View style={styles.finBanner}>
            <Text style={styles.finTexto} maxFontSizeMultiplier={1.25} numberOfLines={1}>
              ¡Se cantaron las 54 cartas!
            </Text>
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
  frisoIzquierdo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 5,
    backgroundColor: colores.verde,
    borderRightWidth: 2,
    borderRightColor: colores.bordeCarta,
  },
  frisoDerecho: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 5,
    backgroundColor: colores.rojo,
    borderLeftWidth: 2,
    borderLeftColor: colores.bordeCarta,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  contenidoCompacto: {
    paddingVertical: 6,
    gap: 6,
  },
  contenidoMuyCompacto: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    minHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    borderBottomWidth: 3,
    borderBottomColor: colores.bordeCarta,
    backgroundColor: colores.verde,
  },
  cabeceraMuyCompacta: {
    minHeight: 40,
    paddingVertical: 3,
  },
  cabeceraCaja: {
    flex: 1,
  },
  kicker: {
    color: colores.amarillo,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 1,
  },
  tituloCompacto: {
    fontSize: 18,
  },
  chipRestantes: {
    backgroundColor: colores.amarillo,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colores.bordeCarta,
  },
  chipTexto: {
    color: colores.rojoFuerte,
    fontSize: 13,
    fontWeight: '800',
  },
  zonaCarta: {
    flex: 1,
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonOpaco: {
    opacity: 0.4,
  },
  botonPresionado: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  botonPausa: {
    backgroundColor: colores.verde,
    borderRadius: 26,
    minHeight: 52,
    paddingVertical: 8,
    borderWidth: 3,
    borderColor: colores.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPausaTexto: {
    color: colores.textoClaro,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  botonSiguiente: {
    backgroundColor: colores.rojo,
    borderRadius: 26,
    minHeight: 52,
    paddingVertical: 8,
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
  botonSiguienteTexto: {
    color: colores.textoClaro,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  filaAcciones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonGrande: {
    flex: 1,
    minHeight: 50,
    backgroundColor: colores.tarjetaFondo,
    borderRadius: 18,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: colores.verdeClaro,
    alignItems: 'center',
  },
  botonGrandeTexto: {
    color: colores.verde,
    fontSize: 16,
    fontWeight: '900',
  },
  botonSecundarioPresionado: {
    backgroundColor: colores.fondoSuave,
  },
  finBanner: {
    backgroundColor: colores.verde,
    borderRadius: 12,
    minHeight: 34,
    paddingVertical: 5,
    alignItems: 'center',
  },
  finTexto: {
    color: colores.textoClaro,
    fontSize: 14,
    fontWeight: '800',
  },
});

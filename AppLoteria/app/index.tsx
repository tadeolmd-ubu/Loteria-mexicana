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
        <ActivityIndicator size="large" color={colores.amarillo} />
        <Text style={styles.textoCargando}>Cargando partida…</Text>
      </View>
    );
  }

  const terminadas = juego.restantes === 0;

  const confirmarBarajear = () => {
    Alert.alert('¿Barajear?', 'Empieza una partida nueva y se borra el historial.', [
      { text: 'No', style: 'cancel' },
      { text: 'Sí', style: 'destructive', onPress: juego.barajear },
    ]);
  };

  return (
    <SafeAreaView style={styles.fondo} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
        <View style={styles.tituloCaja}>
          <Text style={styles.titulo}>LOTERÍA</Text>
          <Text style={styles.subtitulo}>Cantador mexicano</Text>
        </View>

        <Historial historial={juego.historial} restantes={juego.restantes} />

        <TarjetaGrande carta={juego.cartaActual} total={juego.total} cantadas={juego.cantadas} />

        <View style={styles.controles}>
          {juego.jugando ? (
            <Pressable style={styles.botonPrincipal} onPress={juego.pausar}>
              <Text style={styles.botonTexto}>⏸  Pausa</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.botonPrincipal}
              onPress={juego.iniciar}
              disabled={juego.restantes === 0}
            >
              <Text style={styles.botonTexto}>
                {juego.cantadas === 0 ? '▶  Sacar' : '▶  Continuar'}
              </Text>
            </Pressable>
          )}

          <View style={styles.filaSecundaria}>
            <Pressable
              style={styles.botonSecundario}
              onPress={juego.siguiente}
              disabled={juego.restantes === 0}
            >
              <Text style={styles.botonSecundarioTexto}>Siguiente +</Text>
            </Pressable>
            <Pressable style={styles.botonSecundario} onPress={confirmarBarajear}>
              <Text style={styles.botonSecundarioTexto}>♻  Barajear</Text>
            </Pressable>
          </View>
        </View>

        <ControlVelocidad indice={juego.indiceVelocidad} onChange={juego.setVelocidad} />

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
    color: colores.crema,
    fontSize: 16,
  },
  fondo: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 16,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 18,
  },
  tituloCaja: {
    alignItems: 'center',
  },
  titulo: {
    color: colores.amarillo,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 6,
  },
  subtitulo: {
    color: colores.crema,
    fontSize: 15,
    opacity: 0.85,
    marginTop: 2,
  },
  controles: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: colores.rojo,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: colores.amarillo,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  botonTexto: {
    color: colores.crema,
    fontSize: 24,
    fontWeight: '800',
  },
  filaSecundaria: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  botonSecundario: {
    flex: 1,
    backgroundColor: colores.fondoSuave,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colores.verdeClaro,
    alignItems: 'center',
  },
  botonSecundarioTexto: {
    color: colores.crema,
    fontSize: 16,
    fontWeight: '700',
  },
  botonOpaco: {
    opacity: 0.45,
  },
  finBanner: {
    width: '100%',
    backgroundColor: colores.verde,
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colores.amarillo,
    alignItems: 'center',
  },
  finTexto: {
    color: colores.crema,
    fontSize: 16,
    fontWeight: '800',
  },
});
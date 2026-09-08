import AsyncStorage from '@react-native-async-storage/async-storage';

export const CLAVE_PARTIDA = 'loteria:partida:v2';

export interface PartidaGuardada {
  cola: string[];
  cantadas: string[];
  indiceVelocidad: number;
}

export async function cargarPartida(): Promise<PartidaGuardada | null> {
  try {
    const raw = await AsyncStorage.getItem(CLAVE_PARTIDA);
    if (!raw) return null;
    const data = JSON.parse(raw) as PartidaGuardada;
    if (
      !Array.isArray(data.cola) ||
      !Array.isArray(data.cantadas) ||
      typeof data.indiceVelocidad !== 'number'
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function guardarPartida(partida: PartidaGuardada): Promise<void> {
  try {
    await AsyncStorage.setItem(CLAVE_PARTIDA, JSON.stringify(partida));
  } catch {
    // Persistencia opcional: si falla, el juego sigue funcionando.
  }
}

export async function limpiarPartida(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CLAVE_PARTIDA);
  } catch {
    // ignorar
  }
}
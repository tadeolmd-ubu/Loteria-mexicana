import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { CARTAS } from '@/src/data/cartas';
import { cargarPartida, guardarPartida, limpiarPartida } from '@/src/storage/storage';
import { detenerVoz, hablar } from '@/src/utils/voz';

export const VELOCIDADES = [
  { clave: 'lenta', etiqueta: 'Lenta', ms: 6000 },
  { clave: 'media', etiqueta: 'Media', ms: 3800 },
  { clave: 'rapida', etiqueta: 'Rápida', ms: 2200 },
] as const;

export type TipoVelocidad = (typeof VELOCIDADES)[number]['clave'];

interface Estado {
  cola: string[];
  cantadas: string[];
  indiceVelocidad: number;
}

type Accion =
  | { type: 'RESTAURAR'; estado: Estado }
  | { type: 'SACAR' }
  | { type: 'NUEVA_PARTIDA' }
  | { type: 'SET_VELOCIDAD'; indice: number };

function barajarFisherYates(): string[] {
  const ids = CARTAS.map((c) => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

const estadoInicial: Estado = {
  cola: [],
  cantadas: [],
  indiceVelocidad: 1,
};

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.type) {
    case 'RESTAURAR':
      return accion.estado;
    case 'SACAR': {
      if (estado.cola.length === 0) return estado;
      const [siguiente, ...cola] = estado.cola;
      return { ...estado, cola, cantadas: [...estado.cantadas, siguiente] };
    }
    case 'NUEVA_PARTIDA':
      return { ...estado, cola: barajarFisherYates(), cantadas: [], indiceVelocidad: 1 };
    case 'SET_VELOCIDAD':
      return { ...estado, indiceVelocidad: accion.indice };
    default:
      return estado;
  }
}

export function useGame() {
  const [estado, dispatch] = useReducer(reducer, undefined, () => ({ ...estadoInicial }));
  const [cargado, setCargado] = useState(false);
  const [jugando, setJugando] = useState(false);
  const ultimaLongitud = useRef(0);

  useEffect(() => {
    let activo = true;
    (async () => {
      const guardada = await cargarPartida();
      if (!activo) return;
      if (guardada) {
        ultimaLongitud.current = guardada.cantadas.length;
        dispatch({ type: 'RESTAURAR', estado: guardada });
      } else {
        dispatch({ type: 'NUEVA_PARTIDA' });
      }
      setCargado(true);
    })();
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!cargado) return;
    if (estado.cantadas.length === 0) {
      ultimaLongitud.current = 0;
      return;
    }
    const crecio = estado.cantadas.length > ultimaLongitud.current;
    ultimaLongitud.current = estado.cantadas.length;
    if (crecio) {
      const id = estado.cantadas[estado.cantadas.length - 1];
      const carta = CARTAS.find((c) => c.id === id);
      if (carta) hablar(carta.nombre);
    }
  }, [estado.cantadas, cargado]);

  useEffect(() => {
    if (!cargado) return;
    guardarPartida({
      cola: estado.cola,
      cantadas: estado.cantadas,
      indiceVelocidad: estado.indiceVelocidad,
    });
  }, [estado, cargado]);

  useEffect(() => {
    if (!cargado || !jugando) return;
    if (estado.cola.length === 0) {
      setJugando(false);
      return;
    }
    const ms = VELOCIDADES[estado.indiceVelocidad].ms;
    const timer = setInterval(() => dispatch({ type: 'SACAR' }), ms);
    return () => clearInterval(timer);
  }, [jugando, cargado, estado.cola.length, estado.indiceVelocidad]);

  const iniciar = useCallback(() => {
    if (estado.cola.length === 0) return;
    detenerVoz();
    if (estado.cantadas.length === 0) {
      dispatch({ type: 'SACAR' });
    }
    setJugando(true);
  }, [estado.cola.length, estado.cantadas.length]);

  const pausar = useCallback(() => {
    detenerVoz();
    setJugando(false);
  }, []);

  const siguiente = useCallback(() => {
    detenerVoz();
    dispatch({ type: 'SACAR' });
  }, []);

  const barajear = useCallback(() => {
    detenerVoz();
    setJugando(false);
    dispatch({ type: 'NUEVA_PARTIDA' });
    limpiarPartida();
  }, []);

  const setVelocidad = useCallback((indice: number) => {
    dispatch({ type: 'SET_VELOCIDAD', indice });
  }, []);

  const cartaActual = useMemo(() => {
    if (estado.cantadas.length === 0) return null;
    const id = estado.cantadas[estado.cantadas.length - 1];
    return CARTAS.find((c) => c.id === id) ?? null;
  }, [estado.cantadas]);

  const historial = useMemo(
    () =>
      estado.cantadas
        .map((id) => CARTAS.find((c) => c.id === id))
        .filter((c): c is (typeof CARTAS)[number] => Boolean(c)),
    [estado.cantadas],
  );

  return {
    cargado,
    jugando,
    cartaActual,
    historial,
    total: CARTAS.length,
    cantadas: estado.cantadas.length,
    restantes: estado.cola.length,
    indiceVelocidad: estado.indiceVelocidad,
    iniciar,
    pausar,
    siguiente,
    barajear,
    setVelocidad,
  };
}

export type Juego = ReturnType<typeof useGame>;
import {
  ImpostorServerConfig,
  ImpostorPlayerState,
  ImpostorPublicState,
  GamePhase,
} from './types';

// ── Word data (lightweight copy for server-side use) ─────────────────────────

const WORD_CATEGORIES: Record<string, { name: string; words: string[] }> = {
  lugares: {
    name: 'Lugares y Viajes',
    words: [
      'Playa', 'Aeropuerto', 'Hospital', 'Hotel', 'Cine', 'Museo', 'Supermercado',
      'Biblioteca', 'Gimnasio', 'Parque de atracciones', 'Zoológico', 'Castillo',
      'Submarino', 'Restaurante', 'Discoteca', 'Piscina', 'Estadio de fútbol',
      'Universidad', 'Gasolinera', 'Comisaría', 'Casino', 'Crucero', 'Faro', 'Circo',
    ],
  },
  comida: {
    name: 'Comida y Bebida',
    words: [
      'Pizza', 'Hamburguesa', 'Paella', 'Sushi', 'Tacos', 'Tortilla de patatas',
      'Helado', 'Chocolate', 'Café', 'Cerveza', 'Vino', 'Palomitas', 'Croquetas',
      'Lasaña', 'Espaguetis', 'Ensalada', 'Churros', 'Queso', 'Jamón', 'Donut',
      'Guacamole', 'Sandía', 'Aguacate', 'Batido', 'Perrito caliente', 'Ramen',
    ],
  },
  animales: {
    name: 'Animales y Naturaleza',
    words: [
      'León', 'Elefante', 'Pingüino', 'Delfín', 'Tiburón', 'Perro', 'Gato',
      'Jirafa', 'Canguro', 'Mono', 'Águila', 'Serpiente', 'Cocodrilo', 'Oso polar',
      'Lobo', 'Caballo', 'Panda', 'Koala', 'Flamenco', 'Tigre', 'Pulpo', 'Búho',
    ],
  },
  profesiones: {
    name: 'Profesiones y Oficios',
    words: [
      'Astronauta', 'Médico', 'Policía', 'Bombero', 'Cocinero', 'Profesor',
      'Piloto', 'Detective', 'Pintor', 'Actor', 'Futbolista', 'Músico',
      'Juez', 'Científico', 'Arquitecto', 'Veterinario', 'Dentista', 'Espía',
      'Mago', 'Fotógrafo', 'Buzo', 'Periodista', 'Fontanero',
    ],
  },
  peliculas: {
    name: 'Películas y Series',
    words: [
      'Harry Potter', 'Star Wars', 'El Señor de los Anillos', 'Titanic',
      'Jurassic Park', 'Avatar', 'Spider-Man', 'Batman', 'Avengers',
      'Juego de Tronos', 'Stranger Things', 'La Casa de Papel', 'Shrek',
      'Toy Story', 'Matrix', 'Barbie', 'Oppenheimer', 'Indiana Jones',
    ],
  },
  objetos: {
    name: 'Objetos Cotidianos',
    words: [
      'Teléfono móvil', 'Paraguas', 'Gafas de sol', 'Reloj', 'Llaves',
      'Cepillo de dientes', 'Zapatillas', 'Auriculares', 'Microondas', 'Espejo',
      'Mando a distancia', 'Almohada', 'Maleta', 'Sartén', 'Taza', 'Billetera',
      'Guitarra', 'Bicicleta', 'Lámpara', 'Cámara de fotos',
    ],
  },
  deportes: {
    name: 'Deportes y Hobbies',
    words: [
      'Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Boxeo', 'Escalada', 'Surf',
      'Esquí', 'Ciclismo', 'Ajedrez', 'Pádel', 'Golf', 'Béisbol', 'Gimnasia',
      'Voleibol', 'Skateboarding', 'Pesca', 'Yoga', 'Karate', 'Bolos',
    ],
  },
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Impostor game state (private, server-only) ────────────────────────────────

export interface ImpostorGameState {
  phase: GamePhase;
  players: ImpostorPlayerState[];
  secretWord: string;
  categoryName: string;
  startingPlayerName: string;
  votedPlayerName?: string;
  result?: ImpostorPublicState['result'];
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createImpostorGame(
  playerNames: string[],
  config: ImpostorServerConfig
): ImpostorGameState {
  // Pick word and category
  const availableCats = config.selectedCategories.length
    ? config.selectedCategories.filter((id) => WORD_CATEGORIES[id])
    : Object.keys(WORD_CATEGORIES);

  const catId = pickRandom(availableCats);
  const category = WORD_CATEGORIES[catId] ?? WORD_CATEGORIES['lugares'];
  const secretWord = pickRandom(category.words);

  // Assign impostors
  const shuffled = [...playerNames].sort(() => Math.random() - 0.5);
  const impostorNames = new Set(shuffled.slice(0, config.impostorCount));

  const players: ImpostorPlayerState[] = playerNames.map((name) => ({
    name,
    isImpostor: impostorNames.has(name),
    score: 0,
  }));

  const startingPlayerName = pickRandom(playerNames);

  return {
    phase: 'reveal',
    players,
    secretWord,
    categoryName: category.name,
    startingPlayerName,
  };
}

// ── Phase transitions ─────────────────────────────────────────────────────────

export function toDiscussion(state: ImpostorGameState): ImpostorGameState {
  return { ...state, phase: 'discussion' };
}

export function toVote(state: ImpostorGameState): ImpostorGameState {
  return { ...state, phase: 'vote' };
}

export function castVote(
  state: ImpostorGameState,
  votedPlayerName: string,
  impostorGuessedRight?: boolean
): ImpostorGameState {
  const votedPlayer = state.players.find((p) => p.name === votedPlayerName);
  let result: ImpostorPublicState['result'];

  if (votedPlayer?.isImpostor) {
    result = impostorGuessedRight ? 'impostor_guessed' : 'innocents_win';
  } else {
    result = 'innocents_win';
  }

  // The impostor only wins if they guess the secret word after being caught.
  const players = state.players.map((p) => {
    let pts = 0;
    if (result === 'innocents_win' && !p.isImpostor) pts = 1;
    if (result === 'impostor_guessed' && p.isImpostor) pts = 2;
    return { ...p, score: p.score + pts };
  });

  return {
    ...state,
    phase: 'finished',
    votedPlayerName,
    result,
    players,
  };
}

// ── Projection (public state, no secrets) ─────────────────────────────────────

export function toPublicState(state: ImpostorGameState): ImpostorPublicState {
  return {
    phase: state.phase,
    players: state.players.map((p) => ({ name: p.name, score: p.score })),
    startingPlayerName: state.startingPlayerName,
    categoryName: state.categoryName,
    // Only expose secret word & impostors after game ends
    secretWord: state.phase === 'finished' ? state.secretWord : undefined,
    impostorNames: state.phase === 'finished' ? state.players.filter((p) => p.isImpostor).map((p) => p.name) : undefined,
    result: state.result,
    votedPlayerName: state.votedPlayerName,
  };
}

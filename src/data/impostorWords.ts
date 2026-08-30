import { ImpostorCategory, ImpostorWord, ImpostorWordDifficulty } from '../types/impostor';

const buildWords = (items: string[], difficultyPattern: ImpostorWordDifficulty[]): ImpostorWord[] =>
  items.map((text, index) => ({
    text,
    difficulty: difficultyPattern[index % difficultyPattern.length],
  }));

export const ALL_WORD_DIFFICULTIES: ImpostorWordDifficulty[] = ['facil', 'medio', 'dificil'];

export const IMPOSTOR_DIFFICULTY_LABELS: Record<ImpostorWordDifficulty, string> = {
  facil: 'Fácil',
  medio: 'Medio',
  dificil: 'Difícil',
};

export const IMPOSTOR_CATEGORIES: ImpostorCategory[] = [
  {
    id: 'lugares',
    name: 'Lugares y Viajes',
    icon: '✈️',
    words: buildWords([
      'Playa', 'Aeropuerto', 'Hospital', 'Hotel', 'Cine', 'Museo', 'Supermercado',
      'Biblioteca', 'Gimnasio', 'Estación de tren', 'Parque de atracciones', 'Zoológico',
      'Castillo', 'Submarino', 'Restaurante', 'Discoteca', 'Piscina', 'Estadio de fútbol',
      'Spa', 'Universidad', 'Gasolinera', 'Comisaría', 'Casino', 'Crucero', 'Campamento',
      'Faro', 'Teatro', 'Circo', 'Pirámides de Egipto', 'Torre Eiffel', 'La Luna', 'Isla Desierta',
      'Estación espacial', 'Selva tropical', 'Desierto', 'Montaña rusa', 'Gran hotel', 'Terminal de autobuses',
      'Mercado medieval', 'Parque nacional', 'Mina de oro', 'Puerto deportivo', 'Pueblo costero',
      'Cueva', 'Mansión encantada', 'Rascacielos', 'Catedral', 'Almacén', 'Puente colgante',
      'Observatorio', 'Acuario', 'Jardín botánico', 'Plaza central', 'Paseo marítimo', 'Refugio de montaña',
      'Cafetería', 'Fundición', 'Granja', 'Bodega', 'Museo del futuro', 'Pueblo abandonado',
      'Terminal de tren', 'Estación polar', 'Lago cristalino', 'Bungalow', 'Río caudaloso', 'Túnel subterráneo'
    ], ['facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'comida',
    name: 'Comida y Bebida',
    icon: '🍕',
    words: buildWords([
      'Pizza', 'Hamburguesa', 'Paella', 'Sushi', 'Tacos', 'Tortilla de patatas',
      'Helado', 'Chocolate', 'Café', 'Cerveza', 'Vino', 'Palomitas', 'Croquetas',
      'Lasaña', 'Espaguetis', 'Ensalada', 'Churros', 'Queso', 'Jamón', 'Donut',
      'Tarta de queso', 'Guacamole', 'Sandía', 'Aguacate', 'Batido', 'Perrito caliente',
      'Ramen', 'Croissant', 'Empanada', 'Mojito', 'Sopa de fideos', 'Muffin', 'Pasta al pesto',
      'Tortilla española', 'Patatas bravas', 'Pa amb tomàquet', 'Burrito', 'Waffles', 'Brownie',
      'Sándwich', 'Kebab', 'Nuggets', 'Gazpacho', 'Arroz con leche', 'Pancakes', 'Arepas',
      'Calamares', 'Fajitas', 'Bocadillo', 'Tiramisu', 'Flan', 'Macarrones', 'Pesto',
      'Gaseosa', 'Limonada', 'Café con hielo', 'Cerveza artesanal', 'Cóctel', 'Te matcha',
      'Helado de vainilla', 'Curry', 'Asado', 'Poke bowl', 'Bruschetta', 'Nachos'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'animales',
    name: 'Animales y Naturaleza',
    icon: '🦁',
    words: buildWords([
      'León', 'Elefante', 'Pingüino', 'Delfín', 'Tiburón', 'Perro', 'Gato',
      'Jirafa', 'Canguro', 'Mono', 'Águila', 'Serpiente', 'Cocodrilo', 'Oso polar',
      'Lobo', 'Caballo', 'Panda', 'Camaleón', 'Koala', 'Flamenco', 'Tigre',
      'Pulpo', 'Búho', 'Murciélago', 'Ballena', 'Dinosaurio', 'Unicornio', 'Rana',
      'Zorro', 'Conejo', 'Loro', 'Hippopótamo', 'Rinoceronte', 'Mapache', 'Foca',
      'Guacamayo', 'Puma', 'Morsa', 'Nutria', 'Jaguar', 'Gorila', 'Alce', 'Pantera',
      'Vaca', 'Cerdo', 'Oveja', 'Pato', 'Águila real', 'Orca', 'Fénix', 'Dragón',
      'Cebra', 'Guepardo', 'Llama', 'Hipocampo', 'Mariposa', 'Libélula', 'Cocodrilo',
      'Halcón', 'Árbol', 'Bosque', 'Catarata', 'Volcán', 'Selva', 'Oasis', 'Pradera'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'profesiones',
    name: 'Profesiones y Oficios',
    icon: '👨‍🚀',
    words: buildWords([
      'Astronauta', 'Médico', 'Policía', 'Bombero', 'Cocinero', 'Profesor',
      'Piloto', 'Detective', 'Pintor', 'Actor', 'Futbolista', 'Músico',
      'Juez', 'Científico', 'Arquitecto', 'Veterinario', 'Dentista', 'Espía',
      'Mago', 'Fotógrafo', 'Buzo', 'Periodista', 'Fontanero', 'Carpintero', 'Guía turístico',
      'Ingeniero', 'Abogado', 'Taxista', 'Electricista', 'Panadero', 'Albañil',
      'Chef', 'Marinero', 'Recepcionista', 'Psicólogo', 'Programador', 'Diseñador',
      'Camarero', 'Higienista', 'Fisioterapeuta', 'Bailarín', 'Modelo', 'Chef de pastelería',
      'Cazador', 'Pescador', 'Lider de equipo', 'Agricultor', 'Locutor', 'Secretario',
      'Guardia de seguridad', 'Nadador profesional', 'Minero', 'Científico espacial', 'Artista', 'Cirujano'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'peliculas',
    name: 'Películas, Series y Ficción',
    icon: '🎬',
    words: buildWords([
      'Harry Potter', 'Star Wars', 'El Señor de los Anillos', 'Titanic', 'Jurassic Park',
      'Avatar', 'Spider-Man', 'Batman', 'Avengers', 'Juego de Tronos', 'Stranger Things',
      'La Casa de Papel', 'Shrek', 'Toy Story', 'Matrix', 'Piratas del Caribe',
      'El Rey León', 'Breaking Bad', 'Miércoles', 'Indiana Jones', 'Barbie', 'Oppenheimer',
      'El Hobbit', 'Los Increíbles', 'Frozen', 'Los Vengadores', 'Dune', 'The Batman',
      'Super Mario Bros', 'Zootopia', 'Mad Max', 'Rápidos y furiosos', 'The Office',
      'Loki', 'Black Mirror', 'Doctor Who', 'The Witcher', 'Sherlock', 'Moon Knight',
      'El Imperio contraataca', 'Volver al futuro', 'RoboCop', 'Aladdin', 'E.T.', 'Mulan',
      'Hocus Pocus', 'La Sirenita', 'Los Minions', 'Interstellar', 'El exorcista', 'Prison Break',
      'The Boys', 'Narnia', 'WALL·E', 'Coco', 'Encanto', 'Moana'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'objetos',
    name: 'Objetos Cotidianos',
    icon: '📱',
    words: buildWords([
      'Teléfono móvil', 'Paraguas', 'Gafas de sol', 'Reloj', 'Llaves', 'Cepillo de dientes',
      'Zapatillas', 'Auriculares', 'Microondas', 'Espejo', 'Mando a distancia', 'Almohada',
      'Maleta', 'Sartén', 'Taza', 'Billetera', 'Guitarra', 'Bicicleta', 'Monopatín',
      'Secador de pelo', 'Lámpara', 'Cámara de fotos', 'Moneda', 'Libro', 'Portátil', 'Tablet',
      'Pelota', 'Cinta adhesiva', 'Papel higiénico', 'Pijama', 'Toalla', 'Mochila', 'Balde',
      'Escritorio', 'Silla', 'Mesa', 'Ventilador', 'Nevera', 'Estantería', 'Candado', 'Linterna',
      'Impresora', 'Ropa interior', 'Pantalón', 'Chaqueta', 'Bufanda', 'Botella de agua',
      'Cargador', 'Banco', 'Parasol', 'Cámara de seguridad', 'Tijeras', 'Pincel', 'Maceta',
      'Micrófono', 'Batería externa', 'Router', 'Consola de videojuegos', 'Pala', 'Pocillo'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'deportes',
    name: 'Deportes y Hobbies',
    icon: '⚽',
    words: buildWords([
      'Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Boxeo', 'Escalada', 'Surf',
      'Esquí', 'Ciclismo', 'Ajedrez', 'Pádel', 'Golf', 'Béisbol', 'Gimnasia',
      'Voleibol', 'Skateboarding', 'Pesca', 'Senderismo', 'Yoga', 'Karate', 'Bolos',
      'Badminton', 'Atletismo', 'Triatlón', 'Patinaje', 'Snowboard', 'Kickboxing', 'Raquetbol',
      'Polo', 'Motosierras', 'Judo', 'Parkour', 'Paddle surf', 'Música en directo', 'Jardinería',
      'Manualidades', 'Origami', 'Pintura', 'Fotografía', 'Coleccionismo', 'Dibujo', 'Cocina',
      'Ciclismo de montaña', 'Escalada en roca', 'Taekwondo', 'Dardos', 'Biarritz', 'Puzles'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
  {
    id: 'tecnologia',
    name: 'Tecnología y Digital',
    icon: '💻',
    words: buildWords([
      'Ordenador', 'Portátil', 'Smartphone', 'Tablet', 'Ratón', 'Teclado', 'Monitor',
      'Router', 'Cargador', 'Pendrive', 'Disco duro', 'Altavoces', 'Cascos', 'Webcam',
      'Smartwatch', 'Televisor', 'Videoconsola', 'Control', 'Impresora', 'Scanner',
      'Inteligencia artificial', 'Algoritmo', 'Aplicación', 'Nube', 'Software', 'Hardware', 'Wifi',
      'Bluetooth', 'Streaming', 'Red social', 'Videojuego', 'Realidad virtual', 'Realidad aumentada',
      'Ciberseguridad', 'Base de datos', 'Código', 'Terminal', 'Pantalla táctil', 'Luz LED',
      'Satelite', 'Placa base', 'Procesador', 'Memoria RAM', 'Tarjeta gráfica', 'Servidor', 'Chatbot',
      'Cámara digital', 'Cámara 360', 'Drone', 'Lego digital', 'Batería', 'Cable USB', 'Conector'
    ], ['facil', 'facil', 'facil', 'facil', 'facil', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'medio', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil', 'dificil'])
  },
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomWord(
  selectedCategoryIds?: string[],
  selectedDifficulties: ImpostorWordDifficulty[] = ALL_WORD_DIFFICULTIES,
  customWords?: string[]
): { word: string; categoryName: string; difficulty: ImpostorWordDifficulty } {
  const customList = customWords && customWords.length > 0 ? customWords : [];

  const availableCategories = (selectedCategoryIds && selectedCategoryIds.length > 0)
    ? IMPOSTOR_CATEGORIES.filter((c) => selectedCategoryIds.includes(c.id))
    : IMPOSTOR_CATEGORIES;

  if (customList.length > 0 && Math.random() < 0.3) {
    const word = customList[Math.floor(Math.random() * customList.length)];
    return { word, categoryName: 'Palabras Personalizadas', difficulty: 'medio' };
  }

  const category = pickRandom(availableCategories.length > 0 ? availableCategories : IMPOSTOR_CATEGORIES);
  const filteredWords = category.words.filter((entry) => selectedDifficulties.includes(entry.difficulty));
  const selectedWord = pickRandom(filteredWords.length > 0 ? filteredWords : category.words);

  return { word: selectedWord.text, categoryName: category.name, difficulty: selectedWord.difficulty };
}

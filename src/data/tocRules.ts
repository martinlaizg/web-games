import { TocCardRule, TocFaqItem } from '../types/toc';

export const TOC_CARDS_RULES: TocCardRule[] = [
  {
    id: 'A',
    name: 'As (A)',
    shortEffect: 'Sacar ficha de la base O avanzar 1 casilla',
    fullEffect: 'Permite sacar una de tus fichas desde tu campamento (base) a tu casilla de salida, O bien avanzar una ficha que ya esté en juego 1 sola casilla.',
    isSpecial: true,
    canExitBase: true,
    strategyTip: 'Es una de las dos únicas cartas estándar que te permiten poner fichas en juego. Guarda los Ases para cuando tus fichas hayan sido comidas.',
    example: 'Tienes fichas en base: juegas el As y colocas una ficha en tu casilla de inicio con tu color.'
  },
  {
    id: 'K',
    name: 'Rey (K)',
    shortEffect: 'Sacar ficha de la base O avanzar 13 casillas',
    fullEffect: 'Permite sacar una ficha desde la base a la casilla de salida O avanzar 13 casillas hacia adelante. Si avanzas 13, comes cualquier ficha rival en la casilla de destino.',
    isSpecial: true,
    canExitBase: true,
    strategyTip: 'Es la carta de mayor avance directo y además sirve para desbloquear fichas de la base.',
    example: 'Si estás a 13 casillas de un rival, un Rey te permite alcanzarlo directamente y enviarlo a su campamento.'
  },
  {
    id: 'Q',
    name: 'Reina / Dama (Q)',
    shortEffect: 'Avanzar 12 casillas',
    fullEffect: 'Avanza una ficha en juego exactamente 12 casillas en el sentido de las agujas del reloj.',
    isSpecial: false,
    canExitBase: false,
    strategyTip: 'Ideal para recorrer tramos largos del tablero rápidamente o acercarse a la recta final.'
  },
  {
    id: 'J',
    name: 'Jota / Jack (J)',
    shortEffect: 'Intercambiar 2 fichas O avanzar 11 casillas',
    fullEffect: '¡Una de las cartas más tácticas del juego! Te permite INTERCAMBIAR la posición de una de tus fichas con cualquier otra ficha en el circuito exterior (sea de un rival o de tu compañero). Excepciones: no se puede intercambiar con fichas que estén dentro de la base, protegidas en su casilla de salida recién estrenada, o ya dentro de la casa/cielo.',
    isSpecial: true,
    canExitBase: false,
    highlightTag: '¡Carta Clave!',
    strategyTip: 'Usa la Jota para cambiar una ficha tuya que esté muy retrasada por una ficha rival que esté a punto de entrar a su casa. ¡El rival tendrá que volver a dar toda la vuelta!',
    example: 'Tu ficha acaba de salir y un oponente está a 3 casillas de su meta: juegas una J, intercambias posiciones y quedas tú pegado a tu meta mientras él retrocede al inicio.'
  },
  {
    id: '10',
    name: '10',
    shortEffect: 'Avanzar 10 casillas',
    fullEffect: 'Avanza una ficha 10 casillas normales hacia adelante.',
    isSpecial: false,
    canExitBase: false,
    strategyTip: 'Avance sólido y directo para mover fichas rezagadas.'
  },
  {
    id: '9',
    name: '9',
    shortEffect: 'Avanzar 9 casillas',
    fullEffect: 'Avanza una ficha 9 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: '8',
    name: '8',
    shortEffect: 'Avanzar 8 casillas',
    fullEffect: 'Avanza una ficha 8 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: '7',
    name: '7',
    shortEffect: 'Avanzar 7 casillas DIVIDIDAS entre varias fichas',
    fullEffect: 'Permite repartir 7 casillas de movimiento entre 1, 2, 3 o hasta 4 de tus fichas activas (o fichas de tu compañero si ya completaste las tuyas). Ejemplo de divisiones: 4+3, 5+2, 2+2+3, 1+6, etc. ¡Puedes comer fichas rivales en los puntos de parada intermedios!',
    isSpecial: true,
    canExitBase: false,
    highlightTag: '¡Súper Táctica!',
    strategyTip: 'El 7 es la mejor carta para colocar fichas en las posiciones exactas de la casa final y para realizar "dobles capturas" comiendo dos fichas enemigas con fichas diferentes en un solo turno.',
    example: 'Con un 7, avanzas una ficha 3 pasos (comiendo a un rival) y otra ficha 4 pasos para meterla justa en el último hueco del cielo.'
  },
  {
    id: '6',
    name: '6',
    shortEffect: 'Avanzar 6 casillas',
    fullEffect: 'Avanza una ficha 6 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: '5',
    name: '5',
    shortEffect: 'Avanzar 5 casillas',
    fullEffect: 'Avanza una ficha 5 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: '4',
    name: '4',
    shortEffect: 'RETROCEDER 4 casillas (¡Hacia atrás!)',
    fullEffect: '¡La carta maestra del TOC! Obliga a retroceder 4 casillas a una de tus fichas. Está prohibido retroceder dentro de la casa final, pero si estás en la casilla de salida, retroceder 4 casillas te deja inmediatamente a 4 casillas de la entrada a tu casa, ¡ahorrándote tener que dar toda la vuelta al tablero!',
    isSpecial: true,
    canExitBase: false,
    highlightTag: '¡El Atajo Maestro!',
    strategyTip: 'Nada más sacar una ficha de base a tu casilla de salida, juega un 4: retrocederás 4 posiciones y en el siguiente turno con una carta como el 5 o 6 entrarás directo a tu casa.',
    example: 'Ficha en casilla de inicio -> juegas el 4 -> quedas 4 casillas por detrás de tu meta -> en tu siguiente turno con un 5 o un As/Rey ya estás entrando a salvo.'
  },
  {
    id: '3',
    name: '3',
    shortEffect: 'Avanzar 3 casillas',
    fullEffect: 'Avanza una ficha 3 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: '2',
    name: '2',
    shortEffect: 'Avanzar 2 casillas',
    fullEffect: 'Avanza una ficha 2 casillas hacia adelante.',
    isSpecial: false,
    canExitBase: false
  },
  {
    id: 'Joker',
    name: 'Comodín / Joker (Opcional)',
    shortEffect: 'Salir de base O avanzar hasta 15 casillas',
    fullEffect: 'En variantes que incluyen Jokers (2 comodines por baraja de 54 cartas), el Joker permite sacar una ficha de la base O avanzar hasta 15 casillas y reemplazar/comer una ficha enemiga.',
    isSpecial: true,
    canExitBase: true,
    strategyTip: 'Si juegas con la variante de comodines, pactad antes de empezar si sustituye a cualquier carta o tiene valor fijo de 15.'
  }
];

export const TOC_GENERAL_SECTIONS = [
  {
    id: 'objetivo',
    title: 'Objetivo y Equipos',
    content: 'El TOC (Tock) se juega habitualmente en **2 equipos de 2 jugadores** (4 jugadores en total) o 6 jugadores (equipos de 2 o 3). Los compañeros de equipo se sientan **enfrentados (uno enfrente del otro)**. El objetivo es que ambos miembros del equipo lleven todas sus 8 fichas (4 cada uno) a sus respectivas zonas de llegada (casa / cielo).'
  },
  {
    id: 'reparto',
    title: 'Reparto de Cartas (Secuencia 5-4-4)',
    content: 'Se utiliza una baraja estándar de 54 cartas de póker (o dos barajas si son 6 jugadores). Las cartas se reparten en 3 manos consecutivas antes de volver a barajar:\n\n• **1ª Mano**: Se reparten **5 cartas** a cada jugador.\n• **2ª Mano**: Se reparten **4 cartas** a cada jugador.\n• **3ª Mano**: Se reparten **4 cartas** a cada jugador (se agota la baraja de 52 cartas).\n\nUna vez terminada la 3ª mano, se recogen todas las cartas, se baraja de nuevo y se repite la secuencia 5-4-4.'
  },
  {
    id: 'intercambio',
    title: 'El Intercambio Secreto de Cartas',
    content: 'Al inicio de cada mano (tras recibir las cartas y antes de jugar el primer turno), **cada jugador elige 1 carta de su mano y se la entrega a su compañero de equipo boca abajo** simultáneamente sin hablar.\n\n*Consejo estratégico*: Si tu compañero no tiene fichas en juego, dale un As o un Rey para que pueda salir. Si ya está colocado, dale un 4 o una Jota para hacer una jugada demoledora.'
  },
  {
    id: 'obligacion',
    title: 'Obligación de Jugar y Descarte',
    content: 'En tu turno, **SI TIENES una jugada legal posible, ESTÁS OBLIGADO a realizarla**, incluso si eso perjudica a tu equipo o te obliga a comerte a ti mismo o a tu compañero.\n\nSi no tienes NINGUNA jugada legal (por ejemplo, todas tus fichas están en base y no tienes As ni Rey), debes **descartar toda tu mano** o pasar según la variante de la mesa.'
  },
  {
    id: 'salida_bloqueada',
    title: 'Casilla de Salida y Protección',
    content: 'Cuando una ficha sale del campamento y aterriza en su casilla de salida, **está protegida e infranqueable** mientras permanezca allí. Ninguna otra ficha puede saltarla ni intercambiarla con una Jota ni comerla mientras el jugador no la mueva de su casilla inicial.'
  },
  {
    id: 'ayuda_companero',
    title: 'Ayuda al Compañero (Fase Final)',
    content: 'Cuando un jugador consigue meter sus 4 fichas dentro de su casa/cielo, **no queda eliminado**. En sus siguientes turnos, sigue recibiendo cartas y las juega **utilizando y moviendo directamente las fichas de su compañero de equipo**. ¡La partida termina cuando el equipo mete sus 8 fichas!'
  }
];

export const TOC_FAQ_ITEMS: TocFaqItem[] = [
  {
    id: '1',
    category: 'cards',
    question: '¿Puedo usar el 4 para entrar marcha atrás directo a la casa?',
    answer: 'No puedes entrar directamente a las casillas interiores de la casa marcha atrás. Pero sí puedes retroceder 4 casillas en el circuito general para quedar justo detrás de la entrada de tu casa. En tu siguiente turno, avanzas hacia adelante y entras directamente.',
    tags: ['4', 'retroceder', 'casa', 'cielo', 'meta']
  },
  {
    id: '2',
    category: 'cards',
    question: '¿Con la Jota (J) puedo intercambiar una ficha que está dentro del cielo o casa?',
    answer: 'No. Las fichas que ya han entrado en la recta final (casa/cielo), las que siguen en el campamento (base) y las que están recién salidas en su casilla de inicio protegida NO pueden ser intercambiadas con una Jota.',
    tags: ['jota', 'jack', 'intercambiar', 'j', 'proteccion']
  },
  {
    id: '3',
    category: 'cards',
    question: '¿Con el 7 puedo saltar fichas o tengo que contar casillas?',
    answer: 'El 7 te permite mover un total de 7 pasos divididos como quieras entre varias de tus fichas. Además, en muchas variantes canadienses, el 7 permite "quemar/comer" todas las fichas rivales sobre las que pases o en las que termines cada fracción del movimiento.',
    tags: ['7', 'dividir', 'comer', 'saltar']
  },
  {
    id: '4',
    category: 'teams',
    question: '¿Podemos hablar y decirnos qué cartas tenemos mi compañero y yo?',
    answer: '¡Totalmente prohibido! En el TOC tradicional canadiense no está permitido hablar sobre las cartas de la mano ni hacer señales. La única comunicación permitida es la carta que se intercambia a ciegas al inicio de cada mano.',
    tags: ['compañero', 'hablar', 'intercambio', 'reglas', 'trampas']
  },
  {
    id: '5',
    category: 'board',
    question: '¿Qué pasa si caigo en la misma casilla que otra ficha?',
    answer: 'La ficha que estaba en esa casilla es "comida" y debe regresar inmediatamente a su base/campamento inicial, teniendo que volver a sacar un As o un Rey para entrar de nuevo al juego.',
    tags: ['comer', 'capturar', 'base', 'campamento']
  },
  {
    id: '6',
    category: 'general',
    question: '¿Qué pasa dentro de la casa/cielo? ¿Puedo saltar mis propias fichas?',
    answer: 'Dentro de la recta final no se pueden saltar fichas. Cada ficha debe avanzar hasta su hueco más lejano disponible. Para que una ficha entre, debes tener el número exacto de pasos necesarios.',
    tags: ['cielo', 'casa', 'meta', 'saltar', 'exacto']
  }
];

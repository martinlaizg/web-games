# Web Games

Proyecto de asistente digital para juegos de mesa en grupo. Está pensado como un hub de pequeños juegos y utilidades para jugar en persona, con una capa web para el anfitrión y una capa de servidor para partidas multijugador en tiempo real.

## Visión general

Este repositorio combina:

- Frontend en React + TypeScript + Vite
- Estilos con Tailwind CSS
- Backend de salas y partidas con Express + Socket.IO
- Juegos de mesa con lógica local y lógica multijugador

La idea principal es ofrecer herramientas rápidas para partidas presenciales sin depender de papel ni de pantallas complejas: reparto de roles, seguimiento de reglas, votaciones y coordinación entre jugadores.

## Estructura del proyecto

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── README.md
├── .github/
│   └── copilot-instructions.md
├── AGENTS.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── games/
│   │   ├── impostor/
│   │   └── toc/
│   ├── lib/
│   └── types/
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── games/
│       │   ├── impostor.ts
│       │   └── types.ts
│       └── rooms/
│           └── roomManager.ts
└── node_modules/
```

## Capas funcionales

### Frontend (`src/`)

Es la aplicación cliente y la interfaz principal del usuario.

- `App.tsx`: hub principal, filtrado de juegos y navegación entre pantallas.
- `components/`: piezas reutilizables de UI: layout, botones, tarjetas, badges, temporizador.
- `games/`: vistas específicas de cada juego disponible o en desarrollo.
- `data/`: listas de palabras, reglas y contenido estático.
- `lib/`: helpers de sonido, sockets, conexiones con el backend.
- `types/`: tipos del cliente.

### Backend (`server/src/`)

Es la capa de lógica multijugador y coordinación en tiempo real.

- `index.ts`: arranque del servidor Express + Socket.IO.
- `rooms/roomManager.ts`: gestión de salas, jugadores, host, reconexiones y limpieza de salas.
- `games/`: lógica del juego Impostor y sus tipos compartidos.

## Juegos implementados

### 1. Impostor

- Juego principal multijugador.
- Reparte roles secretos entre jugadores.
- Gestiona reveal, discusión, votación y puntuación.
- Tiene flujo de salas reales mediante sockets.

### 2. TOC (versión canadiense)

- Guía interactiva de reglas y dudas.
- Presenta explicaciones de cartas, reglas de parejas y concepto táctico.
- Es principalmente un asistente de reglas, no un juego multijugador.

## Flujo de datos

1. El usuario entra en la app desde el hub en `App.tsx`.
2. Cada juego se renderiza como un módulo bajo `src/games/...`.
3. Los juegos que necesitan sincronización se conectan al servidor a través de `src/lib/socket.ts`.
4. El servidor crea/gestiona salas y envía estados públicos o privados a cada cliente.
5. El cliente reacciona a eventos del servidor (`room:updated`, `game:state`, `player:role`, etc.).

## Convenciones de desarrollo

- Mantener la lógica de UI separada de la lógica del servidor.
- Añadir nuevos juegos bajo `src/games/<nombre>/` y su modelo de tipos compatible.
- En el backend, centralizar la lógica de sala en `roomManager.ts`.
- Preferir tipos TypeScript explícitos sobre `any`.
- Mantener los textos y labels en español para coherencia con la UX.
- Usar Tailwind para estilos y seguir la estética actual: tonos oscuros, acentos violetas/indigo.

## Comandos de ejecución

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Build de producción

```bash
npm run build
```

```bash
cd server
npm run build
```

## Estado actual del proyecto

- Frontend funcional como hub y catálogo de juegos.
- Juego de Impostor operativo con flujo real de partida.
- TOC disponible como guía interactiva.
- Otras variantes como Hombre Lobo, Secret Hitler o utilities están listadas como proyectos futuros.

## Recomendación para asistentes de IA

Cuando edites este proyecto, considera estas reglas:

- No mezcles lógica de juego y lógica de servidor sin necesidad.
- Mantén el patrón de carpetas por juego.
- Reutiliza componentes del directorio `src/components/ui`.
- Si cambias un evento de Socket.IO, ajusta ambas partes: servidor y cliente.
- Si agregas un juego nuevo, añade su entrada al hub desde `App.tsx`.
- Prioriza cambios pequeños y compatibles con el resto del proyecto.
- Mantén la documentación compatible con cualquier agente o herramienta de IA, sin depender de rutas ni configuraciones propietarias.

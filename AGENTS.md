# AGENTS.md

## Propósito

Este archivo define el contexto operativo del repositorio para cualquier asistente de IA o colaborador automatizado. Está pensado para ser agnóstico respecto de la herramienta concreta usada y no depende de rutas ni convenciones propietarias de un editor o proveedor concreto.

## Resumen del proyecto

Es un hub de juegos de mesa para jugar en grupo con ayuda digital. La base actual incluye:

- un frontend React + TypeScript + Vite para navegacion, UI y flujo de juegos,
- una lógica de juegos por módulo y una experiencia centrada en móvil,
- un backend Express + Socket.IO para partidas multijugador,
- soporte para persistencia local de la sesión del juego en navegador,
- navegación por rutas independientes por juego para poder compartir enlaces directos.

## Estado actual del producto

Actualmente el proyecto ya incluye una base funcional en dos juegos principales:

- Impostor: flujo de configuración, asignación de roles, revelado por jugador, discusión y persistencia de sesión local.
- TOC: guía interactiva de reglamento con navegación y ayudas visuales.

La aplicación está pensada para uso presencial en mesa, con una UI en español, adaptada a móvil y centrada en reducir fricción en partidas de grupo.

## Arquitectura

### Estructura de Carpetas

Todo el código ejecutable está dentro de la carpeta `code/`:

```
code/
├── src/              # Frontend (React + TypeScript)
├── server/           # Backend (Express + Socket.IO)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

La documentación del proyecto (README.md, AGENTS.md) permanece en la raíz.

### Frontend

La parte del cliente vive en `code/src/`.

- `code/src/App.tsx` actúa como hub principal y gestiona la navegación por rutas.
- `code/src/components/` contiene componentes reutilizables de layout, UI y controles.
- `code/src/games/` contiene cada juego o asistente.
- `code/src/data/` contiene datos estáticos del contenido del juego.
- `code/src/lib/` incluye utilidades como `sound.ts` y cualquier soporte de navegador.
- `code/src/types/` contiene los tipos del frontend y modelos del dominio.

### Backend

La parte del servidor vive en `code/server/src/`.

- `code/server/src/index.ts` inicializa Express y Socket.IO.
- `code/server/src/rooms/roomManager.ts` gestiona salas, usuarios y estado compartido.
- `code/server/src/games/` contiene la lógica multijugador y sus tipos.

## Patrones de trabajo importantes

1. Mantén la separación entre cliente y servidor.
2. Si se cambia un evento Socket, actualiza también la parte cliente y la parte servidor.
3. Cada juego debe seguir viviendo en su propio módulo dentro de `code/src/games/<game>/` y, si aplica, en `code/server/src/games/`.
4. Reusa primero los componentes de `code/src/components/ui` antes de crear duplicados.
5. Mantén la UI en español salvo justificación clara.
6. Usa Tailwind como mecanismo principal de estilo.
7. Evita `any` salvo justificación explícita.
8. Las reglas de negocio del juego deben permanecer cerca de ese juego y no mezcladas con la capa de UI general.
9. Las decisiones de UX para móvil son prioritarias: pantallas simples, botones grandes y flujo legible.
10. Las sesiones del navegador deben persistirse cuando el juego lo requiere para evitar pérdida de partida al recargar.

## Reglas de navegación y URLs

- Cada juego debe tener una ruta propia: por ejemplo ` /impostor ` y ` /toc `.
- La navegación principal debe sincronizar el estado activo con la URL para que abrir un enlace directo funcione.
- Al cambiar de juego, se debe actualizar el historial del navegador sin romper el flujo del resto de la app.
- La pantalla de inicio debe seguir funcionando como punto de entrada de catálogo cuando la ruta es la raíz.

## Convenciones de nombres

- Carpetas por juego: `impostor`, `toc`, etc.
- Archivos de componentes con PascalCase.
- Tipos con nombres explícitos y ligados al dominio.
- Estados de juego y configuraciones con nombres claros y reutilizables.
- Eventos de Socket en formato `accion:subaccion` o `room:create` si ya existe el patrón.

## Flujo de desarrollo recomendado

- Comprueba primero la estructura del juego antes de tocar propiedades compartidas.
- Revisa el patrón actual de `code/src/App.tsx` y la capa de navegación antes de integrar un nuevo juego o ruta.
- Mantén cambios incrementales en lugar de refactors invasivos.
- Si agregas un juego nuevo, incluye navegación, estado y contenido en el hub principal.
- Valida siempre el flujo móvil de la interacción principal en los cambios de UI.

## Validación

Antes de cerrar un cambio relevante, navega a la carpeta `code/` y valida con el comando más cercano al área modificada:

```bash
cd code
npm run build
```

Y si se toca lógica del backend:

```bash
cd code/server && npm run build
```

## Áreas de prioridad actual

- Mantener estable la sesión de partidas en el juego Impostor.
- Respetar la separación entre modelo del juego y capa de UI/networking.
- Proteger la experiencia móvil y la legibilidad de la interfaz.
- Mantener rutas por juego funcionales y compartibles.
- Evitar regresiones en el flujo de salida/entrada de la partida al recargar la página.

## Nota para asistentes de IA

Actúa como un colaborador del proyecto, no como un generador aislado. Respeta la intención existente del producto, conserva el estilo de la aplicación y evita cambios no solicitados. El documento debe seguir funcionando con cualquier agente de IA que lea el repositorio, sin depender de rutas específicas ni archivos propios de un proveedor.

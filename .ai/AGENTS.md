# Instrucciones para Copilot

## Contexto del proyecto

Este repositorio es un hub de juegos de mesa web para jugar en persona. Tiene un frontend React con Vite y un backend Node/Express con Socket.IO para partidas multijugador.

## Objetivo principal

Mantener un conjunto de asistentes de juego útiles, rápidos y visualmente coherentes, con especial foco en:

- partidas de roles ocultos,
- reglas y guías interactivas,
- coordinación entre jugadores en tiempo real,
- experiencia en móvil y uso compartido en mesa.

## Estructura esperada

- `src/` = cliente/app web.
- `server/src/` = backend y lógica de salas.
- `src/games/` = módulos de juego.
- `src/components/` = elementos reutilizables.
- `src/lib/` = utilidades compartidas.

## Normas de edición

- Prioriza patrones ya existentes antes que soluciones nuevas.
- Mantén la arquitectura por dominio: cada juego debe estar encerrado en su propia carpeta.
- Si se modifica el contrato de Socket.IO, actualiza ambos lados: servidor y cliente.
- Mantén la UI en español y consistente con el estilo visual actual.
- Usa Tailwind para estilos y lucide-react cuando se necesiten iconos.
- Preferir TypeScript tipado explícito y evitar cambios de tipo innecesarios.
- No intentes introducir otro framework, router complejo o librería pesada si no es necesario.

## Reglas de seguridad y calidad

- No introduzcas secrets ni configuraciones sensibles en el repo.
- No uses `any` si una tipificación simple es posible.
- No conviertas una corrección pequeña en un refactor grande sin necesidad.
- Valida con compilación relevante cuando cambies código de producción.

## Validación sugerida

Tras cambios del cliente:

```bash
npm run build
```

Tras cambios del servidor:

```bash
cd server && npm run build
```

## Recomendaciones de trabajo con IA

- Haz cambios mínimos, localizados y alineados con el diseño actual.
- Mantén la coherencia del producto y no inventes funcionalidades no pedidas.
- Si se añade un nuevo juego, actualiza también el hub principal en `src/App.tsx`.
- Si se añade un evento del servidor, documenta el flujo de uso y asegúrate de que la UI lo consume correctamente.

## Estado del proyecto actual

El repositorio ya tiene una base funcional con:

- catálogo de juegos,
- interfaz principal,
- juego `Impostor` operativo,
- guía interactiva de `TOC`.

Use este contexto para mantener la consistencia de la aplicación y evitar romper la experiencia multijugador.

# 🎭 Web Games - Hub de Juegos de Mesa Digital

Tu compañero digital para noches de juegos de mesa en grupo. Un hub de asistentes y herramientas para juegos clásicos de mesa, con una experiencia **100% en español**, optimizada para **móvil** y diseñada para **juego presencial**.

![Versión](https://img.shields.io/badge/versión-0.1.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange)

---

## 🎮 Características Principales

- ✅ **Modo Pase de Móvil**: Reparte roles secretos en el móvil sin papel
- ✅ **UI Optimizada para Móvil**: Botones grandes, legibilidad clara, flujo intuitivo
- ✅ **En Español**: Interfaz y contenido completamente en español
- ✅ **Rutas por Juego**: Cada juego con enlace directo compartible (ej: `/impostor`, `/toc`)
- ✅ **Persistencia de Sesión**: No pierdes la partida al recargar la página
- ✅ **Sin Dependencias Externas**: Funciona completamente en navegador

---

## 🕵️ Juegos Disponibles

### **El Impostor** ✅ Disponible

**Deducción y palabras relacionadas**

El compañero completo para partidas de "El Impostor". Gestiona el reparto secreto de palabras, el pase seguro del móvil entre jugadores y la dinámica de discusión.

- **Configuración flexible**: Selecciona número de jugadores, impostores, categorías y dificultad
- **Revelación por jugador**: Cada jugador ve su palabra/rol en privado
- **Discusión interactiva**: Lista de jugadores para revisar roles
- **Persistencia**: La partida se guarda en localStorage
- **Interfaz móvil**: Botones grandes, texto legible, sin fricción

**Acceso**: [http://localhost:3001/impostor](http://localhost:3001/impostor)

### **TOC (Versión Canadiense)** ✅ Disponible

**Reglamento táctico & visor de naipes**

Guía interactiva oficial carta por carta con reglas de equipo (2v2/3v3) y búsqueda de dudas.

- **Navegación por cartas**: Explora reglas específicas de cada carta francesa
- **Buscador de reglas**: Encuentra respuestas rápidamente
- **Diseño responsivo**: Funciona en cualquier pantalla
- **Barras sticky**: Acceso fácil a la navegación

**Acceso**: [http://localhost:3001/toc](http://localhost:3001/toc)

### Próximos Juegos (Planeados)

- 🐺 **Hombres Lobo / Castronegro** - Narrador digital de aldea
- 📊 **Secret Hitler Companion** - Gestor de políticas y elecciones
- 📈 **Marcador Universal** - Contador de puntos multi-jugador

---

## �🚀 Inicio Rápido

### Requisitos
- **Node.js** >= 18
- **npm** >= 9

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/martinlaizg/web-games.git
cd web-games

# Instalar dependencias (frontend)
npm install

# Instalar dependencias (backend)
cd server && npm install && cd ..
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La app estará disponible en http://localhost:3001
```

### Build para Producción

```bash
# Compilar y empaquetar
npm run build

# Los archivos estáticos estáran en ./dist
```

### Backend (Opcional)

```bash
cd server

# Desarrollo
npm run dev

# Build
npm run build
```

---

## 📁 Estructura del Proyecto

```
web-games/
├── src/                           # Frontend (React + TypeScript)
│   ├── App.tsx                    # Hub principal y navegación por rutas
│   ├── main.tsx                   # Punto de entrada
│   ├── index.css                  # Estilos globales
│   ├── components/
│   │   ├── layout/                # Layout y navbar
│   │   │   ├── Layout.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                    # Componentes reutilizables
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Timer.tsx
│   ├── games/                     # Módulos de juegos
│   │   ├── impostor/
│   │   │   ├── ImpostorGame.tsx       # Orquestador principal
│   │   │   ├── ImpostorSetup.tsx      # Configuración
│   │   │   ├── ImpostorReveal.tsx     # Revelación por jugador
│   │   │   ├── ImpostorDiscussion.tsx # Fase de debate
│   │   │   └── ImpostorVote.tsx       # (Legacy)
│   │   └── toc/
│   │       ├── TocGuide.tsx
│   │       ├── TocRulesOverview.tsx
│   │       ├── TocCardReference.tsx
│   │       └── TocFaq.tsx
│   ├── data/                      # Contenido estático
│   │   ├── impostorWords.ts       # Diccionario de palabras
│   │   └── tocRules.ts            # Reglas de TOC
│   ├── lib/                       # Utilidades
│   │   ├── socket.ts              # Cliente de Socket.IO
│   │   └── sound.ts               # Efectos de sonido
│   └── types/                     # Interfaces TypeScript
│       ├── game.ts
│       ├── impostor.ts
│       └── toc.ts
├── server/                        # Backend (Express + Socket.IO)
│   ├── src/
│   │   ├── index.ts               # Inicialización
│   │   ├── rooms/
│   │   │   └── roomManager.ts     # Gestión de salas
│   │   └── games/
│   │       ├── impostor.ts        # Lógica del Impostor
│   │       └── types.ts           # Tipos compartidos
│   └── tsconfig.json
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── AGENTS.md                      # Contexto operativo para asistentes IA
└── README.md
```

---

## 🎨 Stack Tecnológico

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Type safety
- **Vite** - Bundler y dev server
- **Tailwind CSS** - Estilos
- **Socket.IO Client** - Comunicación real-time (opcional)
- **canvas-confetti** - Efectos visuales
- **lucide-react** - Iconografía

### Backend
- **Express.js** - Framework web
- **Socket.IO** - WebSockets para multiplayer
- **TypeScript** - Type safety
- **Node.js** >= 18

### Herramientas
- **Git** - Control de versiones
- **ESLint/Prettier** - Linting y formato (configurable)

---

## 🛠️ Patrones Importantes

### 1. Separación Cliente-Servidor
- Frontend y backend viven en carpetas separadas (`src/` y `server/src/`)
- Los tipos compartidos están en `server/src/games/types.ts`

### 2. Módulos por Juego
- Cada juego vive en su propia carpeta bajo `src/games/<game>/`
- Las reglas de negocio del juego están centralizadas en ese módulo
- No mezcles lógica de juego con componentes de UI genéricos

### 3. Rutas Independientes
- Cada juego tiene su propia ruta: `/impostor`, `/toc`, etc.
- La raíz `/` sirve como catálogo de juegos
- Las URLs son directamente compartibles

### 4. Persistencia de Sesión
- Se usa `localStorage` para guardar el estado del juego
- El estado persiste entre recargas de página
- Se valida antes de restaurar para evitar corrupción

### 5. Componentes Reutilizables
- Los componentes genéricos van en `src/components/ui/`
- Reusa antes de crear duplicados

### 6. UI Móvil Primero
- Botones grandes
- Texto legible
- Flujos simples y directos
- Toca el dispositivo en el que se prueba antes de hacer merge

---

## 🎯 Reglas de Desarrollo

1. **Valida antes de mergear**
   ```bash
   npm run build
   ```

2. **Si tocas Socket.IO**
   - Actualiza cliente y servidor
   - Valida el backend también

3. **TypeScript Strict**
   - Evita `any` salvo justificación explícita
   - Los tipos deben ser específicos al dominio

4. **Español por Defecto**
   - Mantén la UI en español
   - Excepto para tokens técnicos

5. **Test Móvil**
   - Abre el dev server en `npm run dev -- --host 0.0.0.0`
   - Accede desde tu móvil: `http://<tu-ip>:3001`
   - Verifica que funcione en pantalla pequeña

---

## 📝 Comandos Disponibles

### Frontend
```bash
npm run dev              # Iniciar dev server
npm run build            # Compilar para producción
npm run preview          # Preview de build
```

### Backend
```bash
cd server
npm run dev              # Iniciar servidor backend
npm run build            # Compilar TypeScript
```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz si necesitas configurar endpoints:

```env
VITE_SOCKET_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

### Tailwind + PostCSS

La configuración está en:
- `tailwind.config.js` - Customización de temas
- `postcss.config.js` - Procesamiento CSS

---

## 🐛 Solución de Problemas

### Dev server no inicia
```bash
# Limpia caché de Vite
rm -rf node_modules/.vite

# Reinstala
npm install
npm run dev
```

### Cambios no se reflejan en móvil
```bash
# Asegúrate de que el servidor escucha en todas las interfaces
npm run dev -- --host 0.0.0.0

# Accede desde http://<tu-ip>:3001 (no localhost)
```

### Sesión perdida al recargar
- Abre la consola del navegador (F12)
- Verifica que `localStorage` tenga la clave `impostor_session`
- Si el JSON está corrupto, limpia: `localStorage.clear()`

### Build falla
```bash
# Limpia dist
rm -rf dist

# Intenta de nuevo
npm run build

# Si persiste, verifica versión de Node
node --version  # Debe ser >= 18
```

---

## 📈 Roadmap

- [ ] Multiplayer por Socket.IO (arquitectura lista)
- [ ] Más palabras en Impostor
- [ ] Más juegos (Hombres Lobo, Secret Hitler, etc.)
- [ ] Estadísticas y historial
- [ ] Temas personalizables (claro/oscuro)
- [ ] Soporte offline completo

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -am 'Agrega nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

Respeta:
- La estructura de carpetas actual
- El estilo de código existente
- La separación cliente-servidor
- La prioridad de experiencia móvil

---

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir.

---

## 📞 Contacto & Soporte

- **Issues**: [GitHub Issues](https://github.com/martinlaizg/web-games/issues)

---

## 🎭 Créditos

Diseñado y desarrollado como hub de asistentes para noches de juegos de mesa entre amigos.

---

**MesaHub** - Tu compañero digital para noches de juegos de mesa. ¡Que disfrutes! 🎲

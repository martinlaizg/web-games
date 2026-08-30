import React, { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';
import { ImpostorGame } from './games/impostor/ImpostorGame';
import { TocGuide } from './games/toc/TocGuide';
import {
  Users,
  BookOpen,
  ShieldAlert,
  Sparkles,
  Dices,
  Search,
  Clock,
  Play,
  Layers,
  HeartHandshake,
  Smartphone,
  WifiOff
} from 'lucide-react';
import { GameInfo } from './types/game';
import { sound } from './lib/sound';

const AVAILABLE_GAMES: GameInfo[] = [
  {
    id: 'impostor',
    title: 'El Impostor',
    subtitle: 'Deducción y palabras relacionadas',
    description: 'Compañero completo de partida: reparto secreto de palabras, pase de móvil seguro, temporizador de debate y votación.',
    category: 'deduction',
    players: '3-20 jug.',
    duration: '5-15 min',
    icon: '🕵️‍♂️',
    badge: '¡Disponible!',
    tags: ['Roles Ocultos', 'Pase de Móvil', 'Palabras', 'Fiesta']
  },
  {
    id: 'toc',
    title: 'TOC (Versión Canadiense)',
    subtitle: 'Reglamento táctico & visor de naipes',
    description: 'Guía oficial interactiva carta por carta (4 atrás, 7 divisible, J intercambio), reglas de equipo 2v2/3v3 y buscador de dudas.',
    category: 'rules',
    players: '4 ó 6 jug.',
    duration: '30-60 min',
    icon: '🇨🇦',
    badge: '¡Disponible!',
    tags: ['Reglamento', 'Cartas Francesas', 'Estrategia', 'Parejas']
  },
  {
    id: 'lobo',
    title: 'Hombres Lobo / Castronegro',
    subtitle: 'Narrador digital de aldea',
    description: 'Asistente para guiar las noches, reparto de roles con habilidades especiales y cuenta regresiva de debates.',
    category: 'deduction',
    players: '6-24 jug.',
    duration: '20-40 min',
    icon: '🐺',
    badge: 'Próximamente',
    tags: ['Roles Ocultos', 'Narrador', 'Aldeanos']
  },
  {
    id: 'secret-hitler',
    title: 'Secret Hitler Companion',
    subtitle: 'Gestor de políticas y elecciones',
    description: 'Visualizador de tablero liberal/fascista, registro de elecciones de presidente y canciller, y modo ciego.',
    category: 'deduction',
    players: '5-10 jug.',
    duration: '30-45 min',
    icon: '📜',
    badge: 'Próximamente',
    tags: ['Deducción', 'Política', 'Votaciones']
  },
  {
    id: 'scorekeeper',
    title: 'Marcador Universal de Puntos & Vidas',
    subtitle: 'Contador multi-jugador para cualquier juego',
    description: 'Lleva la cuenta de puntos de victoria, vidas, monedas o rondas sin gastar papel ni lápiz.',
    category: 'utility',
    players: '1-8 jug.',
    duration: 'Universal',
    icon: '📊',
    badge: 'Próximamente',
    tags: ['Utilidad', 'Puntos', 'Historial']
  }
];

const resolveGameFromPath = (path: string): string | null => {
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

  if (cleanPath === '/impostor') return 'impostor';
  if (cleanPath === '/toc') return 'toc';
  return null;
};

export function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return resolveGameFromPath(window.location.pathname);
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setActiveGameId(resolveGameFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectGame = (gameId: string) => {
    sound.playClick();
    const nextPath = gameId === 'impostor' || gameId === 'toc' ? `/${gameId}` : '/';
    window.history.pushState({}, '', nextPath);
    setActiveGameId(gameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    sound.playClick();
    window.history.pushState({}, '', '/');
    setActiveGameId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGames = AVAILABLE_GAMES.filter(game => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'deduction' && (game.category === 'deduction' || game.category === 'party')) ||
      (selectedCategory === 'rules' && game.category === 'rules') ||
      (selectedCategory === 'utility' && game.category === 'utility');

    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <Layout
      activeGameId={activeGameId}
      onNavigateHome={handleNavigateHome}
      onSelectGame={handleSelectGame}
    >
      {/* 1. If Game Active: Render Game View */}
      {activeGameId === 'impostor' && <ImpostorGame />}
      {activeGameId === 'toc' && <TocGuide />}

      {/* 2. If Home: Render Catalog and Hub Dashboard */}
      {activeGameId === null && (
        <div className="space-y-8 pb-12">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950/60 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles size={14} className="text-indigo-400" />
                Tu Asistente Digital de Mesa
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                El Hub de Ayudantes para tus Noches de Juegos
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Reparte roles secretos en tu móvil sin papel, consulta normas tácticas al instante, cronometra turnos y disfruta jugando en persona con tus amigos.
              </p>

              {/* Feature Badges */}
              <div className="flex items-center gap-3 pt-2 flex-wrap text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Smartphone size={15} className="text-indigo-400" />
                  <span>Modo Pase de Móvil</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <WifiOff size={15} className="text-emerald-400" />
                  <span>Funciona Sin Conexión</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <HeartHandshake size={15} className="text-rose-400" />
                  <span>100% Gratis y en Español</span>
                </div>
              </div>
            </div>
          </div>

          {/* Catalog Controls: Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 w-full sm:w-auto overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'Todos los Juegos' },
                { id: 'deduction', label: '🎭 Roles Ocultos' },
                { id: 'rules', label: '📖 Reglamentos' },
                { id: 'utility', label: '🛠️ Herramientas' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar juego o mecánica..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGames.map(game => {
              const isReady = game.id === 'impostor' || game.id === 'toc';

              return (
                <Card
                  key={game.id}
                  variant="interactive"
                  onClick={() => isReady && handleSelectGame(game.id)}
                  className={`p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group ${!isReady ? 'opacity-70 cursor-not-allowed hover:border-slate-800' : ''
                    }`}
                >
                  {/* Top Row: Icon, Title, Badge */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                        {game.icon}
                      </div>
                      <Badge variant={isReady ? 'emerald' : 'slate'}>
                        {game.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium mt-0.5">
                        {game.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Bottom Row: Metadata & Action */}
                  <div className="space-y-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-slate-500" />
                        <span>{game.players}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-500" />
                        <span>{game.duration}</span>
                      </div>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {game.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div>
                      {isReady ? (
                        <Button
                          variant="primary"
                          size="md"
                          fullWidth
                          rightIcon={<Play size={16} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectGame(game.id);
                          }}
                        >
                          {game.id === 'toc' ? 'Ver Reglas y Cartas' : 'Jugar Ahora'}
                        </Button>
                      ) : (
                        <div className="text-center py-2 text-xs font-semibold text-slate-500 bg-slate-800/40 rounded-xl">
                          En Desarrollo para el Hub
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;

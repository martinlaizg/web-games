import React from 'react';
import { Sparkles, Home, BookOpen, UserX, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../lib/sound';

interface NavbarProps {
  activeGameId: string | null;
  onNavigateHome: () => void;
  onSelectGame: (gameId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeGameId,
  onNavigateHome,
  onSelectGame
}) => {
  const [soundActive, setSoundActive] = React.useState(sound.isEnabled());

  const toggleSound = () => {
    const nextState = !soundActive;
    sound.setEnabled(nextState);
    setSoundActive(nextState);
    if (nextState) {
      sound.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent block leading-tight">
              MesaHub
            </span>
            <span className="text-[11px] text-indigo-400 font-medium leading-none block">
              Compañero de Juegos
            </span>
          </div>
        </button>

        {/* Quick Nav & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onNavigateHome}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeGameId === null
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home size={15} />
            <span className="hidden sm:inline">Catálogo</span>
          </button>

          <button
            onClick={() => onSelectGame('impostor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeGameId === 'impostor'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <UserX size={15} />
            <span>El Impostor</span>
          </button>

          <button
            onClick={() => onSelectGame('toc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeGameId === 'toc'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen size={15} />
            <span>Reglas TOC</span>
          </button>

          <div className="h-5 w-px bg-slate-800 mx-1 hidden xs:block" />

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title={soundActive ? 'Silenciar sonidos del sistema' : 'Activar sonidos'}
            aria-label="Silenciar sonido"
          >
            {soundActive ? <Volume2 size={17} className="text-indigo-400" /> : <VolumeX size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
};

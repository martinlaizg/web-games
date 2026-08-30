import React, { useState } from 'react';
import { Eye, EyeOff, User, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { sound } from '../../lib/sound';
import { ImpostorPlayer, ImpostorHintMode } from '../../types/impostor';

interface ImpostorRevealProps {
  players: ImpostorPlayer[];
  currentIndex: number;
  secretWord: string;
  categoryName: string;
  hintMode: ImpostorHintMode;
  onNextPlayer: () => void;
  onFinishReveal: () => void;
}

export const ImpostorReveal: React.FC<ImpostorRevealProps> = ({
  players,
  currentIndex,
  secretWord,
  categoryName,
  hintMode,
  onNextPlayer,
  onFinishReveal
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasLooked, setHasLooked] = useState(false);

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;

  const handleToggleReveal = () => {
    setIsRevealed(prev => {
      const nextValue = !prev;
      if (nextValue) {
        sound.playReveal();
        setHasLooked(true);
      }
      return nextValue;
    });
  };

  const handleRepeatReveal = () => {
    setIsRevealed(true);
    setHasLooked(true);
    sound.playReveal();
  };

  const handleNext = () => {
    setIsRevealed(false);
    setHasLooked(false);
    if (isLastPlayer) {
      onFinishReveal();
    } else {
      onNextPlayer();
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center select-none user-select-none pb-8">
      {/* Progress & Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2">
          <span>Pase de teléfono</span>
          <span>Jugador {currentIndex + 1} de {players.length}</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / players.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Action Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-indigo-500/30">
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-black text-white">
            Pasa el teléfono a:
          </h2>
          <div className="text-3xl font-extrabold text-indigo-400 tracking-tight">
            {currentPlayer.name}
          </div>
          <p className="text-xs text-slate-400">
            Asegúrate de que nadie más esté mirando la pantalla.
          </p>
        </div>

        {/* Secret Container */}
        <div className="min-h-[170px] flex items-center justify-center">
          {isRevealed ? (
            currentPlayer.isImpostor ? (
              /* IMPOSTOR VIEW */
              <div className="w-full p-5 rounded-2xl bg-rose-950/60 border border-rose-600/50 space-y-3 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-center gap-1.5 text-rose-400 font-extrabold text-lg">
                  <ShieldAlert size={22} />
                  <span>¡ERES EL IMPOSTOR!</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  No conoces la palabra secreta. Escucha atentamente las palabras de los demás para deducirla y di pistas creíbles sin que sospechen de ti.
                </p>
                {hintMode === 'category' && (
                  <div className="pt-2 border-t border-rose-800/50">
                    <Badge variant="amber">Temática: {categoryName}</Badge>
                  </div>
                )}
              </div>
            ) : (
              /* INNOCENT VIEW */
              <div className="w-full p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/50 space-y-3 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-center gap-1.5 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles size={14} className="text-indigo-400" />
                  <span>Tu palabra secreta</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-wide">
                  {secretWord}
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <Badge variant="indigo">Categoría: {categoryName}</Badge>
                </div>
                <p className="text-[11px] text-slate-300">
                  Eres inocente. Di palabras relacionadas con este concepto sin ser demasiado obvio.
                </p>
              </div>
            )
          ) : (
            /* HIDDEN VIEW */
            <div className="w-full py-8 px-4 rounded-2xl bg-slate-800/40 border border-dashed border-slate-700 text-slate-400 space-y-2">
              <EyeOff size={28} className="mx-auto text-slate-500" />
              <div className="text-sm font-medium text-slate-300">Rol Oculto</div>
              <div className="text-xs text-slate-500">Pulsa el botón inferior para ver tu palabra en secreto</div>
            </div>
          )}
        </div>

        {/* Reveal / Hide Button */}
        <div className="space-y-2">
          <Button
            variant={isRevealed ? 'secondary' : 'primary'}
            size="lg"
            fullWidth
            leftIcon={isRevealed ? <EyeOff size={18} /> : <Eye size={18} />}
            onClick={handleToggleReveal}
          >
            {isRevealed ? 'Ocultar' : 'Mostrar'}
          </Button>

          {hasLooked && (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              leftIcon={<Eye size={16} />}
              onClick={handleRepeatReveal}
            >
              Ver otra vez
            </Button>
          )}
        </div>

        {/* Next Player Button (Available after looking) */}
        {hasLooked && (
          <div className="pt-2 border-t border-slate-800">
            <Button
              variant="success"
              size="lg"
              fullWidth
              rightIcon={isLastPlayer ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
              onClick={handleNext}
            >
              {isLastPlayer ? '¡Comenzar Partida!' : 'Siguiente Jugador'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Trophy, RotateCcw, Play, Check, X, HelpCircle, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { sound } from '../../lib/sound';
import { ImpostorPlayer } from '../../types/impostor';

interface ImpostorVoteProps {
  players: ImpostorPlayer[];
  secretWord: string;
  categoryName: string;
  scores: Record<string, number>;
  onPlayAgain: (updatedScores: Record<string, number>) => void;
  onNewSetup: () => void;
}

export const ImpostorVote: React.FC<ImpostorVoteProps> = ({
  players,
  secretWord,
  categoryName,
  scores,
  onPlayAgain,
  onNewSetup
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const [impostorGuessedRight, setImpostorGuessedRight] = useState<boolean | null>(null);
  const [showImpostorGuessModal, setShowImpostorGuessModal] = useState(false);
  const [customWordGuess, setCustomWordGuess] = useState('');

  const impostors = players.filter(p => p.isImpostor);
  const innocents = players.filter(p => !p.isImpostor);

  const handleSelectVoted = (playerId: string) => {
    if (isResolved) return;
    setSelectedPlayerId(playerId);
  };

  const handleConfirmVote = () => {
    if (!selectedPlayerId) return;

    const votedPlayer = players.find(p => p.id === selectedPlayerId);
    setIsResolved(true);

    if (votedPlayer?.isImpostor) {
      // If the impostor is caught, they still need to guess the secret word to win.
      setShowImpostorGuessModal(true);
    } else {
      // If they were not caught, the innocents win this round.
      setImpostorGuessedRight(false);
      triggerVictory(false);
    }
  };

  const triggerVictory = (innocentsWon: boolean) => {
    sound.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleImpostorGuessResult = (guessedRight: boolean) => {
    setImpostorGuessedRight(guessedRight);
    setShowImpostorGuessModal(false);
    triggerVictory(!guessedRight);
  };

  // Calculate updated scores
  const getUpdatedScores = () => {
    const updated = { ...scores };
    const votedPlayer = players.find(p => p.id === selectedPlayerId);

    if (votedPlayer?.isImpostor) {
      if (impostorGuessedRight) {
        // The impostor only wins by guessing the secret word.
        impostors.forEach(imp => {
          updated[imp.name] = (updated[imp.name] || 0) + 2;
        });
      } else {
        // Innocents win by catching the impostor or by preventing them from guessing correctly.
        innocents.forEach(inn => {
          updated[inn.name] = (updated[inn.name] || 0) + 1;
        });
      }
    } else {
      // If the impostor was not caught, the innocents still win the round.
      innocents.forEach(inn => {
        updated[inn.name] = (updated[inn.name] || 0) + 1;
      });
    }

    return updated;
  };

  const votedPlayer = players.find(p => p.id === selectedPlayerId);
  const wasImpostorCaught = votedPlayer?.isImpostor;

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center pb-12">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {!isResolved ? '¿A quién habéis votado como Impostor?' : '¡Resultado de la Partida!'}
        </h2>
        <p className="text-xs text-slate-400">
          {!isResolved
            ? 'Señala al jugador más votado por la mayoría de la mesa'
            : 'Comprueba si habéis descubierto al impostor'}
        </p>
      </div>

      {/* Players Voting Grid */}
      {!isResolved ? (
        <Card className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.map(player => (
              <button
                key={player.id}
                type="button"
                onClick={() => handleSelectVoted(player.id)}
                className={`p-3.5 rounded-xl border font-bold text-sm text-left flex items-center justify-between transition-all ${selectedPlayerId === player.id
                    ? 'bg-rose-600/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20 ring-1 ring-rose-500'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
              >
                <span>{player.name}</span>
                {selectedPlayerId === player.id && (
                  <Badge variant="rose">Votado</Badge>
                )}
              </button>
            ))}
          </div>

          <Button
            variant="danger"
            size="lg"
            fullWidth
            disabled={!selectedPlayerId}
            onClick={handleConfirmVote}
          >
            Revelar Identidad de {votedPlayer?.name || 'Sospechoso'}
          </Button>
        </Card>
      ) : (
        /* RESOLUTION VIEW */
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          {/* Winner Banner */}
          <Card className={`p-6 sm:p-8 space-y-4 border ${wasImpostorCaught && !impostorGuessedRight
              ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/40'
              : 'bg-gradient-to-b from-rose-950/60 to-slate-900 border-rose-500/40'
            }`}>
            <div className="text-5xl animate-bounce-subtle">
              {wasImpostorCaught && !impostorGuessedRight ? '🎉' : '🕵️‍♂️'}
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Ganadores de la Ronda
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${wasImpostorCaught && !impostorGuessedRight ? 'text-indigo-400' :
                  impostorGuessedRight ? 'text-rose-400' : 'text-indigo-400'
                }`}>
                {impostorGuessedRight
                  ? '¡El Impostor adivinó la palabra y Gana!'
                  : '¡Victoria de los Inocentes!'}
              </h3>
            </div>

            {/* Secret Reveal Box */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">La palabra secreta era:</div>
              <div className="text-2xl font-black text-white tracking-wide">{secretWord}</div>
              <Badge variant="indigo">Categoría: {categoryName}</Badge>
            </div>

            {/* Roles Reveal List */}
            <div className="space-y-2 pt-2 text-left">
              <div className="text-xs font-semibold text-slate-400 px-1">Identidades:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {players.map(p => (
                  <div
                    key={p.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${p.isImpostor
                        ? 'bg-rose-950/40 border-rose-600/40 text-rose-300'
                        : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                      }`}
                  >
                    <span>{p.name}</span>
                    <Badge variant={p.isImpostor ? 'rose' : 'indigo'}>
                      {p.isImpostor ? 'Impostor' : 'Inocente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Play size={18} />}
              onClick={() => onPlayAgain(getUpdatedScores())}
            >
              Jugar Otra Ronda
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<RotateCcw size={18} />}
              onClick={onNewSetup}
            >
              Nueva Configuración
            </Button>
          </div>
        </div>
      )}

      {/* Impostor Guess Modal (If caught) */}
      {showImpostorGuessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <Card className="max-w-md w-full p-6 space-y-4 border-amber-500/40 bg-slate-900 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <HelpCircle size={28} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">¡Han pillado al Impostor!</h3>
              <p className="text-xs text-slate-300">
                El impostor tiene <strong>una última oportunidad</strong>: si adivina la palabra secreta ahora mismo, ¡consigue salvarse y ganar!
              </p>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              ¿Adivinó el impostor la palabra <strong>"{secretWord}"</strong>?
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="success"
                size="md"
                leftIcon={<Check size={18} />}
                onClick={() => handleImpostorGuessResult(true)}
              >
                ¡Sí, la Adivinó!
              </Button>
              <Button
                variant="danger"
                size="md"
                leftIcon={<X size={18} />}
                onClick={() => handleImpostorGuessResult(false)}
              >
                No la Adivinó
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

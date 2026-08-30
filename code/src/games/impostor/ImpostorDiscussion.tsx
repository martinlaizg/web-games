import React from 'react';
import { Mic, RotateCcw, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ImpostorPlayer } from '../../types/impostor';

interface ImpostorDiscussionProps {
  players: ImpostorPlayer[];
  startingPlayerIndex: number;
  timerDurationSeconds: number;
  onGoToReveal: (playerIndex: number) => void;
  onResetRound: () => void;
}

export const ImpostorDiscussion: React.FC<ImpostorDiscussionProps> = ({
  players,
  startingPlayerIndex,
  timerDurationSeconds,
  onGoToReveal,
  onResetRound
}) => {
  const startingPlayer = players[startingPlayerIndex] || players[0];

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center pb-12">
      {/* Starting Speaker Banner */}
      <Card className="p-6 bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-500/30 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Mic size={14} className="text-indigo-400" />
          Primer Orador de la Ronda
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-400">Comienza diciendo una palabra relacionada:</p>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {startingPlayer.name}
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
          Continuad en sentido de las agujas del reloj alrededor de la mesa. Cada jugador dice <strong>1 sola palabra</strong>.
        </p>
      </Card>

      {/* Quick In-game tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
          <MessageSquare className="text-indigo-400 mt-0.5 shrink-0" size={16} />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">Si eres Inocente:</span>
            Da una pista suficientemente clara para que los inocentes te reconozcan, pero no tan obvia como para regalársela al impostor.
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
          <AlertTriangle className="text-amber-400 mt-0.5 shrink-0" size={16} />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">Si eres el Impostor:</span>
            Usa palabras genéricas o apóyate en lo que han dicho los jugadores previos para no levantar sospechas.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
          <div className="text-xs font-semibold text-slate-300 text-left">Revisar a un jugador</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {players.map((player, index) => (
              <Button
                key={player.id}
                variant="secondary"
                size="sm"
                className="justify-center"
                onClick={() => onGoToReveal(index)}
              >
                {player.name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={14} />}
          onClick={onResetRound}
          className="text-slate-400 hover:text-slate-200 mx-auto"
        >
          Reiniciar Partida
        </Button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Shield, ArrowRight, Zap, Info, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TOC_CARDS_RULES } from '../../data/tocRules';
import { TocCardRule, TocCardValue } from '../../types/toc';
import { sound } from '../../lib/sound';

export const TocCardReference: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<TocCardValue>('4');
  const [filter, setFilter] = useState<'all' | 'special' | 'exit'>('all');

  const filteredCards = TOC_CARDS_RULES.filter(c => {
    if (filter === 'special') return c.isSpecial;
    if (filter === 'exit') return c.canExitBase;
    return true;
  });

  const activeCard: TocCardRule = TOC_CARDS_RULES.find(c => c.id === selectedCardId) || TOC_CARDS_RULES[0];

  const handleSelectCard = (id: TocCardValue) => {
    sound.playClick();
    setSelectedCardId(id);
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs font-semibold text-slate-400">
          Selecciona una carta para ver su efecto detallado:
        </div>
        <div className="flex gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todas ({TOC_CARDS_RULES.length})
          </button>
          <button
            onClick={() => setFilter('special')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'special' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Especiales (A, K, J, 7, 4)
          </button>
          <button
            onClick={() => setFilter('exit')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filter === 'exit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Salen de Base (A, K)
          </button>
        </div>
      </div>

      {/* Cards Grid Selector */}
      <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 gap-2">
        {filteredCards.map(card => {
          const isSelected = card.id === selectedCardId;
          const isKeySpecial = card.id === '4' || card.id === '7' || card.id === 'J';
          const isExit = card.id === 'A' || card.id === 'K';

          return (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card.id)}
              className={`p-2 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[72px] relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50 scale-105'
                  : isKeySpecial
                  ? 'bg-purple-950/30 border-purple-800/60 text-purple-300 hover:bg-purple-900/40'
                  : isExit
                  ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl sm:text-2xl font-black font-mono">
                {card.id}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium truncate w-full text-slate-400">
                {card.id === '4' ? 'Atrás -4' : card.id === 'J' ? 'Cambio' : card.id === '7' ? 'Divisible' : card.canExitBase ? 'Salida' : `+${card.id}`}
              </span>
              {card.highlightTag && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Card Display */}
      {activeCard && (
        <Card className="p-6 space-y-5 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950">
          {/* Card Title & Badges */}
          <div className="flex items-start justify-between flex-wrap gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black font-mono text-2xl shadow-inner">
                {activeCard.id}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  {activeCard.name}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium">
                  {activeCard.shortEffect}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {activeCard.canExitBase && (
                <Badge variant="emerald">Saca Ficha de Base</Badge>
              )}
              {activeCard.isSpecial && (
                <Badge variant="amber">Carta Especial</Badge>
              )}
            </div>
          </div>

          {/* Detailed Effect */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              Efecto en las Reglas Canadienses:
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              {activeCard.fullEffect}
            </p>
          </div>

          {/* Strategy Tip */}
          {activeCard.strategyTip && (
            <div className="space-y-1.5 bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-xl">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-400" />
                Consejo Táctico de Partida:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeCard.strategyTip}
              </p>
            </div>
          )}

          {/* Concrete Example if present */}
          {activeCard.example && (
            <div className="space-y-1.5 bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-0.5">Ejemplo visual:</span>
              {activeCard.example}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Layers, BookOpen, HelpCircle, Sparkles } from 'lucide-react';
import { TocCardReference } from './TocCardReference';
import { TocRulesOverview } from './TocRulesOverview';
import { TocFaq } from './TocFaq';
import { sound } from '../../lib/sound';

type TocTab = 'cards' | 'rules' | 'faq';

export const TocGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TocTab>('cards');

  const handleTabChange = (tab: TocTab) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Sparkles size={14} />
          Reglamento Táctico y Visor de Cartas
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          Jeu de TOC / Tock
          <span className="text-2xl">🇨🇦</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Reglas oficiales de la versión canadiense. Consulta el poder de cada carta, las jugadas maestras y resuelve cualquier disputa en partida.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => handleTabChange('cards')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all shrink-0 whitespace-nowrap ${activeTab === 'cards'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <Layers size={16} />
            <span>Cartas y Poderes (A-K)</span>
          </button>

          <button
            onClick={() => handleTabChange('rules')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all shrink-0 whitespace-nowrap ${activeTab === 'rules'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <BookOpen size={16} />
            <span>Reglas de Equipo & Fases</span>
          </button>

          <button
            onClick={() => handleTabChange('faq')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-all shrink-0 whitespace-nowrap ${activeTab === 'faq'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            <HelpCircle size={16} />
            <span>Buscador de Dudas / FAQ</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'cards' && <TocCardReference />}
        {activeTab === 'rules' && <TocRulesOverview />}
        {activeTab === 'faq' && <TocFaq />}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TOC_FAQ_ITEMS } from '../../data/tocRules';

export const TocFaq: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(TOC_FAQ_ITEMS[0].id);

  const filteredFaq = TOC_FAQ_ITEMS.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const quickTags = ['4', 'jota', '7', 'intercambio', 'casa', 'comer', 'compañero'];

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar dudas en plena partida (ej: 4 hacia atrás, jota, comer, hablar)..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-md"
          />
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Tag size={12} /> Búsquedas rápidas:
          </span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
            >
              #{tag}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-rose-400 hover:underline ml-1"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaq.length > 0 ? (
          filteredFaq.map(item => {
            const isExpanded = expandedId === item.id;
            return (
              <Card
                key={item.id}
                className={`transition-all border ${
                  isExpanded ? 'border-amber-500/40 bg-slate-900/90 shadow-md' : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 focus:outline-none"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
                    <span className="font-bold text-sm sm:text-base text-slate-100">
                      {item.question}
                    </span>
                  </div>
                  <div className="text-slate-400 mt-1">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 animate-in fade-in">
                    <p className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                      {item.answer}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.tags.map(t => (
                        <Badge key={t} variant="slate" size="sm">
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        ) : (
          <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
            <p className="text-sm text-slate-400">
              No se encontraron respuestas para "<strong>{searchQuery}</strong>".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-amber-400 hover:underline"
            >
              Ver todas las preguntas frecuentes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

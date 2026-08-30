import React from 'react';
import { Users, Layers, Repeat, ShieldAlert, Award, ArrowRightCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { TOC_GENERAL_SECTIONS } from '../../data/tocRules';

export const TocRulesOverview: React.FC = () => {
  const icons = [
    <Users className="text-indigo-400" size={20} />,
    <Layers className="text-amber-400" size={20} />,
    <Repeat className="text-emerald-400" size={20} />,
    <ShieldAlert className="text-rose-400" size={20} />,
    <ArrowRightCircle className="text-blue-400" size={20} />,
    <Award className="text-purple-400" size={20} />
  ];

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
        <span className="text-2xl shrink-0">🇨🇦</span>
        <div>
          <strong className="block text-sm text-amber-300 font-bold mb-0.5">
            El Juego de Toc / Tock (Versión Canadiense)
          </strong>
          Un juego de mesa táctico derivado del Parchís/Ludo pero jugado con baraja de naipes francesa (54 cartas) y en parejas colaborativas (2v2 o 3v3). ¡El azar se reduce al mínimo y prima la estrategia en equipo!
        </div>
      </div>

      {/* Structured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOC_GENERAL_SECTIONS.map((sec, idx) => (
          <Card key={sec.id} className="p-5 space-y-3 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                {icons[idx % icons.length]}
              </div>
              <h3 className="font-bold text-base text-slate-100">
                {sec.title}
              </h3>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {sec.content}
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Table of Key Tactical Moves */}
      <Card className="p-5 space-y-3 border-slate-800">
        <h4 className="font-bold text-sm text-slate-200">
          Tabla Rápida de Movimientos Especiales Canadienses:
        </h4>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3 font-semibold">Carta</th>
                <th className="py-2 px-3 font-semibold">Función Principal</th>
                <th className="py-2 px-3 font-semibold">Estrategia Canadiense</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-3 font-bold text-emerald-400">As / Rey (K)</td>
                <td className="py-2 px-3">Sacar ficha de base</td>
                <td className="py-2 px-3 text-slate-400">Pásasela a tu compañero si está bloqueado en base.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-amber-400">4</td>
                <td className="py-2 px-3">Retroceder 4 casillas</td>
                <td className="py-2 px-3 text-slate-400">Jugar nada más salir para entrar a casa en la siguiente ronda.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-indigo-400">7</td>
                <td className="py-2 px-3">Avanzar 7 dividido</td>
                <td className="py-2 px-3 text-slate-400">Repartir pasos para entrar a casa y comer fichas a la vez.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-purple-400">Jota (J)</td>
                <td className="py-2 px-3">Intercambio de posición</td>
                <td className="py-2 px-3 text-slate-400">Cambiar ficha retrasada propia por ficha rival a punto de ganar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { Users, UserMinus, Plus, ShieldAlert, Sparkles, HelpCircle, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { IMPOSTOR_CATEGORIES, ALL_WORD_DIFFICULTIES, IMPOSTOR_DIFFICULTY_LABELS } from '../../data/impostorWords';
import { ImpostorConfig, ImpostorHintMode, ImpostorWordDifficulty } from '../../types/impostor';

interface ImpostorSetupProps {
  onStartGame: (config: ImpostorConfig) => void;
  initialPlayers?: string[];
}

export const ImpostorSetup: React.FC<ImpostorSetupProps> = ({
  onStartGame,
  initialPlayers = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4']
}) => {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [impostorCount, setImpostorCount] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    IMPOSTOR_CATEGORIES.map(c => c.id)
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<ImpostorWordDifficulty[]>(ALL_WORD_DIFFICULTIES);
  const [hintMode, setHintMode] = useState<ImpostorHintMode>('none');
  const [customWordsText, setCustomWordsText] = useState('');

  const addPlayer = () => {
    const trimmed = newPlayerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setNewPlayerName('');
    } else if (!trimmed) {
      const nextNum = players.length + 1;
      setPlayers([...players, `Jugador ${nextNum}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length <= 3) return;
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    if (impostorCount >= newPlayers.length) {
      setImpostorCount(Math.max(1, Math.floor(newPlayers.length / 2) - 1));
    }
  };

  const updatePlayerName = (index: number, val: string) => {
    const next = [...players];
    next[index] = val;
    setPlayers(next);
  };

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(id => id !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const toggleAllCategories = () => {
    if (selectedCategories.length === IMPOSTOR_CATEGORIES.length) {
      setSelectedCategories([IMPOSTOR_CATEGORIES[0].id]);
    } else {
      setSelectedCategories(IMPOSTOR_CATEGORIES.map(c => c.id));
    }
  };

  const toggleDifficulty = (difficulty: ImpostorWordDifficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      if (selectedDifficulties.length > 1) {
        setSelectedDifficulties(selectedDifficulties.filter(item => item !== difficulty));
      }
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const handleStart = () => {
    if (players.length < 3) return;
    const customWords = customWordsText
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    onStartGame({
      players,
      impostorCount,
      selectedCategories,
      selectedDifficulties,
      hintMode,
      timerDurationSeconds: 0,
      customWords
    });
  };

  const maxImpostors = Math.max(1, Math.floor((players.length - 1) / 2));

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
          <ShieldAlert size={14} />
          Juego de Deducción Social
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          El Impostor
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Todos los jugadores conocen la palabra secreta excepto el impostor. ¡Dad pistas con palabras relacionadas sin delataros!
        </p>
      </div>

      {/* 1. Players Section */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Users className="text-indigo-400" size={18} />
            <span>Jugadores ({players.length})</span>
          </div>
          <span className="text-xs text-slate-400">Mínimo 3 jugadores</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {players.map((player, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/70 rounded-xl px-3 py-2">
              <span className="w-6 text-center text-xs font-bold text-slate-400">{idx + 1}</span>
              <input
                type="text"
                value={player}
                onChange={e => updatePlayerName(idx, e.target.value)}
                className="bg-transparent border-none text-slate-100 text-sm font-medium focus:outline-none flex-1"
                placeholder={`Jugador ${idx + 1}`}
              />
              {players.length > 3 && (
                <button
                  type="button"
                  onClick={() => removePlayer(idx)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  title="Eliminar jugador"
                >
                  <UserMinus size={15} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Player Input */}
        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addPlayer();
              }
            }}
            placeholder="Añadir nombre de amigo..."
            className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Plus size={16} />}
            onClick={addPlayer}
          >
            Añadir
          </Button>
        </div>
      </Card>

      {/* 2. Impostors & Difficulty Config */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <ShieldAlert className="text-rose-400" size={18} />
            <span>Número de Impostores</span>
          </div>
          <Badge variant="rose">{impostorCount} {impostorCount === 1 ? 'Impostor' : 'Impostores'}</Badge>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: maxImpostors }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              type="button"
              onClick={() => setImpostorCount(num)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${impostorCount === num
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md shadow-rose-500/10'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              {num} {num === 1 ? 'Impostor' : 'Impostores'}
            </button>
          ))}
        </div>

        {/* Impostor Hint Mode */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle size={14} className="text-indigo-400" />
              Pista para el Impostor
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setHintMode('none')}
              className={`p-2.5 rounded-xl text-left border transition-all text-xs ${hintMode === 'none'
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
            >
              <div className="font-bold mb-0.5">Sin pistas (Estándar)</div>
              <div className="text-[11px] text-slate-400">El impostor no sabe ni la temática.</div>
            </button>

            <button
              type="button"
              onClick={() => setHintMode('category')}
              className={`p-2.5 rounded-xl text-left border transition-all text-xs ${hintMode === 'category'
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
            >
              <div className="font-bold mb-0.5">Sabe la Categoría</div>
              <div className="text-[11px] text-slate-400">Ej: "Comida" o "Película" (más fácil).</div>
            </button>
          </div>
        </div>

      </Card>

      {/* 3. Categories Selection */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Sparkles className="text-amber-400" size={18} />
            <span>Categorías de Palabras</span>
          </div>
          <button
            type="button"
            onClick={toggleAllCategories}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {selectedCategories.length === IMPOSTOR_CATEGORIES.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {IMPOSTOR_CATEGORIES.map(cat => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`p-3 rounded-xl border flex items-center gap-2 text-left transition-all ${isSelected
                  ? 'bg-indigo-600/15 border-indigo-500/40 text-slate-100 shadow-sm'
                  : 'bg-slate-850/40 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{cat.name}</div>
                  <div className="text-[10px] text-slate-400">{cat.words.length} palabras</div>
                </div>
                {isSelected && <Check size={14} className="text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Nivel de dificultad</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {ALL_WORD_DIFFICULTIES.map((difficulty) => {
              const isSelected = selectedDifficulties.includes(difficulty);
              return (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => toggleDifficulty(difficulty)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${isSelected
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {IMPOSTOR_DIFFICULTY_LABELS[difficulty]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom words expandable */}
        <details className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <summary className="cursor-pointer font-semibold text-slate-300 hover:text-white transition-colors">
            + Añadir palabras personalizadas (opcional)
          </summary>
          <div className="mt-2 space-y-2">
            <p className="text-[11px] text-slate-400">
              Escribe palabras personalizadas entre tus amigos (chistes internos, nombres conocidos, etc.), una por línea:
            </p>
            <textarea
              rows={3}
              value={customWordsText}
              onChange={e => setCustomWordsText(e.target.value)}
              placeholder="Ejemplo:&#10;Paella de la abuela&#10;Viaje a Roma&#10;Discoteca favorita"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </details>
      </Card>

      {/* Start Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="xl"
          fullWidth
          onClick={handleStart}
          disabled={players.length < 3 || selectedCategories.length === 0 || selectedDifficulties.length === 0}
        >
          ¡Repartir Roles y Empezar!
        </Button>
      </div>
    </div>
  );
};

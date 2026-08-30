import React, { useEffect, useState } from 'react';
import { ImpostorSetup } from './ImpostorSetup';
import { ImpostorReveal } from './ImpostorReveal';
import { ImpostorDiscussion } from './ImpostorDiscussion';
import { ImpostorConfig, ImpostorGameState, ImpostorPlayer } from '../../types/impostor';
import { getRandomWord } from '../../data/impostorWords';

const IMPOSITOR_SESSION_KEY = 'impostor-game-session';

interface PersistedImpostorSession {
  gameState: ImpostorGameState;
  config: ImpostorConfig | null;
  players: ImpostorPlayer[];
  currentRevealIndex: number;
  secretWord: string;
  categoryName: string;
  startingPlayerIndex: number;
  scores: Record<string, number>;
}

const readPersistedSession = (): PersistedImpostorSession | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(IMPOSITOR_SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedImpostorSession;
    return parsed;
  } catch {
    return null;
  }
};

export const ImpostorGame: React.FC = () => {
  const persistedSession = readPersistedSession();
  const hasValidPersistedSession = !!persistedSession && (
    persistedSession.gameState === 'setup' ||
    persistedSession.gameState === 'reveal' ||
    (persistedSession.gameState === 'discussion' && !!persistedSession.config && persistedSession.players.length > 0)
  );

  const [gameState, setGameState] = useState<ImpostorGameState>(hasValidPersistedSession ? persistedSession.gameState : 'setup');
  const [config, setConfig] = useState<ImpostorConfig | null>(hasValidPersistedSession ? persistedSession.config : null);
  const [players, setPlayers] = useState<ImpostorPlayer[]>(hasValidPersistedSession ? persistedSession.players : []);
  const [currentRevealIndex, setCurrentRevealIndex] = useState<number>(hasValidPersistedSession ? persistedSession.currentRevealIndex : 0);
  const [secretWord, setSecretWord] = useState<string>(hasValidPersistedSession ? persistedSession.secretWord : '');
  const [categoryName, setCategoryName] = useState<string>(hasValidPersistedSession ? persistedSession.categoryName : '');
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(hasValidPersistedSession ? persistedSession.startingPlayerIndex : 0);
  const [scores, setScores] = useState<Record<string, number>>(hasValidPersistedSession ? persistedSession.scores : {});

  useEffect(() => {
    if (gameState === 'discussion' && (!config || players.length === 0)) {
      setGameState('setup');
      setConfig(null);
      setPlayers([]);
      setCurrentRevealIndex(0);
      setSecretWord('');
      setCategoryName('');
      setStartingPlayerIndex(0);
      setScores({});
      try {
        window.localStorage.removeItem(IMPOSITOR_SESSION_KEY);
      } catch {
        // Ignore storage restrictions on mobile browsers.
      }
      return;
    }
    const snapshot: PersistedImpostorSession = {
      gameState,
      config,
      players,
      currentRevealIndex,
      secretWord,
      categoryName,
      startingPlayerIndex,
      scores
    };

    try {
      if (gameState === 'setup' && !config && players.length === 0 && !secretWord && !categoryName && Object.keys(scores).length === 0) {
        window.localStorage.removeItem(IMPOSITOR_SESSION_KEY);
        return;
      }

      window.localStorage.setItem(IMPOSITOR_SESSION_KEY, JSON.stringify(snapshot));
    } catch {
      // Some mobile browsers can block localStorage, so we keep the game working in memory only.
    }
  }, [gameState, config, players, currentRevealIndex, secretWord, categoryName, startingPlayerIndex, scores]);

  const startNewGameWithConfig = (cfg: ImpostorConfig) => {
    setConfig(cfg);

    // Pick random secret word
    const { word, categoryName: catName } = getRandomWord(cfg.selectedCategories, cfg.selectedDifficulties, cfg.customWords);
    setSecretWord(word);
    setCategoryName(catName);

    // Pick impostor indices randomly
    const totalPlayers = cfg.players.length;
    const impostorIndices = new Set<number>();
    while (impostorIndices.size < cfg.impostorCount) {
      impostorIndices.add(Math.floor(Math.random() * totalPlayers));
    }

    // Build players list
    const playerObjects: ImpostorPlayer[] = cfg.players.map((name, idx) => ({
      id: `p-${idx}-${name}`,
      name,
      isImpostor: impostorIndices.has(idx),
      score: scores[name] || 0
    }));

    setPlayers(playerObjects);
    setCurrentRevealIndex(0);
    setStartingPlayerIndex(Math.floor(Math.random() * totalPlayers));
    setGameState('reveal');
  };

  const handleNextPlayer = () => {
    setCurrentRevealIndex(prev => prev + 1);
  };

  const handleFinishReveal = () => {
    setGameState('discussion');
  };

  const handleGoToReveal = (playerIndex: number) => {
    setCurrentRevealIndex(playerIndex);
    setGameState('reveal');
  };

  const handlePlayAgain = (updatedScores: Record<string, number>) => {
    setScores(updatedScores);
    if (config) {
      startNewGameWithConfig(config);
    } else {
      setGameState('setup');
    }
  };

  const handleNewSetup = () => {
    setGameState('setup');
    setConfig(null);
    setPlayers([]);
    setCurrentRevealIndex(0);
    setSecretWord('');
    setCategoryName('');
    setStartingPlayerIndex(0);
    setScores({});

    try {
      window.localStorage.removeItem(IMPOSITOR_SESSION_KEY);
    } catch {
      // Ignore storage restrictions on mobile browsers.
    }
  };

  return (
    <div className="space-y-4">
      {gameState === 'setup' && (
        <ImpostorSetup
          onStartGame={startNewGameWithConfig}
          initialPlayers={config?.players}
        />
      )}

      {gameState === 'reveal' && players.length > 0 && (
        <ImpostorReveal
          players={players}
          currentIndex={currentRevealIndex}
          secretWord={secretWord}
          categoryName={categoryName}
          hintMode={config?.hintMode || 'none'}
          onNextPlayer={handleNextPlayer}
          onFinishReveal={handleFinishReveal}
        />
      )}

      {gameState === 'discussion' && players.length > 0 && (
        <ImpostorDiscussion
          players={players}
          startingPlayerIndex={startingPlayerIndex}
          timerDurationSeconds={config?.timerDurationSeconds || 0}
          onGoToReveal={handleGoToReveal}
          onResetRound={handleNewSetup}
        />
      )}
    </div>
  );
};

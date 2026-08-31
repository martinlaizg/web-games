import { CounterConfig, ScorekeeperAction, ScorekeeperConfig, ScorekeeperPlayer, ScorekeeperPreset, ScorekeeperSession, VictoryMode } from '../types/scorekeeper';

const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const snapshot = (session: ScorekeeperSession) => ({ players: session.players, turnIndex: session.turnIndex, round: session.round, phaseIndex: session.phaseIndex });

export const defaultConfig = (): ScorekeeperConfig => ({
  name: 'Partida libre',
  mainCounter: { id: 'score', name: 'Puntos', kind: 'points', initialValue: 0, hidden: false },
  secondaryCounters: [], scoreCategories: [], victoryMode: 'highest', phases: [], turnSeconds: 0
});

export const builtInPresets = (): ScorekeeperPreset[] => [
  { id: 'free', name: 'Modo libre', config: defaultConfig(), builtIn: true },
  { id: 'victory-points', name: 'Puntos de victoria', config: { ...defaultConfig(), name: 'Puntos de victoria', victoryMode: 'target', targetScore: 100 }, builtIn: true },
  { id: 'life', name: 'Contador de vidas', config: { ...defaultConfig(), name: 'Partida de vidas', mainCounter: { id: 'life', name: 'Vidas', kind: 'life', initialValue: 20, hidden: false, eliminationAtZero: true } }, builtIn: true },
  { id: 'tcg', name: 'TCG', config: { ...defaultConfig(), name: 'TCG', mainCounter: { id: 'life', name: 'Vidas', kind: 'life', initialValue: 20, hidden: false, eliminationAtZero: true }, secondaryCounters: [{ id: 'poison', name: 'Veneno', kind: 'resource', initialValue: 0, hidden: false }] }, builtIn: true }
];

export const createPlayer = (name: string, color: string, avatar = '🎲', profileId?: string): ScorekeeperPlayer => ({
  id: id(), profileId, name: name.trim() || 'Invitado', avatar, color, role: '', status: 'active', counters: {}, scoreCategories: {}, turnSeconds: 0
});

export const createSession = (config: ScorekeeperConfig, players: ScorekeeperPlayer[]): ScorekeeperSession => {
  const counters = [config.mainCounter, ...config.secondaryCounters];
  const readyPlayers = players.map((player, index) => ({ ...player, status: index === 0 ? 'turn' as const : 'active' as const, counters: Object.fromEntries(counters.map(counter => [counter.id, counter.initialValue])), scoreCategories: Object.fromEntries(config.scoreCategories.map(category => [category, 0])) }));
  return { id: id(), phase: 'playing', config, players: readyPlayers, turnIndex: 0, round: 1, phaseIndex: 0, startedAt: new Date().toISOString(), elapsedSeconds: 0, isPaused: false, history: [], redoStack: [], winnerIds: [] };
};

export const applyAction = (session: ScorekeeperSession, label: string, mutate: (current: ScorekeeperSession) => ScorekeeperSession): ScorekeeperSession => {
  const before = snapshot(session);
  const changed = mutate(session);
  const after = snapshot(changed);
  const action: ScorekeeperAction = { id: id(), label, at: new Date().toISOString(), before, after };
  return { ...changed, history: [...session.history, action], redoStack: [] };
};

export const changeCounter = (session: ScorekeeperSession, playerId: string, counter: CounterConfig, amount: number): ScorekeeperSession => applyAction(session, `${amount > 0 ? '+' : ''}${amount} ${counter.name}`, current => {
  const players: ScorekeeperPlayer[] = current.players.map(player => {
    if (player.id !== playerId) return player;
    const value = (player.counters[counter.id] || 0) + amount;
    return { ...player, counters: { ...player.counters, [counter.id]: value }, status: counter.eliminationAtZero && value <= 0 ? 'eliminated' : player.status === 'eliminated' ? 'active' : player.status };
  });
  return { ...current, players };
});

export const nextTurn = (session: ScorekeeperSession): ScorekeeperSession => applyAction(session, 'Siguiente turno', current => {
  const eligible = current.players.map((player, index) => ({ player, index })).filter(({ player }) => player.status !== 'eliminated');
  if (!eligible.length) return current;
  const currentPosition = eligible.findIndex(({ index }) => index === current.turnIndex);
  const next = eligible[(currentPosition + 1 + eligible.length) % eligible.length];
  const wraps = currentPosition === eligible.length - 1;
  return { ...current, turnIndex: next.index, round: wraps ? current.round + 1 : current.round, players: current.players.map((player, index) => player.status === 'eliminated' ? player : { ...player, status: index === next.index ? 'turn' : 'active' }) };
});

export const undo = (session: ScorekeeperSession): ScorekeeperSession => {
  const action = session.history[session.history.length - 1]; if (!action) return session;
  return { ...session, ...action.before, history: session.history.slice(0, -1), redoStack: [...session.redoStack, action] };
};
export const redo = (session: ScorekeeperSession): ScorekeeperSession => {
  const action = session.redoStack[session.redoStack.length - 1]; if (!action) return session;
  return { ...session, ...action.after, redoStack: session.redoStack.slice(0, -1), history: [...session.history, action] };
};

export const getWinners = (session: ScorekeeperSession): string[] => {
  const active = session.players.filter(player => player.status !== 'eliminated');
  if (!active.length) return [];
  const values = active.map(player => player.counters[session.config.mainCounter.id] || 0);
  const mode: VictoryMode = session.config.victoryMode;
  if (mode === 'target') return active.filter(player => (player.counters[session.config.mainCounter.id] || 0) >= (session.config.targetScore || 0)).map(player => player.id);
  const winningValue = mode === 'lowest' ? Math.min(...values) : Math.max(...values);
  return active.filter(player => (player.counters[session.config.mainCounter.id] || 0) === winningValue).map(player => player.id);
};

export const rollDice = (sides: number, count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);

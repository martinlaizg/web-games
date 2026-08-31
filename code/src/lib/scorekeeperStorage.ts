import { CompletedScorekeeperGame, PlayerProfile, ScorekeeperPreset, ScorekeeperSession } from '../types/scorekeeper';

const KEYS = { profiles: 'mesa-hub-scorekeeper-profiles', presets: 'mesa-hub-scorekeeper-presets', session: 'mesa-hub-scorekeeper-session', history: 'mesa-hub-scorekeeper-history' };
const read = <T,>(key: string, fallback: T): T => { try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } };
const write = <T,>(key: string, value: T) => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* memory-only fallback */ } };
export const scorekeeperStorage = {
  profiles: () => read<PlayerProfile[]>(KEYS.profiles, []), saveProfiles: (items: PlayerProfile[]) => write(KEYS.profiles, items),
  presets: () => read<ScorekeeperPreset[]>(KEYS.presets, []), savePresets: (items: ScorekeeperPreset[]) => write(KEYS.presets, items),
  session: () => read<ScorekeeperSession | null>(KEYS.session, null), saveSession: (item: ScorekeeperSession) => write(KEYS.session, item), clearSession: () => { try { window.localStorage.removeItem(KEYS.session); } catch { /* noop */ } },
  history: () => read<CompletedScorekeeperGame[]>(KEYS.history, []), saveHistory: (items: CompletedScorekeeperGame[]) => write(KEYS.history, items)
};

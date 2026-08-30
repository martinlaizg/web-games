// Web Audio API Sound Synthesizer for board game feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('mesa-hub-sound-enabled');
        if (saved !== null) {
          this.soundEnabled = saved === 'true';
        }
      } catch {
        this.soundEnabled = true;
      }
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('mesa-hub-sound-enabled', String(enabled));
      } catch {
        // Browsers on mobile may block storage access; the in-memory flag still works.
      }
    }
  }

  public isEnabled() {
    return this.soundEnabled;
  }

  // Quick button click / tap
  public playClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Peek / reveal role sound
  public playReveal() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [329.63, 440, 659.25]; // E4, A4, E5 chord
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35 + i * 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.04);
      osc.stop(this.ctx.currentTime + 0.35 + i * 0.04);
    });
  }

  // Timer Tick (last seconds)
  public playTick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Alarm / Time Up
  public playAlarm() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const times = [0, 0.15, 0.3];
    times.forEach(t => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime + t);
      osc.frequency.setValueAtTime(780, this.ctx.currentTime + t + 0.05);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + t);
      osc.stop(this.ctx.currentTime + t + 0.12);
    });
  }

  // Victory Fanfare
  public playVictory() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.5, d: 0.35 }  // C6
    ];

    let current = this.ctx.currentTime;
    melody.forEach(({ f, d }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, current);

      gain.gain.setValueAtTime(0.2, current);
      gain.gain.exponentialRampToValueAtTime(0.001, current + d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(current);
      osc.stop(current + d);

      current += d * 0.85;
    });
  }
}

export const sound = new SoundEffects();

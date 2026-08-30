import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from './Button';
import { sound } from '../../lib/sound';

interface TimerProps {
  initialSeconds: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onTimeUp,
  autoStart = false
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(autoStart);
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            if (soundAlerts) sound.playAlarm();
            if (onTimeUp) onTimeUp();
            return 0;
          }

          // Sound warnings for last 5 seconds
          if (prev <= 6 && prev > 1 && soundAlerts) {
            sound.playTick();
          }

          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundAlerts, onTimeUp]);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = initialSeconds > 0 ? ((initialSeconds - secondsLeft) / initialSeconds) * 100 : 0;

  const isLowTime = secondsLeft <= 10 && secondsLeft > 0;
  const isTimeUp = secondsLeft === 0;

  return (
    <div className="flex flex-col items-center bg-slate-900/90 border border-slate-800 p-4 rounded-2xl w-full max-w-sm mx-auto shadow-lg">
      <div className="flex items-center justify-between w-full mb-3 text-xs text-slate-400 font-medium">
        <span>Temporizador de Turno / Debate</span>
        <button
          onClick={() => setSoundAlerts(!soundAlerts)}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
          title={soundAlerts ? 'Silenciar avisos' : 'Activar sonido'}
        >
          {soundAlerts ? <Volume2 size={14} className="text-indigo-400" /> : <VolumeX size={14} />}
          <span>{soundAlerts ? 'Sonido ON' : 'Mute'}</span>
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center my-2">
        <div className={`text-4xl sm:text-5xl font-black font-mono tracking-wider transition-colors ${
          isTimeUp 
            ? 'text-rose-500 animate-pulse' 
            : isLowTime 
            ? 'text-amber-400 animate-pulse' 
            : 'text-indigo-300'
        }`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-3">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${
            isTimeUp ? 'bg-rose-500' : isLowTime ? 'bg-amber-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mt-1 w-full">
        <Button
          variant={isRunning ? 'secondary' : 'primary'}
          size="md"
          fullWidth
          leftIcon={isRunning ? <Pause size={18} /> : <Play size={18} />}
          onClick={toggleRunning}
        >
          {isRunning ? 'Pausar' : secondsLeft === 0 ? 'Reiniciar y Empezar' : 'Iniciar'}
        </Button>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<RotateCcw size={16} />}
          onClick={resetTimer}
          title="Reiniciar a tiempo original"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

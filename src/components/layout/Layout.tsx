import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  activeGameId: string | null;
  onNavigateHome: () => void;
  onSelectGame: (gameId: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeGameId,
  onNavigateHome,
  onSelectGame
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-slate-100">
      <Navbar
        activeGameId={activeGameId}
        onNavigateHome={onNavigateHome}
        onSelectGame={onSelectGame}
      />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>MesaHub • Tu compañero digital para noches de juegos de mesa y risas entre amigos</p>
      </footer>
    </div>
  );
};

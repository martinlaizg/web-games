import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'interactive';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl border transition-all duration-200';

  const variants = {
    default: 'bg-slate-900/80 border-slate-800 backdrop-blur-sm',
    elevated: 'bg-slate-900 border-slate-750 shadow-xl shadow-black/40',
    glass: 'bg-slate-900/40 border-slate-800/80 backdrop-blur-md',
    interactive: 'bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850/80 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

import React from 'react';
import { Sun, Moon, Compass } from 'lucide-react';
import { useTheme } from '../lib/theme';

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return {
          icon: <Sun size={15} className="text-amber-500" />,
          label: 'Luz',
          title: 'Modo Luz Cálida (Clic para cambiar a Titanio Cálido)'
        };
      case 'dim':
        return {
          icon: <Compass size={15} className="text-[#F4A261]" />,
          label: 'Titanio',
          title: 'Modo Titanio Cálido (Clic para cambiar a Noche Carbón)'
        };
      case 'dark':
      default:
        return {
          icon: <Moon size={15} className="text-blue-400" />,
          label: 'Noche',
          title: 'Modo Noche Carbón (Clic para cambiar a Luz Cálida)'
        };
    }
  };

  const info = getThemeInfo();

  return (
    <button
      onClick={cycleTheme}
      className="px-2.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-[1.02]"
      title={info.title}
      aria-label="Cambiar modo de tema (Luz, Titanio, Noche)"
    >
      {info.icon}
      <span className="text-[11px] font-bold hidden sm:inline">{info.label}</span>
    </button>
  );
}

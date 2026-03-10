import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-[#F8F9FA] dark:bg-[#1E1E1E] border border-transparent dark:border-[#2A2A2A] text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-[#2A2A2A] hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2} />
      ) : (
        <Moon size={18} strokeWidth={2} />
      )}
    </button>
  );
}

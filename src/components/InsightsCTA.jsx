import { BarChart3, ChevronRight } from 'lucide-react';

export default function InsightsCTA({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full bg-gradient-to-br from-accent/10 via-transparent to-accent/5 
                 dark:from-accent/15 dark:via-transparent dark:to-accent/5
                 border border-white/80 dark:border-accent/15 shadow-glass dark:shadow-none rounded-2xl p-5 
                 backdrop-blur-xl dark:backdrop-blur-none
                 flex items-center justify-between gap-4
                 hover:bg-white/40 hover:border-white hover:shadow-glass-hover 
                 dark:hover:shadow-none
                 transition-all duration-300 cursor-pointer text-left"
      aria-label="Open spending insights"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/80 border border-white dark:border-none shadow-sm dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
          <BarChart3 size={22} strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-display font-bold text-gray-900 dark:text-white text-[15px]">
            Visualize Your Spending
          </span>
          <span className="text-gray-500 dark:text-[#888] text-sm">
            See where your money really goes
          </span>
        </div>
      </div>
      <ChevronRight 
        size={20} 
        className="text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" 
      />
    </button>
  );
}

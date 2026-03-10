import { CATEGORIES } from '../utils/categories';

export default function SummaryPanel({ total, byCategory, convertedTotal, targetCurrency }) {
  const categoriesWithSpend = CATEGORIES.map(c => ({
    ...c,
    spend: byCategory[c.id] || 0
  })).sort((a, b) => b.spend - a.spend); // sort highest spend first

  const maxSpend = Math.max(...categoriesWithSpend.map(c => c.spend));

  return (
    <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-6 flex flex-col gap-6 shadow-glass hover:shadow-glass-hover dark:shadow-none dark:hover:shadow-none transition-all duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-gray-500 dark:text-[#888] text-sm font-semibold uppercase tracking-wider">Total Expenses</h2>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-mono text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            ${total.toFixed(2)}
          </span>
          {convertedTotal !== null && (
            <span className="font-mono text-lg text-gray-500 dark:text-[#888] font-medium">
              ≈ {convertedTotal} {targetCurrency}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-black/5 dark:bg-[#2A2A2A]"></div>

      <div className="flex flex-col gap-4">
        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Category Breakdown</h3>
        
        <div className="flex flex-col gap-4">
          {categoriesWithSpend.map((c, index) => {
            const hasSpend = c.spend > 0;
            const barWidth = hasSpend ? `${(c.spend / maxSpend) * 100}%` : '0%';
            const isHighest = index === 0 && hasSpend;

            return (
              <div key={c.id} className="flex flex-col gap-2 relative">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span style={{ color: c.color }} className="flex items-center justify-center bg-white/80 shadow-sm border border-white/50 dark:bg-[#1E1E1E] dark:border-transparent w-6 h-6 rounded-md">
                      <c.icon size={14} strokeWidth={2.5} />
                    </span>
                    <span className="font-medium text-gray-700 dark:text-[#F5F5F5]">{c.label}</span>
                    {isHighest && (
                      <span className="text-[10px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-sm uppercase tracking-wider ml-1">
                        Highest Spend
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-gray-500 dark:text-[#888]">
                    {hasSpend ? `$${c.spend.toFixed(2)}` : '---'}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-black/5 dark:bg-[#1E1E1E] rounded-full overflow-hidden" aria-hidden="true">
                  <div 
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{ 
                      width: barWidth, 
                      backgroundColor: c.color 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

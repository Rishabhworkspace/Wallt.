import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { X, TrendingUp, Hash, Calculator, Sparkles } from 'lucide-react';
import { CATEGORIES, getCategory } from '../utils/categories';
import { getInsight } from '../utils/insightMessages';

// Custom tooltip for the donut chart
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white/80 backdrop-blur-xl dark:bg-[#1E1E1E] border border-white dark:border-[#2A2A2A] rounded-xl px-3.5 py-2.5 shadow-glass text-sm">
      <p className="font-semibold text-gray-900 dark:text-white">{d.name}</p>
      <p className="text-gray-500 dark:text-[#888] font-mono">${d.value.toFixed(2)} <span className="text-gray-400 dark:text-[#555]">({d.payload.percent}%)</span></p>
    </div>
  );
}

// Center label inside the donut
function CenterLabel({ total }) {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-gray-900 dark:fill-white"
    >
      <tspan x="50%" dy="-8" fontSize="12" className="fill-gray-500 dark:fill-[#888]">Total</tspan>
      <tspan x="50%" dy="24" fontSize="22" fontWeight="700" fontFamily="JetBrains Mono, monospace">${total.toFixed(2)}</tspan>
    </text>
  );
}

export default function InsightsPage({ expenses, total, byCategory, onClose }) {
  // Prepare chart data
  const chartData = useMemo(() => {
    return CATEGORIES
      .map(c => ({
        id: c.id,
        name: c.label,
        value: byCategory[c.id] || 0,
        color: c.color,
      }))
      .filter(d => d.value > 0)
      .sort((a, b) => b.value - a.value)
      .map(d => ({
        ...d,
        percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0',
      }));
  }, [byCategory, total]);

  // Top category
  const topCategory = chartData.length > 0 ? chartData[0] : null;
  const topCategoryData = topCategory ? getCategory(topCategory.id) : null;
  const insight = getInsight(topCategory?.id);

  // Stats
  const avgSpend = expenses.length > 0 ? total / expenses.length : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#E6EFE9]/70 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 md:gap-8 animate-in">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/80 shadow-sm border border-white flex items-center justify-center text-accent">
              <Sparkles size={20} strokeWidth={2} />
            </span>
            Spending Insights
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 dark:text-[#888] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-all"
            aria-label="Close insights"
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Donut Chart */}
        {chartData.length > 0 ? (
          <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-glass hover:shadow-glass-hover dark:shadow-none dark:hover:shadow-none transition-all duration-500">
            <h3 className="font-display font-bold text-gray-900 dark:text-white mb-4">Distribution</h3>
            <div className="w-full h-[280px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                  <CenterLabel total={total} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
              {chartData.map(d => (
                <div key={d.id} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600 dark:text-[#aaa] font-medium">{d.name}</span>
                  <span className="text-gray-400 dark:text-[#666] font-mono text-xs">{d.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/40 dark:bg-[#141414] backdrop-blur-md border border-white/60 dark:border-[#2A2A2A] border-dashed rounded-2xl p-12 text-center transition-all">
            <p className="text-gray-500 dark:text-[#888]">Add some expenses to see your chart here.</p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Top Category */}
          <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-5 shadow-glass hover:shadow-glass-hover dark:shadow-none flex flex-col gap-2 transition-all duration-500">
            <div className="flex items-center gap-2 text-gray-500 dark:text-[#888] text-sm font-medium">
              <TrendingUp size={14} />
              Top Category
            </div>
            {topCategoryData ? (
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${topCategoryData.color}15`, color: topCategoryData.color }}
                >
                  <topCategoryData.icon size={16} strokeWidth={2.5} />
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white">{topCategoryData.label}</span>
                  <span className="font-mono text-xs text-gray-500 dark:text-[#888]">${topCategory.value.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <span className="text-gray-400 dark:text-[#555] text-sm">No data yet</span>
            )}
          </div>

          {/* Total Expenses */}
          <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-5 shadow-glass hover:shadow-glass-hover dark:shadow-none flex flex-col gap-2 transition-all duration-500">
            <div className="flex items-center gap-2 text-gray-500 dark:text-[#888] text-sm font-medium">
              <Hash size={14} />
              Total Expenses
            </div>
            <span className="font-mono text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              {expenses.length}
            </span>
          </div>

          {/* Average Spend */}
          <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-5 shadow-glass hover:shadow-glass-hover dark:shadow-none flex flex-col gap-2 transition-all duration-500">
            <div className="flex items-center gap-2 text-gray-500 dark:text-[#888] text-sm font-medium">
              <Calculator size={14} />
              Average Spend
            </div>
            <span className="font-mono text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              ${avgSpend.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Personality Banner */}
        {topCategory && (
          <div className={`bg-gradient-to-br ${insight.gradient} backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-6 md:p-8 flex flex-col gap-3 shadow-glass hover:shadow-glass-hover dark:shadow-none transition-all duration-500`}>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: `${topCategoryData.color}20`, color: topCategoryData.color }}
              >
                <topCategoryData.icon size={20} strokeWidth={2.5} />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 dark:text-[#888] uppercase tracking-wider">Your spending personality</span>
                <span className="font-display text-xl font-bold text-gray-900 dark:text-white">{insight.title}</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-[#ccc] text-sm leading-relaxed">{insight.message}</p>
            <div className="mt-2 bg-white/60 dark:bg-[#1E1E1E]/60 rounded-xl px-4 py-3 border border-gray-200/40 dark:border-[#2A2A2A]">
              <p className="text-xs text-gray-500 dark:text-[#888] font-medium mb-1">Smart Tip</p>
              <p className="text-sm text-gray-700 dark:text-[#bbb]">{insight.tip}</p>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {chartData.length > 0 && (
          <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-6 shadow-glass hover:shadow-glass-hover dark:shadow-none flex flex-col gap-4 transition-all duration-500">
            <h3 className="font-display font-bold text-gray-900 dark:text-white">Breakdown by Category</h3>
            <div className="flex flex-col gap-4">
              {chartData.map(d => {
                const cat = getCategory(d.id);
                const CatIcon = cat.icon;
                const barWidth = total > 0 ? ((d.value / total) * 100) : 0;
                return (
                  <div key={d.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                          <CatIcon size={14} strokeWidth={2.5} />
                        </span>
                        <span className="font-medium text-gray-700 dark:text-[#F5F5F5]">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-gray-400 dark:text-[#666] text-xs">{d.percent}%</span>
                        <span className="text-gray-700 dark:text-[#ccc] font-semibold">${d.value.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-[#F3F4F6] dark:bg-[#1E1E1E] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-[width] duration-700 ease-out"
                        style={{ width: `${barWidth}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

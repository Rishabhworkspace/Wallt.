import { useState, useEffect, lazy, Suspense } from 'react';
import { useExpenses } from './hooks/useExpenses';
import { useCurrencyRate } from './hooks/useCurrencyRate';
import ExpenseForm from './components/ExpenseForm';
import CurrencyConverter from './components/CurrencyConverter';
import SummaryPanel from './components/SummaryPanel';
import ExpenseList from './components/ExpenseList';
import InsightsCTA from './components/InsightsCTA';
const InsightsPage = lazy(() => import('./components/InsightsPage'));
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import { Activity } from 'lucide-react';

export default function App() {
  // One hook call — all expense logic lives inside it
  const { expenses, addExpense, deleteExpense, total, byCategory } = useExpenses();

  // Currency state
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const { rates, loading, error, updatedAt, retry } = useCurrencyRate("USD");
  
  const convertedTotal = targetCurrency === "USD" 
    ? total.toFixed(2) 
    : (rates && rates[targetCurrency]) 
      ? (total * rates[targetCurrency]).toFixed(2) 
      : null;

  const [showInsights, setShowInsights] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Lock body scroll when insights overlay is open
  useEffect(() => {
    document.body.style.overflow = showInsights ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showInsights]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6EFE9] via-[#F4F7F4] to-[#E9F0EC] dark:bg-none dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-white font-sans flex flex-col transition-colors duration-500">

      {/* Header */}
      <header className="border-b border-white/40 dark:border-[#1A1A1A] sticky top-0 z-10 bg-white/40 dark:bg-[#0A0A0A]/80 backdrop-blur-2xl px-4 md:px-6 py-4 flex justify-between items-center shadow-sm dark:shadow-none transition-all duration-300">
        <h1 className="font-display text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-accent text-[#0A0A0A] flex items-center justify-center shadow-sm">
            <Activity size={18} strokeWidth={2.5} />
          </span>
          <span className="text-gray-900 dark:text-white">Wallt<span className="text-accent">.</span></span>
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="h-6 w-px bg-gray-200 dark:bg-[#2A2A2A]"></div>
          <span className="font-mono text-lg md:text-xl font-bold tracking-tight tabular-nums">
            ${total.toFixed(2)}
          </span>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 
                       grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8 items-start">
                       
        {/* Left Column Area: Form & Converter */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-[88px]">
          <ExpenseForm onAdd={addExpense} />
          <CurrencyConverter
            total={total}
            targetCurrency={targetCurrency}
            setTargetCurrency={setTargetCurrency}
            rates={rates}
            loading={loading}
            error={error}
            updatedAt={updatedAt}
            retry={retry}
          />
        </aside>

        {/* Right Column Area: Summary Panel & List */}
        <section className="flex flex-col gap-6 lg:gap-8 min-w-0">
          <SummaryPanel
            total={total}
            byCategory={byCategory}
            convertedTotal={convertedTotal}
            targetCurrency={targetCurrency}
          />
          {expenses.length > 0 && (
            <InsightsCTA onClick={() => setShowInsights(true)} />
          )}
          <ExpenseList 
            expenses={expenses} 
            onDelete={deleteExpense} 
            rates={rates}
            targetCurrency={targetCurrency}
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 dark:border-[#1A1A1A] py-4 px-4 md:px-6 text-center transition-colors duration-300">
        <p className="text-gray-400 dark:text-[#555] text-xs font-medium">
          Built with React + Vite &middot; Powered by Frankfurter API
        </p>
      </footer>

      {/* Insights Overlay */}
      {showInsights && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#E6EFE9]/80 dark:bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center">
            <div className="animate-pulse text-gray-500 dark:text-[#888] font-medium">Loading insights...</div>
          </div>
        }>
          <InsightsPage
            expenses={expenses}
            total={total}
            byCategory={byCategory}
            onClose={() => setShowInsights(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

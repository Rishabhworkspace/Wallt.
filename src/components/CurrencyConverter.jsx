import { ArrowLeftRight, AlertCircle } from 'lucide-react';
const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "INR", name: "Indian Rupee" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "CAD", name: "Canadian Dollar" }
];
export default function CurrencyConverter({ 
  total, 
  targetCurrency, 
  setTargetCurrency,
  rates,
  loading,
  error,
  updatedAt,
  retry
}) {

  return (
    <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-5 flex flex-col gap-4 shadow-glass hover:shadow-glass-hover dark:shadow-none dark:hover:shadow-none transition-all duration-500">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold flex items-center gap-2.5 text-gray-900 dark:text-white">
          <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <ArrowLeftRight size={16} strokeWidth={2.5} />
          </span>
          Live Conversion
        </h2>
        <select 
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#1E1E1E] dark:bg-[#1E1E1E] border border-white/60 hover:border-white dark:border-[#2A2A2A] text-gray-900 dark:text-white text-sm font-medium rounded-lg px-2.5 py-1.5 focus:bg-white/80 focus:ring-4 focus:ring-accent/20 focus:border-accent focus:shadow-sm focus:outline-none appearance-none cursor-pointer transition-all"
          style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.3rem center', backgroundSize: '1.1em', paddingRight: '1.7rem' }}
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {error ? (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg p-3 text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="font-semibold">{error}</span>
              <button 
                onClick={retry}
                className="text-xs self-start border border-amber-500/30 hover:bg-amber-500/10 text-amber-500 px-2 py-1 rounded transition-colors"
                disabled={loading}
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-[#888] text-sm">Amount in {targetCurrency}</span>
          {loading && !rates ? (
            <div className="animate-pulse bg-gray-200 dark:bg-[#2A2A2A] rounded h-7 w-24"></div>
          ) : (
            <span className="font-mono text-xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {targetCurrency === "USD" 
                ? `$${total.toFixed(2)}`
                : rates?.[targetCurrency] 
                  ? `${targetCurrency === 'JPY' ? '¥' : targetCurrency === 'EUR' ? '€' : targetCurrency === 'GBP' ? '£' : targetCurrency === 'INR' ? '₹' : targetCurrency === 'AUD' ? 'A$' : targetCurrency === 'CAD' ? 'C$' : targetCurrency === 'SGD' ? 'S$' : ''} ${(total * rates[targetCurrency]).toFixed(2)}`
                  : '---'
              }
            </span>
          )}
        </div>
        
        {updatedAt && (
          <span className="text-gray-500 dark:text-[#888] text-[10px] text-right mt-1 opacity-70">
            Updated at {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { getCategory } from '../utils/categories';
import { Trash2 } from 'lucide-react';
export default function ExpenseCard({ expense, onDelete, targetCurrency, rates }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const categoryData = getCategory(expense.category);
  const IconComponent = categoryData.icon;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(expense.id);
    }, 280);
  };

  return (
    <div 
      className={`group bg-white/60 dark:bg-[#1E1E1E] backdrop-blur-md dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-xl p-4 flex items-center justify-between hover:bg-white/80 dark:hover:bg-[#1E1E1E] hover:border-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-glass dark:hover:shadow-none dark:shadow-none transition-all duration-300 animate-in ${
        isDeleting ? 'opacity-0 scale-95' : ''
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Category Icon Badge */}
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${categoryData.color}15`, color: categoryData.color }}
        >
          <IconComponent size={18} strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900 dark:text-white text-[15px]">{expense.name}</span>
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-semibold px-2 py-0.5 rounded-md whitespace-nowrap"
              style={{ 
                color: categoryData.color, 
                backgroundColor: `${categoryData.color}18`
              }}
            >
              {categoryData.label}
            </span>
            <span className="text-gray-400 dark:text-[#666] text-xs whitespace-nowrap">
              {new Date(expense.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          {targetCurrency !== "USD" && rates?.[targetCurrency] ? (
            <>
              <span className="font-mono text-[17px] text-gray-900 dark:text-white font-bold tabular-nums leading-tight">
                {targetCurrency === 'JPY' ? '¥' : targetCurrency === 'EUR' ? '€' : targetCurrency === 'GBP' ? '£' : targetCurrency === 'INR' ? '₹' : targetCurrency === 'AUD' ? 'A$' : targetCurrency === 'CAD' ? 'C$' : targetCurrency === 'SGD' ? 'S$' : ''}{(expense.amount * rates[targetCurrency]).toFixed(2)}
              </span>
              <span className="font-mono text-[11px] text-gray-400 dark:text-[#666] font-medium tabular-nums">
                ${expense.amount.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-mono text-lg text-gray-900 dark:text-white font-semibold tabular-nums">
              ${expense.amount.toFixed(2)}
            </span>
          )}
        </div>
        <button 
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 md:focus:opacity-100 text-gray-300 dark:text-[#555] hover:text-red-500 dark:hover:text-red-400 transition-all p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
          aria-label="Delete expense"
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

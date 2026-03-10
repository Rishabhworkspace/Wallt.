import { useState, useMemo } from 'react';
import ExpenseCard from './ExpenseCard';
import { CreditCard } from 'lucide-react';

export default function ExpenseList({ expenses, onDelete, targetCurrency, rates }) {
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount'

  const sorted = useMemo(() => {
    if (sortBy === 'amount') {
      return [...expenses].sort((a, b) => b.amount - a.amount);
    }
    return expenses; // Already newest-first from hook
  }, [expenses, sortBy]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          Recent Expenses
          <span className="bg-[#F3F4F6] dark:bg-[#1E1E1E] text-gray-600 dark:text-[#888] text-xs font-sans px-2.5 py-1 rounded-md font-medium">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
        </h2>
        
        {expenses.length > 0 && (
          <div className="flex items-center gap-1 bg-[#F8F9FA] dark:bg-[#141414] border border-gray-200/80 dark:border-[#2A2A2A] rounded-lg p-1">
            <button 
              onClick={() => setSortBy('date')}
              className={`text-xs px-3 py-1.5 rounded-md transition-all font-medium ${sortBy === 'date' ? 'bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none' : 'text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-transparent'}`}
            >
              Latest
            </button>
            <button 
              onClick={() => setSortBy('amount')}
              className={`text-xs px-3 py-1.5 rounded-md transition-all font-medium ${sortBy === 'amount' ? 'bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none' : 'text-gray-500 dark:text-[#888] hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-transparent'}`}
            >
              Highest
            </button>
          </div>
        )}
      </div>

      {expenses.length === 0 ? (
        <div className="bg-white dark:bg-[#141414] border border-gray-200/60 dark:border-[#2A2A2A] border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3 transition-colors duration-300">
          <div className="w-12 h-12 rounded-xl bg-[#F8F9FA] dark:bg-[#1E1E1E] flex items-center justify-center text-gray-400 dark:text-[#888] mb-2 border border-gray-100 dark:border-transparent">
            <CreditCard size={24} strokeWidth={1.5} />
          </div>
          <p className="text-gray-900 dark:text-[#F5F5F5] font-medium text-lg">No expenses yet</p>
          <p className="text-gray-500 dark:text-[#888] text-sm">Add your first one above to see it here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 pb-4 -mr-2 scroll-smooth">
          {sorted.map(expense => (
            <ExpenseCard 
              key={expense.id} 
              expense={expense} 
              onDelete={onDelete}
              targetCurrency={targetCurrency}
              rates={rates}
            />
          ))}
        </div>
      )}
    </div>
  );
}

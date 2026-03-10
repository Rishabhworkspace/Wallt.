import { useState, useRef } from 'react';
import { CATEGORIES } from '../utils/categories';

export default function ExpenseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  
  const nameInputRef = useRef(null);

  const isValid = name.trim().length > 0 && parseFloat(amount) > 0 && category !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onAdd({ name: name.trim(), amount, category });
    
    setName("");
    setAmount("");
    setCategory("");
    
    nameInputRef.current?.focus();
  };

  return (
    <div className="bg-white/60 dark:bg-[#141414] backdrop-blur-xl dark:backdrop-blur-none border border-white/80 dark:border-[#2A2A2A] rounded-2xl p-5 shadow-glass hover:shadow-glass-hover dark:shadow-none dark:hover:shadow-none transition-all duration-500">
      <h2 className="font-display text-lg font-bold mb-4 text-gray-900 dark:text-white">Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-gray-600 dark:text-[#888] text-sm font-medium">Description</label>
          <input 
            id="name"
            ref={nameInputRef}
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dribbble Subscription"
            className="bg-white/50 backdrop-blur-sm dark:bg-[#0F0F0F] border border-white/60 hover:border-white dark:border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:bg-white/80 focus:ring-4 focus:ring-accent/20 focus:border-accent focus:shadow-sm focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="amount" className="text-gray-600 dark:text-[#888] text-sm font-medium">Amount (USD)</label>
          <input 
            id="amount"
            type="number" 
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="bg-white/50 backdrop-blur-sm dark:bg-[#0F0F0F] border border-white/60 hover:border-white dark:border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white font-mono focus:bg-white/80 focus:ring-4 focus:ring-accent/20 focus:border-accent focus:shadow-sm focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-gray-600 dark:text-[#888] text-sm font-medium">Category</label>
          <select 
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/50 backdrop-blur-sm dark:bg-[#0F0F0F] border border-white/60 hover:border-white dark:border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:bg-white/80 focus:ring-4 focus:ring-accent/20 focus:border-accent focus:shadow-sm focus:outline-none transition-all appearance-none cursor-pointer"
            style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem center', backgroundSize: '1.2em' }}
          >
            <option value="" disabled>Select category...</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={!isValid}
          className="mt-2 bg-accent text-[#0A0A0A] font-bold rounded-xl px-4 py-3 hover:shadow-[0_4px_14px_rgba(133,195,65,0.3)] dark:hover:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

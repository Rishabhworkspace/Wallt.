import { useState, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export function useExpenses() {
  // ① Lazy initializer reads localStorage once on mount
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem("mm-expenses");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // ② Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("mm-expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ③ CRUD
  const addExpense = ({ name, amount, category }) =>
    setExpenses(prev => [{ 
      id: uuid(), 
      name, 
      amount: parseFloat(amount),
      category, 
      createdAt: Date.now() 
    }, ...prev]);

  const deleteExpense = (id) =>
    setExpenses(prev => prev.filter(e => e.id !== id));

  // ④ Derived state — memoized, never re-computed unless expenses changes
  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const byCategory = useMemo(() =>
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {}), [expenses]);

  return { expenses, addExpense, deleteExpense, total, byCategory };
}

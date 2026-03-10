import { useState, useEffect, useCallback } from 'react';

export function useCurrencyRate(baseCurrency = "USD") {
  const [rates, setRates]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const fetchRates = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}`
      );
      if (!res.ok) throw new Error("API responded with " + res.status);
      const data = await res.json();
      setRates(data.rates);
      setUpdatedAt(new Date());
    } catch (err) {
      setError("Could not fetch live rates.");
      // Important: do NOT clear previous rates — show stale data if available
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  return { rates, loading, error, updatedAt, retry: fetchRates };
}

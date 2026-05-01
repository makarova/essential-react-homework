import { useCallback, useEffect, useState } from 'react';
import type { Lottery } from '../types';
import { fetchLotteries } from '../services';

export const useFetchLotteries = () => {
  const [lotteries, setLotteries] = useState<Array<Lottery>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLotteries = useCallback(async () => {
    try {
      const lotteries = await fetchLotteries();
      setLotteries(lotteries);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLotteries();
  }, [loadLotteries]);

  return {
    lotteries: lotteries,
    isLoading,
    loadLotteries,
  };
};

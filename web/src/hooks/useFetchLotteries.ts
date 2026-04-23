import { useEffect, useState, useCallback } from 'react';
import type { Lottery } from '../types/lottery.ts';
import { fetchLotteries } from '../services';

export const useFetchLotteries = () => {
  const [lotteries, setLotteries] = useState<Array<Lottery>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLotteries = useCallback(async (controller: AbortController) => {
    const { signal } = controller;

    try {
      const lotteries: Array<Lottery> = await fetchLotteries(signal);
      setLotteries(lotteries);
      setIsLoading(false);
    } catch (e) {
      console.log('error: ', e);
      return;
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadLotteries(controller);

    return () => {
      controller.abort();
    };
  }, [loadLotteries]);

  return {
    lotteries: lotteries,
    isLoading,
  };
};

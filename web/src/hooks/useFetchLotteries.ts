import { useEffect, useState } from 'react';
import type { Lottery } from '../types';
import { fetchLotteries } from '../services';

export const useFetchLotteries = () => {
  const [lotteries, setLotteries] = useState<Array<Lottery>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLotteries = () => {
    fetchLotteries()
      .then((lotteries) => {
        setIsLoading(false);
        setLotteries(lotteries);
      })
      .catch((error: Error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadLotteries();
  }, []);

  return {
    lotteries: lotteries,
    isLoading,
    loadLotteries,
  };
};

import { useEffect, useState } from 'react';
import type { Lottery } from '../types/lottery.ts';
import { fetchLotteries } from '../services';

export const useFetchLotteries = () => {
  const [lotteries, setLotteries] = useState<Array<Lottery>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLotteries = () => {
    setIsLoading(true);

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
    // todo fix the es lint warning
    loadLotteries();
  }, []);

  return {
    lotteries: lotteries,
    isLoading,
    loadLotteries,
  };
};

import { useCallback, useEffect, useState } from 'react';
import { getStoredRegisteredLotteryIds } from '../services/asyncStorageService';

export const useRegisteredLotteries = () => {
  const [registeredLotteries, setRegisteredLotteries] = useState<Array<string>>(
    [],
  );

  const fetchRegisteredLotteries = useCallback(async () => {
    try {
      setRegisteredLotteries(await getStoredRegisteredLotteryIds());
    } catch (error) {
      console.error((error as Error).message);
    }
  }, []);

  const isLotteryRegistered = useCallback(
    (lotteryId: string) => {
      return registeredLotteries.includes(lotteryId);
    },
    [registeredLotteries],
  );

  useEffect(() => {
    void fetchRegisteredLotteries();
  }, [fetchRegisteredLotteries]);

  return {
    isLotteryRegistered,
    fetchRegisteredLotteries,
  };
};

import { useState } from 'react';
import { createLottery } from '../services';
import type { Lottery } from '../types';
import { useFetchLotteries } from '../hooks';

export const useCreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lottery, setLottery] = useState<Lottery>();
  const { loadLotteries } = useFetchLotteries();

  const create = (data: Lottery) => {
    setError(undefined);
    setLoading(true);
    return createLottery({
      name: data.name,
      prize: data.prize,
    })
      .then((lottery) => {
        setLottery(lottery);
        loadLotteries();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const resetState = () => {
    setLoading(false);
    setError(null);
    setLottery(null);
  };

  return {
    create,
    lotterySuccess: lottery !== null,
    createInProgress: loading,
    createError: error,
    resetAddLotteryState: resetState,
  };
};

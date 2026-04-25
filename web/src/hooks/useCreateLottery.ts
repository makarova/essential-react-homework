import { useState } from 'react';
import { createLottery } from '../services';
import type { Lottery } from '../types';
import { useFetchLotteries } from '../hooks';

export const useCreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { loadLotteries } = useFetchLotteries();

  const create = (data: Lottery) => {
    setError(undefined);
    setLoading(true);
    return createLottery({
      name: data.name,
      prize: data.prize,
    })
      .then(() => {
        setSuccess(true);
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
    setSuccess(false);
  };

  return {
    create,
    lotterySuccess: success,
    createInProgress: loading,
    createError: error,
    resetAddLotteryState: resetState,
  };
};

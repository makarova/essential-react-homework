import { useState } from 'react';
import { createLottery } from '../services';
import type { Lottery } from '../types';

export const useCreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = (data: Lottery, postCreateCallback: () => void) => {
    setLoading(true);
    return createLottery({
      name: data.name,
      prize: data.prize,
    })
      .then(() => setSuccess(true))
      .then(postCreateCallback)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const resetState = () => {
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

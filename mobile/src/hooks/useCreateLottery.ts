import { useState } from 'react';
import { createLottery } from '../services';
import { CreateLotteryPayload } from '../types';

export const useCreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (
    data: CreateLotteryPayload,
    postCreateCallback: () => void,
  ) => {
    setLoading(true);
    try {
      await createLottery({
        name: data.name,
        prize: data.prize,
      });
      setSuccess(true);
      postCreateCallback();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
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

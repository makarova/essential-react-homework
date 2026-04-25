import { useState } from 'react';
import { registerForLottery } from '../services';

export const useRegisterForLotteries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = async (
    userName: string,
    selectedLotteryIds: string[],
    callback: () => void,
  ) => {
    setLoading(true);

    return Promise.all(
      selectedLotteryIds.map((lotteryId: string) =>
        registerForLottery({
          name: userName,
          lotteryId: lotteryId,
        }),
      ),
    )
      .then(() => setSuccess(true))
      .then(callback)
      .catch((e: Error) => {
        setError(e.message);

        throw e;
      })
      .finally(() => setLoading(false));
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    registerForLotteries: register,
    registerSuccess: success,
    registerInProgress: loading,
    registerError: error,
    resetRegisterState: reset,
  };
};

import { useState } from 'react';
import { registerForLottery } from '../services';

interface Register {
  userName: string;
  lotteryId: string;
}

export const useRegisterForLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = async (data: Register) => {
    console.log(data);
    setError(undefined);
    setLoading(true);
    try {
      const lottery = await registerForLottery({
        name: data.userName,
        lotteryId: data.lotteryId,
      });
      console.log('After endpoint success');
      console.log(lottery);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      setSuccess(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    registerForLottery: register,
    registerSuccess: success,
    registerInProgress: loading,
    registerError: error,
    resetRegisterState: reset,
  };
};

import { useEffect, useState } from 'react';
import { Lottery } from '../types';
import { getLotteryById } from '../services';

export function useLotteryDetails(lotteryId: string) {
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchLottery = async (id: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const data = await getLotteryById(id);
      setLoading(false);
      setLottery(data);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    void fetchLottery(lotteryId);
  }, [lotteryId]);

  return {
    data: lottery,
    loading,
    error,
    fetchLottery,
  };
}

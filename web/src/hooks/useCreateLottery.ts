import { useState } from 'react';
import { createLottery } from '../services';
import type { Lottery } from '../types/lottery';

export const useCreateLottery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lottery, setLottery] = useState<Lottery>();

  const create = (data: Lottery) => {
    console.log(data);
    setError(undefined);
    setLoading(true);
    return createLottery({
      name: data.name,
      prize: data.prize,
    })
      .then((lottery) => {
        console.log('After endpoint success');
        console.log(lottery);
        setLoading(false);
        setLottery(lottery);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return { create, lottery, loading, error };
};

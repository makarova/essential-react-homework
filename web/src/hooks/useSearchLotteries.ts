import { type ChangeEvent, useCallback, useState } from 'react';
import type { Lottery } from '../types/lottery.ts';

export const useSearchLotteries = (data: Array<Lottery>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(target.value);
    },
    [],
  );

  const matchingLotteries = data.filter(
    (s) => s.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1,
  );

  return { matchingLotteries, onSearchChange, searchTerm };
};

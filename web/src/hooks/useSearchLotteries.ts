import { useCallback, useMemo, useState } from 'react';
import type { Lottery } from '../types';

export const useSearchLotteries = (data: Array<Lottery>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const matchingLotteries = useMemo(
    () =>
      data.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [data, searchTerm],
  );

  return { matchingLotteries, onSearchChange, searchTerm };
};

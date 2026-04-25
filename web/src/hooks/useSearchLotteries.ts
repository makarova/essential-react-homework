import { useCallback, useState } from 'react';
import type { Lottery } from '../types';

export const useSearchLotteries = (data: Array<Lottery>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  const matchingLotteries = data.filter(
    (s) => s.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1,
  );

  return { matchingLotteries, onSearchChange, searchTerm };
};

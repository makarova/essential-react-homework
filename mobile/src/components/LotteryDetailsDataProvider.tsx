import { ReactElement } from 'react';
import { useLotteryDetails } from '../hooks/useLotteryDetails';
import { Lottery } from '../types';
import { Loader } from './Loader';
import LotteryDetailsError from './LotteryDetailsError';

interface LotteryDetailsDataProviderProps {
  children: (lotteryDetails: Lottery) => ReactElement;
  lotteryId: string;
}

const LotteryDetailsDataProvider = ({
  children,
  lotteryId,
}: LotteryDetailsDataProviderProps) => {
  const { data, loading, error } = useLotteryDetails(lotteryId);

  if (loading) return <Loader />;
  if (error) return <LotteryDetailsError />;
  return data ? children(data) : null;
};

export default LotteryDetailsDataProvider;

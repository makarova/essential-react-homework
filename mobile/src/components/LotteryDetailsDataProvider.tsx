import { ReactElement } from 'react';
import { useLotteryDetails } from '../hooks/useLotteryDetails';
import { Lottery } from '../types';
import { Loader } from './Loader';

interface LotteryDetailsDataProviderProps {
  children: (lotteryDetails: Lottery) => ReactElement;
  lotteryId: string;
}

const LotteryDetailsDataProvider = ({
  children,
  lotteryId,
}: LotteryDetailsDataProviderProps) => {
  const { data, loading } = useLotteryDetails(lotteryId);

  if (loading) return <Loader />;
  return data ? children(data) : null;
};

export default LotteryDetailsDataProvider;

import { useRoute } from '@react-navigation/native';
import LotteryDetailsDataProvider from '../components/LotteryDetailsDataProvider';
import LotteryDetailsView from '../components/LotteryDetailsView';
import { LotteryDetailsRouteProp } from '../types';
import { ErrorBoundary } from '../components/ErrorBoundary';
import LotteryDetailsError from '../components/LotteryDetailsError';

const fallback = <LotteryDetailsError />;

export const LotteryDetailsScreen = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <ErrorBoundary fallback={fallback}>
      <LotteryDetailsDataProvider lotteryId={route.params.id}>
        {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
      </LotteryDetailsDataProvider>
    </ErrorBoundary>
  );
};

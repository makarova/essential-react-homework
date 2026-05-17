import { useRoute } from '@react-navigation/native';
import LotteryDetailsDataProvider from '../components/LotteryDetailsDataProvider';
import LotteryDetailsView from '../components/LotteryDetailsView';
import { LotteryDetailsRouteProp } from '../types';

export const LotteryDetailsScreen = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <LotteryDetailsDataProvider lotteryId={route.params.id}>
      {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
    </LotteryDetailsDataProvider>
  );
};

import { useNavigation } from '@react-navigation/native';
import AddLotteryForm from '../components/AddLotteryForm';
import { useCreateLottery } from '../hooks/useCreateLottery';
import { Lottery } from '../types';

export default function AddLotteryScreen() {
  const {
    create,
    createInProgress,
    // createError,
    // lotterySuccess,
    resetAddLotteryState,
  } = useCreateLottery();

  const handleCreateLottery = (data: Lottery) => {
    return create(data, resetAddLotteryState);
  };

  const navigation = useNavigation();
  return (
    <AddLotteryForm
      loading={createInProgress}
      onClose={navigation.goBack}
      createLottery={handleCreateLottery}
    />
  );
}

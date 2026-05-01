import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import AddLotteryForm from '../components/AddLotteryForm';
import { useCreateLottery } from '../hooks/useCreateLottery';
import { CreateLotteryPayload } from '../types';

export default function AddLotteryScreen() {
  const {
    create,
    createInProgress,
    createError,
    lotterySuccess,
    resetAddLotteryState,
  } = useCreateLottery();

  const toast = useToast();

  const handleCreateLottery = (data: CreateLotteryPayload): Promise<void> => {
    return create(data, () => {
      resetAddLotteryState();
      const toastMessage = lotterySuccess
        ? 'New lottery added successfully!'
        : createError;
      toast.show(toastMessage);
    });
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

import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import AddLotteryForm from '../components/AddLotteryForm';
import { useCreateLottery } from '../hooks/useCreateLottery';
import { CreateLotteryPayload } from '../types';
import { colors } from '../colors';

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
    <SafeAreaView style={styles.container}>
      <AddLotteryForm
        loading={createInProgress}
        onClose={navigation.goBack}
        createLottery={handleCreateLottery}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
});

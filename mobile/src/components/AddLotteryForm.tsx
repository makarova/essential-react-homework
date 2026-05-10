import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { CreateLotteryPayload, Lottery } from '../types';
import { colors } from '../colors';

interface AddLotteryFormProps {
  onClose: () => void;
  createLottery: (data: CreateLotteryPayload) => Promise<void>;
  error?: string;
  lottery?: Lottery;
  loading: boolean;
}

type LotteryInputs = {
  lotteryName: string;
  lotteryPrize: string;
};

function AddLotteryForm({
  loading,
  createLottery,
  onClose,
}: AddLotteryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LotteryInputs>();

  const backgroundColor = isValid ? colors.primary : colors.grey;
  const onSubmitHandler: SubmitHandler<LotteryInputs> = async (data) => {
    if (!isValid) {
      return;
    }
    await createLottery({
      name: data.lotteryName,
      prize: data.lotteryPrize,
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new lottery</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={onClose}
        style={styles.closeButton}
      >
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      <Controller
        control={control}
        name="lotteryName"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            accessibilityLabel="Text input field"
            placeholder="Lottery name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lotteryName && (
        <Text style={styles.error}>This field is required</Text>
      )}

      <Controller
        control={control}
        name="lotteryPrize"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            accessibilityLabel="Text input field"
            placeholder="Lottery prize"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lotteryPrize && (
        <Text style={styles.error}>This field is required</Text>
      )}

      <Pressable
        accessibilityRole="button"
        style={[styles.button, { backgroundColor }]}
        onPress={handleSubmit(onSubmitHandler)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Add</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: colors.primary,
  },
  input: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    fontSize: 16,
  },
  error: {
    fontSize: 10,
    color: colors.danger,
    paddingTop: 8,
  },
  button: {
    marginTop: 32,
    width: 64,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddLotteryForm;

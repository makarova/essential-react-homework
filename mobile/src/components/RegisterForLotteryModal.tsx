import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useRegisterForLotteries } from '../hooks/useRegisterForLotteries';
import { colors } from '../colors';
import { RootStackParamList } from '../types';

type RegisterForLotteryInputs = {
  userName: string;
};

const RegisterForLotteryModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForLotteryInputs>();

  const {
    registerForLotteries,
    // registerSuccess,
    // registerError,
    // resetRegisterState,
    // registerInProgress,
  } = useRegisterForLotteries();

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterForLottery'>>();
  const { selectedLotteryIds } = route.params;

  const onSubmitHandler: SubmitHandler<RegisterForLotteryInputs> = async (
    data,
  ) => {
    await registerForLotteries(data.userName, selectedLotteryIds, () => {});
    navigation.goBack();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Register for lotteries</Text>
            <Controller
              control={control}
              name="userName"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  accessibilityLabel="Text input field"
                  placeholder="User name"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.userName && (
              <Text style={styles.error}>This field is required</Text>
            )}
            <Pressable
              accessibilityRole="button"
              style={[
                styles.button,
                styles.buttonClose,
                !isValid && { backgroundColor: colors.grey },
              ]}
              onPress={handleSubmit(onSubmitHandler)}
            >
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.buttonPrimary,
  },
  textStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    marginTop: 16,
    marginBottom: 16,
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
});

export default RegisterForLotteryModal;

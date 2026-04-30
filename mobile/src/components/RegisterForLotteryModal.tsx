import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useRegisterForLotteries } from '../hooks/useRegisterForLotteries';
import { colors } from '../colors';

type RegisterForLotteryInputs = {
  userName: string;
};

const RegisterForLotteryModal = ({ selectedLotteryIds }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForLotteryInputs>();

  const {
    registerForLotteries,
    registerSuccess,
    registerError,
    resetRegisterState,
    registerInProgress,
  } = useRegisterForLotteries();

  const navigation = useNavigation();

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
            <Text style={styles.modalText}>Register for lotteries</Text>

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
              <Text style={styles.textStyle}>Register</Text>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});

export default RegisterForLotteryModal;

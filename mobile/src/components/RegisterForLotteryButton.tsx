import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { colors } from '../colors';

interface Props {
  onPress: () => void;
  isDisabled: boolean;
}

export default function RegisterForLotteryButton({
  onPress,
  isDisabled,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.container, isDisabled && { backgroundColor: colors.grey }]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 100,
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.buttonSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    color: colors.buttonSecondary,
    fontSize: 16,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

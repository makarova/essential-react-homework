import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Lottery } from '../types';
import { colors } from '../colors';

interface LotteryProps {
  lottery: Lottery;
  checkIsSelected: (lotteryId: string) => boolean;
  checkIsRegistered: (lotteryId: string) => boolean;
  updateSelection: (lotteryId: string) => void;
}

function InnerLotteryCard({
  lottery: { id, name, prize, status },
  checkIsSelected,
  checkIsRegistered,
  updateSelection,
}: LotteryProps) {
  const isSelected = checkIsSelected(id);
  const isDisabled = status !== 'running' || checkIsRegistered(id);

  return (
    <Pressable
      key={id}
      accessibilityRole="button"
      onPress={() => updateSelection(id)}
      disabled={isDisabled}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        isDisabled && styles.cardDisabled,
      ]}
    >
      <View style={styles.cardText}>
        <Text style={styles.title}>{name}</Text>
        <Text>{prize}</Text>
        <Text>{id}</Text>
      </View>
      <View style={styles.icon}>
        {status === 'running' && (
          <MaterialIcons name="sync" size={18} color="black" />
        )}
        {status === 'finished' && (
          <MaterialIcons name="done" size={18} color="black" />
        )}
      </View>
    </Pressable>
  );
}

export const LotteryCard = memo(InnerLotteryCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  cardSelected: {
    opacity: 0.7,
    backgroundColor: colors.lightBlue,
  },
  cardDisabled: {
    backgroundColor: colors.grey,
  },
  cardText: {
    padding: 16,
  },
  icon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  title: {
    fontSize: 20,
    flexDirection: 'row',
    marginRight: 16,
    alignItems: 'center',
  },
});

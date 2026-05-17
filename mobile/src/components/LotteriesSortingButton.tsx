import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  LotteryListSortingOptions,
  useLotteriesSortingContext,
} from '../context/LotteriesSortingContext';

const LotteriesSortingButton = () => {
  const { selectedSorting, switchSorting } = useLotteriesSortingContext();

  const iconName =
    selectedSorting === LotteryListSortingOptions.Ascending
      ? 'arrow-up'
      : 'arrow-down';
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.sortingButton}
      onPress={switchSorting}
    >
      <Text style={styles.sortingButtonText}>Prices</Text>
      <AntDesign name={iconName} size={16} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sortingButton: {
    position: 'absolute',
    right: 16,
    top: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortingButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 3,
  },
});

export default LotteriesSortingButton;

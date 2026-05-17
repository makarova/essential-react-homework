import React, { useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Lottery } from '../types';
import { useSearchLotteries } from '../hooks/useSearchLotteries';
import SearchInput from './SearchInput';
import { LotteryCard } from './LotteryCard';

interface LotteriesListProps {
  lotteries: Lottery[];
  isLotterySelected: (lotteryId: string) => boolean;
  isLotteryRegistered: (lotteryId: string) => boolean;
  handleLotterySelected: (lotteryId: string) => void;
}

export const LotteriesList: React.FC<LotteriesListProps> = ({
  lotteries,
  isLotterySelected,
  isLotteryRegistered,
  handleLotterySelected,
}) => {
  const { searchTerm, onSearchChange, matchingLotteries } =
    useSearchLotteries(lotteries);
  const renderItem = useCallback(
    ({ item }: { item: Lottery }) => (
      <LotteryCard
        lottery={item}
        checkIsSelected={isLotterySelected}
        updateSelection={handleLotterySelected}
        checkIsRegistered={isLotteryRegistered}
      />
    ),
    [handleLotterySelected, isLotterySelected, isLotteryRegistered],
  );
  const keyExtractor = useCallback((item: Lottery) => item.id, []);

  const Header = (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <View style={styles.searchContainer}>
        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
      </View>
    </View>
  );

  return (
    <View style={styles.lotteryList}>
      {matchingLotteries.length > 0 ? (
        <FlatList
          data={matchingLotteries}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={Header}
        />
      ) : (
        <Text>No results for search {searchTerm}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lotteryList: {
    flex: 1,
    marginBottom: 100,
    width: '100%',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    marginRight: 16,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
});

import React, { useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AddLotteryButton from '../components/AddLotteryButton';
import { AddLotteryNavigationProp, Lottery } from '../types';
import { colors } from '../colors';
import { useFetchLotteries } from '../hooks/useFetchLotteries';
import SearchInput from '../components/SearchInput';
import { useSearchLotteries } from '../hooks/useSearchLotteries';
import { useSelectLottery } from '../hooks/useSelectLottery';
import { LotteryCard } from '../components/LotteryCard';

const Home = () => {
  const navigation = useNavigation<AddLotteryNavigationProp>();
  const { lotteries, loadLotteries } = useFetchLotteries();
  const { searchTerm, onSearchChange, matchingLotteries } =
    useSearchLotteries(lotteries);
  const { handleLotterySelected, isLotterySelected } = useSelectLottery();

  useFocusEffect(
    useCallback(() => {
      void loadLotteries();
    }, [loadLotteries]),
  );

  const renderItem = useCallback(
    ({ item }: { item: Lottery }) => (
      <LotteryCard
        lottery={item}
        checkIsSelected={isLotterySelected}
        updateSelection={handleLotterySelected}
      />
    ),
    [handleLotterySelected, isLotterySelected],
  );

  const keyExtractor = useCallback((item: Lottery) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <View>
        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
      </View>
      <AddLotteryButton onPress={() => navigation.navigate('AddLottery')} />
      {matchingLotteries.length > 0 ? (
        <FlatList
          data={matchingLotteries}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text>No results for search {searchTerm}</Text>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    paddingTop: 64,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    marginRight: 16,
  },
});

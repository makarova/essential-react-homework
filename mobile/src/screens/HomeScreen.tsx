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
import RegisterForLotteryButton from '../components/RegisterForLotteryButton';
import { useRegisteredLotteries } from '../hooks/useRegisteredLotteries';

const Home = () => {
  const navigation = useNavigation<AddLotteryNavigationProp>();
  const { lotteries, loadLotteries } = useFetchLotteries();
  const { searchTerm, onSearchChange, matchingLotteries } =
    useSearchLotteries(lotteries);
  const {
    handleLotterySelected,
    isLotterySelected,
    selectedLotteryIds,
    resetSelectedLotteries,
  } = useSelectLottery();

  const { isLotteryRegistered, fetchRegisteredLotteries } =
    useRegisteredLotteries();

  // clean up after AddLotteryScreen and Register modal
  useFocusEffect(
    useCallback(() => {
      void loadLotteries();
      void resetSelectedLotteries();
      void fetchRegisteredLotteries();
    }, [loadLotteries, resetSelectedLotteries, fetchRegisteredLotteries]),
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <View style={styles.searchContainer}>
        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
      </View>
      <RegisterForLotteryButton
        onPress={() =>
          navigation.navigate('RegisterForLottery', {
            selectedLotteryIds: selectedLotteryIds,
          })
        }
        isDisabled={selectedLotteryIds.length === 0}
      />
      <AddLotteryButton onPress={() => navigation.navigate('AddLottery')} />
      <View style={styles.lotteryList}>
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    marginRight: 16,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  lotteryList: {
    flex: 1,
    marginBottom: 100,
    width: '100%',
    paddingHorizontal: 16,
  },
});

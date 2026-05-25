import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Lottery, LotteryDetailsNavigationProp } from '../types';
import { useSearchLotteries } from '../hooks/useSearchLotteries';
import {
  LotteryListSortingOptions,
  useLotteriesSortingContext,
} from '../context/LotteriesSortingContext';
import SearchInput from './SearchInput';
import { LotteryCard } from './LotteryCard';
import LotteriesSortingButton from './LotteriesSortingButton';

interface LotteriesListProps {
  lotteries: Lottery[];
  isLotterySelected: (lotteryId: string) => boolean;
  isLotteryRegistered: (lotteryId: string) => boolean;
  handleLotterySelected: (lotteryId: string) => void;
}

const extractNumericValue = (prize: string): number => {
  const numericString = prize.replace(/[^\d]/g, '');
  return Number(numericString) || 0;
};

export const LotteriesList: React.FC<LotteriesListProps> = ({
  lotteries,
  isLotterySelected,
  isLotteryRegistered,
  handleLotterySelected,
}) => {
  const { searchTerm, onSearchChange, matchingLotteries } =
    useSearchLotteries(lotteries);

  const { selectedSorting } = useLotteriesSortingContext();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const sortedLotteries = useMemo(
    () =>
      matchingLotteries.sort((a, b) =>
        selectedSorting === LotteryListSortingOptions.Ascending
          ? extractNumericValue(a.prize) - extractNumericValue(b.prize)
          : extractNumericValue(b.prize) - extractNumericValue(a.prize),
      ),
    [matchingLotteries, selectedSorting],
  );

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 150],
      [140, 60],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.3],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollY.value,
      [0, 150],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    return {
      height,
      opacity,
      transform: [{ scale }],
    };
  });

  const navigation = useNavigation<LotteryDetailsNavigationProp>();

  const renderItem = useCallback(
    ({ item }: { item: Lottery }) => (
      <LotteryCard
        lottery={item}
        checkIsSelected={isLotterySelected}
        updateSelection={handleLotterySelected}
        checkIsRegistered={isLotteryRegistered}
        onTitlePress={() =>
          navigation.navigate('LotteryDetails', { id: item.id })
        }
      />
    ),
    [handleLotterySelected, isLotterySelected, isLotteryRegistered, navigation],
  );
  const keyExtractor = useCallback((item: Lottery) => item.id, []);

  const Header = (
    <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <View style={styles.searchContainer}>
        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
        <LotteriesSortingButton />
      </View>
    </Animated.View>
  );

  const NoResults = (
    <Text style={styles.noResults}>No results for search {searchTerm}</Text>
  );

  return (
    <View style={styles.lotteryList}>
      <Animated.FlatList
        data={sortedLotteries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={Header}
        ListEmptyComponent={NoResults}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
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
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 16,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

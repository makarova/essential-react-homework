import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
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

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

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
    <Animated.View style={[styles.header, headerAnimatedStyle]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lotteries</Text>
        <MaterialIcons name="casino" size={36} color="black" />
      </View>
      <View style={styles.searchContainer}>
        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
      </View>
    </Animated.View>
  );

  const NoResults = (
    <Text style={styles.noResults}>No results for search {searchTerm}</Text>
  );

  return (
    <View style={styles.lotteryList}>
      <Animated.FlatList
        data={matchingLotteries}
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
    fontSize: 30,
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

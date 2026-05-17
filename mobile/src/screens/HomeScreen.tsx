import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AddLotteryButton from '../components/AddLotteryButton';
import { AddLotteryNavigationProp } from '../types';
import { colors } from '../colors';
import { useFetchLotteries } from '../hooks/useFetchLotteries';
import { useSelectLottery } from '../hooks/useSelectLottery';
import RegisterForLotteryButton from '../components/RegisterForLotteryButton';
import { useRegisteredLotteries } from '../hooks/useRegisteredLotteries';
import { LotteriesList } from '../components/LotteriesList';

const Home = () => {
  const navigation = useNavigation<AddLotteryNavigationProp>();
  const { lotteries, loadLotteries } = useFetchLotteries();
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

  return (
    <SafeAreaView style={styles.container}>
      <RegisterForLotteryButton
        onPress={() =>
          navigation.navigate('RegisterForLottery', {
            selectedLotteryIds: selectedLotteryIds,
          })
        }
        isDisabled={selectedLotteryIds.length === 0}
      />
      <AddLotteryButton onPress={() => navigation.navigate('AddLottery')} />
      <LotteriesList
        lotteries={lotteries}
        handleLotterySelected={handleLotterySelected}
        isLotterySelected={isLotterySelected}
        isLotteryRegistered={isLotteryRegistered}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
});

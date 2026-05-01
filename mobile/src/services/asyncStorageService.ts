import AsyncStorage from '@react-native-async-storage/async-storage';
const REGISTERED_LOTTERIES_KEY = 'registeredLotteries' as const;

export async function addToStoredRegisteredLotteryIds(
  selectedLotteryIds: string[],
) {
  const registeredBefore: string[] = await getStoredRegisteredLotteryIds();
  const itemsToStore = [...registeredBefore, ...selectedLotteryIds];
  await AsyncStorage.setItem(
    REGISTERED_LOTTERIES_KEY,
    JSON.stringify(itemsToStore),
  );
}

export async function getStoredRegisteredLotteryIds(): Promise<string[]> {
  const storedLotteryString = await AsyncStorage.getItem(
    REGISTERED_LOTTERIES_KEY,
  );
  return storedLotteryString !== null ? JSON.parse(storedLotteryString) : [];
}

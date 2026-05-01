import { useCallback, useState } from 'react';

export const useSelectLottery = () => {
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<Array<string>>(
    [],
  );

  const isLotterySelected = (lotteryId: string): boolean => {
    return selectedLotteryIds.includes(lotteryId);
  };

  const handleLotterySelected = (lotteryId: string): void => {
    if (!isLotterySelected(lotteryId)) {
      setSelectedLotteryIds([...selectedLotteryIds, lotteryId]);
    } else {
      setSelectedLotteryIds(
        selectedLotteryIds.filter((id) => id !== lotteryId),
      );
    }
  };

  const resetSelectedLotteries = useCallback((): void => {
    setSelectedLotteryIds([]);
  }, []);

  return {
    isLotterySelected,
    handleLotterySelected,
    selectedLotteryIds,
    resetSelectedLotteries,
  };
};

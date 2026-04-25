import type { Lottery } from '../types/lottery.ts';
import { Box, Grid } from '@mui/material';
import LotteryCard from './LotteryCard.tsx';

interface Props {
  lotteries: Lottery[];
  checkIsSelected: (lotteryId: string) => boolean;
  handleLotterySelected: (lotteryId: string) => void;
  isLoading: boolean;
  searchTerm: string;
}

export default function LotteryGrid({
  lotteries,
  isLoading,
  checkIsSelected,
  handleLotterySelected,
  searchTerm,
}: Props) {
  if (isLoading) {
    return <Box>Loading lotteries...</Box>;
  }
  if (searchTerm.length > 0 && lotteries.length == 0) {
    return <Box>No search results for {searchTerm}</Box>;
  }
  const lotteryGrid = (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {lotteries.map((lottery: Lottery, index) => (
        <Grid key={index} size={{ xs: 4, sm: 4, md: 4 }}>
          <LotteryCard
            lottery={lottery}
            checkIsSelected={() => checkIsSelected(lottery.id)}
            updateSelection={handleLotterySelected}
          />
        </Grid>
      ))}
    </Grid>
  );

  return lotteries.length > 0 ? (
    lotteryGrid
  ) : (
    <Box>There are no lotteries currently</Box>
  );
}

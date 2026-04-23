import type { Lottery } from '../types/lottery.ts';
import { Grid } from '@mui/material';
import LotteryCard from './LotteryCard.tsx';

interface Props {
  lotteries: Lottery[];
}

export default function LotteryGrid({ lotteries }: Props) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {lotteries.map((lottery: Lottery, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <LotteryCard lottery={lottery} />
        </Grid>
      ))}
    </Grid>
  );
}

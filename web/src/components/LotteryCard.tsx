import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material';
import { Done, Sync } from '@mui/icons-material';
import type { Lottery } from '../types/lottery.ts';

interface LotteryProps {
  lottery: Lottery;
  checkIsSelected: (lotteryId: string) => boolean;
  updateSelection: (lotteryId: string) => void;
}

export default function LotteryCard({
  lottery: { id, name, prize, status },
  checkIsSelected,
  updateSelection,
}: LotteryProps) {
  const isSelected = checkIsSelected(id);
  const isDisabled = status !== 'running';

  const card = (
    <>
      <CardActionArea
        onClick={(e) => updateSelection(e.currentTarget.value)}
        value={id}
        disabled={isDisabled}
        sx={{
          '&.Mui-disabled': {
            backgroundColor: 'action.disabled',
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{prize}</Typography>
          <Typography variant="body2">{id}</Typography>
          <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
            {status === 'running' && <Sync />}
            {status === 'finished' && <Done />}
          </Box>
        </CardContent>
      </CardActionArea>
    </>
  );

  return (
    <Box>
      <Card
        variant="outlined"
        key={id}
        sx={{
          border: isSelected ? '2px solid #1976d2' : undefined,
        }}
      >
        {card}
      </Card>
    </Box>
  );
}

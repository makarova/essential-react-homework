import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import type { Lottery } from '../types/lottery.ts';

interface LotteryProps {
  lottery: Lottery;
  checkIsSelected: (lotteryId: string) => boolean;
  updateSelection: (lotteryId: string) => void;
}

export default function LotteryCard({
  lottery,
  checkIsSelected,
  updateSelection,
}: LotteryProps) {
  const { id, name, prize } = lottery;

  const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelection(e.currentTarget.value);
  };
  const isSelected = checkIsSelected(id);

  const card = (
    <>
      <CardActionArea onClick={handleSelectionChange} value={id}>
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <SyncIcon></SyncIcon>
        </Box>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{prize}</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{}</Typography>
          <Typography variant="body2">{id}</Typography>
        </CardContent>
      </CardActionArea>
    </>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{
          border: isSelected ? '2px solid #1976d2' : undefined,
        }}
      >
        {card}
      </Card>
    </Box>
  );
}

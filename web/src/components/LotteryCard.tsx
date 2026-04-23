import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import type { Lottery } from '../types/lottery.ts';

interface LotteryProps {
  lottery: Lottery;
}

export default function LotteryCard(props: LotteryProps) {
  const { lottery } = props;
  const { id, name, prize } = lottery;
  const card = (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">{prize}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{}</Typography>
        <Typography variant="body2">{id}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <SyncIcon></SyncIcon>
        </Button>
      </CardActions>
    </>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

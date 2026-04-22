import { Fab } from '@mui/material';

interface Props {
  handleClick: () => void;
}

export default function AddLotteryButton({ handleClick }: Props) {
  return (
    <Fab
      color="primary"
      variant="extended"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
      onClick={handleClick}
    >
      Add Lottery
    </Fab>
  );
}

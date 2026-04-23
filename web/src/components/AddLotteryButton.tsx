import { Fab } from '@mui/material';

interface Props {
  handleClick: () => void;
  disabled?: boolean;
}

export default function AddLotteryButton({ handleClick, disabled }: Props) {
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
      disabled={disabled}
    >
      Add Lottery
    </Fab>
  );
}

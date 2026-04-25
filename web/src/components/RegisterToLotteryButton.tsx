import { Fab } from '@mui/material';

interface Props {
  handleClick: () => void;
  disabled?: boolean;
}

export default function RegisterToLotteryButton({
  handleClick,
  disabled,
}: Props) {
  return (
    <Fab
      color="primary"
      variant="extended"
      sx={{ mr: 2 }}
      onClick={handleClick}
      disabled={disabled}
    >
      Register
    </Fab>
  );
}

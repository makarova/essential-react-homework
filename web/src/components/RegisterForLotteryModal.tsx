import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface RegisterForLotteryModalProps {
  open: boolean;
  onClose: () => void;
  registerForLotteries: (userName: string) => Promise<void>;
  error?: string;
  loading: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
type RegisterForLotteryInputs = {
  userName: string;
};

export default function RegisterForLotteryModal({
  open,
  onClose,
  registerForLotteries,
  loading,
}: RegisterForLotteryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForLotteryInputs>();

  const onSubmitHandler: SubmitHandler<RegisterForLotteryInputs> = (data) => {
    registerForLotteries(data.userName).then(() => onClose());
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="register-for-lottery-modal-title"
      aria-describedby="register-for-lottery-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="register-for-lottery-modal-title"
          variant="h6"
          component="h2"
        >
          Register for a lottery
        </Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            label="Your name"
            variant="standard"
            {...register('userName', { required: true })}
            error={!!errors.userName}
            helperText={errors.userName && 'This field is required'}
            fullWidth
          />
          <Button
            type="submit"
            variant="text"
            loading={loading}
            disabled={loading}
          >
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

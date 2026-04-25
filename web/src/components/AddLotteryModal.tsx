import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import type { Lottery } from '../types';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface AddLotteryModalProps {
  open: boolean;
  onClose: () => void;
  createLottery: (data: { name: string; prize: string }) => Promise<void>;
  error?: string;
  lottery?: Lottery;
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
type LotteryInputs = {
  lotteryName: string;
  lotteryPrize: string;
};

function AddLotteryModal({
  open,
  onClose,
  createLottery,
  loading,
}: AddLotteryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LotteryInputs>();

  const onSubmitHandler: SubmitHandler<LotteryInputs> = (data) => {
    createLottery({
      name: data.lotteryName,
      prize: data.lotteryPrize,
    }).then(() => onClose());
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-lottery-modal-title"
      aria-describedby="add-lottery-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-lottery-modal-title" variant="h6" component="h2">
          Add a new lottery
        </Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            label="Lottery name"
            variant="standard"
            {...register('lotteryName', { required: true })}
            error={!!errors.lotteryName}
            helperText={errors.lotteryName && 'This field is required'}
            fullWidth
          />
          <TextField
            label="Lottery prize"
            variant="standard"
            {...register('lotteryPrize', { required: true })}
            error={!!errors.lotteryPrize}
            helperText={errors.lotteryPrize && 'This field is required'}
            fullWidth
          />
          <Button
            type="submit"
            variant="text"
            loading={loading}
            disabled={loading}
            sx={!isValid && { color: 'grey' }}
          >
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddLotteryModal;

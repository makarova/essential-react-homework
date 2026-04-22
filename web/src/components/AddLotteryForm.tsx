import { Button, TextField } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';

type LotteryInputs = {
  lotteryName: string;
  lotteryPrize: string;
};

interface AddLotteryFormProps {
  onSubmit: (data: LotteryInputs) => void;
}

function AddLotteryForm({ onSubmit }: AddLotteryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LotteryInputs>();

  const onSubmitHandler: SubmitHandler<LotteryInputs> = (data) => {
    onSubmit(data);
  };

  return (
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
      <Button type="submit" variant="text">
        Add
      </Button>
    </form>
  );
}

export default AddLotteryForm;

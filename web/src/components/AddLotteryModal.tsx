import { Box, Modal, Typography } from '@mui/material';
import AddLotteryForm from './AddLotteryForm';

interface AddLotteryModalProps {
  open: boolean;
  onClose: () => void;
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

function AddLotteryModal({ open, onClose }: AddLotteryModalProps) {
  const handleFormSubmit = (data: {
    lotteryName: string;
    lotteryPrize: string;
  }) => {
    console.log('Lottery data:', data);
    onClose();
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
        <AddLotteryForm onSubmit={handleFormSubmit} />
      </Box>
    </Modal>
  );
}

export default AddLotteryModal;

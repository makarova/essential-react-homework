import './App.css';
import { useState } from 'react';
import { AddLotteryButton, AddLotteryModal } from './components';
import { Snackbar } from '@mui/material';
import { useCreateLottery } from './hooks';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const { create, loading, error, lottery } = useCreateLottery();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <div></div>
      <AddLotteryButton handleClick={handleOpen} disabled={loading} />
      <AddLotteryModal
        open={modalOpen}
        onClose={handleClose}
        createLottery={create}
        error={error}
        loading={loading}
      />
      <Snackbar
        open={lottery !== undefined && !modalOpen}
        autoHideDuration={5}
        message={error === undefined ? 'Lottery created' : error}
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </>
  );
}

export default App;

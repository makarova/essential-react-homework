import './App.css';
import { useState } from 'react';
import { AddLotteryButton, AddLotteryModal, LotteryGrid } from './components';
import { Snackbar, Typography } from '@mui/material';
import { useCreateLottery } from './hooks';
import { useFetchLotteries } from './hooks/useFetchLotteries.ts';
import { Casino } from '@mui/icons-material';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const { create, createInProgress, createError, lottery } = useCreateLottery();
  const { lotteries, isLoading } = useFetchLotteries();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Typography variant="h3" component="div">
        Lotteries
        <Casino fontSize="large" />
      </Typography>
      {isLoading ? (
        <div>Loading lotteries...</div>
      ) : (
        <LotteryGrid lotteries={lotteries} />
      )}
      <AddLotteryButton handleClick={handleOpen} disabled={createInProgress} />
      <AddLotteryModal
        open={modalOpen}
        onClose={handleClose}
        createLottery={create}
        error={createError}
        loading={createInProgress}
      />
      <Snackbar
        open={lottery !== undefined && !modalOpen}
        autoHideDuration={5}
        message={createError === undefined ? 'Lottery created' : createError}
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </>
  );
}

export default App;

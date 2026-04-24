import './App.css';
import { useState } from 'react';
import { AddLotteryButton, AddLotteryModal, LotteryGrid } from './components';
import { Snackbar, Typography } from '@mui/material';
import { useCreateLottery } from './hooks';
import { useFetchLotteries } from './hooks/useFetchLotteries.ts';
import { Casino } from '@mui/icons-material';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<Array<string>>(
    [],
  );
  const { create, createInProgress, createError, lottery } = useCreateLottery();
  const { lotteries, isLoading, loadLotteries } = useFetchLotteries();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const checkIsLotterySelected = (lotteryId: string): boolean => {
    return selectedLotteryIds.includes(lotteryId);
  };

  const handleLotterySelected = (lotteryId: string): void => {
    if (!checkIsLotterySelected(lotteryId)) {
      setSelectedLotteryIds([...selectedLotteryIds, lotteryId]);
    } else {
      setSelectedLotteryIds(
        selectedLotteryIds.filter((id) => id !== lotteryId),
      );
    }
    console.log(selectedLotteryIds);
  };

  return (
    <>
      <Typography variant="h3" component="div">
        Lotteries
        <Casino fontSize="large" />
      </Typography>
      {isLoading ? (
        <div>Loading lotteries...</div>
      ) : (
        <LotteryGrid
          lotteries={lotteries}
          checkIsSelected={checkIsLotterySelected}
          handleLotterySelected={handleLotterySelected}
        />
      )}
      <AddLotteryButton handleClick={handleOpen} disabled={createInProgress} />
      <AddLotteryModal
        open={modalOpen}
        onClose={handleClose}
        createLottery={create}
        error={createError}
        loading={createInProgress}
        createLotteryCallback={loadLotteries}
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

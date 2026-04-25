import './App.css';
import { useState } from 'react';
import {
  AddLotteryButton,
  AddLotteryModal,
  LotteryGrid,
  RegisterForLotteryButton,
  RegisterForLotteryModal,
} from './components';
import { Box, Snackbar, TextField, Typography } from '@mui/material';
import {
  useCreateLottery,
  useFetchLotteries,
  useRegisterForLotteries,
} from './hooks';
import { Casino } from '@mui/icons-material';
import { useSearchLotteries } from './hooks/useSearchLotteries.ts';
import { useSelectLottery } from './hooks/useSelectLottery.ts';

function App() {
  const [addLotteryModalOpen, setAddLotteryModalOpen] = useState(false);
  const [registerForLotteryModalOpen, setRegisterForLotteryModalOpen] =
    useState(false);
  const {
    create,
    createInProgress,
    createError,
    lotterySuccess,
    resetAddLotteryState,
  } = useCreateLottery();
  const {
    registerForLotteries,
    registerInProgress,
    registerSuccess,
    registerError,
    resetRegisterState,
  } = useRegisterForLotteries();
  const { lotteries, isLoading, loadLotteries } = useFetchLotteries();
  const { matchingLotteries, onSearchChange, searchTerm } =
    useSearchLotteries(lotteries);
  const { isLotterySelected, handleLotterySelected, selectedLotteryIds } =
    useSelectLottery();

  return (
    <>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Box sx={{ pb: 15, height: '80%', overflowY: 'auto' }}>
          <Typography variant="h3" component="div">
            Lotteries
            <Casino fontSize="large" />
          </Typography>
          <TextField
            id="outlined-basic"
            label="Search lotteries"
            variant="outlined"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <LotteryGrid
            lotteries={matchingLotteries}
            isLoading={isLoading}
            checkIsSelected={isLotterySelected}
            handleLotterySelected={handleLotterySelected}
          />
          <AddLotteryModal
            open={addLotteryModalOpen}
            onClose={() => setAddLotteryModalOpen(false)}
            createLottery={create}
            error={createError}
            loading={createInProgress}
            createLotteryCallback={loadLotteries}
          />
          <RegisterForLotteryModal
            open={registerForLotteryModalOpen}
            onClose={() => setRegisterForLotteryModalOpen(false)}
            registerForLotteries={registerForLotteries}
            error={createError}
            loading={createInProgress}
          />
          <Snackbar
            open={lotterySuccess && !addLotteryModalOpen}
            autoHideDuration={3000}
            onClose={resetAddLotteryState}
            message={
              createError === undefined ? 'Lottery created' : createError
            }
          />
          <Snackbar
            open={registerSuccess && !registerForLotteryModalOpen}
            autoHideDuration={3000}
            onClose={resetRegisterState}
            message={
              registerError === undefined
                ? 'Registered to lotteries'
                : registerError
            }
          />
        </Box>
        <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
          <RegisterForLotteryButton
            handleClick={() => setRegisterForLotteryModalOpen(true)}
            disabled={selectedLotteryIds.length === 0 || registerInProgress}
          />
          <AddLotteryButton
            handleClick={() => setAddLotteryModalOpen(true)}
            disabled={createInProgress}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;

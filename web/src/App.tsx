import './App.css';
import { useState } from 'react';
import {
  AddLotteryButton,
  AddLotteryModal,
  LotteryGrid,
  RegisterForLotteryButton,
  RegisterForLotteryModal,
} from './components';
import { Box, Snackbar, Typography } from '@mui/material';
import {
  useCreateLottery,
  useFetchLotteries,
  useRegisterForLottery,
} from './hooks';
import { Casino } from '@mui/icons-material';

function App() {
  const [addLotteryModalOpen, setAddLotteryModalOpen] = useState(false);
  const [registerForLotteryModalOpen, setRegisterForLotteryModalOpen] =
    useState(false);
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<Array<string>>(
    [],
  );
  const {
    create,
    createInProgress,
    createError,
    lotterySuccess,
    resetAddLotteryState,
  } = useCreateLottery();
  const {
    registerForLottery,
    registerInProgress,
    registerSuccess,
    registerError,
    resetRegisterState,
  } = useRegisterForLottery();
  const { lotteries, isLoading, loadLotteries } = useFetchLotteries();

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
  };

  const registerForMultipleLotteries = (userName: string) => {
    console.log('Register for multiple lotteries');
    return Promise.all(
      selectedLotteryIds.map((lotteryId) =>
        registerForLottery({
          lotteryId: lotteryId,
          userName: userName,
        }),
      ),
    ).finally(() => setSelectedLotteryIds([]));
  };

  return (
    <>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Box sx={{ pb: 15, height: '80%', overflowY: 'auto' }}>
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
            registerForLotteries={registerForMultipleLotteries}
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

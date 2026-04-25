import './App.css';
import { useState } from 'react';
import {
  AddLotteryButton,
  AddLotteryModal,
  LotteryGrid,
  RegisterForLotteryButton,
  RegisterForLotteryModal,
  Notification,
  SearchInput,
} from './components';
import { Box, Typography } from '@mui/material';
import {
  useCreateLottery,
  useFetchLotteries,
  useRegisterForLotteries,
  useSearchLotteries,
  useSelectLottery,
} from './hooks';
import { Casino } from '@mui/icons-material';
import { NotificationType } from './types';

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
          <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />
          <LotteryGrid
            searchTerm={searchTerm}
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
          <Notification
            open={lotterySuccess && !addLotteryModalOpen}
            notification={{
              message:
                createError === undefined ? 'Lottery created' : createError,
              type: createError
                ? NotificationType.ERROR
                : NotificationType.SUCCESS,
            }}
            onClose={resetAddLotteryState}
          />
          <Notification
            open={registerSuccess && !registerForLotteryModalOpen}
            notification={{
              message:
                registerError === undefined
                  ? 'Registered to lotteries'
                  : registerError,
              type: registerError
                ? NotificationType.ERROR
                : NotificationType.SUCCESS,
            }}
            onClose={resetRegisterState}
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

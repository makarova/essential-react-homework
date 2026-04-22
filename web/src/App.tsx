import './App.css';
import { useState } from 'react';
import { AddLotteryButton, AddLotteryModal } from './components';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div></div>
      <AddLotteryButton handleClick={handleOpen} />
      <AddLotteryModal open={open} onClose={handleClose} />
    </>
  );
}

export default App;

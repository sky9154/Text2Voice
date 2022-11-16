import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Setting from './Setting';

type Dialog = {
  open: boolean,
  setOpen: (state: boolean) => void
}

const MainDialog: React.FC<Dialog> = ({ open, setOpen }) => {
  const [volume, setVolume] = React.useState(50);
  const [rate, setRate] = React.useState(10);

  const volumeObj: {
    volume: number,
    setVolume: (volume: number) => void
  } = {
    volume,
    setVolume
  }

  const rateObj: {
    rate: number,
    setRate: (pitch: number) => void
  } = {
    rate,
    setRate
  }

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ minWidth: 320 }}>
        <Setting volumeObj={volumeObj} rateObj={rateObj} />
      </DialogContent>
    </Dialog>
  );
}

export default MainDialog;
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const InfoSnackbar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="warning" sx={{ width: "100%" }} elevation={6} variant="filled">
        此功能僅支援電腦不支援行動設備！
      </MuiAlert>
    </Snackbar>
  );
}

export default InfoSnackbar;
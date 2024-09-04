import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ToastComponent({ open, message, handleCloseToast }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseToast}
    >
      <Alert
        onClose={handleCloseToast}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import axiosClient from '../../../configs/axiosClient';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '600px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function UpdateCardModal({ open, cardUpdateObj, toggleCardUpdateModalOpen, toggleRefreshData }) {
  

  const inputUserRef = useRef();
  const [inputUserError, setInputUserError] = useState();
  
  const handleClick = () => {
    const userMail = inputUserRef.current.value;

    if (!userMail) {
      setInputUserError('Insira um e-mail válido');
      return;
    }

    const { cardId } = cardUpdateObj;

    setInputUserError();
    axiosClient.patch(`/api/v1/cards/${cardId}.json`, { card: { email: userMail }})
      .then(res => {
        toggleRefreshData();
        toggleCardUpdateModalOpen();
      })
      .catch((err) => {
        const { data: dataError } = err.response;

        setInputUserError(dataError.user)
      })
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleCardUpdateModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Associar funcionário
        </DialogTitle>
        <IconButton
          aria-label="close"

          onClick={toggleCardUpdateModalOpen}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            inputRef={inputUserRef}
            id="outlined-basic"
            error={!!inputUserError}
            helperText={inputUserError}
            label="E-mail"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '20px' }}
            inputProps={{ "data-testid": "input-employee" }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'start' }}>
          <Button 
            autoFocus 
            onClick={handleClick} 
            variant="contained"
          >
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

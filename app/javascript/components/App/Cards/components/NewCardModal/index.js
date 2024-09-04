import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
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

export default function NewCardModal({ open, toggleCardModalOpen, toggleRefreshData }) {
  
  const inputCardNumberRef = useRef();
  const [inputCardNumberError, setInputCardNumberError] = useState();

  const inputUserRef = useRef();
  const [inputUserError, setInputUserError] = useState();
  
  const handleClick = () => {
    const cardNumber = inputCardNumberRef.current.value;
    
    if (!cardNumber) {
      setInputCardNumberError('Insira um nome válido');
      return;
    }

    const userMail = inputUserRef.current.value;

    if (!userMail) {
      setInputUserError('Insira um nome válido');
      return;
    }


    setInputCardNumberError();
    setInputUserError();
    axiosClient.post(`/api/v1/cards.json`, { card: { last4: cardNumber, email: userMail }})
      .then(res => {
        toggleCardModalOpen();
        toggleRefreshData();
      })
      .catch(err => {
        if (!err.response) throw err;

        const { data: dataError } = err.response;

        setInputCardNumberError(dataError.last4);
        setInputUserError(dataError.user);
      });
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleCardModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cadastrar cartão
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleCardModalOpen}
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
          <Typography gutterBottom>Informe os dados</Typography>
          <TextField
            inputRef={inputCardNumberRef}
            id="outlined-basic"
            error={inputCardNumberError}
            helperText={inputCardNumberError}
            label="Número"
            variant="outlined"
            fullWidth
            type="number"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            inputRef={inputUserRef}
            id="outlined-basic"
            error={inputUserError}
            helperText={inputUserError}
            label="Funcionário"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'start' }}>
          <Button 
            autoFocus 
            onClick={handleClick} 
            variant="contained"
          >
            Cadastrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

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
import axios from 'axios';
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

export default function NewUserModal({ open, toggleUserModalOpen, toggleRefreshData }) {
  
  const inputNameRef = useRef();
  const [inputNameError, setInputNameError] = useState();

  const inputEmailRef = useRef();
  const [inputEmailError, setInputEmailError] = useState();
  
  const handleClick = () => {
    const name = inputNameRef.current.value;
    
    if (!name) {
      setInputNameError('Insira um nome válido');
      return;
    }

    const email = inputEmailRef.current.value;

    if (!email) {
      setInputEmailError('Insira um e-mail válido');
      return;
    }

    axiosClient.post(`/api/v1/users/create_employee.json`, { user: { name, email }})
      .then(res => {
        toggleUserModalOpen();
        toggleRefreshData();
      })
      .catch((err) => {
        const { data: dataError } = err.response;

        if (dataError.name) setInputNameError('Insira um nome válido');
        if (dataError.email) setInputEmailError('Insira um e-mail válido');
      })
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleUserModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cadastrar funcionário
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleUserModalOpen}
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
            inputRef={inputNameRef}
            id="outlined-basic"
            error={inputNameError}
            helperText={inputNameError}
            label="Nome"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            inputRef={inputEmailRef}
            id="outlined-basic"
            error={inputEmailError}
            helperText={inputEmailError}
            label="E-mail"
            variant="outlined"
            fullWidth
            required
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

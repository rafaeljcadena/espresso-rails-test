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

export default function UpdateUserModal({ open, userUpdateObj, toggleUserUpdateModalOpen, toggleRefreshData }) {
  
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

    const { id } = userUpdateObj;

    axiosClient.patch(`/api/v1/users/${id}/update_employee.json`, { user: { name, email }})
      .then(res => {
        toggleRefreshData();
        toggleUserUpdateModalOpen();
      })
      .catch((err) => {
        const { data: dataError } = err.response;

        setInputNameError(dataError.name);
        setInputEmailError(dataError.email);
      })
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleUserUpdateModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Editar informações
        </DialogTitle>
        <IconButton
          aria-label="close"

          onClick={toggleUserUpdateModalOpen}
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
            defaultValue={userUpdateObj?.name}
            inputRef={inputNameRef}
            id="outlined-basic"
            error={!!inputNameError}
            helperText={inputNameError}
            label="Nome"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '20px' }}
            required
            inputProps={{ "data-testid": "input-user-name" }}
          />
          <TextField
            defaultValue={userUpdateObj?.email}
            inputRef={inputEmailRef}
            id="outlined-basic"
            error={!!inputEmailError}
            helperText={inputEmailError}
            label="E-mail"
            variant="outlined"
            fullWidth
            required
            inputProps={{ "data-testid": "input-user-email" }}
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

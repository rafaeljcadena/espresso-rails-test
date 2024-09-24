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

export default function NewCategoryModal({ open, toggleCategoryModalOpen, toggleRefreshData }) {
  
  const inputRef = useRef();
  const [inputError, setInputError] = useState();
  
  const handleClick = () => {
    const value = inputRef.current.value;
    
    if (!value) {
      setInputError('Insira um nome válido');
      return;
    }

    axiosClient.post(`/api/v1/categories.json`, { category: { name: value }})
      .then(res => {
        toggleRefreshData();
        toggleCategoryModalOpen();
      })
      .catch(err => {
        const { data: dataError } = err.response;

        setInputError(dataError.name);
      });
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleCategoryModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cadastrar categoria
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleCategoryModalOpen}
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
          <Typography gutterBottom>Informe o nome da categoria</Typography>
          <TextField
            inputRef={inputRef}
            id="outlined-basic"
            error={!!inputError}
            helperText={inputError}
            label="Nome"
            variant="outlined"
            fullWidth
            inputProps={{ "data-testid": "input-new-category" }}
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

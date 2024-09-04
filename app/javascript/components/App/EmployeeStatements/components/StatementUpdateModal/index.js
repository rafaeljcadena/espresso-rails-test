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
import Autocomplete from '@mui/material/Autocomplete';
import axiosClient from '../../../configs/axiosClient';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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

export default function StatementUpdateModal({ open, statement, categoryList, toggleUpdateModal, toggleRefreshData }) {
  
  const inputFileRef = useRef();
  const [inputFileError, setInputFileError] = useState();

  const selectCategoryRef = useRef();
  const [inputCategoryError, setInputCategoryError] = useState();

  const handleChange = (_event, option) => {
    if (option) {
      selectCategoryRef.current = option.id;
    } else {
      selectCategoryRef.current = '';
    }
  }
  
  const handleClick = () => {
    const file = inputFileRef.current.files[0];
    
    try {
      validateFile(file);
    } catch (error) {
      setInputFileError(error.message);
      return;
    }

    const categoryId = selectCategoryRef.current;

    if (!categoryId) {
      setInputCategoryError('Insira uma categoria válida');
      return;
    }

    let formData = new FormData();
    formData.append('statement[category_id]', categoryId);
    formData.append('statement[file]', file);

    const { id } = statement;

    setInputFileError();
    setInputCategoryError();
    axiosClient.patch(`/api/v1/statements/${id}.json`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      toggleUpdateModal();
      toggleRefreshData();
    })
    .catch(err => {
      if (!err.response) throw err;

      const { data: dataError } = err.response;

      setInputFileError(dataError.file);
      setInputCategoryError(dataError.category);
    });
  }

  const allowedType = ['image/png', 'application/pdf', 'image/jpeg'];
  const maxSize = 11447901;
  const validateFile = (file) => {
    if (!file) throw new Error('arquivo não encontrado');
    console.log({ file })

    const fileType = file.type;
    if (!allowedType.includes(fileType)) throw new Error('tipo de arquivo não permitido');

    const fileSize = file.size;
    if (fileSize > maxSize) throw new Error('limite de tamanho excedido');
  }

  const defaultCategory = categoryList.find((category) => category.label === statement.category)
  if (defaultCategory) selectCategoryRef.current = defaultCategory.id

  return (
    <>
      <BootstrapDialog
        onClose={toggleUpdateModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Editar despesa
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleUpdateModal}
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
          <Typography gutterBottom>Faça o upload do comprovante da despesa (.jpeg, .png ou .pdf)</Typography>
          <TextField
            id="outlined-basic"
            inputRef={inputFileRef}
            error={inputFileError}
            helperText={inputFileError}
            label="Carregar imagem"
            variant="outlined"
            fullWidth
            type="file"
            sx={{ marginBottom: '20px' }}
            InputProps={{
              endAdornment: <UploadFileIcon />,
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Typography gutterBottom>Escolha a categoria da despesa</Typography>
          <Autocomplete
            fullWidth
            options={categoryList}
            defaultValue={defaultCategory}
            renderInput={(params) => (
              <TextField 
                {...params} 
                error={!!inputCategoryError}
                helperText={inputCategoryError}
                label="Categoria" 
              />
            )}
            onChange={handleChange}
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

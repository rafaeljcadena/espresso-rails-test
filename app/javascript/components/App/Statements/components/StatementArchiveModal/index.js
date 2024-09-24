import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axiosClient from '../../../configs/axiosClient';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function StatementArchiveModal({ open, toggleArchiveModalOpen, archiveConfigObj, toggleRefreshData }) {
  
  const handleArchive = () => {
    const { statementId } = archiveConfigObj;

    axiosClient.patch(`/api/v1/statements/${statementId}/archive.json`)
      .then(res => {
        toggleRefreshData();
        toggleArchiveModalOpen();
      });
  }

  return (
    <>
      <BootstrapDialog
        onClose={toggleArchiveModalOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Arquivar despesa
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleArchiveModalOpen}
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
          <Typography gutterBottom>Ao arquivar a despesa ela será movida para a aba “Arquivadas”.</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'start' }}>
          <Button 
            autoFocus 
            onClick={handleArchive} 
            variant="contained"
          >
            Arquivar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

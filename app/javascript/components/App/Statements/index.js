import React from 'react';
import Typography from '@mui/material/Typography';
import StatementTabs from './components/StatementTabs';

export default function Statements() {
  return (
    <>
      <Typography 
        sx={{ marginBottom: 2 }} 
        variant="h5"
        data-testid="admin-statements"
      >
        Despesas
      </Typography>
      <StatementTabs />
    </>
  );
}
import React from 'react';
import Typography from '@mui/material/Typography';
import StatementTabs from './components/StatementTabs';

export default function EmployeeStatements() {
  return (
    <>
      <Typography 
        sx={{ marginBottom: 2 }} 
        variant="h5"
        data-testid="employee-statements"
      >
        Despesas
      </Typography>
      <StatementTabs />
    </>
  );
}
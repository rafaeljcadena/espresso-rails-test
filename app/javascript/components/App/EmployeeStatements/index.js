import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import StatementsTable from '../EmployeeStatements/components/StatementsTable';
import StatementUpdateModal from './components/StatementUpdateModal';
import axiosClient from '../configs/axiosClient';
import StatementTabs from './components/StatementTabs';

export default function EmployeeStatements() {
  const [refreshData, setRefreshData] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [statement, setStatement] = useState({});

  const [categoryList, setCategoryList] = useState([]);

  const prepareUpdateModal = (statementId) => {
    setStatement({ id: statementId });
    toggleUpdateModal();
  };

  const toggleUpdateModal = () => {
    setUpdateModalOpen(prev => !prev);
  };

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  };

  useEffect(() => {
    axiosClient.get('/api/v1/categories.json')
      .then((res) => {
        const categoryOptions = res.data.map((category) => {
          return { label: category.name, id: category.id };
        })

        setCategoryList(categoryOptions);
      })
  }, []);

  return (
    <>
      <Typography sx={{ marginBottom: 2 }} variant="h5">Despesas</Typography>
      <StatementTabs />
    </>
  );
}
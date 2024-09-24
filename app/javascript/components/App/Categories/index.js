import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import CategoriesLine from './components/CategoriesLine';
import NewCategoryModal from './components/NewCategoryModal';

export default function Categories() {

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const toggleCategoryModalOpen = () => {
    setCategoryModalOpen(prev => !prev);
  }

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  }

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">Categorias</Typography>
        <Button 
          variant="contained" 
          onClick={toggleCategoryModalOpen}
        >
          Cadastrar categoria +
        </Button>
      </Container>
      <Container>
        <CategoriesLine
          refreshData={refreshData}
        />
      </Container>
      <NewCategoryModal
        open={categoryModalOpen}
        toggleRefreshData={toggleRefreshData}
        toggleCategoryModalOpen={toggleCategoryModalOpen}
      />
    </>
  );
}
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import { Button, Container } from '@mui/material';
import CategoriesLine from './components/CategoriesLine';
import NewCategoryModal from './components/NewCategoryModal';

const drawerWidth = 240;
const listMenuItem = [
  { label: 'Despesas', icon: <ReceiptIcon /> },
  { label: 'Funcionários', icon: <PersonIcon /> },
  { label: 'Cartões', icon: <CreditCardIcon /> },
  { label: 'Categorias', icon: <CategorySharpIcon /> },
]

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
        <Button variant="contained" onClick={toggleCategoryModalOpen}>Cadastrar categoria +</Button>
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
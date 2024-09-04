import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import UsersLine from './components/UsersLine';
import NewUserModal from './components/NewUserModal';
import UpdateUserModal from './components/UpdateUserModal';

export default function Users() {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [userUpdateObj, setUserUpdateObj] = useState({});

  const [refreshData, setRefreshData] = useState(false);

  const toggleUserModalOpen = () => {
    setUserModalOpen(prev => !prev);
  }

  const toggleUserUpdateModalOpen = () => {
    setUserUpdateModalOpen(prev => !prev);
  }

  const prepateUpdateUserModal = (user) => {
    setUserUpdateObj({ ...user });
    toggleUserUpdateModalOpen();
  }

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  }

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">Funcionários</Typography>
        <Button variant="contained" onClick={toggleUserModalOpen}>Cadastrar funcionário +</Button>
      </Container>
      <Container>
        <UsersLine
          refreshData={refreshData}
          prepateUpdateUserModal={prepateUpdateUserModal}
        />
      </Container>
      <NewUserModal
        open={userModalOpen}
        toggleRefreshData={toggleRefreshData}
        toggleUserModalOpen={toggleUserModalOpen}
      />
      <UpdateUserModal
        open={userUpdateModalOpen}
        userUpdateObj={userUpdateObj}
        toggleRefreshData={toggleRefreshData}
        toggleUserUpdateModalOpen={toggleUserUpdateModalOpen}
      />
    </>
  );
}
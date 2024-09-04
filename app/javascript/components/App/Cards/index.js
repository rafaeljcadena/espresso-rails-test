import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import CardsLine from './components/CardsLine';
import NewCardModal from './components/NewCardModal';
import UpdateCardModal from './components/UpdateCardModal';

export default function Cards() {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardUpdateModalOpen, setCardUpdateModalOpen] = useState(false);
  const [cardUpdateObj, setCardUpdateObj] = useState({});

  const [refreshData, setRefreshData] = useState(false);

  const toggleCardModalOpen = () => {
    setCardModalOpen(prev => !prev);
  }

  const toggleCardUpdateModalOpen = () => {
    setCardUpdateModalOpen(prev => !prev);
  }

  const prepateUpdateCardModal = (cardId) => {
    setCardUpdateObj({ cardId });
    toggleCardUpdateModalOpen();
  }

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  }

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">Cartões</Typography>
        <Button variant="contained" onClick={toggleCardModalOpen}>Cadastrar cartão +</Button>
      </Container>
      <Container>
        <CardsLine
          refreshData={refreshData}
          prepateUpdateCardModal={prepateUpdateCardModal}
        />
      </Container>
      <NewCardModal
        open={cardModalOpen}
        toggleRefreshData={toggleRefreshData}
        toggleCardModalOpen={toggleCardModalOpen}
      />
      <UpdateCardModal
        open={cardUpdateModalOpen}
        cardUpdateObj={cardUpdateObj}
        toggleRefreshData={toggleRefreshData}
        toggleCardUpdateModalOpen={toggleCardUpdateModalOpen}
      />
    </>
  );
}
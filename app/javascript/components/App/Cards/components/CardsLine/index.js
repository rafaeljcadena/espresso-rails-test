import { Box, Divider, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EditIcon from '@mui/icons-material/Edit';
import axiosClient from '../../../configs/axiosClient';

export default function CardsLine({ refreshData, prepateUpdateCardModal }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/v1/cards.json')
      .then(res => {
        setCards(res.data);
      })
      .catch(err => {});

      return () => ({});
  }, [refreshData]);

  if (!cards) return <Typography>Carregando...</Typography>
  
  if (cards.length === 0) {
    return (
      <>
        <Typography sx={{ marginTop: '30px' }}>Até o momento, não há cartões cadastrados.</Typography>
        <Divider sx={{ margin: '10px 0px' }} />
      </>
    )
  }

  return (
    <Box sx={{ marginTop: '30px' }}>
      {cards.map((card) => {
        return (
          <>
            <Box key={card.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ background: '#BDBDBD', padding: 1, borderRadius: '50%', width: 40, height: 40, marginRight: '10px' }}>
                <CreditCardIcon sx={{ fill: 'white' }} />
              </Box>
              <Box>
                <Typography>{card.user_name}</Typography>
                <Typography sx={{ fontSize: '.8rem', color: '#00000099' }}>{`**** **** **** ${card.last4}`}</Typography>
              </Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ marginLeft: 'auto' }}
                onClick={() => prepateUpdateCardModal(card.id)}
              >
                Editar
              </Button>
            </Box>
            <Divider sx={{ margin: '10px 0px'}} />
          </>
        );
      })}
    </Box>
  );
}

import { Box, Divider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import axiosClient from '../../../configs/axiosClient';

export default function CategoriesLine({ refreshData }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/v1/categories.json')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {});
  }, [refreshData]);

  if (!categories) return <Typography>Carregando...</Typography>
  
  if (categories.length === 0) {
    return (
      <>
        <Typography>Até o momento, não há categorias cadastradas.</Typography>
        <Divider sx={{ margin: '10px 0px' }} />
      </>
    )
  }

  return (
    <Box sx={{ marginTop: '30px' }}>
      {categories.map((category) => {
        return (
          <>
            <Box key={category.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ background: '#BDBDBD', padding: 1, borderRadius: '50%', width: 40, height: 40, marginRight: '10px' }}>
                <CategoryIcon sx={{ fill: 'white' }} />
              </Box>
              <Typography>{category.name}</Typography>
            </Box>
            <Divider sx={{ margin: '10px 0px'}} />
          </>
        );
      })}
    </Box>
  );
}

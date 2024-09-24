import { Box, Divider, Typography, Button } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import axiosClient from '../../../configs/axiosClient';

const stringAvatar = (name) => {
  const splittedName = name.split(' ');
  
  const label = splittedName.map((n) => n[0].toUpperCase());
  label.length = 2;

  return {
    sx: {
      bgcolor: '#BDBDBD',
    },
    children: `${label.join('')}`,
  };
}

export default function UsersLine(props) {
  const { refreshData, prepareUpdateUserModal } = props;
  const [users, setUsers] = useState();

  const handleClick = (user) => {
    prepareUpdateUserModal(user);
  };

  useEffect(() => {
    axiosClient.get('/api/v1/users.json')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {});
  }, [refreshData]);

  if (!users) return <Typography>Carregando...</Typography>
  
  if (users.length === 0) {
    return (
      <>
        <Typography sx={{ marginTop: '30px' }}>Até o momento, não há funcionários cadastrados.</Typography>
        <Divider sx={{ margin: '10px 0px' }} />
      </>
    )
  }



  return (
    <Box sx={{ marginTop: '30px' }}>
      {users.map((user, index) => {
        return (
          <Fragment key={user.id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar {...stringAvatar(user.name)} sx={{ marginRight: '10px' }} />
              <Box>
                <Typography>{user.name}</Typography>
                <Typography
                  fontSize=".8rem"
                  color="#00000099"
                >
                  {user.email}
                </Typography>
              </Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ marginLeft: 'auto' }}
                onClick={() => handleClick(user)}
                data-testid={`update-employee-${index}`}
              >
                Editar
              </Button>
            </Box>
            <Divider sx={{ margin: '10px 0px' }} />
          </Fragment>
        );
      })}
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from './axiosClient';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getProfile } from '../utils/handleAuth';

const drawerWidth = 240;
const listMenuItem = [
  { label: 'Despesas', icon: <ReceiptIcon />, path: '/app/statements' },
  { label: 'Funcionários', icon: <PersonIcon />, path: '/app/users' },
  { label: 'Cartões', icon: <CreditCardIcon />, path: '/app/cards' },
  { label: 'Categorias', icon: <CategorySharpIcon />, path: '/app/categories' },
]

export default function EmployeeLayout(props) {
  const navigate = useNavigate()

  const logout = () => {
    axiosClient.delete('/auth/sign_out')
      .then((res) => {
        clearAuth();
        navigate('/app/sign-in');
      })
  }

  const user = getProfile();

  return (
    <Box sx={{ display: 'flex', ml: 5 }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1500 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={[
                {
                  mr: 2,
                },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Espresso
            </Typography>
          </Toolbar>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingX="24px"
            spacing={2}
          >
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Box sx={{ marginRight: '5px'}}>
              <Typography sx={{ fontSize: '1rem'}}>{user.name}</Typography>
              <Typography sx={{ fontSize: '.8rem'}}>{user.email}</Typography>
            </Box>
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ fill: 'white' }} />
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
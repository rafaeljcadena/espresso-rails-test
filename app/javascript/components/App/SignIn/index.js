import React, { useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo from '../../../assets/images/logo.png';
import { Typography } from "@mui/material";
import axiosClient from '../configs/axiosClient';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const navigate = useNavigate();
  const [credentialsError, setCredentialsError] = useState();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const login = () => {
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;

    setCredentialsError();
    axiosClient.post('/auth/sign_in', { email, password })
      .then(res => {
        window.location.href = '/app/statements';
      })
      .catch(err => {
        const { response } = err;

        const { data: dataError } = response;

        setCredentialsError(dataError.errors);
      })
  }

  return (
    <Box bgcolor="#2196F3" display="flex" justifyContent={'center'} alignItems={"center"} height="100vh">
      <Box>
        <img src={logo} style={{ textAlign: 'center', display: 'block', margin: 'auto', marginBottom: 30 }} />
        <div style={{ background: 'white', maxWidth: 600, padding: 20 }}>
          <Typography
            sx={{ margin: 0, marginBottom: '30px', fontSize: '1.5rem' }}
          >
            Logar no Espresso
          </Typography>
          <Box
            component="form"
            sx={{ maxWidth: 600 }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              fullWidth
              label="Usuário"
              variant="outlined"
              style={{ marginBottom: 20 }}
              inputRef={inputEmailRef}
              error={!!credentialsError}
              helperText={credentialsError}
            />
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              style={{ marginBottom: 20 }}
              inputRef={inputPasswordRef}
              error={!!credentialsError}
              helperText={credentialsError}
            />
            <div>
              <Button
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={login}
              >
                Entrar
              </Button>
              <Button 
                variant="outlined"
                onClick={() => navigate('/app/sign-up')}
              >
                Criar Conta
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </Box>
  )
}
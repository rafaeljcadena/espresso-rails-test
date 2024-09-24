import React, { useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import logo from '../../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import axiosClient from "../configs/axiosClient";
import ToastComponent from "../configs/ToastComponent";

export default function SignUp() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);

  const [inputNameError, setinputNameError] = useState();
  const [inputEmailError, setinputEmailError] = useState();
  const [inputPasswordError, setinputPasswordError] = useState();
  const [inputCompanyNameError, setinputCompanyNameError] = useState();
  const [inputCompanyCnpjError, setinputCompanyCnpjError] = useState();

  const triggerToast = () => {
    setToastOpen(true);
  }

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputCompanyNameRef = useRef();
  const inputCompanyCnpjRef = useRef();

  const createAdmin = () => {
    const name = inputNameRef.current.value;
    const email = inputEmailRef.current.value
    const password = inputPasswordRef.current.value;
    const companyName = inputCompanyNameRef.current.value;
    const companyCnpj = inputCompanyCnpjRef.current.value;

    axiosClient.post('/api/v1/users/create_admin.json', { user: { name, email, password, company_attributes: { name: companyName, cnpj: companyCnpj } } })
      .then((res) => {
        clearInputs();
        triggerToast();
      })
      .catch(err => {
        const { data } = err.response;

        setinputNameError(data.name);
        setinputEmailError(data.email);
        setinputPasswordError(data.password);
        setinputCompanyNameError(data['company.name']);
        setinputCompanyCnpjError(data['company.cnpj']);
      })
  }

  const clearInputs = () => {
    inputNameRef.current.value = '';
    inputEmailRef.current.value = '';
    inputPasswordRef.current.value = '';
    inputCompanyNameRef.current.value = '';
    inputCompanyCnpjRef.current.value = '';
  }

  return (
    <Box bgcolor="#2196F3" display="flex" justifyContent={'center'} alignItems={"center"} height="100vh">
      <Box>
        <img src={logo} style={{ textAlign: 'center', display: 'block', margin: 'auto', marginBottom: 30 }} />
        <div style={{ background: 'white', maxWidth: 600, padding: 20 }}>
          <Typography
            sx={{ margin: 0, marginBottom: '30px', fontSize: '1.5rem' }}
          >
            Criar conta
          </Typography>
          <Typography>
            Informe seus dados pessoais
          </Typography>
          <Box
            component="form"
            sx={{ maxWidth: 600 }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              inputRef={inputNameRef}
              fullWidth 
              required 
              label="Nome" 
              variant="outlined" 
              style={{ marginBottom: 20 }} 
              error={!!inputNameError}
              helperText={inputNameError}
              inputProps={{ "data-testid": "name" }}
            />
            <TextField 
              inputRef={inputEmailRef}
              fullWidth 
              required 
              label="E-mail" 
              variant="outlined" 
              style={{ marginBottom: 20 }} 
              error={!!inputEmailError}
              helperText={inputEmailError}
              inputProps={{ "data-testid": "email" }}
            />
            <TextField 
              inputRef={inputPasswordRef}
              fullWidth 
              required 
              label="Senha" 
              variant="outlined" 
              type="password"
              style={{ marginBottom: 20 }} 
              error={!!inputPasswordError}
              helperText={inputPasswordError}
              inputProps={{ "data-testid": "password" }}
            />
            <TextField 
              inputRef={inputCompanyNameRef}
              fullWidth 
              required 
              label="Nome da empresa" 
              variant="outlined" 
              style={{ marginBottom: 20 }} 
              error={!!inputCompanyNameError}
              helperText={inputCompanyNameError}
              inputProps={{ "data-testid": "password-confirmation" }}
            />
            <TextField 
              inputRef={inputCompanyCnpjRef}
              fullWidth 
              required 
              label="CNPJ" 
              variant="outlined" 
              style={{ marginBottom: 20 }} 
              error={!!inputCompanyCnpjError}
              helperText={inputCompanyCnpjError}
              inputProps={{ "data-testid": "cnpj" }}
            />
            <div>
              <Button 
                variant="contained" 
                style={{ marginRight: 10 }}
                onClick={createAdmin}
              >
                Criar conta
              </Button>
              <Button 
                variant="outlined"
                onClick={() => navigate('/app/sign-in')}
              >
                Fazer login
              </Button>
            </div>
          </Box>
        </div>
      </Box>
      <ToastComponent
        open={toastOpen}
        message="Administrador criado com sucesso"
      />
    </Box>
  )
}
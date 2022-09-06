/* eslint-disable no-restricted-globals */
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, InputLoginBox, LoginBox } from './Login.style';

function Login() {
  const navigate = useNavigate();

  const loginUser = () => {
    const studantsString = localStorage.getItem('studants');
    const allStudants = studantsString && JSON.parse(studantsString);
    const loginStudant = { studantUsername: getValues('username'), studantPassword: getValues('password') };
    const validateLogin = allStudants.includes(JSON.stringify(loginStudant));
    if (getValues('username') === 'prof' || validateLogin) {
      const user = { ...getValues(), isTeacher: getValues('username') === 'prof' };
      localStorage.setItem('user', JSON.stringify(user));
      location.reload();
    }
  };

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();
  return (
    <Container>
      <LoginBox>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Login</h2>
        <InputLoginBox>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => <TextField required type="email" label="Usuário" onChange={onChange} value={value} />}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => <TextField required type="password" label="Senha" onChange={onChange} value={value} />}
          />
          <Button style={{ marginTop: 20 }} onClick={loginUser} color="primary" variant="contained">
            Entrar
          </Button>
        </InputLoginBox>
      </LoginBox>
    </Container>
  );
}
export default Login;

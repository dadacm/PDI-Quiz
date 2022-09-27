/* eslint-disable no-restricted-globals */
import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchService } from '../../services/fetchService/FetchService';
import { Container, InputLoginBox, LoginBox } from './Login.style';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    resetField,
  } = useForm();

  const isValidLogin = () => {
    const studantsString = localStorage.getItem('studants');
    const allStudants = studantsString && JSON.parse(studantsString);
    const loginStudant = { studantUsername: getValues('username'), studantPassword: getValues('password') };
    const validateStudantLogin = allStudants.includes(JSON.stringify(loginStudant));

    return (getValues('username') === 'prof' && getValues('password') === '123') || validateStudantLogin;
  };

  const loginUser = () => {
    if (!getValues('username')) {
      return setError('username', { message: 'Campo obrigatório' });
    }
    if (!getValues('password')) {
      return setError('password', { message: 'Campo obrigatório' });
    }
    if (!isValidLogin()) {
      setError('password', { message: 'Usuário ou senha invalidos' });
      setError('username', { message: 'Usuário ou senha invalidos' });
      return;
    }

    const user = { ...getValues(), isTeacher: getValues('username') === 'prof' };
    fetchService.post({
      setIsLoading,
      url: '/login',
      payload: user,
      onSuccess: res => {
        localStorage.setItem('user', JSON.stringify(user));
        location.reload();
      },
    });
  };

  return (
    <Container>
      <LoginBox>
        <h2 style={{ display: 'flex', justifyContent: 'center', color: '#1a237e ' }}>Login</h2>
        <InputLoginBox>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                helperText={<span style={{ marginBottom: 10 }}>{`${errors.username?.message}`}</span>}
                error={!!errors.username?.message}
                required
                type="email"
                label="Usuário"
                onChange={e => {
                  if (errors.username?.message) {
                    clearErrors('username');
                  }
                  onChange(e);
                }}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                error={!!errors.password?.message}
                helperText={<span>{`${errors.password?.message}`}</span>}
                required
                type="password"
                label="Senha"
                onChange={e => {
                  if (errors.password?.message) {
                    clearErrors('password');
                  }
                  onChange(e);
                }}
                value={value}
              />
            )}
          />
          <Button
            style={{ marginTop: 20 }}
            onClick={loginUser}
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={15} /> : undefined}
            color="primary"
            variant="contained">
            Entrar
          </Button>
        </InputLoginBox>
      </LoginBox>
    </Container>
  );
}
export default Login;

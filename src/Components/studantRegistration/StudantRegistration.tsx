import { Button, CircularProgress, Snackbar, TextField } from '@material-ui/core';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Controller, useForm } from 'react-hook-form';
import { StudantRegistrationForm } from './StudantRegistration.style';
import { fetchService } from '../../services/FetchService';

function StudantRegistration() {
  const [open, setOpen] = React.useState(false);
  const [isRegisteringStudant, setIsRegisteringStudant] = React.useState(false);
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleRegister = () => {
    if (!localStorage.getItem('studants')) {
      fetchService.post({
        url: '/register-studant',
        setIsLoading: setIsRegisteringStudant,
        onSuccess: () => {
          const studantsArray = [JSON.stringify(getValues())];
          localStorage.setItem('studants', JSON.stringify(studantsArray));
          return setOpen(true);
        },
      });
    }
    fetchService.post({
      url: '/register-studant',
      setIsLoading: setIsRegisteringStudant,
      onSuccess: () => {
        const studantsString = localStorage.getItem('studants');
        const allStudants = studantsString && JSON.parse(studantsString);
        const setStudant = allStudants.push(JSON.stringify(getValues()));
        localStorage.removeItem('studants');
        localStorage.setItem('studants', JSON.stringify(allStudants));
        return setOpen(true);
      },
    });
  };

  return (
    <StudantRegistrationForm>
      <h2>Cadastrar novo aluno</h2>
      <div>
        <Controller
          name="studantUsername"
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.studantUsername?.message}
              helperText={<span>{errors.studantUsername?.message ? errors.studantUsername?.message : undefined}</span>}
              value={value}
              onChange={onChange}
              label="Nome"
            />
          )}
        />
      </div>
      <div style={{ margin: '40px 0px' }}>
        <Controller
          name="studantPassword"
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.studantPassword?.message}
              helperText={<span>{errors.studantPassword?.message ? errors.studantPassword?.message : undefined}</span>}
              value={value}
              onChange={onChange}
              size="medium"
              label="senha"
              type="password"
            />
          )}
        />
      </div>
      <Button
        disabled={isRegisteringStudant}
        endIcon={isRegisteringStudant ? <CircularProgress size={15} /> : undefined}
        color="primary"
        onClick={handleSubmit(handleRegister)}
        size="medium"
        variant="contained">
        Finalizar cadastro
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity="success">
          Aluno cadastrado com sucesso
        </Alert>
      </Snackbar>
    </StudantRegistrationForm>
  );
}

export default StudantRegistration;

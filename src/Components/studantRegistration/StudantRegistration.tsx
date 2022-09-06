import { Box, Button, InputLabel, Snackbar, TextField } from '@material-ui/core';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Controller, useForm } from 'react-hook-form';
import { StudantRegistrationForm } from './StudantRegistration.style';

function StudantRegistration() {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleRegister = () => {
    if (!localStorage.getItem('studants')) {
      const studantsArray = [JSON.stringify(getValues())];

      localStorage.setItem('studants', JSON.stringify(studantsArray));
      return setOpen(true);
    }
    const studantsString = localStorage.getItem('studants');
    const allStudants = studantsString && JSON.parse(studantsString);

    const setStudant = allStudants.push(JSON.stringify(getValues()));
    localStorage.removeItem('studants');
    localStorage.setItem('studants', JSON.stringify(allStudants));

    return setOpen(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <StudantRegistrationForm>
        <h2>Cadastrar novo aluno</h2>
        <div style={{ margin: '20px 20px' }}>
          <Controller
            name="studantUsername"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} label="Nome" />}
          />
        </div>
        <div style={{ margin: '40px 20px' }}>
          <Controller
            name="studantPassword"
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} size="medium" label="senha" type="password" />}
          />
        </div>
        <Button color="primary" onClick={handleRegister} size="medium" variant="contained">
          Finalizar cadastro
        </Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert variant="filled" severity="success">
            Aluno cadastrado com sucesso
          </Alert>
        </Snackbar>
      </StudantRegistrationForm>
    </div>
  );
}

export default StudantRegistration;

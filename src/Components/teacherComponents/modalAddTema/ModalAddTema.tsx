import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalAddTemaProps } from './ModalAddTema.types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalAddTema(props: ModalAddTemaProps) {
  const { formMethods, open, handleOpen, handleClose } = props;
  const { control, getValues } = formMethods;

  const handleAddTema = () => {
    if (!localStorage.getItem('temas')) {
      const arrayTemas = [getValues('addTema')];
      localStorage.setItem('temas', JSON.stringify(arrayTemas));
      return handleClose();
    }
    const temasString = localStorage.getItem('temas');
    const arrayTemas = temasString && JSON.parse(temasString);
    arrayTemas.push(getValues('addTema'));
    localStorage.setItem('temas', JSON.stringify(arrayTemas));
    return handleClose();
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 400,
            height: 250,
            boxShadow: '24px',
            padding: '40px',
            backgroundColor: 'whitesmoke',
            border: '2px solid #000',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Box style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
            <h2> Adicionar novo tema</h2>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Controller
              name="addTema"
              control={control}
              render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value} label="Novo tema" />}
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
            <Button style={{ backgroundColor: '#002984', color: 'white' }} variant="contained" onClick={handleAddTema}>
              Adicionar tema
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

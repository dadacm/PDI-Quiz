import { Box, Button, CircularProgress, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fetchService } from '../../../services/fetchService/FetchService';
import ModalAddTema from '../modalAddTema/ModalAddTema';
import { ButtonBox, EnunciadoBox, QuestionForm, radioButonStyle } from './QuestionRegistration.style';

function QuestionRegistration() {
  const [corectAlternative, setCorectAlternative] = React.useState('A');
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const temasString = localStorage.getItem('temas');
  const arrayTemas = temasString ? JSON.parse(temasString) : [];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorectAlternative((event.target as HTMLInputElement).value);
  };

  const {
    control,
    getValues,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const setQuestion = (newQuestion: {}) => {
    if (!localStorage.getItem('questions')) {
      const questionsArray = [newQuestion];
      return localStorage.setItem('questions', JSON.stringify(questionsArray));
    }
    const questionsString = localStorage.getItem('questions');
    const allQuestions = questionsString && JSON.parse(questionsString);
    const setQuestion = allQuestions.push(newQuestion);
    localStorage.removeItem('questions');
    return localStorage.setItem('questions', JSON.stringify(allQuestions));
  };

  const registerQuestion = () => {
    fetchService.post({
      url: '/register-question',
      setIsLoading: setIsLoadingRegister,
      payload: { ...getValues(), corectAlternative },
      onSuccess: () => {
        setQuestion({ ...getValues(), corectAlternative, id: Math.floor(Date.now() * Math.random()).toString(36) });
        setOpenAlert(true);
      },
    });
  };

  return (
    <>
      <Box>
        <h2>Adicionar nova questão</h2>
        <QuestionForm>
          <EnunciadoBox>
            <Controller
              name="questionInput"
              control={control}
              rules={{
                required: 'Campo obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  inputProps={{ id: 'input-enum' }}
                  required
                  error={!!errors.questionInput?.message}
                  helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                  style={{ marginBottom: '48px' }}
                  multiline
                  value={value}
                  onChange={onChange}
                  label={<label htmlFor="input-enum">Digite o enunciado</label>}
                />
              )}
            />
            <InputLabel htmlFor="tema" required>
              Selecione o tema da questão
            </InputLabel>
            <Controller
              name="tema"
              control={control}
              rules={{
                required: 'Campo obrigatório',
              }}
              render={({ field: { onChange, value } }) => (
                <Select
                  data-testid="select-tema"
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                  name="tema"
                  onChange={onChange}
                  error={!!errors.tema?.message}
                  value={value}>
                  {arrayTemas.map((tema: string) => (
                    <MenuItem key={tema} value={tema}>
                      {tema}
                    </MenuItem>
                  ))}
                  <MenuItem key="addButton">
                    <Button color="primary" onClick={handleOpenModal}>
                      Adicionar tema
                    </Button>
                  </MenuItem>
                </Select>
              )}
            />
          </EnunciadoBox>

          <RadioGroup name="correctAlternative" value={corectAlternative} onChange={handleChange}>
            <Box>
              <Box>
                <Controller
                  name="alternativeA"
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ id: 'alternativeA-input' }}
                      required
                      error={!!errors.alternativeA?.message}
                      helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                      value={value}
                      onChange={onChange}
                      label={<label htmlFor="alternativeA-input">Altenativa A</label>}
                    />
                  )}
                />
                <FormControlLabel data-testid="radioB-A" style={radioButonStyle} value="A" control={<Radio />} label="A" />
              </Box>
              <Box>
                <Controller
                  name="alternativeB"
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ id: 'alternativeB-input' }}
                      required
                      error={!!errors.alternativeB?.message}
                      helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                      value={value}
                      onChange={onChange}
                      label={<label htmlFor="alternativeB-input">Altenativa B</label>}
                    />
                  )}
                />
                <FormControlLabel style={radioButonStyle} value="B" control={<Radio />} label="B" />
              </Box>
              <Box>
                <Controller
                  name="alternativeC"
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ id: 'alternativeC-input' }}
                      required
                      error={!!errors.alternativeC?.message}
                      helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                      value={value}
                      onChange={onChange}
                      label={<label htmlFor="alternativeC-input">Altenativa C</label>}
                    />
                  )}
                />
                <FormControlLabel style={radioButonStyle} value="C" control={<Radio />} label="C" />
              </Box>
              <Box>
                <Controller
                  name="alternativeD"
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ id: 'alternativeD-input' }}
                      required
                      error={!!errors.alternativeD?.message}
                      helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                      value={value}
                      onChange={onChange}
                      label={<label htmlFor="alternativeD-input">Altenativa D</label>}
                    />
                  )}
                />
                <FormControlLabel style={radioButonStyle} value="D" control={<Radio />} label="D" />
              </Box>
              <Box>
                <Controller
                  name="alternativeE"
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      inputProps={{ id: 'alternativeE-input' }}
                      required
                      error={!!errors.alternativeE?.message}
                      helperText={errors.questionInput?.message ? <span>{`${errors.questionInput?.message}`}</span> : undefined}
                      value={value}
                      onChange={onChange}
                      label={<label htmlFor="alternativeE-input">Altenativa E</label>}
                    />
                  )}
                />
                <FormControlLabel style={radioButonStyle} value="E" control={<Radio />} label="E" />
              </Box>
            </Box>
          </RadioGroup>
          <ButtonBox>
            <Button
              color="primary"
              disabled={isLoadingRegister}
              endIcon={isLoadingRegister ? <CircularProgress size={15} /> : undefined}
              onClick={handleSubmit(registerQuestion)}
              variant="contained"
              style={{ height: 50 }}>
              Adicionar questão
            </Button>
          </ButtonBox>
        </QuestionForm>
      </Box>
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert variant="filled" severity="success">
          Questão cadastrada com sucesso
        </Alert>
      </Snackbar>
      <ModalAddTema formMethods={{ control, getValues }} open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} />
    </>
  );
}

export default QuestionRegistration;

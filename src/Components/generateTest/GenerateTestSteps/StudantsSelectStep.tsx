import { Button, CircularProgress, Typography, useScrollTrigger } from '@material-ui/core';
import React, { useState } from 'react';
import { fetchService } from '../../../services/fetchService/FetchService';
import { setRandomTest } from '../../../utils/setRandomTest';
import SelectList from '../../temaList/TemaList';
import { StepsContainer } from '../Generatest.style';
import { StudantSelectStepProps } from './StudantSelectStepProps.types';

// import { Container } from './styles'

function StudantsSelectStep(props: StudantSelectStepProps) {
  const {
    handleNext,
    formMethods: {
      getValues,
      reset,
      setError,
      formState: { errors },
    },
    handleBack,
    checkedStudants,
    handleToggleStudants,
    studantNamesarray,
    setCheckedStudants,
  } = props;
  const [isLoadingTestCreation, setIsLoadingTestCreation] = useState(false);
  const createTest = () => {
    if (checkedStudants.length === 0) {
      return setError('quantity', { message: 'Selecione pelo menos um aluno' });
    }
    const newTests: object[] = [];
    for (let index = 0; checkedStudants.length > index; index += 1) {
      newTests.push(setRandomTest(getValues('thisTemaQuestions'), getValues('questionsQuantity'), checkedStudants[index]));
    }
    fetchService.post({
      setIsLoading: setIsLoadingTestCreation,
      url: '/create-test',
      payload: newTests,
      onSuccess: () => {
        localStorage.setItem('tests', JSON.stringify(newTests));
        handleNext();
        reset();
        setCheckedStudants([]);
      },
    });
  };

  return (
    <StepsContainer>
      <SelectList selected={checkedStudants} handleSelect={handleToggleStudants} listArray={studantNamesarray} />
      {errors.quantity?.message && (
        <Typography variant="caption" color="error">
          {`${errors.quantity?.message}`}
        </Typography>
      )}

      <div style={{ marginTop: '20px' }}>
        <Button disabled={isLoadingTestCreation} style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={handleBack}>
          Voltar
        </Button>
        <Button
          disabled={isLoadingTestCreation}
          endIcon={isLoadingTestCreation ? <CircularProgress size={15} /> : undefined}
          variant="contained"
          color="primary"
          onClick={createTest}>
          Criar prova
        </Button>
      </div>
    </StepsContainer>
  );
}

export default StudantsSelectStep;

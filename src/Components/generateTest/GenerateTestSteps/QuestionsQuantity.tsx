import { Button, Input, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StepsContainer } from '../Generatest.style';
import { QuestionsQuantityProps } from './QuestionsQuantityProps.types';

// import { Container } from './styles'

function QuestionsQuantity(props: QuestionsQuantityProps) {
  const questionsString = localStorage.getItem('questions');
  const allQuestions = questionsString && JSON.parse(questionsString);
  const {
    tema,
    formMethods: {
      control,
      setValue,
      trigger,
      setError,
      watch,
      formState: { errors },
    },
    handleBack,
    handleNext,
  } = props;
  const getSelectedTemaQuestions = allQuestions.filter((question: { tema: string }) => question.tema === tema);
  setValue('thisTemaQuestions', getSelectedTemaQuestions);

  return (
    <StepsContainer>
      <InputLabel htmlFor="questionsQuantity">Insira a quantidade de questões</InputLabel>
      <Controller
        control={control}
        name="questionsQuantity"
        rules={{
          required: 'Campo obrigatório',
        }}
        render={({ field: { onChange, value } }) => (
          <Input onChange={onChange} value={value} style={{ width: '100px' }} error={!!errors.questionsQuantity?.message} name="questionsQuantity" />
        )}
      />
      {!errors.questionsQuantity?.message ? (
        <Typography variant="caption">{`Questões cadastradas com o tema escolhido: ${getSelectedTemaQuestions.length} `}</Typography>
      ) : (
        <Typography color="error" variant="caption">{`${errors.questionsQuantity?.message}`}</Typography>
      )}
      <div style={{ marginTop: '20px' }}>
        <Button style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={handleBack}>
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            if (parseInt(watch('questionsQuantity'), 10) > getSelectedTemaQuestions.length) {
              return setError('questionsQuantity', { message: `Você possui apenas ${getSelectedTemaQuestions.length} questões cadastradas com esse tema` });
            }
            if (!(await trigger('questionsQuantity'))) {
              return;
            }
            handleNext();
          }}>
          Próximo
        </Button>
      </div>
    </StepsContainer>
  );
}

export default QuestionsQuantity;

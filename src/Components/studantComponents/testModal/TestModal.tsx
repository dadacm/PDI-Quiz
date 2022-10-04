/* eslint-disable no-restricted-globals */
import { Box, Button, Card, CardContent, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Controller, set, useForm } from 'react-hook-form';
import useCountDown from '../../../services/fetchService/countDown/CountDown';
import { fetchService } from '../../../services/fetchService/FetchService';
import { updateTest } from '../../../utils/updateTest';
import { InputSection, TestModalContainer } from './TestModal.style';
import { Alternatives, QuestionAnswered, TestModalProps } from './TestModal.types';

export default function TestModal(props: TestModalProps) {
  const { formMethods, open, handleOpen, handleClose, questions } = props;

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState<number>(0);
  const [showScore, setShowScore] = React.useState(false);
  const [isFetchingTest, setIsFetchingTest] = React.useState(false);
  const [response, setResponse] = React.useState<string>('');
  const { setValue, getValues } = useForm();
  const { Count, setCount, isCounting } = useCountDown(0.15);
  const handleChangeResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse((event.target as HTMLInputElement).value);
    const questionAnswered = { ...questions.newTest[currentQuestion], answer: (event.target as HTMLInputElement).value };
    setValue(questions.newTest[currentQuestion].id.toString(), questionAnswered);
  };
  const nextQuestion = currentQuestion + 1;
  const alternativesArray = [
    questions.newTest[currentQuestion]?.alternativeA,
    questions.newTest[currentQuestion]?.alternativeB,
    questions.newTest[currentQuestion]?.alternativeC,
    questions.newTest[currentQuestion]?.alternativeD,
    questions.newTest[currentQuestion]?.alternativeE,
  ];
  const correctTest = () => {
    const questionValue = 10 / questions.newTest.length;
    let acertos = 0;
    for (let i = 0; i < questions.newTest.length; i += 1) {
      const answer = getValues(questions.newTest[i].id.toString())?.answer ? getValues(questions.newTest[i].id.toString()).answer : '';
      if (questions.newTest[i].corectAlternative === answer) {
        acertos += 1;
      }
    }
    const nota = parseFloat((acertos * questionValue).toFixed(2));
    setScore(nota);
    return nota;
  };
  const submitTest = () => {
    fetchService.post({
      url: '/send-test',
      setIsLoading: setIsFetchingTest,
      onSuccess: () => {
        updateTest(questions, getValues(), correctTest());
        setShowScore(true);
      },
    });
  };
  useEffect(() => {
    setCount();
  }, []);
  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        if (reason && reason === 'backdropClick') {
          return;
        }
        handleClose();
      }}>
      <TestModalContainer>
        {showScore ? (
          <section className="showScore-section">
            <div>
              <Typography variant="h5">Sua nota foi:</Typography>
            </div>
            <div style={{ display: 'inline-flex', marginTop: '100px' }}>
              <Typography variant="h4" color={score < 5 ? 'secondary' : 'primary'}>
                {score}
              </Typography>
              <Typography variant="h4">/10</Typography>
            </div>
          </section>
        ) : (
          <>
            <section style={{ display: 'flex', marginBottom: '5px', justifyContent: 'space-around' }} className="question-section">
              <h3>
                Questão {currentQuestion + 1}/{questions.newTest.length}
              </h3>
              {isCounting ? <Count /> : <Typography color="secondary">00:00</Typography>}
            </section>
            <InputSection>
              <Typography>{questions.newTest[currentQuestion]?.questionInput}</Typography>
            </InputSection>
            <section>
              {alternativesArray.map((item, index) => (
                <label htmlFor={Alternatives[index]}>
                  <Card style={{ maxHeight: '48px', height: '300px', display: 'flex', alignItems: 'center', margin: '8px 0', paddingTop: '10px' }}>
                    <CardContent>
                      <RadioGroup name="response" value={response} onChange={handleChangeResponse}>
                        <FormControlLabel
                          disabled={!isCounting}
                          htmlFor={Alternatives[index]}
                          value={Alternatives[index]}
                          control={<Radio id={Alternatives[index]} />}
                          label={<div style={{ fontSize: '14px' }}>{item}</div>}
                        />
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </label>
              ))}
            </section>
          </>
        )}
        {!showScore ? (
          <Box style={{ padding: '20px' }}>
            <Button
              disabled={currentQuestion === 0}
              onClick={() => {
                setResponse('');

                if (getValues(questions.newTest[currentQuestion - 1].id.toString())) {
                  setResponse(getValues(questions.newTest[currentQuestion - 1].id.toString()).answer);
                }
                setCurrentQuestion(currentQuestion - 1);
              }}
              variant="contained"
              color="primary">
              Anterior
            </Button>
            <Button
              onClick={() => {
                setResponse('');
                if (getValues(questions.newTest[currentQuestion + 1].id.toString())) {
                  setResponse(getValues(questions.newTest[currentQuestion + 1].id.toString()).answer);
                }
                setCurrentQuestion(nextQuestion);
              }}
              style={{ margin: '0 15px' }}
              disabled={currentQuestion + 1 >= questions.newTest.length}
              variant="contained"
              color="primary">
              Próxima
            </Button>
            <Button variant="contained" onClick={submitTest} color="secondary">
              Enviar prova
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
                location.reload();
              }}>
              Fechar
            </Button>
          </Box>
        )}
      </TestModalContainer>
    </Modal>
  );
}

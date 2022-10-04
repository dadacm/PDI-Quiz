import { Button, createStyles, makeStyles, Step, StepLabel, Stepper, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TemaList from '../temaList/TemaList';
import FinishGenerationTest from './GenerateTestSteps/FinishGenerationTest';
import QuestionsQuantity from './GenerateTestSteps/QuestionsQuantity';
import StudantsSelectStep from './GenerateTestSteps/StudantsSelectStep';
import TemaSelectStep from './GenerateTestSteps/TemaSelectStep';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    backButton: {
      // marginRight: theme.spacing(1),
    },
    stepper: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 0,
      paddingLeft: 0,
      paddingBottom: 0,
    },
    contentStep: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    instructions: {
      // marginTop: theme.spacing(1),
      // marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Escolha o tema', 'Defina a quantidade de questões', 'Selecione os alunos'];
}

// import { Container } from './styles';

function GenerateTest() {
  const temasString = localStorage.getItem('temas');
  const arrayTemas = temasString && JSON.parse(temasString);
  const studantsString = localStorage.getItem('studants');
  const allStudants = studantsString && JSON.parse(studantsString);
  const studantNamesarray: string[] = [];
  const getStudantNames = allStudants && allStudants.map((studant: string) => studantNamesarray.push(JSON.parse(studant).studantUsername));
  const [checkedStudants, setCheckedStudants] = React.useState<string[]>([]);
  const [tema, setTema] = React.useState('');
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { control, setValue, getValues, trigger, setError, watch, formState, reset } = useForm();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <TemaSelectStep handleNext={handleNext} tema={tema} setTema={setTema} arrayTemas={arrayTemas} />;
      case 1:
        return (
          <QuestionsQuantity
            handleBack={handleBack}
            handleNext={handleNext}
            formMethods={{ formState, watch, control, setValue, trigger, setError }}
            tema={tema}
          />
        );
      case 2:
        return (
          <StudantsSelectStep
            formMethods={{ getValues, reset, setError, formState }}
            setCheckedStudants={setCheckedStudants}
            handleBack={handleBack}
            handleNext={handleNext}
            checkedStudants={checkedStudants}
            handleToggleStudants={handleToggleStudants}
            studantNamesarray={studantNamesarray}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }
  const handleToggleStudants = (value: string) => {
    const currentIndex = checkedStudants.indexOf(value);
    const newChecked = [...checkedStudants];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedStudants(newChecked);
  };

  return (
    <div>
      <h2>Gerar prova</h2>
      <div className={classes.root}>
        <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <FinishGenerationTest handleReset={handleReset} />
          ) : (
            <div className={classes.contentStep}>{getStepContent(activeStep)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateTest;

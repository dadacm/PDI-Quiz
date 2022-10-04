import { Button } from '@material-ui/core';
import React from 'react';
import TemaList from '../../temaList/TemaList';
import { TemaSelectStepProps } from './TemaSelectStepProps';

// import { Container } from './styles';

function TemaSelectStep(props: TemaSelectStepProps) {
  const { handleNext, tema, setTema, arrayTemas } = props;
  return (
    <div style={{ margin: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <TemaList isTema selected={tema} handleSelect={setTema} listArray={arrayTemas} />
      <div>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default TemaSelectStep;

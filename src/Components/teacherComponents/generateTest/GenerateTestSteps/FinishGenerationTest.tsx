import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { StepsContainer } from '../Generatest.style';

// import { Container } from './styles';

function FinishGenerationTest(props: { handleReset: () => void }) {
  const { handleReset } = props;
  return (
    <StepsContainer>
      <Typography style={{ color: 'green' }}>Prova criada com sucesso</Typography>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Criar nova prova
        </Button>
      </div>
    </StepsContainer>
  );
}

export default FinishGenerationTest;

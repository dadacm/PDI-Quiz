import React from 'react';
import { StatusTest, TestProps } from '../../testCard/TestCard.types';
import TestsList from '../../testsList/TestsList';
// import { Container } from './styles'

function RegisteredTests() {
  const testsString = localStorage.getItem('tests');
  const allTests = testsString && JSON.parse(testsString);
  const notDoneTests = allTests.filter((test: TestProps) => test.status === StatusTest.EM_ABERTO);
  const doneTests = allTests.filter((test: TestProps) => test.status === StatusTest.CONCLUIDO);

  return (
    <div>
      <h2>Provas Cadastradas</h2>
      {!!notDoneTests.length && (
        <div>
          <h4>Em aberto:</h4>
          <TestsList allTests={notDoneTests} isTeacher />
        </div>
      )}
      {!!doneTests.length && (
        <div>
          <h4>Concluídos:</h4>
          <TestsList allTests={doneTests} isTeacher />
        </div>
      )}
    </div>
  );
}

export default RegisteredTests;

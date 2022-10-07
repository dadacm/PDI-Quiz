import React from 'react';
import { StatusTest, TestProps } from '../../testCard/TestCard.types';
import TestsList from '../../testsList/TestsList';

function StudantRegisteredTests() {
  const testsString = localStorage.getItem('tests');
  const allTests = testsString && JSON.parse(testsString);
  const loggedUserString = localStorage.getItem('user');
  const loggedUser = loggedUserString && JSON.parse(loggedUserString);
  const studantNotDoneTests = allTests.filter((test: TestProps) => test.name === loggedUser.username && test.status === StatusTest.EM_ABERTO);
  const studantDoneTests = allTests.filter((test: TestProps) => test.name === loggedUser.username && test.status === StatusTest.CONCLUIDO);

  return (
    <div>
      <h2>Provas Cadastradas</h2>
      {!!studantNotDoneTests.length && (
        <div>
          <h4>Em aberto:</h4>
          <TestsList testStartButton allTests={studantNotDoneTests} />
        </div>
      )}
      {!!studantDoneTests.length && (
        <div>
          <h4>Concluídos:</h4>
          <TestsList allTests={studantDoneTests} />
        </div>
      )}
    </div>
  );
}

export default StudantRegisteredTests;

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { localStorageMock } from '../../../../utils/JestLocalStorage';
import { renderWithRoute } from '../../../../utils/testHelpers';
import StudantRegisteredTests from '../StudantRegisteredTests';

describe('render studantRegisteredTests screen', () => {
  it('should render studantRegisteredTests', async () => {
    await waitFor(() =>
      localStorageMock.setItem(
        'tests',
        JSON.stringify([
          {
            name: 'joseh',
            newTest: [
              {
                questionInput: 'quem descobreiu o brasil',
                tema: 'História',
                alternativeA: 'Pedro alvarez cabral',
                alternativeB: 'Cristiano Ronaldo',
                alternativeC: 'Pelé',
                alternativeD: 'Cristovão Colombo',
                alternativeE: 'D. Pedro IV',
                addTema: 'História',
                corectAlternative: 'A',
                id: '82izsm1s',
              },
              {
                questionInput: 'quem descobreiu o brasil',
                tema: 'História',
                alternativeA: 'Pedro alvarez cabral',
                alternativeB: 'Cristiano Ronaldo',
                alternativeC: 'Pelé',
                alternativeD: 'Cristovão Colombo',
                alternativeE: 'D. Pedro IV',
                addTema: 'História',
                corectAlternative: 'A',
                id: '82izseqwm1s',
              },
            ],
            status: 1,
            id: 'h30up5ke',
            nota: 0,
          },
          {
            name: 'joseh',
            newTest: [
              {
                questionInput: 'quem descobreiu o brasil',
                tema: 'História',
                alternativeA: 'Pedro alvarez cabral',
                alternativeB: 'Cristiano Ronaldo',
                alternativeC: 'Pelé',
                alternativeD: 'Cristovão Colombo',
                alternativeE: 'D. Pedro IV',
                addTema: 'História',
                corectAlternative: 'A',
                id: '82izsm1s',
                answer: 'C',
              },
              {
                questionInput: 'quem descobreiu o brasil',
                tema: 'História',
                alternativeA: 'Pedro alvarez cabral',
                alternativeB: 'Cristiano Ronaldo',
                alternativeC: 'Pelé',
                alternativeD: 'Cristovão Colombo',
                alternativeE: 'D. Pedro IV',
                addTema: 'História',
                corectAlternative: 'A',
                id: '82izsm1s',
                answer: 'A',
              },
            ],
            status: 3,
            id: '3qp7c0uv',
            nota: 5,
          },
        ]),
      ),
    );
    await waitFor(() =>
      localStorageMock.setItem(
        'user',
        JSON.stringify({
          username: 'joseh',
          password: '123',
          isTeacher: false,
        }),
      ),
    );
    renderWithRoute(<StudantRegisteredTests />);
    expect(screen.getByText('Provas Cadastradas')).toBeInTheDocument();
    expect(screen.getByText('Concluídos:')).toBeInTheDocument();
    expect(screen.getByText('Iniciar prova')).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
    expect(screen.getByText('Em aberto:')).toBeInTheDocument();
    expect(screen.getByText('Nota: 5')).toBeInTheDocument();
    expect(screen.getAllByText('História')).toHaveLength(2);
  });
});

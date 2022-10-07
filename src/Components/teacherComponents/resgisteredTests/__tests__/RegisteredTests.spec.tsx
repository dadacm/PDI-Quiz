import { fireEvent, getByRole, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { ensureRender, mockAxios, renderWithRoute } from '../../../../utils/testHelpers';
import { localStorageMock } from '../../../../utils/JestLocalStorage';
import RegisteredTests from '../RegisteredTests';

describe('render RegisteredTests screen', () => {
  it('should render RegisteredTests', async () => {
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
                id: '87izsm1s',
              },
            ],
            status: 1,
            id: 'h30up5ke',
            nota: 0,
          },
          {
            name: 'fulano',
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
    renderWithRoute(<RegisteredTests />);
    expect(screen.getByText('Provas Cadastradas')).toBeInTheDocument();
    expect(screen.getByText('Concluídos:')).toBeInTheDocument();
    expect(screen.getByText('joseh')).toBeInTheDocument();
    expect(screen.getByText('fulano')).toBeInTheDocument();
    expect(screen.getByText('Em aberto:')).toBeInTheDocument();
    expect(screen.getByText('Nota: 5')).toBeInTheDocument();
    expect(screen.getAllByText('História')).toHaveLength(2);
  });
});

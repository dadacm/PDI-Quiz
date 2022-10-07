import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { localStorageMock } from '../../../../utils/JestLocalStorage';
import { ensureRender, mockAxios, renderWithRoute } from '../../../../utils/testHelpers';
import StudantRegisteredTests from '../../studantRegisteredTests/StudantRegisteredTests';

describe('render studantRegisteredTests screen', () => {
  it('should render studantRegisteredTests', async () => {
    mockAxios.post.mockImplementation(async () => ({
      data: {},
    }));
    await waitFor(() =>
      localStorageMock.setItem(
        'tests',
        JSON.stringify([
          {
            name: 'joseh',
            newTest: [
              {
                questionInput: 'quem descobriu o brasil',
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
                questionInput: 'quem descobriu o brasil',
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
    fireEvent.click(screen.getByText('Iniciar prova'));
    await ensureRender();
    expect(screen.getByText('Enviar prova')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    expect(screen.getByText('Questão 1/2')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: /pedro alvarez cabral/i }));
    await ensureRender();
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }));
    await ensureRender();
    fireEvent.click(screen.getByRole('radio', { name: /pedro alvarez cabral/i }));
    await ensureRender();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
    await ensureRender();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar prova' }));
    await ensureRender();
    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledWith('/send-test', undefined));
    await ensureRender();
    expect(screen.getByText('Sua nota foi:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fechar' }));
    screen.logTestingPlaygroundURL();
  });
});

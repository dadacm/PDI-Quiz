import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ensureRender, mockAxios, renderWithFormNextProvider, renderWithFormProvider, renderWithRoute } from '../../../../utils/testHelpers';
import GenerateTest from '../GenerateTest';
import TemaSelectStep from '../GenerateTestSteps/TemaSelectStep';
import { localStorageMock } from '../../../../utils/JestLocalStorage';
import QuestionsQuantity from '../GenerateTestSteps/QuestionsQuantity';

describe('render generate test screen', () => {
  it('should render tema select step corrrectly', async () => {
    await waitFor(() => localStorageMock.setItem('temas', JSON.stringify(['História'])));
    renderWithRoute(<GenerateTest />);
    expect(screen.getByText('Gerar prova')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /próximo/i })).toBeDisabled();
    fireEvent.click(screen.getByTestId('tema-select'));
    expect(screen.getByRole('button', { name: /próximo/i })).not.toBeDisabled();
    await ensureRender();
  });
  it('should render question quantity step corrrectly', async () => {
    await waitFor(() => localStorageMock.setItem('temas', JSON.stringify(['História'])));
    await waitFor(() =>
      localStorageMock.setItem(
        'questions',
        JSON.stringify([
          {
            questionInput: 'quem descobreiu o brasil',
            tema: 'História',
            alternativeA: 'Pedro alvarez cabral',
            alternativeB: 'Cristovão Colombo',
            alternativeC: 'padre Marcelo',
            alternativeD: 'Dom Pedro III',
            alternativeE: 'Dom Pedro IV',
            addTema: 'História',
            corectAlternative: 'A',
            id: 'epqon4u8',
          },
          {
            questionInput: 'Qual o unico time Brasileiro a parar uma guerra?',
            tema: 'História',
            alternativeA: 'São Paulo',
            alternativeB: 'Internacional',
            alternativeC: 'Palmeiras',
            alternativeD: 'Santos',
            alternativeE: 'Athletico PR',
            addTema: 'História',
            corectAlternative: 'D',
            id: '82izsm1s',
          },
        ]),
      ),
    );
    await waitFor(() => localStorageMock.setItem('studants', JSON.stringify([JSON.stringify({ studantUsername: 'joseh', studantPassword: '123' })])));
    renderWithRoute(<GenerateTest />);
    fireEvent.click(screen.getByTestId('tema-select'));
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));
    expect(screen.getByText('Insira a quantidade de questões')).toBeInTheDocument();
    expect(screen.getByText('Questões cadastradas com o tema escolhido: 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /próximo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();

    // Render quantity step errors
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));
    await ensureRender();
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Insira a quantidade de questões'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));
    await ensureRender();
    expect(screen.getByText('Você possui apenas 2 questões cadastradas com esse tema')).toBeInTheDocument();

    // Go to next step
    fireEvent.change(screen.getByLabelText('Insira a quantidade de questões'), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));
    await ensureRender();
    expect(screen.queryAllByText('Você possui apenas 2 questões cadastradas com esse tema')).toHaveLength(0);
    expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0);
  });
  it('should render all generateTest steps corrrectly', async () => {
    mockAxios.post.mockImplementation(async () => ({
      data: {},
    }));
    await waitFor(() => localStorageMock.setItem('temas', JSON.stringify(['História'])));
    await waitFor(() =>
      localStorageMock.setItem(
        'questions',
        JSON.stringify([
          {
            questionInput: 'Qual o unico time Brasileiro a parar uma guerra?',
            tema: 'História',
            alternativeA: 'São Paulo',
            alternativeB: 'Internacional',
            alternativeC: 'Palmeiras',
            alternativeD: 'Santos',
            alternativeE: 'Athletico PR',
            addTema: 'História',
            corectAlternative: 'D',
            id: '82izsm1s',
          },
        ]),
      ),
    );
    await waitFor(() => localStorageMock.setItem('studants', JSON.stringify([JSON.stringify({ studantUsername: 'fulano', studantPassword: '123' })])));

    renderWithRoute(<GenerateTest />);
    fireEvent.click(screen.getByTestId('tema-select'));
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));

    fireEvent.change(screen.getByLabelText('Insira a quantidade de questões'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }));
    await ensureRender();

    expect(screen.getByText('fulano')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar prova/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();

    // Render selectStudant step errors
    fireEvent.click(screen.getByRole('button', { name: /criar prova/i }));
    await ensureRender();
    expect(screen.getByText('Selecione pelo menos um aluno')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /fulano/i });
    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.click(checkbox);
    await ensureRender();
    expect(checkbox).toHaveProperty('checked', true);

    fireEvent.click(screen.getByRole('button', { name: /criar prova/i }));
    await ensureRender();
    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledWith('/create-test', undefined));
  });
});

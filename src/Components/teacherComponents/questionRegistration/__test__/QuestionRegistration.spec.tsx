import { fireEvent, getByRole, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { ensureRender, mockAxios, renderWithRoute } from '../../../../utils/testHelpers';
import QuestionRegistration from '../QuestionRegistration';
import { localStorageMock } from '../../../../utils/JestLocalStorage';

describe('render QuestionRegistration screen', () => {
  it('should render QuestionRegistration', async () => {
    renderWithRoute(<QuestionRegistration />);
    expect(screen.getByText('Adicionar nova questão')).toBeInTheDocument();
    expect(screen.getByText('Digite o enunciado')).toBeInTheDocument();
    expect(screen.getByText('Selecione o tema da questão')).toBeInTheDocument();
    expect(screen.getByText('Altenativa A')).toBeInTheDocument();
    expect(screen.getByText('Altenativa B')).toBeInTheDocument();
    expect(screen.getByText('Altenativa C')).toBeInTheDocument();
    expect(screen.getByText('Altenativa D')).toBeInTheDocument();
    expect(screen.getByText('Altenativa E')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('Adicionar questão')).toBeInTheDocument();
  });
  it('should render QuestionRegistration Errors', async () => {
    renderWithRoute(<QuestionRegistration />);
    fireEvent.click(screen.getByText('Adicionar questão'));
    await ensureRender();
    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(6);
  });
  it('should register a new question', async () => {
    mockAxios.post.mockImplementation(async () => ({
      data: {},
    }));
    await waitFor(() => localStorageMock.setItem('temas', JSON.stringify(['História'])));
    renderWithRoute(<QuestionRegistration />);
    await ensureRender();
    fireEvent.change(screen.getByLabelText('Digite o enunciado'), { target: { value: 'Quem descobriu o Brasil?' } });
    await ensureRender();

    fireEvent.mouseDown(screen.getAllByRole('button', {})[0]);
    await ensureRender();
    const listbox = within(screen.getByRole('listbox'));

    fireEvent.click(listbox.getByText('História'));

    fireEvent.change(screen.getByLabelText('Altenativa A'), { target: { value: 'Pedro Alvarez Cabral' } });
    fireEvent.change(screen.getByLabelText('Altenativa B'), { target: { value: 'ttzxc' } });
    fireEvent.change(screen.getByLabelText('Altenativa C'), { target: { value: 'zxc Alvarez Cabral' } });
    fireEvent.change(screen.getByLabelText('Altenativa D'), { target: { value: 'sda Alvarez Cabral' } });
    fireEvent.change(screen.getByLabelText('Altenativa E'), { target: { value: 'Peasdasdro Alvarez Cabral' } });
    await ensureRender();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar questão' }));
    await ensureRender();

    await waitFor(() =>
      expect(mockAxios.post).toHaveBeenCalledWith('/register-question', {
        alternativeA: 'Pedro Alvarez Cabral',
        alternativeB: 'ttzxc',
        alternativeC: 'zxc Alvarez Cabral',
        alternativeD: 'sda Alvarez Cabral',
        alternativeE: 'Peasdasdro Alvarez Cabral',
        corectAlternative: 'A',
        questionInput: 'Quem descobriu o Brasil?',
        tema: 'História',
      }),
    );
  });
});

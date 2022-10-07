import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ensureRender, mockAxios, renderWithRoute } from '../../../../utils/testHelpers';

import StudantRegistration from '../StudantRegistration';
import { STUDANT_NAME, STUDANT_PASSWORD } from './Fixtures';

describe('render Studant Registratio screen', () => {
  it('should render Studant Registration', async () => {
    renderWithRoute(<StudantRegistration />);
    expect(screen.getByText('Cadastrar novo aluno')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Finalizar cadastro')).toBeInTheDocument();
  });
  it('should render Studant Registration Errors', async () => {
    renderWithRoute(<StudantRegistration />);
    fireEvent.click(screen.getByText('Finalizar cadastro'));
    await ensureRender();
    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(2);
  });
  it('should register a new studant', async () => {
    mockAxios.post.mockImplementation(async () => ({
      data: {},
    }));
    renderWithRoute(<StudantRegistration />);
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: STUDANT_NAME } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: STUDANT_PASSWORD } });
    await ensureRender();

    fireEvent.click(screen.getByText('Finalizar cadastro'));
    await ensureRender();
    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledWith('/register-studant', undefined));
  });
});

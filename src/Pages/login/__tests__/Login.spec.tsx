import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { ensureRender, mockAxios, renderWithRoute, renderWithTheme } from '../../../utils/testHelpers';
import Login from '../Login';
import { PROF_PASSWORD, PROF_USER } from './fixtures';

describe('render Login screen', () => {
  it('should render Login', async () => {
    renderWithRoute(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Usuário')).toBeInTheDocument();
    expect(screen.getByText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
  it('should render Login Errors', async () => {
    renderWithRoute(<Login />);
    fireEvent.click(screen.getByText('Entrar'));
    await ensureRender();
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('should log teacher', async () => {
    mockAxios.post.mockImplementation(async () => ({
      data: {},
    }));
    renderWithRoute(<Login />);
    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: PROF_USER } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: PROF_PASSWORD } });
    await ensureRender();

    fireEvent.click(screen.getByText('Entrar'));
    await ensureRender();
    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledWith('/login', { isTeacher: true, password: '123', username: 'prof' }));
  });
});

import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithRoute } from '../../../../utils/testHelpers';
import Home from '../Home';

describe('render Home screen', () => {
  it('should render Home', async () => {
    renderWithRoute(<Home />);
    expect(screen.getByText('PDF Tools')).toBeInTheDocument();
  });
});

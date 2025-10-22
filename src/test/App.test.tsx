import React from 'react';
import App from '../App';
import { renderWithTheme } from './utils';

it('renders application container successfully', () => {
  renderWithTheme(<App />);
});

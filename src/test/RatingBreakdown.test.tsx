import React from 'react';
import { screen, within } from '@testing-library/react';
import { RatingBreakdown, RatingBreakdownProps } from '../components/RatingBreakdown';
import { renderWithTheme } from './utils';

const testRatings = [
  { stars: 5, count: 952 },
  { stars: 4, count: 171 },
  { stars: 3, count: 55 },
  { stars: 2, count: 14 },
  { stars: 1, count: 40 },
];

const testProps: RatingBreakdownProps = {
  ratings: testRatings,
  totalRatings: 1232,
};

describe('RatingBreakdown', () => {
  it('renders without crashing', () => {
    renderWithTheme(<RatingBreakdown {...testProps} />);
    const list = screen.getByRole('list', { name: /rating breakdown/i });
    expect(list).toBeInTheDocument();
  });

  it('renders the correct number of RatingBars', () => {
    renderWithTheme(<RatingBreakdown {...testProps} />);
    const list = screen.getByRole('list', { name: /rating breakdown/i });
    const items = within(list).getAllByRole('listitem');
    expect(items.length).toBe(testProps.ratings.length);
  });

  it('handles zero total ratings gracefully', () => {
    const zeroProps = { ...testProps, totalRatings: 0 };
    renderWithTheme(<RatingBreakdown {...zeroProps} />);
    const items = screen.getAllByRole('listitem');
    items.forEach((item) => {
      expect(item).toHaveAttribute('aria-label', expect.stringContaining('0.0%'));
    });
  });
});

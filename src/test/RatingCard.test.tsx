import React from 'react';
import { screen } from '@testing-library/react';
import { RatingCard } from '../components/RatingCard';
import { renderWithTheme } from './utils';

const testRatingProps = {
  averageRating: 4.6,
  totalRatings: 1232,
};

describe('RatingCard', () => {
  it('renders rating card successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
  });

  it('renders title successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText('EXCELLENT')).toBeInTheDocument();
  });

  it('renders average rating successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText(/4\.6 out of 5/i)).toBeInTheDocument();
  });

  it('renders logo text successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText(/Product Rating LOGO/i)).toBeInTheDocument();
  });
});

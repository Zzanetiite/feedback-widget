import React from 'react';
import { screen } from '@testing-library/react';
import { RatingCard } from '../components/RatingCard';
import { renderWithTheme } from './utils';

const testRatingData = [
  { stars: 5, count: 952 },
  { stars: 4, count: 171 },
  { stars: 3, count: 55 },
  { stars: 2, count: 14 },
  { stars: 1, count: 40 },
];

const testRatingProps = {
  averageRating: 4.6,
  totalRatings: 1232,
  ratingData: testRatingData,
};

describe('RatingCard', () => {
  it('renders rating card successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
  });

  it('renders title successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText('EXCELLENT')).toBeInTheDocument();
  });

  it('renders rating stars successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByRole('img', { name: /rating: 4\.6 out of 5 stars/i })).toBeInTheDocument();
  });

  it('renders average rating successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText(/4\.6 out of 5/i)).toBeInTheDocument();
  });

  it('renders logo text successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByText(/Product Rating LOGO/i)).toBeInTheDocument();
  });

  it('renders rating breakdown successfully', () => {
    renderWithTheme(<RatingCard {...testRatingProps} />);
    expect(screen.getByRole('list', { name: /rating breakdown/i })).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { AverageRatingStars } from '../components/AverageRatingStars';
import { renderWithTheme } from './utils';

describe('AverageRatingStars', () => {
  it('renders the star container with correct accessibility label', () => {
    renderWithTheme(<AverageRatingStars rating={4.5} />);
    const starContainer = screen.getByRole('img', {
      name: /average rating: 4\.5 out of 5 stars/i,
    });
    expect(starContainer).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    renderWithTheme(<AverageRatingStars rating={4.5} maxStars={5} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars).toHaveLength(5);
  });

  it('renders empty stars when no data for rating', () => {
    renderWithTheme(<AverageRatingStars rating={0} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars.length).toBe(5);

    const emptyStars = stars.filter((star) => star.dataset.percentage === '0');
    expect(emptyStars.length).toBe(5);
  });

  it('renders a filled star successfully', () => {
    renderWithTheme(<AverageRatingStars rating={1} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars.length).toBe(5);

    const filledStars = stars.filter((star) => star.dataset.percentage === '100');
    expect(filledStars.length).toBe(1);
  });

  it('renders 4 filled and 1 partial star for rating 4.6', () => {
    renderWithTheme(<AverageRatingStars rating={4.6} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars.length).toBe(5);

    const filledStars = stars.filter((star) => star.dataset.percentage === '100');
    const partialStars = stars.filter(
      (star) => Number(star.dataset.percentage) > 0 && Number(star.dataset.percentage) < 100,
    );

    expect(filledStars.length).toBe(4);
    expect(partialStars.length).toBe(1);
    expect(Number(partialStars[0].dataset.percentage)).toBeCloseTo(60);
  });

  it('renders empty stars when invalid input - max stars > rating', () => {
    renderWithTheme(<AverageRatingStars rating={4.6} maxStars={3} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars.length).toBe(3);

    const emptyStars = stars.filter((star) => star.dataset.percentage === '0');
    expect(emptyStars.length).toBe(3);
  });

  it('renders empty stars when invalid input - negative', () => {
    renderWithTheme(<AverageRatingStars rating={4.6} maxStars={-1} />);
    const stars = screen.getAllByTestId('star-wrapper');
    expect(stars.length).toBe(1);

    const emptyStars = stars.filter((star) => star.dataset.percentage === '0');
    expect(emptyStars.length).toBe(1);

    const failureAriaText = screen.getByRole('img', {
      name: /An error has occurred. Couldn't determine rating./i,
    });
    expect(failureAriaText).toBeInTheDocument();
  });
});

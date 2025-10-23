import React from 'react';
import { screen } from '@testing-library/react';
import { RatingBar, RatingBarProps } from '../components/RatingBar';
import { renderWithTheme } from './utils';

const defaultProps: RatingBarProps = {
  stars: 4,
  count: 171,
  percentage: 13.85,
};

describe('RatingBar', () => {
  it('renders without crashing', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const bar = screen.getByRole('listitem');
    expect(bar).toBeInTheDocument();
  });

  it('displays star label with icon', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const starLabel = screen.getByText(/4/i);
    expect(starLabel).toBeInTheDocument();
    const starIcon = screen.getByTestId('star-icon');
    expect(starIcon).toBeInTheDocument();
  });

  it('renders the correct progress bar with percentage', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', defaultProps.percentage.toString());
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });

  it('displays the correct count', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const count = screen.getByText(defaultProps.count.toString());
    expect(count).toBeInTheDocument();
  });

  it('formats aria-label correctly', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('aria-label', '4 stars: 171 ratings, 13.8%');
  });

  it('handles singular stars and counts correctly', () => {
    renderWithTheme(<RatingBar stars={1} count={1} percentage={50} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute('aria-label', '1 star: 1 rating, 50.0%');
  });

  it('renders fill width according to percentage', () => {
    renderWithTheme(<RatingBar {...defaultProps} />);
    const fill = screen.getByTestId('bar-fill');
    expect(fill).toHaveStyle(`width: ${defaultProps.percentage}%`);
  });

  it('displays error aria-label when values are invalid', () => {
    const invalidProps: RatingBarProps = {
      stars: 5,
      count: -10, // invalid count
      percentage: 0,
    };
    renderWithTheme(<RatingBar {...invalidProps} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveAttribute(
      'aria-label',
      'An error has occurred. Could not determine percentage.',
    );
  });
});

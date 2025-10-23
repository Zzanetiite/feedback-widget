import React from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.35rem);
  margin: 0 auto;
`;

const StarWrapper = styled.div<{ $filled: boolean; $partial?: number }>`
  position: relative;
  width: clamp(2.5rem, 6vw, 3.5rem);
  height: clamp(2.5rem, 6vw, 3.5rem);
  background: ${({ $filled, theme }) => ($filled ? theme.colors.primary : theme.colors.secondary)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    border-radius: 6px;
  }

  ${({ $partial, theme }) =>
    $partial !== undefined &&
    $partial > 0 &&
    $partial < 1 &&
    `
    background: linear-gradient(
      to right,
      ${theme.colors.primary} 0%,
      ${theme.colors.primary} ${$partial * 100}%,
      ${theme.colors.secondary} ${$partial * 100}%,
      ${theme.colors.secondary} 100%
    );
  `}
`;

const StyledStar = styled(Star)`
  width: 60%;
  height: 60%;
  fill: white;
  stroke: white;
  stroke-width: 2;
`;

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export const AverageRatingStars: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  // Fall back to safe values instead of crashing for invalid input
  const safeMaxStars = Math.max(Math.floor(maxStars), 1);
  const isValidRating = rating >= 0 && rating <= safeMaxStars;
  // Clamp rating if valid, otherwise fallback to 0 (stands for no rating)
  const safeRating = isValidRating ? Math.min(rating, safeMaxStars) : 0;

  const stars = Array.from({ length: safeMaxStars }, (_, index) => {
    const starNumber = index + 1;
    const isFilled = safeRating >= starNumber;
    const isPartial = safeRating > index && safeRating < starNumber;
    const partialAmount = isPartial ? safeRating - index : undefined;

    return {
      key: starNumber,
      filled: isFilled,
      partial: partialAmount,
    };
  });

  const ariaLabel = isValidRating
    ? `Average rating: ${safeRating.toFixed(1)} out of ${safeMaxStars} stars`
    : "An error has occurred. Couldn't determine rating.";

  return (
    <StarContainer role="img" aria-label={ariaLabel}>
      {stars.map((star) => (
        <StarWrapper
          key={star.key}
          $filled={star.filled}
          $partial={star.partial}
          aria-hidden="true"
          data-testid="star-wrapper"
          data-percentage={star.partial ? star.partial * 100 : star.filled ? 100 : 0}
        >
          <StyledStar />
        </StarWrapper>
      ))}
    </StarContainer>
  );
};

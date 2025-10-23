import React from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  width: 100%;
`;

const StarLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  width: clamp(2rem, 3vw, 3rem);
`;

const StyledStarIcon = styled(Star)`
  width: clamp(0.875rem, 2vw, 1rem);
  height: clamp(0.875rem, 2vw, 1rem);
  fill: ${({ theme }) => theme.colors.secondary};
  stroke: ${({ theme }) => theme.colors.secondary};
`;

const BarTrack = styled.div<{ $isInvalid: boolean }>`
  flex: 1;
  height: clamp(0.5rem, 1.5vw, 0.625rem);
  background: ${({ $isInvalid, theme }) =>
    $isInvalid ? theme.colors.error : theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const Count = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  min-width: clamp(2rem, 4vw, 2.5rem);
  text-align: right;
`;

export interface RatingBarProps {
  stars: number;
  count: number;
  percentage: number;
}

export const RatingBar: React.FC<RatingBarProps> = ({ stars, count, percentage }) => {
  // Fall back to a red bar for invalid input
  const isInvalid = stars < 0 || count < 0 || percentage < 0 || percentage > 100;
  const safePercentage = Math.max(0, Math.min(percentage, 100));
  const ariaLabel = isInvalid
    ? 'An error has occurred. Could not determine percentage.'
    : `${stars} star${stars !== 1 ? 's' : ''}: ${count} rating${count !== 1 ? 's' : ''}, ${safePercentage.toFixed(1)}%`;

  return (
    <BarContainer role="listitem" aria-label={ariaLabel}>
      <StarLabel aria-hidden="true">
        {stars} <StyledStarIcon data-testid="star-icon" />
      </StarLabel>
      <BarTrack
        role="progressbar"
        aria-valuenow={safePercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        $isInvalid={isInvalid}
      >
        <BarFill $percentage={safePercentage} data-testid="bar-fill" />
      </BarTrack>
      <Count aria-hidden="true">{count}</Count>
    </BarContainer>
  );
};

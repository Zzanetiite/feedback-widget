import React from 'react';
import styled from 'styled-components';
import { RatingData } from './RatingCard';
import { RatingBar } from './RatingBar';

const BreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  width: 100%;
`;

export interface RatingBreakdownProps {
  ratings: RatingData[];
  totalRatings: number;
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ ratings, totalRatings }) => {
  // Sort ratings by stars in descending order (5 to 1)
  const sortedRatings = [...ratings].sort((a, b) => b.stars - a.stars);

  return (
    <BreakdownContainer role="list" aria-label="Rating breakdown">
      {sortedRatings.map((rating) => {
        const percentage = totalRatings > 0 ? (rating.count / totalRatings) * 100 : 0;
        return (
          <RatingBar
            key={rating.stars}
            stars={rating.stars}
            count={rating.count}
            percentage={percentage}
          />
        );
      })}
    </BreakdownContainer>
  );
};

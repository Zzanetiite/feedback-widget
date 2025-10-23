import styled from 'styled-components';
import { AverageRatingStars } from './AverageRatingStars';

export interface RatingCardProps {
  title?: string;
  averageRating: number;
}

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: clamp(1.5rem, 4vw, 2.5rem);
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: 0.1em;
  margin: 0 0 1.5rem 0;
`;

const RatingScore = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: 1rem 0 0.5rem 0;
  letter-spacing: 0.05em;
`;

const ProductRatingLabel = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.875rem, 2vw, 1.1rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const RatingCard: React.FC<RatingCardProps> = ({ title = 'EXCELLENT', averageRating }) => {
  return (
    <CardContainer role="region" aria-label="Product rating summary">
      <Title>{title}</Title>
      <AverageRatingStars rating={averageRating} />
      <RatingScore aria-label={`Average rating: ${averageRating} out of 5`}>
        {averageRating.toFixed(1)} OUT OF 5
      </RatingScore>
      <ProductRatingLabel>Product Rating LOGO</ProductRatingLabel>
    </CardContainer>
  );
};

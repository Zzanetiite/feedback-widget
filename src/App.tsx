import React from 'react';
import { RatingCard } from './components/RatingCard';
import styled from 'styled-components';

const demoRatings = [
  { stars: 5, count: 952 },
  { stars: 4, count: 171 },
  { stars: 3, count: 55 },
  { stars: 2, count: 14 },
  { stars: 1, count: 40 },
];

const demoData = {
  averageRating: 4.6,
  totalRatings: 1232,
  ratingData: demoRatings,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

function App() {
  return (
    <Container>
      <RatingCard {...demoData} />
    </Container>
  );
}

export default App;

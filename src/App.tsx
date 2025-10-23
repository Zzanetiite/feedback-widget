import React from 'react';
import { RatingCard } from './components/RatingCard';
import styled from 'styled-components';

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
      <RatingCard averageRating={4.6} />
    </Container>
  );
}

export default App;

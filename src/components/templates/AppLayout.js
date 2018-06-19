import React from 'react';
import styled from 'styled-components';
import Board from '../organisms/Board';
import TopBar from '../organisms/TopBar';

const Container = styled.div`
  height: 100vh;
  background: #4f5d75;
`;
Container.displayName = 'AppLayout_Container';

const AppLayout = () => (
  <Container>
    <TopBar />
    <Board />
  </Container>
);

export default AppLayout;

import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';

const Container = styled.div`
  background: #ec5766;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
Container.displayName = 'AppHeader_Container';

const TopBar = () => (
  <Container>
    <Title>Inventory App</Title>
  </Container>
);

export default TopBar;

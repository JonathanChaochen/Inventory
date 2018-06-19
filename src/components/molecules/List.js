import React from 'react';
import styled from 'styled-components';
import Icon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import Button from '../atoms/Button';
import Item from '../atoms/Item';

const Container = styled.div`
  overflow-x: auto;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;
Container.displayName = 'List';

const List = props => (
  <Container>
    <Item>
      <p>{props.list.name}</p>
    </Item>

    <Button secondary onClick={props.delete}>
      <Icon icon={faTrash} /> Delete
    </Button>
  </Container>
);

export default List;

import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { faPlus, faTimes } from '@fortawesome/fontawesome-free-solid';
import Icon from '@fortawesome/react-fontawesome';

import Button from '../atoms/Button';
import ListContainer from '../atoms/ListContainer';
import List from '../molecules/List';
import AddCardButton from '../atoms/AddCardButton';
import CreateInput from '../atoms/CreateInput';
import AddInventoryContainer from '../atoms/AddInventoryContainer';
import ConfirmModal from '../atoms/ConfirmModal';
import ConfirmButton from '../atoms/ConfirmButton';

const Container = styled.div`
  overflow-x: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;
Container.displayName = 'Board_Container';

export default class Board extends Component {
  state = {
    editInputShow: false,
    confirmDeleteModal: false,
    editId: '',
    deleteId: '',
    lists: [],
    newInventory: '',
    editInventory: '',
    error: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  createInventory = () => {
    if (!this.state.newInventory) {
      return this.setState({ error: 'Inventory name is required for create' });
    }

    axios
      .post('http://localhost:5000/inventory/', {
        name: this.state.newInventory
      })
      .then(response => {
        // console.log(response);
        this.fetchData();
        this.setState({ newInventory: '' });
      })
      .catch(e => {
        console.log(e);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:5000/inventory/')
      .then(response => {
        this.setState({ lists: response.data.inventory });
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleInventoryChange = e => {
    const { value, name } = e.target;
    if (name === 'editInventory') {
      this.setState({ editInventory: value });
    } else if (name === 'newInventory') {
      this.setState({ newInventory: value });
    }
  };

  deleteInventory = id => {
    this.setState({ confirmDeleteModal: true, deleteId: id });
  };

  onDelete = () => {
    axios
      .delete(`http://localhost:5000/inventory/${this.state.deleteId}`)
      .then(response => {
        // console.log(response);
        this.fetchData();
      })
      .catch(e => {
        console.log(e);
      });
    this.setState({ confirmDeleteModal: false });
  };

  onDeleteCancal = () => {
    this.setState({ confirmDeleteModal: false });
  };

  editInventory = id => {
    this.setState({ editId: id, editInputShow: true, editInventory: '' });
  };

  confirmEditInventory = () => {
    if (!this.state.editInventory) {
      this.setState({ error: 'Inventory name is required for update' });
      return this.cancelEditInventory();
    }

    axios
      .patch(`http://localhost:5000/inventory/${this.state.editId}`, {
        name: this.state.editInventory
      })
      .then(response => {
        // console.log(response);
        this.fetchData();
      })
      .catch(e => {
        console.log(e);
      });

    this.cancelEditInventory();
  };

  cancelEditInventory = () => {
    this.setState({ editId: '', editInputShow: false, editInventory: '' });
  };

  render() {
    const { lists } = this.state;
    return (
      <Container>
        {this.state.confirmDeleteModal && (
          <ConfirmModal>
            <p>Are you sure you want to delete this inventory?</p>
            <ConfirmButton>
              <Button secondary onClick={this.onDelete}>
                Confirm
              </Button>
              <Button primary onClick={this.onDeleteCancal}>
                Cancel
              </Button>
            </ConfirmButton>
          </ConfirmModal>
        )}

        {lists.map(list => (
          <ListContainer key={list._id}>
            {list._id !== this.state.editId ? (
              <List list={list} delete={() => this.deleteInventory(list._id)} />
            ) : (
              this.state.editInputShow && (
                <div>
                  <CreateInput
                    type="text"
                    placeholder={'Edit...'}
                    name="editInventory"
                    value={this.state.editInventory}
                    onChange={this.handleInventoryChange}
                  />

                  <Button primary onClick={this.cancelEditInventory}>
                    <Icon icon={faTimes} /> Cancel
                  </Button>
                  <Button secondary onClick={this.confirmEditInventory}>
                    <Icon icon="edit" /> Confirm
                  </Button>
                </div>
              )
            )}
            <Button primary onClick={() => this.editInventory(list._id)}>
              <Icon icon="edit" /> Edit
            </Button>
          </ListContainer>
        ))}

        <AddInventoryContainer>
          <CreateInput
            type="text"
            name="newInventory"
            placeholder={'Enter New Inventory...'}
            value={this.state.newInventory}
            onChange={this.handleInventoryChange}
          />
          <AddCardButton onClick={this.createInventory}>
            <Icon icon={faPlus} /> Add Inventory
          </AddCardButton>
        </AddInventoryContainer>
        <h3>{this.state.error}</h3>
      </Container>
    );
  }
}

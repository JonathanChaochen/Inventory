import styled from 'styled-components';

const ConfirmModal = styled.div`
  background-color: #eee;
  color: black;
  border: none;
  border-radius: 7px;
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -150px;
  width: 300px;
`;
ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;

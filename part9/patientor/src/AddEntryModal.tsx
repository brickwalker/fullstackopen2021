import React from "react";
import { Modal } from "semantic-ui-react";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  // onSubmit: () => void;
}

const AddEntryModal = ({ modalOpen, onClose }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      <AddEntryForm onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;

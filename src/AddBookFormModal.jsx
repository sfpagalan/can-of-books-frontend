import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class AddBookFormModal extends React.Component {
  render() {
    const { show, onHide, onSubmit } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddBookFormModal;

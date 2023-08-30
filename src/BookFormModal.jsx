// BookFormModal.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.onSubmit}>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
          <Button variant="primary" onClick={this.props.onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BookFormModal;

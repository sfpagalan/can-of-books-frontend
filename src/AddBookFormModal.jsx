import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class AddBookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button clicked!");
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { show, onHide, onSubmit, isModalOpen } = this.props;
    const { title, description, status } = this.state;

    return (
      <Modal show={show && isModalOpen} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" value={status} onChange={this.handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={(e) => onSubmit(e, this.state)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddBookFormModal;

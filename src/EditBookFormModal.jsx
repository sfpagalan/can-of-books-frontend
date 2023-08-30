import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class EditBookFormModal extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          title: event.target.title.value,
        };
    
        this.props.onSubmit(formData);
    };

    render() {
        const { show, onHide, editBook } = this.props;
    
        return (
          <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={editBook ? editBook.title : ''}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    }

export default EditBookFormModal;

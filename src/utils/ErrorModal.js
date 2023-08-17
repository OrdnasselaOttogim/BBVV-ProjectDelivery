import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ErrorModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} size="lg" centered onHide={this.props.onClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p className="p-2 fs-4 text-center text-danger">{this.props.errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ErrorModal;
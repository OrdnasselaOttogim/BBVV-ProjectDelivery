import React, { Component } from 'react'
import {Form, Card, Modal, Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addressControl } from '../utils/inputControl';
import ErrorModal from '../utils/ErrorModal';

export default class AddEntity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            showSuccessModal: false,
            showErrorModal: false
        }
    }

    addEntity = async (entityAddress, entityName) => {

        this.setState({ loading: true })
        try {
            await this.props.systemManager.methods.addEntity(entityAddress, entityName).send({ from: this.props.account });
            this.setState({
                loading: false,
                showSuccessModal: true
            })
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.message.split("revert ")[1] || "An error occurred.";
            this.setState({
                loading: false,
                showErrorModal: true,
                modalErrorMessage: errorMessage.split('","stack')[0],
            })
        }
    };

    render() {
        return (
            <div>
                <Container >
                    <Card className="mt-5 shadow">
                        <p className="text-center fs-3 mt-3">Add Entity</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                        <Modal show={this.state.showSuccessModal} size="xxl" centered>
                            <Modal.Header closeButton />
                            <Modal.Body><p className='p-2 fs-4 text-center'>Entity Added</p></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    window.location.reload()
                                    this.setState({ showSuccessModal: false })
                                }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <ErrorModal
                            show={this.state.showErrorModal}
                            onClose={() => this.setState({ showErrorModal: false})}
                            errorMessage={this.state.modalErrorMessage}
                        />
                        <Form className='text-center' onSubmit={(event) => {
                            event.preventDefault()
                            const entityAddress = this.entityAddress.value
                            const entityName = this.entityName.value
                            if (addressControl(entityAddress)) {
                                if (entityName == "")
                                    this.setState({ errorMessage: "Entity name is required." })
                                else {
                                    this.setState({ errorMessage: "" })
                                    this.addEntity(entityAddress, entityName)
                                }
                            }
                            else
                                this.setState({ errorMessage: "Invalid address. Please try again.." })
                        }}
                            id="addEntityForm"
                        >
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Address of the Entity</Form.Label>
                                <Form.Control ref={(input) => { this.entityAddress = input }} type="text" placeholder="Enter address" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Name of the Entity</Form.Label>
                                <Form.Control ref={(input) => { this.entityName = input }} type="text" placeholder="Enter name" />
                            </Form.Group>
                            {
                                this.state.loading ?
                                    <div className="spinner-border mt-4" role="status" />
                                    :
                                    <Button className='mt-5 w-25' size='lg' variant="outline-secondary" type="submit">
                                        Add
                                    </Button>
                            }
                            <p className="fw-bold text-danger fs-6">
                                {this.state.errorMessage}
                            </p>
                        </Form>
                    </Card>
                </Container>
            </div>
        );
    }
}

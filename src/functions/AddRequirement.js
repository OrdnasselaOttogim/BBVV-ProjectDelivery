import React, { Component } from 'react'
import { Form, Card, Modal, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorModal from '../utils/ErrorModal';

export default class AddRequirement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vaccineCode: "",
            loading: false,
            showSuccessModal: false,
            showErrorModal: false
        }
    }

    selectEntity = (e) => {
        this.setState({ entityIndex: Number(e.target.value) })
    }

    addRequirement = async (entityIndex, vaccineCode) => {

        this.setState({ loading: true })
        try {
            await this.props.systemManager.methods.addRequirement(parseInt(entityIndex, 10), vaccineCode).send({ from: this.props.account });
            this.setState({
                loading: false,
                showSuccessModal: true
            })
        } catch (error) {
            console.error('Error', error);
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
                        <p className="text-center fs-3 mt-3">Add Requirement</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                        <Modal show={this.state.showSuccessModal} size="xxl" centered>
                            <Modal.Header closeButton />
                            <Modal.Body><p className='p-2 fs-4 text-center'>Requirement Added</p></Modal.Body>
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
                            const entityIndex = this.state.entityIndex
                            const vaccineCode = this.key.value
                            this.addRequirement(entityIndex, vaccineCode)
                        }}
                            id="addRequirementForm"
                        >
                            <Form.Label className='mt-3 fs-5'>List of Entities</Form.Label>
                            <Form.Select onChange={this.selectEntity}>
                                <option>Choose Entity</option>
                                {this.props.entityList.map((entity, index) => (
                                    <option key={index} value={index} >{entity.entityName}</option>
                                ))}
                            </Form.Select>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Vaccine Code</Form.Label>
                                <Form.Control ref={(input) => { this.key = input }} type="text" placeholder="Enter vaccine code" />
                            </Form.Group>
                            {
                                this.state.loading ?
                                    <div className="spinner-border mt-4" role="status" />
                                    :
                                    <Button className='mt-5 w-25' size='lg' variant="outline-secondary" type="submit">
                                        Add
                                    </Button>
                            }
                        </Form>
                    </Card>
                </Container>
            </div>
        );
    }
}

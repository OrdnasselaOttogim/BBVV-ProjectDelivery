import React, { Component } from 'react'
import {Form, Card, Modal, Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addressControl } from '../utils/inputControl';

export default class AddAuthorizedUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false
        }
    }

    addAuthorizedUser = async (authorizedUserAddress) => {
        console.log("add authorized user system manager: ", this.props.systemManager)

        this.setState({ loading: true })
        try {
            await this.props.systemManager.methods.addAuthorizedUser(authorizedUserAddress).send({ from: this.props.account });
            console.log('Authorized user added successfully.');
            this.setState({
                loading: false,
                show: true
            })
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.message.split("revert ")[1];
            window.alert(`Error: ${errorMessage}`);
            this.setState({
                loading: false
            })
        }
    };

    render() {
        return (
            <div>
                <Container >
                    <Card className="mt-5 shadow">
                        <p className="text-center fs-3 mt-3">Add Authorized User</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                        <Modal show={this.state.show} size="lg" centered>
                            <Modal.Header closeButton />
                            <Modal.Body><p className='p-2 fs-4 text-center'>Authorized User Added</p></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    window.location.reload()
                                    this.setState({show:false})
                                }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Form className='text-center' onSubmit={(event) => {
                            event.preventDefault()
                            const authorizedUserAddress = this.userAddress.value
                            if (addressControl(authorizedUserAddress)) {
                                this.addAuthorizedUser(authorizedUserAddress)
                                this.setState({ errorMessage: "" })
                            }
                            else
                                this.setState({ errorMessage: "Invalid address. Please try again.." })

                        }}
                            id="addAuthorizedUserForm"
                        >
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Address of the Authorized User</Form.Label>
                                <Form.Control ref={(input) => { this.userAddress = input }} type="text" placeholder="Enter address" />
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

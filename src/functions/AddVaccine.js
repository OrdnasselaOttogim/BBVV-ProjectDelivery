import React, { Component } from 'react'
import {Form, Card, Modal, Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddVaccine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false
        }
    }

    addVaccine = async(vaccineCode) => {

        this.setState({ loading: true })
        try {
            await this.props.systemManager.methods.addVaccineToSystem(vaccineCode).send({ from: this.props.account });
            console.log('Vaccine added to the system successfully.');
            this.setState({
                loading: false,
                show: true
            })
        } catch (error) {
            console.error('Error:', error);
            window.alert(`Error: ${error.message}`);
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
                        <p className="text-center fs-3 mt-3">Add Vaccine</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                    <Modal show={this.state.show} size="xxl" centered>
                            <Modal.Header closeButton />
                            <Modal.Body><p className='p-2 fs-4 text-center'>Vaccine Added</p></Modal.Body>
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
                            const _vaccineCode = this.vaccineCode.value
                            this.addVaccine(_vaccineCode)
                        }}
                            id="addVaccineForm"
                        >
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Vaccine Code</Form.Label>
                                <Form.Control ref={(input) => { this.vaccineCode = input }} type="text" placeholder="Enter vaccine code" />
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

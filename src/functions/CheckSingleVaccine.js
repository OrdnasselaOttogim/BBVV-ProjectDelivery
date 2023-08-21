import React, { Component } from 'react'
import { Form, Card, Modal, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CheckSingleVaccine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false
        }
    }

    checkSingleVaccine = async (recipientId, countryCode, vaccineCode) => {
        const recipient = [
            recipientId,
            countryCode
        ];
        this.setState({ loading: true })
        try {
            const isVaccinated = await this.props.vaccineRegistry.methods.isVaccinated(recipient, vaccineCode).call()
            this.setState({
                isVaccinated: isVaccinated,
                loading: false,
                show: true
            })
        } catch (error) {
            console.error('Error:', error);
            window.alert(`Error:' ${error.message}`)
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
                        <p className="text-center fs-3 mt-3">Check Single Vaccine</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                        <Modal show={this.state.show} size="xxl" centered>
                            <Modal.Header closeButton />
                            {(this.state.isVaccinated) ?
                                <Modal.Body><p className='p-2 fs-4 text-center'>The recipient with id {this.state.recipientId} and country code {this.state.countryCode} has the vaccine with code {this.state.vaccineCode}</p></Modal.Body>
                                :
                                <Modal.Body><p className='p-2 fs-4 text-center'>The recipient with id {this.state.recipientId} and country code {this.state.countryCode} does NOT have the vaccine with code {this.state.vaccineCode}</p></Modal.Body>
                            }
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    window.location.reload()
                                    this.setState({ show: false })
                                }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Form className='text-center' onSubmit={(event) => {
                            event.preventDefault()
                            const countryCode = this.countryCode.value
                            const recipientId = this.recipientId.value
                            const vaccineCode = this.vaccineCode.value
                            if (recipientId == "")
                                this.setState({ errorMessage: "Recipient Id is required." })
                            else if (countryCode == "")
                                this.setState({ errorMessage: "Country code is required." })
                            else if (vaccineCode == "")
                                this.setState({ errorMessage: "Vaccine code is required." })
                            else {
                                this.setState({ errorMessage: "", countryCode: countryCode, recipientId: recipientId, vaccineCode:vaccineCode })
                                this.checkSingleVaccine(recipientId, countryCode, vaccineCode)
                            }
                        }}
                            id="checkSingleVaccineForm"
                        >
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Recipient Id</Form.Label>
                                <Form.Control ref={(input) => { this.recipientId = input }} type="text" placeholder="Enter recipient id" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Country Code</Form.Label>
                                <Form.Control ref={(input) => { this.countryCode = input }} type="text" placeholder="Enter country code" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Vaccine Code</Form.Label>
                                <Form.Control ref={(input) => { this.vaccineCode = input }} type="text" placeholder="Enter vaccine code" />
                            </Form.Group>
                            {
                                this.state.loading ?
                                    <div className="spinner-border mt-4" role="status" />
                                    :
                                    <Button className='mt-5 w-25' size='lg' variant="outline-secondary" type="submit">
                                        Check
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

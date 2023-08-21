import React, { Component } from 'react'
import { Form, Card, Modal, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CheckEligibility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            show: false
        }
    }

    selectEntity = (e) => {
        this.setState({
            entityIndex: Number(e.target.value),
            entityName: this.props.entityList[Number(e.target.value)].entityName
        })
    }

    checkEligibility = async (entityIndex, recipientId, countryCode) => {
        const recipient = [
            recipientId,
            countryCode
        ];
        this.setState({ loading: true })
        try {
            const isEligible = await this.props.eligibilityChecker.methods.isEligible(parseInt(entityIndex, 10), recipient).call()
            this.setState({
                isEligible: isEligible,
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
                        <p className="text-center fs-3 mt-3">Check Eligibility</p>
                    </Card>
                    <Card className="mt-2 p-5 shadow">
                        <Modal show={this.state.show} size="xxl" centered>
                            <Modal.Header closeButton />
                            {(this.state.isEligible) ?
                                <Modal.Body><p className='p-2 fs-4 text-center'>The recipient with id {this.state.recipientId} and country code {this.state.countryCode} is eligible for entity {this.state.entityName}</p></Modal.Body>
                                :
                                <Modal.Body><p className='p-2 fs-4 text-center'>The recipient with id {this.state.recipientId} and country code {this.state.countryCode} is NOT eligible for entity {this.state.entityName}</p></Modal.Body>
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
                            const entityIndex = this.state.entityIndex
                            const countryCode = this.countryCode.value
                            const recipientId = this.recipientId.value
                            if (recipientId == "")
                                this.setState({ errorMessage: "Recipient Id is required." })
                            else if (countryCode == "")
                                this.setState({ errorMessage: "Country code is required." })
                            else {
                                this.setState({ errorMessage: "", countryCode: countryCode, recipientId: recipientId })
                                this.checkEligibility(entityIndex, recipientId, countryCode)
                            }
                        }}
                            id="checkEligibilityForm"
                        >
                            <Form.Label className='mt-3 fs-5'>List of Entities</Form.Label>
                            <Form.Select onChange={this.selectEntity}>
                                <option>Choose Entity</option>
                                {this.props.entityList.map((entity, index) => (
                                    <option key={index} value={index} >{entity.entityName}</option>
                                ))}
                            </Form.Select>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Recipient Id</Form.Label>
                                <Form.Control ref={(input) => { this.recipientId = input }} type="text" placeholder="Enter recipient id" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='mt-3 fs-5'>Country Code</Form.Label>
                                <Form.Control ref={(input) => { this.countryCode = input }} type="text" placeholder="Enter country code" />
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

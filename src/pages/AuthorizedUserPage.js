import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterVaccine from '../functions/RegisterVaccine'
import CheckEligibility from '../functions/CheckEligibility'
import CheckSingleVaccine from '../functions/CheckSingleVaccine'
import Navbar from '../navbar'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Navbar account={this.props.account} />
                <RegisterVaccine account={this.props.account} vaccineRegistry={this.props.vaccineRegistry}/>
                <CheckEligibility account={this.props.account} eligibilityChecker={this.props.eligibilityChecker} entityList={this.props.entityList} />
                <CheckSingleVaccine account={this.props.account} vaccineRegistry={this.props.vaccineRegistry}></CheckSingleVaccine>
 
            </div>
        );
    }   
}

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAuthorizedUser from '../functions/AddAuthorizedUser'
import AddEntity from '../functions/AddEntity'
import Navbar from '../navbar'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Navbar account={this.props.account} />

                <AddAuthorizedUser systemManager={this.props.systemManager} account={this.props.account} />
                <AddEntity systemManager={this.props.systemManager} account={this.props.account} />

            </div>
        );
    }
}

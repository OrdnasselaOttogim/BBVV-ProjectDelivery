import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAuthorizedUser from '../functions/AddAuthorizedUser'
import AddEntity from '../functions/AddEntity'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

                <AddAuthorizedUser systemManager={this.props.systemManager} account={this.props.account} />
                <AddEntity systemManager={this.props.systemManager} account={this.props.account} />

            </div>
        );
    }
}

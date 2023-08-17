import React, { Component } from 'react';
import Web3 from 'web3';
import "./App.css";
import SystemManagerABI from "./build/SystemManager.json"
import VaccineRegistryABI from "./build/VaccineRegistry.json"
import EligibilityCheckerABI from "./build/EligibilityChecker.json"
import AdminPage from './pages/AdminPage';
import AuthorizedUserPage from './pages/AuthorizedUserPage';
import VaccineVerificationPage from './pages/VaccineVerificationPage';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const entityList = [];
    const web3 = window.web3
    const { ethereum } = window;

    // Handle transaction rejection
    ethereum.on('tx:rejected', (error) => {
      console.log('Transaction rejected:', error);
      // Additional handling or error message display
    });

    // Load the accounts of blockchain
    const accounts = await web3.eth.getAccounts()
    // Assign the address of the current user to account
    this.setState({ account: accounts[0] })
    // Get Network ID
    const networkId = await web3.eth.net.getId()
    // Get SystemManager
    const networkDataSM = SystemManagerABI.networks[networkId]

    if (networkDataSM) {
      // Assign contract
      const systemManager = new web3.eth.Contract(SystemManagerABI.abi, networkDataSM.address)
      const admin = await systemManager.methods.admin().call()
      const entityCount = await systemManager.methods.entityCount().call()
      const isAuthorized = await systemManager.methods.authorizedUserList(this.state.account).call()
      for (var i = 0; i < Number(entityCount); i++) {
        const entityAddress = await systemManager.methods.entityList(i).call()
        const entity = await systemManager.methods.addressToEntity(entityAddress).call()
        entityList.push(entity)
      }
      this.setState({ systemManager: systemManager, admin: admin, isAuthorized: isAuthorized, entityList: entityList });
    } else {
      window.alert('SystemManager contract not deployed to detected network.')
    }
    // Get VaccineRegistry
    const networkDataVR = VaccineRegistryABI.networks[networkId]
    if (networkDataVR) {
      // Assign contract
      const vaccineRegistry = new web3.eth.Contract(VaccineRegistryABI.abi, networkDataVR.address)
      this.setState({ vaccineRegistry: vaccineRegistry })
    } else {
      window.alert('VaccineRegistry contract not deployed to detected network.')
    }
    // Get CheckEligibility
    const networkDataEC = EligibilityCheckerABI.networks[networkId]
    if (networkDataEC) {
      // Assign contract
      const eligibilityChecker = new web3.eth.Contract(EligibilityCheckerABI.abi, networkDataEC.address)
      this.setState({ eligibilityChecker: eligibilityChecker })
    } else {
      window.alert('EligibilityChecker contract not deployed to detected network.')
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      entityList: []
    }
  }

  render() {
    return (
      <div className="App">
        {(this.state.account === this.state.admin) ?
          <AdminPage systemManager={this.state.systemManager} account={this.state.account} entityList={this.state.entityList} />
          :
          <>
            {(this.state.isAuthorized) ?
              <AuthorizedUserPage account={this.state.account} vaccineRegistry={this.state.vaccineRegistry} eligibilityChecker={this.state.eligibilityChecker} entityList={this.state.entityList} />
              :
              <VaccineVerificationPage account={this.state.account} vaccineRegistry={this.state.vaccineRegistry} eligibilityChecker={this.state.eligibilityChecker} entityList={this.state.entityList} />
            }
          </>
        }
      </div>
    );
  }
}

export default App;

import './App.css';
import logo from '../logo.png';
import React, { Component } from 'react';
import Web3 from 'web3';
import DailyJournal from '../abis/DailyJournal.json';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // Detect Ethereum Provider
  async loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  // Load Blockchain Data
  async loadBlockchainData() {
    // Fetch Web3 Provider
    const web3 = window.web3;

    // Get Accounts
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Get Network Id
    const networkId = await web3.eth.net.getId();

    // Load Contracts
    const dailyJournalData = DailyJournal.networks[networkId];
    if(dailyJournalData) {
      const dailyJournal = new web3.eth.Contract(DailyJournal.abi, dailyJournalData.address);
      this.setState ({ dailyJournal });
    } else {
      window.alert("DailyJournal contract not deployed to detected network");
    }

    // Blockchain Data has been loaded and page can now be rendered
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      dailyJournal: null
    }
  }

  render() {
    let content;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = this.state.dailyJournal;
    }

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h1 className="navbar-brand col-sm-3 col-md-2 mr-0">Gregg's Starter Kit</h1>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <br/>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Gregg's Starter Kit</h1>
                <p>Edit <code>src/components/App.js</code> and save to reload.</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
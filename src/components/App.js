import './App.css';
import logo from '../logo.png';
import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main';
import DailyJournal from '../abis/DailyJournal.json';

class App extends Component {

  async UNSAFE_componentWillMount() {
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

      const name = await dailyJournal.methods.name().call();
      this.setState({ name });

      const entryCount = await dailyJournal.methods.entryCount().call();
      this.setState({ entryCount });

      for(let i=1; i<=entryCount; i++) {
        const entry = await dailyJournal.methods.entries(i).call();
        this.setState({ entries: [...this.state.entries, entry] });
      }

      const taskCount = await dailyJournal.methods.taskCount().call();
      this.setState({ taskCount });

      for(let i=1; i<=taskCount; i++) {
        const task = await dailyJournal.methods.tasks(i).call();
        this.setState({ tasks: [...this.state.tasks, task] });
      }
    } else {
      window.alert("DailyJournal contract not deployed to detected network");
    }

    // Blockchain Data has been loaded and page can now be rendered
    this.setState({ loading: false });
  }

  async createEntry(breakfast, lunch, dinner, meditation, day, date) { 
    this.setState({ loading: true });
    this.state.dailyJournal.methods.createEntry(breakfast, lunch, dinner, meditation, day, date).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      });
  }

  async createTask(entryId, startTime, endTime, description) { 
    this.setState({ loading: true });
    this.state.dailyJournal.methods.createTask(entryId, startTime, endTime, description).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      });
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      dailyJournal: null,
      name: '',
      entryCount: 0,
      entries: [],
      taskCount: 0,
      tasks: []
    }

    this.createEntry = this.createEntry.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  render() {
    let content;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = 
        <Main 
          dailyJournal={this.state.dailyJournal}
          name={this.state.name}
          entryCount={this.state.entryCount}
          entries={this.state.entries}
          taskCount={this.state.taskCount}
          tasks={this.state.tasks}
          createEntry={this.createEntry}
          createTask={this.createTask}
        />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
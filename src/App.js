import React, { Component } from 'react';
import QuerySection from './QuerySection';
import ResultsSection from './ResultsSection';
import './App.css';

class App extends Component {
  state = {
    userIds: [],
    loading: false, // true after search made
    books: [], // {bookinfo: {}, users: []}
  }

  handleChange = event => {
    const value = event.target.value;
    const userIds = value.split(',').map(id => id.trim());
    this.setState({ userIds }, () => console.log(this.state));
  }

  render() {
    const { userIds } = this.state;

    return (
      <div className="App">

        <header className="query-section">
          <QuerySection
            userIds={userIds}
            handleChange={this.handleChange}
          />
        </header>

        <div className="results-section">

          <ResultsSection
            userIds={userIds}
          />
        </div>

      </div>
    );
  }
}

export default App;

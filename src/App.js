import React, { Component } from 'react';
import QuerySection from './QuerySection';
import ResultsSection from './ResultsSection';
import { GOODREADS_KEY, convertToObject, headerConfig } from './utils/';
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
    this.setState({ userIds });
  }

  handleSubmit = () => {
    const { userIds } = this.state;
    userIds.map(id => this.getBooks(id));
  }

  getBooks = userId => {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/user/show/${userId}.xml?key=${GOODREADS_KEY}`, headerConfig)
      .then(xmlResponse => console.log(xmlResponse))
      // .then(obj => this.setState({ test: obj }, () => console.log(this.state.test)));
  }

  render() {
    const { userIds } = this.state;

    return (
      <div className="App">

        <header className="query-section">
          <QuerySection
            getBooks={this.getBooks}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            userIds={userIds}
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

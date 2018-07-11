import React, { Component } from 'react';
import QuerySection from './QuerySection';
import ResultsSection from './ResultsSection';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <QuerySection />
        </header>
        <p className="App-intro">
          <ResultsSection />
        </p>
      </div>
    );
  }
}

export default App;

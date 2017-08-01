import React, { Component } from 'react';
import ProductSearch from './ProductSearch/ProductSearch'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Find the Perfect Financial Institution!</h1>
        </div>
        <main className="App-main">
          <ProductSearch/>
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res }))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    try {
      const response = await fetch('/get_prices');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.data !== null ? (
          <div>
            <h2>Prices:</h2>
            <ul>
              {this.state.data.prices.map((priceData, index) => (
                <ul key={index}>
                  <li>Price: {priceData.price}</li>
                  <li>Start Date: {priceData.startDate}</li>
                  <li>End Date: {priceData.endDate}</li>
                </ul>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;

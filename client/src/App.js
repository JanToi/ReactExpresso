import React, { Component } from 'react';
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
      <div>
        {this.state.data !== null ? (
          <div>
            <h2>Prices:</h2>
            <table>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.prices.map((priceData, index) => (
                  <tr key={index}>
                    <td>{priceData.price.toFixed(3)}€</td>
                    <td>{new Date(priceData.startDate).toLocaleDateString('fi-FI', { month: 'numeric', day: 'numeric' })}</td>
                    <td>{`${new Date(priceData.startDate).toLocaleTimeString('fi-FI', { hour:'numeric', minute: 'numeric'})} - ${new Date(priceData.endDate).toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric'})}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Raw JSON Data:</h2>
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;

import React from 'react';
import './Counter.css';

class Counter extends React.Component {
  const = { count: 0 }
  
  

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
  /*
    Quando um estado muda, o react renderiza novamente com os novos estados. 
  */
  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <div className="counter-container">
        <div className="items-container">
          <h2>Counter</h2> 
          <div style={{flexDirection:'column'}}>
          <button onClick={this.decrement}>-</button>
          <span style={{margin:10}}>{this.state.count}</span>
          <button onClick={this.increment}>+</button>

          </div>
        </div>
      </div>
    )
  }
}

export default Counter;

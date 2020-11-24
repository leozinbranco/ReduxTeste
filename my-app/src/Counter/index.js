import React from 'react';
import './Counter.css';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '../actions';

class Counter extends React.Component {
  //const = { count: 0 } remove this

  /*Preparando o componente para o Redux */



  increment = () => {
    /*
    Remove this 
    this.setState({
      count: this.state.count + 1
    });

    Don’t dispatch(increment) 🚫

    Do dispatch(increment()) ✅
    */
    //this.props.dispatch(increment());
    this.props.increment();
  }
  /*
  Quando um estado muda, o react renderiza novamente com os novos estados. 
  */
  decrement = () => { /*
  Also remove this 
  this.setState({
    count: this.state.count - 1
  });*/
    //this.props.dispatch(decrement());
    this.props.decrement();

  }

  reset = () => {
    //this.props.dispatch(reset());
    this.props.reset();
  }



  render() {



    return (
      <div className="counter-container">
        <div className="items-container">
          <h2>Counter</h2>
          <div style={{ flexDirection: 'column' }}>
            <button onClick={this.decrement}>-</button>
            <span style={{ margin: 10 }}>{/*
          this.state.count
          */
              this.props.count
            }</span>
            <button onClick={this.increment}>+</button>
            <div>
              <button onClick={this.reset}>RESET</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

// Add this function:
function mapStateToProps(state) {
  return {
    count: state.count
  };
}



//Não é necessário, mas é mais um level abstrato 
const mapDispatchToProps = { //Pode ser uma function também
  increment,
  decrement,
  reset,
};

//Isso é legal pois poupa você de chamar o dispatch() manualmente 

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
//retorna uma função quando você a chama = high order function
//o connect é um hook para o redux, ou seja, retirar o state e passar por meio dessa função.(mapStateToProps)
//O objeto retornado da função mapStateToProps é preenchido no meu componente como props. Pega o state object e retorna um objeto cheio de 
//adereços

//Não precisa de dispatch, tendo em vista que o mapStateToProps já copia o estado e passa um objeto identico 
//

  //export default Counter;

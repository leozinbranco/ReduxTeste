
//import './App.css';
import React from 'react';
import Counter from './Counter';
import "./App.css"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore } from 'redux';




/*
Função que irá retornar o state

redux disponibiliza o lugar para guardar o state, pega o state de la, e responde quando o state muda.

react-redux deixa eu conectar as peças do state para o react 

ou seja, redux não "sabe nada" sobre react. 

a lib redux pode ser usada até mesmo fora do react app, trabalhando com vue, node, angular, etc
*/
const initialState = {
  count: 0
};

function reducer(state, action) {
  console.log('reducer', state, action);
  return state;
}
/*
Important Rule of Reducers #1: Never return undefined from a reducer.

Undefined state = bad 

Reducer: Reducer funciona da seguinte forma: É passado uma função que é chamada em cada elemento do array, similar ao map()


Exemplo: 
      var letters = ['r', 'e', 'd', 'u', 'x'];

    #Recebe 2 argumentos:
    -A função para fazer a redução(a reducer)
    -Um valor inicial para o accumulatedResult

  var word = letters.reduce(
        function(accumulatedResult, arrayItem) {
          return accumulatedResult + arrayItem;
        },
  ''); // <-- string vazia = valor inicial. 

console.log(word) 


Redux é basicamente uma versão de Array.reduce 

(state, action) => newState

-Pega o estado atual, faz a ação, e retorna um novo estado. 
-Parecido com um Array.reduce reducer

(accumulatedValue, nextItem) => nextAccumulatedValue

O que é um action redux? 
Action é uma linguagem redux para um objeto simples com uma propriedade chamada type, 

Exemplo de ações:
{
  type: "add an item"
  item: "Apple"
}

ou

{
  type: 7008
}

ou 

{
  type: "INCREMENT"
}

Ações são muito livres, desde que tenham o tipo. 
Para ser sustentavel, muitas vezes os tipos das açoes sao strings simples e muita vezes em letras maiusculas 

AS ações nao fazem nada, e para fazer algo, precisa-se despachar ela

var letters = ['r', 'e', 'd', 'u', 'x'];

var word = letters.reduce(
    function(accumulatedResult, arrayItem) {
        return accumulatedResult + arrayItem;
      },
      ''); // <-- string vazia = valor inicial.
      
      console.log(word) 
      
      */

const store = createStore(reducer);

function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Counter} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

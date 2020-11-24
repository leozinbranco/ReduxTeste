
//import './App.css';
import React from 'react';
import Counter from './Counter';
import "./App.css"
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from 'redux';
import rootReducer from './rootReducer';

const initialState = {
  count: 0
};
/*
Função que irá retornar o state

redux disponibiliza o lugar para guardar o state, pega o state de la, e responde quando o state muda.

react-redux deixa eu conectar as peças do state para o react 

ou seja, redux não "sabe nada" sobre react. 

a lib redux pode ser usada até mesmo fora do react app, trabalhando com vue, node, angular, etc
*/


function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
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

  Handler:  Uma função com uma finalidade específica para tratar de algum problema.
            Pode ser o clique de um botão, a alteração de propriedades de objetos, etc.




AS ações nao fazem nada, e para fazer algo, precisa-se despachar ela
-store.dispatch({ type: "INCREMENT" });
Com isso, o redux irá chamar o reducer com tal ação, e substituirá o estado com o que o reducer retornou



Handle Actions

Para isso, há algumas maneiras de fazer isso. 
Usar vários if/else para tratar o type da action;
Criar um objeto no qual procura uma função pelo type do action; 
Ou simplesmente um switch; 

Exemplo:

function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
}


Reducers tem que ser funções puras, isso significa que não pode modificar seus argumentos, e eles não podem ter um
side effect.

"side effect" = mudar variáveis fora do escopo, chamar outras funções que mudem coisas, funções que façam buscas (fetch),
despachar ações, etc... (apenas console.log é permitido)

NÃO pode ter side effect 

NÃO MODIFIQUE O STATE ARGUMENT

No mesmo conceito, você também não pode mudar o state por = state.count = 0, state.item.push(newItem), state.count++

- Immer lib ajudaria a escrever reducers. 

#Mais algumas regras...
-Nunca mude o state, apenas retorne um novo.
-tem a ideia de imutabilidade
-Apenas ações podem "modificar" o state
-Apenas uma maneira de mudanças: dispatch(action) -> reducer -> new state
-Reducer deve ser uma pure functions 

var letters = ['r', 'e', 'd', 'u', 'x'];

var word = letters.reduce(
  function(accumulatedResult, arrayItem) {
      return accumulatedResult + arrayItem;
    },
    ''); // <-- string vazia = valor inicial.
    
    console.log(word) 
    


    #FETCH DATA with redux 

    function getUser() {
      return function() {
        return fetch('/current_user');
      };
    }

    Isso teoricamente não é suportado, porém é ai que entra o REDUX-THUNK. 
    É um middleware, basicamente um plugin para redux, que ativa redux para 
    usar ações como: getUser()

    Você pode despachar essas thunk actions
    - dispatch(getUser())


    Mas, o que é Thunk?
    Thunk é um nome comum para uma função que retorna outra função

    function doStuff() { // action creator
      return function(dispatch, getState) { //thunk 
        //Na maioria das vezes, apenas é usado o dispatch de argumento, porém, 
        quando se quer algo com condição baseado em algum valor do redux state, 
        apenas use getState, e assim você terá acesso ao estado inteiro para ler. 


        // dispatch actions here
        // or fetch data
        // or whatever
      }
    }

      #Dispatch the Action to Fetch the Data
      - fetchProducts deve ser usado dntro do componentDidMount method, e se estiver usando hooks, useEffect().
      - Em casos de dados globais, em que todo o aplicativo precisa, despache a ação logo depois de criar o store, 
        com store.dispatch

      #Como nomear Redux Actions
      - Redux fetch data é normalmente usado com BEGIN, SUCCESS, FAILURE.
      - BEGIN/SUCCESS/FAILURE é bom, pois ao usar uma loading flag, onde a resposta é true é setado BEGIN action, e 
        false depois de SUCCESS ou FAILURE 
      - ANTES de começar a requisição API, despache BEGIN 
      - DEPOIS da requisição for bem sucedida, despache SUCCESS com os dados, e se falhou, despache FAILURE com erro. 
      - 


    */

const store = createStore(
  reducer,
  applyMiddleware(thunk) 
  //thunk tem que estar wrap no applyMiddleware, não passe thunk diretamente. 
  );
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });
store.dispatch(rootReducer);


function App() {
  /*
    Para todos terem acesso ao state, é necessário usar o connect 
  */

  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

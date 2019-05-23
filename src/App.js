import React from 'react';
import Sudoku from './components/Sudoku';
import { Provider } from "react-redux";

import store from "./store/store";

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Sudoku />
      </Provider>
    </div>
  );
}

export default App;

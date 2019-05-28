import { createStore } from "redux";

import { UPDATECELL } from './actions-types'
import { initialState } from './initialState'

function reducer(state = initialState, action) {
  switch (action.type) {
      case UPDATECELL:
        const puzzle = [...state.puzzle]
        puzzle[action.indexRow][action.indexCol][action.property] = action.value;
        return {...state, puzzle}
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

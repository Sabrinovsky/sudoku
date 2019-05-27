import { createStore } from "redux";

import { UPDATECELL } from './actions-types'

const cell = {
    value:'',
    error: false
}

const initialState = {
    puzzle : [
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
        [{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell},{...cell}],
    ],
    error:false
} 

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

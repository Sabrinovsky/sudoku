import { createStore } from "redux";

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
      case 'UPDATECELL':
        state.puzzle[action.indexRow][action.indexCol][action.property] = action.value;
        return {...state}
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

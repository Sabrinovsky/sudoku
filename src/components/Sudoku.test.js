import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "jest-dom/extend-expect";

import { UPDATECELL } from "../store/actions-types";
import Sudoku from "./Sudoku";
import { initialState } from "../store/initialState";

beforeEach(cleanup);

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATECELL:
      const puzzle = [...state.puzzle];
      puzzle[action.indexRow][action.indexCol][action.property] = action.value;
      return { ...state, puzzle };
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
}

it("it should render with default value", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  expect(getByTestId("00")).toHaveTextContent("");
});

it("it should set value without erros", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("33"), { target: { value: "2" } });
  expect(getByTestId("33").value).toBe("2");
  expect(getByTestId("33").classList.contains("invalid-cell")).toBe(false);
});

it("it should set error on duplicated value on same row", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("30"), { target: { value: "2" } });
  fireEvent.input(getByTestId("37"), { target: { value: "2" } });
  expect(getByTestId("30").classList.contains("invalid-cell")).toBe(true);
  expect(getByTestId("37").classList.contains("invalid-cell")).toBe(true);
});

it("it should set error on duplicated value on same col", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("23"), { target: { value: "2" } });
  fireEvent.input(getByTestId("53"), { target: { value: "2" } });
  expect(getByTestId("23").classList.contains("invalid-cell")).toBe(true);
  expect(getByTestId("53").classList.contains("invalid-cell")).toBe(true);
});

it("it should set error on duplicated value on same scope", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("33"), { target: { value: "2" } });
  fireEvent.input(getByTestId("44"), { target: { value: "2" } });
  expect(getByTestId("33").classList.contains("invalid-cell")).toBe(true);
  expect(getByTestId("44").classList.contains("invalid-cell")).toBe(true);
});

it("it should remove error on setting a correct value", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("01"), { target: { value: "2" } });
  fireEvent.input(getByTestId("02"), { target: { value: "2" } });
  fireEvent.input(getByTestId("02"), { target: { value: "1" } });

  expect(getByTestId("02").classList.contains("invalid-cell")).toBe(false);
  expect(getByTestId("01").classList.contains("invalid-cell")).toBe(false);
});

it("it should remove error on setting a correct value only in affected cells", () => {
  const { getByTestId } = renderWithRedux(<Sudoku />);
  fireEvent.input(getByTestId("00"), { target: { value: "2" } });
  fireEvent.input(getByTestId("08"), { target: { value: "2" } });
  fireEvent.input(getByTestId("88"), { target: { value: "2" } });
  fireEvent.input(getByTestId("88"), { target: { value: "1" } });

  expect(getByTestId("88").classList.contains("invalid-cell")).toBe(false);
  expect(getByTestId("08").classList.contains("invalid-cell")).toBe(true);
  expect(getByTestId("00").classList.contains("invalid-cell")).toBe(true);
});

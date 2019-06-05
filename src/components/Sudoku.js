import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { UPDATECELL } from "../store/actions-types";

class Sudoku extends React.Component {
  hasDuplicatedRow(newValue, indexRow, indexCol) {
    let error = false;
    this.props.puzzle[indexRow].map((cell, col) => {
      const hasEqualValue = 
        cell.value === newValue && indexCol !== col;
      if (hasEqualValue) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedCol(newValue, indexRow, indexCol) {
    let error = false;
    this.props.puzzle.map((cell, row) => {
      const hasEqualValue =
        cell[indexCol].value === newValue && indexRow != row;
      if (hasEqualValue) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedScope(value, indexRow, indexCol) {
    const row = indexRow > 5 ? 6 : indexRow > 2 ? 3 : 0;
    const col = indexCol > 5 ? 6 : indexCol > 2 ? 3 : 0;
    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) {
        const hasEqualValue =
          this.props.puzzle[i][j].value === value &&
          (indexRow !== i && indexCol !== j);
        if (hasEqualValue) {
          return true;
        }
      }
    }
    return false;
  }
  checkForErrors(valueIndexRow, valueIndexCol) {
    this.props.puzzle.map((row, indexRow) => {
      row.map((col, indexCol) => {
        if (col.value !== "") {
          let hadError = col.error;

          const rowToCheck = indexRow > 5 ? 6 : indexRow > 2 ? 3 : 0;
          const colToCheck = indexCol > 5 ? 6 : indexCol > 2 ? 3 : 0;
          const valueRow = valueIndexRow > 5 ? 6 : valueIndexRow > 2 ? 3 : 0;
          const valueCol = valueIndexCol > 5 ? 6 : valueIndexCol > 2 ? 3 : 0;

          if (indexCol === valueIndexCol || 
            indexRow === valueIndexRow || 
            (rowToCheck === valueRow &&
            colToCheck === valueCol)){
            let hasError = false;
            
            if (indexCol === valueIndexCol){
              hasError = this.hasDuplicatedCol(col.value, indexRow, indexCol);
            }
            
            if (indexRow === valueIndexRow && !hasError){
              hasError = this.hasDuplicatedRow(col.value, indexRow, indexCol);
            }
            
            if (rowToCheck === valueRow && colToCheck === valueCol && !hasError){
              hasError = this.hasDuplicatedScope(col.value, indexRow, indexCol);
            }

            if (hasError){
              this.props.dispatch({
                type: UPDATECELL,
                indexRow,
                indexCol,
                property: "error",
                value: true
              });
            }
            else{
              if (hadError){
                this.props.dispatch({
                  type: UPDATECELL,
                  indexRow,
                  indexCol,
                  property: "error",
                  value: false
                });
                // if has error before and now doesn't have anymore, 
                // checkForErrors in this cell.
                this.checkForErrors(indexRow, indexCol)
              }
            }
          }
        }
      });
    });
  }
  handleChange(e, indexRow, indexCol) {
    let value = e.target.value;
    this.props.dispatch({
      type: UPDATECELL,
      indexRow,
      indexCol,
      value,
      property: "value"
    });
    this.checkForErrors(indexRow, indexCol);
  }

  render() {
    return (
      <Container>
        <h1>Sudoku</h1>
        <div className="wrapper">
          {this.props.puzzle.map((value, indexRow) => {
            return (
              <Row
                key={indexRow}
                className={
                  "puzzle puzzle-col" +
                  (indexRow === 3 || indexRow === 6 ? " top-border" : "")
                }
              >
                {this.props.puzzle[indexRow].map((value, indexCol) => {
                  return (
                    <Col
                      key={indexCol}
                      className={
                        "cell" +
                        (indexCol === 3 || indexCol === 6 ? " left-border" : "")
                      }
                    >
                      <input
                        data-testid={`${indexRow}${indexCol}`}
                        className={value.error ? "invalid-cell" : ""}
                        defaultValue={value.value}
                        maxLength={1}
                        onChange={e => {
                          this.handleChange(e, indexRow, indexCol);
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
        <div>
          <a className="" href="https://github.com/mathesouza/sudoku">
            <i className="fab fa-github" />
          </a>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  error: state.error
});

export default connect(mapStateToProps)(Sudoku);

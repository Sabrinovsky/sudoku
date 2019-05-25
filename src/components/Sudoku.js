import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Selector from "./Selector";

const UPDATECELL = "UPDATECELL";

class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hasDuplicatedRow(newValue, indexRow, indexCol) {
    var error = false;
    this.props.puzzle[indexRow].map((value,col) => {
      if (value.value === newValue && (indexCol!==col)) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedCol(newValue, indexCol , indexRow) {
    var error = false;
    this.props.puzzle.map((value,row) => {
      if (value[indexCol].value === newValue && (indexRow!=row)) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedScope(value, indexRow, indexCol) {
    let error = false;
    const row = indexRow > 5 ? 6 : indexRow > 2 ? 3 : 0;
    const col = indexCol > 5 ? 6 : indexCol > 2 ? 3 : 0;
    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) {
        if (this.props.puzzle[i][j].value === value && (indexRow !== i && indexCol !== j)) {
          error = true;
        }
      }
    }
    return error;
  }
  checkForErros() {
    console.log(this.props.puzzle)
    this.props.puzzle.map((row, indexRow) => {
      row.map((col, indexCol) => {
        if(col.value!==''){
          let hasError =
            this.hasDuplicatedRow(col.value, indexRow,indexCol) ||
            this.hasDuplicatedCol(col.value, indexCol,indexRow) ||
            this.hasDuplicatedScope(col.value, indexRow, indexCol);
            
          this.props.dispatch({
            type: UPDATECELL,
            indexRow,
            indexCol,
            property: "error",
            value: hasError
          });
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
    this.checkForErros(value, indexRow, indexCol);

    this.setState({});
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  error: state.error
});

export default connect(mapStateToProps)(Sudoku);

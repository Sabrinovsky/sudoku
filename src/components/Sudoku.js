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

  hasDuplicatedRow(newValue, indexRow) {
    var error = false;
    this.props.puzzle[indexRow].map(value => {
      if (value.value === newValue) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedCol(newValue, indexCol) {
    var error = false;
    this.props.puzzle.map(value => {
      if (value[indexCol].value === newValue) {
        error = true;
      }
    });
    return error;
  }
  hasDuplicatedScope(value,indexRow,indexCol) {
    let error = false
    const row = indexRow > 5 ? 3 : indexRow > 2 ? 3 : 0
    const col = indexCol > 5 ? 3 : indexCol > 2 ? 3 : 0
    console.log(row+' - '+col)
    for(let i=row;i<row+3;i++){
      for(let j=col;j<col+3;j++){
        if(this.props.puzzle[i][j].value===value){
          error = true;
        }
      }
    }
    return error;
  }

  handleChange(e, indexRow, indexCol) {
    let value = e.target.value;
    
    let hasError =
      this.hasDuplicatedRow(value, indexRow) ||
      this.hasDuplicatedCol(value, indexCol) ||
      this.hasDuplicatedScope(value, indexRow,indexCol)
    this.props.dispatch({
      type: UPDATECELL,
      indexRow,
      indexCol,
      property: "error",
      value: hasError
    });
    this.props.dispatch({
      type: UPDATECELL,
      indexRow,
      indexCol,
      value,
      property: "value"
    });
    this.setState({});
  }

  render() {
    return (
      <Container>
        {this.props.puzzle.map((value, indexRow) => {
          return (
            <Row
              key={indexRow}
              className={
                "puzzle-col" +
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  puzzle: state.puzzle,
  error: state.error
});

export default connect(mapStateToProps)(Sudoku);

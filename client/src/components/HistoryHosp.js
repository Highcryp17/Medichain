import React, { Component } from "react";
import { Well } from "react-bootstrap";
import kalp from "../getContract";
import "./HistoryHosp.css";

class HistoryHosp extends Component {
  constructor() {
    super();
    this.state = {};
    let data = kalp.methods.getCount(1).call();
  }

  render() {
    const diseaseList = this.props.data.map((d) => (
      <Well sm={12} key={d[0]} className="history">
        <h3>Id: {d[0]}</h3>
        <h3>Timestamp: {d[3]}</h3>
        <h3>Disease: {d[2]}</h3>
      </Well>
    ));
    return <div>{diseaseList}</div>;
  }
}

export default HistoryHosp;

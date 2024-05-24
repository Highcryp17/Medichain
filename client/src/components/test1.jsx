import React, { Component } from "react";
import { useState } from "react";
import kalp from "../getContract";

// var patients = kalp.methods.getPatients;

class test extends Component {
  constructor(props) {
    super();
    this.getRecords = this.getRecords.bind(this);
  }

  async getRecords(e) {
    console.log("hellloooo");
  }

  render() {
    return (
      <div>
        <button onClick={this.getRecords}>Click</button>
      </div>
    );
  }
}

export default test;

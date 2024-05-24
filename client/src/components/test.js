import React, { Component } from "react";
import { useState } from "react";
import kalp from "../getContract";
import web3 from "../web3";

// var patients = kalp.methods.getPatients;

class test extends Component {
  constructor(props) {
    super();
    this.getRecords = this.getRecords.bind(this);
  }

  async getRecords(e) {
    kalp.methods.getPatient(2).call()
      .then((data)=>{
        console.log("promise fullfilled");
        console.log({data});

      }).catch(()=>{
        console.log('promise failed');
      })

  }
  
  async setPatient(e){
    const account = await web3.eth.getAccounts();
    console.log("setPatient called")
    kalp.methods.setPatient(`0xb6Ef216F425fC1c788B246B019c1aFb2bFd690DA`,'hrishikesh',19,1987654321,'hrkoli').send({from: account[0]}).
      then(({data})=>{
      console.log("promise successfull");
      console.log({data})
    }).catch((e)=>{
      console.log('promise failed')
      console.log(e)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.setPatient}>Click</button>
      </div>
    );
  }
}

export default test;

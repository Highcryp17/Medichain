import React, { Component, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  Tabs,
  Tab,
  ControlLabel
} from "react-bootstrap";
import kalp from '../getContract'
import web3 from '../web3'
import "./HospitalUpload.css"

const Doctor = ()=>{
  
  const [state,setState] = useState({
    doctorAddress:null,
  })

  const onSubmitClick= ()=>{
    console.log("onSubmitClick")
     window.ethereum.request({
          method: "eth_requestAccounts",
        }).then((data)=>{
          console.log("Accountset",data)
        })
    // web3.setProvider(state.doctorAddress)
  }

  return(
    <div className=" container mx-auto my-auto">
    <section className="container bg-primary">
      <h1 className="display-1">Doctor Login</h1>
    </section>
      <button className="d-flex justify-content-center" onClick={onSubmitClick}>Login</button>
    </div>
  )
}

export default Doctor

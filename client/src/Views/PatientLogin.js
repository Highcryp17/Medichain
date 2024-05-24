import  React, {Component, useEffect, useState, Navigate } from "react";
import {
  Grid,
  Button,
  Row,
  Col, 
  FormControl, 
  FormGroup, 
  Tabs,
  Tab,
  ControlLabel, 
  Nav} from "react-bootstrap"; 
import kalp from '../getContract';
import web3 from '../web3';
import {useStateContext} from "../Contexts/ContextProvider";
import WelcomeHeader from "../components/WelcomeHeader";
import {useNavigate} from 'react-router-dom'

const PatientLogin = () =>{
  return(
    <>
    </>
  )
}

export default PatientLogin;

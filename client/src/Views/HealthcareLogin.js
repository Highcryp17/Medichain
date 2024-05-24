import React, { Component, useEffect, useState, Navigate } from "react";
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
  Nav
} from "react-bootstrap";
import kalp from '../getContract';
import web3 from '../web3';
import { useStateContext } from "../Contexts/ContextProvider";
import WelcomeHeader from "../components/WelcomeHeader"
import { useNavigate } from 'react-router-dom'
import { handleEncrypt, handleDecrypt } from "../Contexts/crypter"

const HealthcareLogin = () => {

  const { currentHealthcare, currentDoctor, currentPatient, setCurrentDoctor, setCurrentHealthcare, setCurrentPatient } = useStateContext();
  const navigate = useNavigate()
  const [notification, setNotification] = useState()
  const [state, setState] = useState({
    doctorAddress: null,
  })




  async function onPharamacyLogin() {
    console.log("PharmacyLogin")
    await window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((data) => {
      console.log("fetched data", data[0])
      kalp.methods.loginPharmacy(data[0])
        .call().then((loginBoolean) => {
          console.log("login doctor", data)
          if (loginBoolean) {
            setNotification("Successfully Logged In");
            console.log("thisssssss", data[0])
            setCurrentDoctor(data[0])
            setCurrentPatient(null)
            console.log("adsjfnadjklfnds isss")
            console.log(currentDoctor)
            navigate("/")
          } else {
            setNotification("User Does not Exist")
            console.log(data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }).catch(e => {
      console.log(e)
    })
  }

  async function onDoctorLogin() {
    console.log("onDoctorLogin")
    await window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((data) => {
      console.log("fetched data", data[0])
      kalp.methods.loginDoctor(data[0])
        .call().then((loginBoolean) => {
          console.log("login doctor", data)
          if (loginBoolean) {
            setNotification("Successfully Logged In");
            console.log("thisssssss", data[0])
            setCurrentDoctor(data[0])
            setCurrentPatient(null)
            console.log("adsjfnadjklfnds isss")
            console.log(currentDoctor)
            navigate("/")
          } else {
            setNotification("User Does not Exist")
            console.log(data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }).catch(e => {
      console.log(e)
    })
  }
  async function onLoginClick() {
    console.log("onLoginClick")
    await window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((data) => {
      kalp.methods.loginPatient(data[0])
        .call().then((loginBoolean) => {
          if (loginBoolean) {
            setNotification("Successfully Logged In");
            setCurrentPatient(data[0])
            setCurrentDoctor(null)
            console.log(currentPatient)
            navigate('/PatientDashboard')
          } else {
            setNotification("User Does not Exist")
            console.log(data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }).catch(e => {
      console.log(e)
    })
  }

  const onSubmitClick = () => {
    console.log("onSubmitClick")
    window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((data) => {
      console.log("current metamask = ", data)
      if (data[0].toLowerCase() == "0x2155aFFA7010845EBECb2efa0A724A532091DcD1".toLowerCase()) {
        setCurrentHealthcare(data[0])
        return <Navigate to="/" />
      }
      else {
        setNotification("Invalid Healthcare Address")
      }
    }).catch(e => {
      console.log(e)
    })
    // web3.setProvider(state.doctorAddress)
  }

  return (
    <div className="container-flex">
      <WelcomeHeader />
      <section className="mt-5  d-flex justify-content-center">
        <div className="col-3 me-3">
          <div className="card container my-3 p-5">
            <h1 className="h1 text-center text-black">Patient</h1>
            <br />
            <i className="fa fa-user"></i>
            <br />
            <button className="btn btn-primary my-auto  text-white text-decoration-none" onClick={onLoginClick}>Login</button>
          </div>
        </div>


        <div className="col-3 me-3">
          <div className="card container my-3 p-5">
            <h1 className="h1 text-center text-black">Doctor</h1>
            <i className="fa fa-user-md"></i>
            <button className="btn btn-primary my-auto  text-white text-decoration-none" onClick={onDoctorLogin}>Login</button>
          </div>
        </div>



        <div className="col-3 me-3">
          <div className="card container my-3 p-5">
            <h1 className="h1 text-center text-black">Healthcare</h1>
            <br />
            <i className="fa fa-hospital"></i>
            <br />
            <button className="btn btn-primary my-auto  text-white text-decoration-none" onClick={onSubmitClick}>Login</button>
          </div>
        </div>
      </section>
      {notification &&
        <div className="notification">
          {notification}
        </div>
      }
    </div>

  )
}

export default HealthcareLogin 

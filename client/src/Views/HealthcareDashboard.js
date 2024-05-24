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
import {handleEncrypt,handleDecrypt} from "../Contexts/crypter"

const HealthcareDashboard= ()=>{
  
  const {currentHealthcare,currentDoctor,currentPatient,setCurrentDoctor,setCurrentPatient,setCurrentHealthcare,setCurrentPharmacy} = useStateContext();
  const [state,setState] = useState({
    doctorAddress:null,
    doctorName:null,
    doctorDesignation:null
  })
  const [notification,setNotification] = useState()

  const navigate = useNavigate()
  if(currentDoctor){
    return <Navigate to="/"/>
  }

   async function onRegisterClick (){
    //console.log(state.doctorName,currentHealthcare,state.doctorAddress,state.doctorDesignation)
    const encryptedDoctorName = handleEncrypt(state.doctorName)
    const encryptedDoctorDesignation= handleEncrypt(state.doctorDesignation)
     // console.log("encryptedDoctorName =" + encryptedDoctorName)
     // console.log("encryptedDoctorDesignation =" + encryptedDoctorDesignation)

    //setState({...state,doctorDesignation:"test"})
    //setState({...state,doctorName:encryptedDoctorName})
    console.log(state.doctorName,state.doctorAddress,state.doctorDesignation)
    console.log("encryptedDoctorDesignation \n \n \n \n "+encryptedDoctorDesignation,"doctorAddress \n\n\n"+state.doctorAddress,"encryptedDoctorName\n\n\n"+encryptedDoctorName)
    console.log("doctorName\n\n\n"+state.doctorName,"doctorAddress\n\n\n"+state.doctorAddress,"doctorDesignation\n\n\n"+state.doctorDesignation)


    await kalp.methods.setDoctor(state.doctorAddress,encryptedDoctorName,encryptedDoctorDesignation)
       .send({from:currentHealthcare})
     .then((data)=>{
       console.log("Successfully Registered")
       setNotification("Successfully Registered")
     }).catch((e)=>{
       console.log("error")
       setNotification("Error: "+e)
     })
  }

  async function onPharmacyLogin(){
    console.log("onPharmacyLogin")
     window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((data)=>{
        console.log("current metamask = ",data)
        if(data[0].toLowerCase()==currentHealthcare.toLowerCase()){
        setCurrentPharmacy(data[0])
        navigate("/")
        }
        else{
          setNotification("Invalid Pharmacy Address")
        }
      }).catch(e=>{
        console.log(e)
      })
  }
	
  const onLogoutClick = (ev) => {
		ev.preventDefault()	
    setCurrentHealthcare(null)
	}

  return(
    <div className="container-flex bg-accent">
    <WelcomeHeader/>
    <div className="d-flex flex-row-reverse">
    <button className="btn mt-1 me-1 ms-auto btn-danger" onClick={onLogoutClick}>Log Out</button>
    </div>
    <section className="mt-5 row mx-auto d-flex justify-content-center">
      <section className="col-5 border card p-5 me-5">
        <h1 className="h1 text-black">Register a New Doctor</h1>
        <br/>
        <input type="text" onChange={ev=>{setState({...state,doctorAddress:ev.target.value})}} value={state.doctorAddress} className="text-black mt-2 py-1" placeholder="   Chain Address"/>
        <br/>
        <input type="text" onChange={ev=>{setState({...state,doctorDesignation:ev.target.value})}} value={state.doctorDesignation}  className=" text-black mt-2 py-1" placeholder="   Designation"/>
        <br/>
        <input type="text" onChange={ev=>{setState({...state,doctorName:ev.target.value})}} value={state.doctorName}  className=" text-black mt-2 py-1" placeholder="   Name"/>
        <br/>
        <button className="btn mt-2 btn-primary text-white" onClick={onRegisterClick}>Submit</button>
      </section>
      <section className="col-5 border card ms-5 p-5" >
        <h1 className="h1 text-center text-black">Pharmacy Login</h1>
        <br/>
        <i className="fa fa-hospital"></i>
        <br/>
        <button className="btn btn-primary my-auto  text-white text-decoration-none" onClick={onPharmacyLogin}>Login</button>
      </section>
    </section>
		
    {notification && 
			<div className="notification">
				{notification}
			</div>
    }
    </div>
  )
}

export default HealthcareDashboard

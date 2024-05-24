import React, { Component, useEffect, useState } from "react";
import {
  Grid,
  Jumbotron,
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";

import ReactTabs from 'react-tabs';
import { Tabs } from 'react-tabs';
import { TabList } from 'react-tabs';
import { Tab } from 'react-tabs';
import { TabPanel } from 'react-tabs';
import kalp from '../getContract'
import web3 from '../web3'
import { useStateContext } from "../Contexts/ContextProvider";
import moment from "moment"
import {handleEncrypt,handleDecrypt, handleDecryptNumbers} from "../Contexts/crypter"

const PatientDashboard= () => {
  const {currentPatient} = useStateContext();

  const [state,setState]= useState({
    id:currentPatient,
    name:"Hrishikesh",
    age:null,
    contact:null,
    location:null,
  })

  const [patientPrescriptions,setPatientPrescriptions] = useState([])
  const [patientDiagnosis,setPatientDiagnosis] = useState([])
  
  useEffect(()=>{
    getPatientDetails();
    getDiagnosis();
    getPatientPrescriptions();
  },[])


  async function getPatientDetails(){
    let doctorCount;
    console.log("currentPatient is: ",currentPatient)
    kalp.methods.docount().call()
    .then(data=>{
      doctorCount = data
      console.log(doctorCount)
    })

    kalp.methods.getPatientsByDoctorIndex(1).call()
    .then(data=>{
      for(let i = 0; i<data.length;i++){
        if(data[i][0].toLowerCase()==currentPatient){
          console.log("matched current patient")
          console.log("fetched data for patient :",data[i])
          setState({...state,name:handleDecrypt(data[i][1]),age:handleDecryptNumbers(data[i][2].toString()),contact:handleDecryptNumbers(data[i][3].toString()),location:handleDecrypt(data[i][4])})
          // setState({...state,name:(data[i][1]),age:(data[i][2].toString()),contact:(data[i][3].toString()),location:(data[i][4])})
        }
      }
    })
  }

  async function getPatientPrescriptions(){
    let doctorCount;
    let tempArray = [];
    console.log("currentPatient is: ",currentPatient)
    kalp.methods.docount().call()
    .then(data=>{
      doctorCount = data
      console.log(doctorCount)

      for(let k=0;k<=doctorCount;k++){
        console.log("k is ",k)
        kalp.methods.getPatientsByDoctorIndex(k).call()
        .then(data=>{
          for(let i = 0; i <data.length;i++){
            console.log("data[] is :",data)
            if(data[i][0].toLowerCase()==currentPatient){
              for(let j=0;j<data[i].prescriptions.length;j++){
                tempArray.push(data[i].prescriptions[j])
                console.log("k is",k,"data[",i,"].prescriptions[",j,"]",data[i].prescriptions[j])
                console.log("k is",k,"data[",i,"].prescriptions[",j,"] temp array",tempArray)
              }
            }
          }
          setPatientPrescriptions(tempArray)
        }).catch(e=>{
          console.log("error ",e)
        })
        setPatientPrescriptions(tempArray)
        console.log("patientDiagnosis:",patientDiagnosis)
      }
    })
  }

  async function getDiagnosis(){
    let doctorCount;
    let tempArray = [];
    console.log("currentPatient is: ",currentPatient)
    kalp.methods.docount().call()
    .then(data=>{
      doctorCount = data
      console.log(doctorCount)

      for(let k=0;k<=doctorCount;k++){
        console.log("k is ",k)
        kalp.methods.getPatientsByDoctorIndex(k).call()
        .then(data=>{
          for(let i = 0; i <data.length;i++){
            console.log("data[] is :",data)
            if(data[i][0].toLowerCase()==currentPatient){
              for(let j=0;j<data[i].records.length;j++){
                tempArray.push(data[i].records[j])
                console.log("k is",k,"data[",i,"].records[",j,"]",data[i].records[j])
                console.log("k is",k,"data[",i,"].records[",j,"] temp array",tempArray)
              }
            }
          }
          setPatientDiagnosis(tempArray)
        }).catch(e=>{
          console.log("error ",e)
        })
        setPatientDiagnosis(tempArray)
        console.log("patientDiagnosis:",patientDiagnosis)
      }
    })
  }


  return (
    <div>
      <section id="jumbotron"  style={{paddingTop:150,paddingBottom:75,paddingRight:20,paddingLeft:20}}>
        <h1 className="name display-1" style={{color:"white",fontWeight:900}}>Medical Chain, London</h1>
        <h1 className="h1 " style={{color:"white"}}></h1>
      </section>
      <section className="row mt-5 d-flex justify-content-around">
      <div className="col-3">
        <div className="card p-5">
        <h1 className="display-6">Welcome,<br/> {state.name}</h1>
        <hr/> <h3 className="h3">Age : {state.age}</h3>
        <h3 className="h3">Location : {state.location}</h3>
        <h3 className="h3">Contact : {state.contact}</h3>
        </div>
      </div>
      <div className="col-9" style={{borderLeft:1}}>
        <Tabs>
          <TabList>
            <Tab>Diagnosis</Tab>
            <Tab>Prescriptions</Tab>
          </TabList>
        <TabPanel>
          <div id="tableHolder">
          <table className="table table-bordered" style={{ width: "100%" }}>
            <thead className="bg-primary text-white">
              <tr >
                <th style={{ paddingRight: 20 }}>Sr.</th>
                <th style={{ paddingRight: 20 }}>Diagnosis</th>
                <th style={{ paddingRight: 20 }}>Doctor Address</th>
                <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                <th style={{ paddingRight: 20 }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {patientDiagnosis.map(u => (
                <tr>
                  <td style={{ paddingRight: 20 }}> {u[0].toString()} </td>
                  <td style={{ paddingRight: 20 }}> {handleDecrypt(u[1])} </td>
                  <td style={{ paddingRight: 20 }}> {u[2]} </td>
                  <td style={{ paddingRight: 20 }}> {u[3]} </td>
                  <td style={{ paddingRight: 20 }}> {moment.unix(u[4].toString()).format("dddd, MMMM Do, YYYY h:mm:ss A").toString()} </td>
                </tr>
              ))}
            

            </tbody>    
          </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="tableHolder">
          <table className="table table-bordered" style={{ width: "100%" }}>
            <thead className="bg-primary text-white">
              <tr >
                <th style={{ paddingRight: 20 }}>Sr.</th>
                <th style={{ paddingRight: 20 }}>Doctor Address</th>
                <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                <th style={{ paddingRight: 20 }}>Timestamp</th>
                <th style={{ paddingRight: 20 }}>Drug</th>
                <th style={{ paddingRight: 20 }}>Quantity</th>
                <th style={{ paddingRight: 20 , display:"none"}}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {patientPrescriptions.map(u => (
                <tr>
                  <td style={{ paddingRight: 20 }}> {u[0].toString()} </td>
                  <td style={{ paddingRight: 20 }}> {u[1]} </td>
                  <td style={{ paddingRight: 20 }}> {(u[2])} </td>
                  <td style={{ paddingRight: 20 }}> {moment.unix(u[3].toString()).format("dddd, MMMM Do, YYYY h:mm:ss A").toString()} </td>
                  <td style={{ paddingRight: 20 }}> {handleDecrypt(u[4])} </td>
                  <td style={{ paddingRight: 20 }}> {u[6].toString()} </td>
                  <td style={{ paddingRight: 20 , display:"none"}}> {u[5].toString()} </td>
                </tr>
              ))}
            </tbody>    
          </table>
          </div>
        </TabPanel>
        </Tabs>
      </div>
      </section>
      

    </div>

  )
}

export default PatientDashboard 


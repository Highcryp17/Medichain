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
import { handleEncrypt,handleDecrypt } from "../Contexts/crypter";

const PharmacyDashboard= () => {
  const [allPrescriptions, setAllPrescriptions] = useState([])
  const [state,setState] = useState({
    id:null,
    patientId : null
  })
  const [drug,setDrug] = useState([]);
  const [allPatients,setAllPatients] = useState([])
  const {currentPharmacy,setCurrentPharmacy} = useStateContext();

  const setDrugCost = ()=>{
    console.log("drug.name : ",drug.name)
    console.log("drug.cost: ",drug.cost)

    const encDrugName = handleEncrypt(drug.name)

    kalp.methods.setDrugCost(encDrugName,drug.cost)
    .send({from: currentPharmacy})
    .then(data=>{
      console.log("setDrugCost : response",data)
    }).catch(e=>{
      console.log(e)
    })
    
  }

  useEffect(()=>{
    fetchAllPatients()
  },[])

  useEffect(()=>{
    fetchAllPrescriptions()
  },[state.id])
  
  async function fetchAllPatients() {
    let docCount;
    let tempArray = [];
    kalp.methods.docount().call()
    .then(data=>{
      docCount = data[0]
    })

    for (let i = 0;i<=docCount;i++){
      kalp.methods.getPatientsByDoctorIndex(i).call()
      .then((fetched) => {
        console.log("fetchAllPatients() ", fetched)
        tempArray.push(fetched)
      })
      .catch((e) => {
        console.log(e)
      })
    }
    setAllPatients(tempArray)
  }

  useEffect(()=>{
    getPatientPrescriptions();
  },[state.patientId])
  
  useEffect(()=>{
    getPatientDetails();
    fetchAllPrescriptions();
  },[])


  async function fetchAllPrescriptions() {
    let patientCount = allPatients.length
    let tempArray = [];
    for(let i=0;i<patientCount;i++){
      if(allPatients[i][0]===state.id){
        console.log("record length : ",allPatients[i].prescriptions.length)
        for(let j=0;j<allPatients[i].prescriptions.length;j++){
          console.log("Diagnosis : PatientIndex ",j," RecordIndex ",allPatients[i].prescriptions[j])
          tempArray.push(allPatients[i].prescriptions[j])
        }
      }
    }
    console.log("Prescrtipnrslen tempArray : ",tempArray)
    setAllPrescriptions(tempArray)
    console.log("asdll preasf : ",allPrescriptions)
  }


  async function getPatientDetails(){
    let doctorCount;
    let tempArray = [];
    kalp.methods.docount().call()
    .then(data=>{
      doctorCount = data
      console.log(doctorCount)
    })

    kalp.methods.getPatientsByDoctorIndex(1).call()
    .then(data=>{
      for(let i = 0; i<data.length;i++){
        console.log("fetched data for patient :",data[i])
        tempArray.push(data[i])
        console.log("tempArray is : ",tempArray)
      }
      console.log("set all patients called")
      setAllPatients(tempArray)
      console.log("allPatients tempArray: ",tempArray)
      console.log("allPatients : ",allPatients)
    }).catch(e=>{console.log(e)})
  }

  async function getPatientPrescriptions(){
    let doctorCount;
    let tempArray = [];
    kalp.methods.docount().call()
    .then(data=>{
      doctorCount = data
      console.log(doctorCount)

      for(let k=0;k<=doctorCount;k++){
        console.log("k is ",k)
        kalp.methods.getPatientsByDoctorIndex(k).call()
        .then(data=>{
          for(let i = 0; i <data.length;i++){
            console.log("data[i][0] is :",data[i][0])
            console.log("state.patientId is :",data[i][0])
            if(data[i][0]==state.patientId){
              for(let j=0;j<data[i].prescriptions.length;j++){
                tempArray.push(data[i].prescriptions[j])
                console.log("k is",k,"data[",i,"].prescriptions[",j,"]",data[i].prescriptions[j])
                console.log("k is",k,"data[",i,"].prescriptions[",j,"] temp array",tempArray)
              }
            }
          }
        }).catch(e=>{
          console.log("error ",e)
        })
      }
    })
  }


  return (
    <div>
      <section id="jumbotron"  style={{paddingTop:150,paddingBottom:75,paddingRight:20,paddingLeft:20}}>
        <h1 className="name display-1" style={{color:"white",fontWeight:900}}>Medical Chain, London</h1>
        <h1 className="h1 " style={{color:"white"}}></h1>
      </section>

      <section className="d-flex justify-content-center">
        
          <form className="mt-5">
            <FormGroup controlId="patient">
              <h4 className="text-center">ID of Patient</h4>
              <FormControl
                componentClass="select"
                placeholder="Select"
                value={state.id}
                name="id"
                onChange={ev => { setState({  id: ev.target.value }) }}
                style={{backgroundColor:"#ededed",borderRadius:20}}
              >
                <option className="text-center " value="">---Select a Patient---</option>

                {
                  allPatients.map((item) => (
                    <option value={item[0]}>
                      {handleDecrypt(item[1])} (ID : {item[0]})</option>
                  ))
                }
              </FormControl>
            </FormGroup>
          </form>

      </section>

      <section className="row mt-5 d-flex justify-content-around">
        <div className="col-9" style={{borderLeft:1}}>
        <Tabs>
          <TabList>
            <Tab>Prescriptions</Tab>
            <Tab style={{display:"none"}}>Drugs</Tab>
          </TabList>
        <TabPanel>

          <div id="tableHolder">
          <table className="table table-bordered" style={{ width: "100%" }}>
            <thead className="bg-primary text-white">
            <tr >
                <th style={{ paddingRight: 20 }}>Prescription No.</th>
                <th style={{ paddingRight: 20 }}>Doctor Address</th>
                <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                <th style={{ paddingRight: 20 }}>Timestamp</th>
                <th style={{ paddingRight: 20 }}>Drug</th>
                <th style={{ paddingRight: 20 }}>Quantity</th>
                <th style={{ paddingRight: 20 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {allPrescriptions.map(u => (
                <tr>
                  <td style={{ paddingRight: 20 }}> {u[0].toString()} </td>
                  <td style={{ paddingRight: 20 }}> {u[1]} </td>
                  <td style={{ paddingRight: 20 }}> {u[2]} </td>
                  <td style={{ paddingRight: 20 }}> {moment.unix(u[3].toString()).format("dddd, MMMM Do, YYYY h:mm:ss A").toString()} </td>
                  <td style={{ paddingRight: 20 }}> {handleDecrypt(u[4])} </td>
                  <td style={{ paddingRight: 20 }}> {u[6].toString()} </td>
                  <td style={{ paddingRight: 20 }}> <a className="btn btn-primary text-white p">Print Receipt</a> </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>

        </TabPanel>
        <TabPanel>
              <form >
                <input type="hidden" value={state.id} />
                <Col sm={9}>
                  <FormGroup controlId="prescribedDrugName">
                    <b>Name of the Drug</b>
                    <FormControl
                      type="text"
                      value={drug.name}
                      placeholder="Drug Name"
                      onChange={ev => setDrug({ ...drug, name: ev.target.value })}
                      name="drugName"
                    />
                  </FormGroup>
                  <FormGroup controlId="prescribedDrugQuantity">
                    <b>Quantity</b>
                    <FormControl
                      type="text"
                      pattern="[1-9][0-9]*"
                      value={drug.cost}
                      placeholder="Drug Cost"
                      onChange={ev => setDrug({ ...drug, cost: ev.target.value })}
                      name="drugPrice"
                    />
                  </FormGroup>
                  <Button className="btn text-white btn-primary mt-1" onClick={setDrugCost}>
                    Submit
                  </Button>
                </Col>
              </form>
        </TabPanel>
        </Tabs>
      </div>
      </section>
      

    </div>

  )
}

export default PharmacyDashboard 


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
import {handleEncrypt,handleDecrypt, handleEncryptNumbers, handleDecryptNumbers} from "../Contexts/crypter"

const DoctorDashboard= () => {

  const [newPatient, setNewPatient] = useState({
    id: null,
    name: null,
    age: null,
    contact: null,
    useraddress: null
  })
  const [chainAddress, setChainAddress] = useState('0x8790530B57258eC38d101CE8dB5462B4aC0F8B85')
  const [newDiagnosis, setNewDiagnosis] = useState({
    patientAddress: null,
    diseaseName: null,
    chainAddress: null
  })
  const [newReceipt, setNewReceipt] = useState({
    receiptNo: null,
    entity: null,
    quantity: null,
    total: null,
 })
  const [prescribedDrug, setPrescribedDrug] = useState({
    id: null,
    name: null,
    healthcareAddress: null,
    quantity: null,
  })
  const [patientCount, setPatientCount] = useState(null)
  const [doctorName, setDoctorName] = useState(null)
  const [state, setState] = useState({
    patientIndex: null,
    id: '',
    patientName:'',
    patientAge:'',
    addPatient: false,
  })
  const [allPatients, setAllPatients] = useState([])
  const [allPrescriptions, setAllPrescriptions] = useState([])
  const [allReceipts, setAllReceipts] = useState([])
  const {currentHealthcare,currentDoctor} = useStateContext()
  const [patientIndex,setPatientIndex] = useState()
  const [selectedPatientDiagnosis,setSelectedPatientDiagnosis] = useState([])

  useEffect(() => {
    getPatientCount();
  }, [allPatients])

  useEffect(() => {
    fetchAllPatients();
  }, [patientCount])

  useEffect(() => {
    fetchAllDiagnosis()
    fetchPatientIndex();
    fetchAllPrescriptions()
  }, [state.id,setAllPatients])

  async function fetchPatientIndex(){
    let patientCount = allPatients.length
    let tempName = [];
    let age;
    for(let i=0;i<patientCount;i++){
      if(allPatients[i][0]===state.id){
        console.log("alllpatinsaifnsalfssnal",allPatients[i][1])
        tempName.push(allPatients[i][0])
        tempName=allPatients[i].name
        //age=allPatients[i][2]
        age=allPatients[i].patientAge
      }
    }
    setState({...state,patientName:tempName})
    setState({...state,patientAge:age})
    
  }

  async function fetchAllDiagnosis() {
    let patientCount = allPatients.length
    let tempArray = [];
    for(let i=0;i<patientCount;i++){
      if(allPatients[i][0]===state.id){
        console.log("record length : ",allPatients[i].records.length)
        for(let j=0;j<allPatients[i].records.length;j++){
          console.log("Diagnosis : PatientIndex ",j," RecordIndex ",allPatients[i].records[j])
          tempArray.push(allPatients[i].records[j])
        }
      }
    }
    console.log("Diagnosis tempArray : ",tempArray)
    setSelectedPatientDiagnosis(tempArray)
    console.log("selectedPatientDiagnosis : ",selectedPatientDiagnosis)
  }

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
  // async function fetchAllPrescriptions() {
  //   if (state.id != 0) {
  //     let prescriptionCount;
  //     await kalp.methods.getCount(state.id).call()
  //       .then((data) => {
  //         console.log("getCount", data)
  //         prescriptionCount = data[1]
  //       }).catch((e) => {
  //         console.log(e)
  //       })
  //
  //     var tempArray = []
  //     for (let i = 0; i < prescriptionCount; i++) {
  //       console.log("prescriptions iterator", i)
  //       await kalp.methods.getPrescriptionfromAddress(state.id, i)
  //         .call()
  //         .then((fetched) => {
  //           tempArray.push(fetched)
  //           console.log("INSIDE Prescription fetched this array on iteration ", 0, " : ", fetched)
  //         })
  //         .catch((e) => {
  //           console.log("ooopss you got an errorrrrrr dumbass", e)
  //         })
  //     }
  //     setAllPrescriptions(tempArray)
  //     console.log("temparray", tempArray)
  //     console.log("allPrescriptions", allPrescriptions)
  //   }
  // }

  async function getPatientCount() {
    // await Number(kalp.methods.getPatientCount().call()
    //   .then((fetched) => {
    //     setPatientCount(fetched)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
    // )
    setPatientCount(allPatients.length)
  }

  async function fetchAllPatients() {

    await kalp.methods.getPatientsByDoctor(currentDoctor).call()
    .then((fetched) => {
      console.log("fetchAllPatients() ", fetched)
      setAllPatients(fetched)
    })
    .catch((e) => {
      console.log(e)
    })
  }

  async function createNewPatient() {
    console.log("currentDoctor is ",currentDoctor)
    const encPatientName = handleEncrypt(newPatient.name)
    const encPatientAge= handleEncryptNumbers(newPatient.age)
    const encPatientContact= handleEncryptNumbers(newPatient.contact)
    const encPatientUserAddress= handleEncrypt(newPatient.useraddress)
    kalp.methods.setPatient(newPatient.id, encPatientName, encPatientAge, encPatientContact, encPatientUserAddress)
      .send({ from: currentDoctor})
      .then(({ data }) => {
        console.log("promise successfull");
        console.log({ data })
        getPatientCount();
        setState({...state,addPatient: false })
      }).catch((e) => {
        console.log('promise failed')
        console.log(e)
      })
  }


  async function createNewDiagnosis() {
    console.log(state.id)
  
    const encDiseaseName=handleEncrypt(newDiagnosis.diseaseName)
    console.log("encDiseaseName"+encDiseaseName)

    kalp.methods.setDiagnosisfromAddress(state.id, encDiseaseName, "0x2155aFFA7010845EBECb2efa0A724A532091DcD1", currentDoctor)
      .send({ from: currentDoctor})
      .then(({ data }) => {
        console.log("promise successfull createdNewDiagnosis with diseasename", newDiagnosis.diseaseName);
        console.log({ data })
        setState({...state,addPatient: false })
      }).catch((e) => {
        console.log('promise failed')
        console.log(e)
      })
  }

  async function createNewPrescription() {
    // console.log(Date())
    const encDrugName=handleEncrypt(prescribedDrug.name)
    console.log("encDrugName"+encDrugName)
    
    kalp.methods.setPrescriptionfromAddress(state.id, "0x2155aFFA7010845EBECb2efa0A724A532091DcD1" , encDrugName, prescribedDrug.quantity, currentDoctor)
      .send({ from: currentDoctor})
      .then(({ data }) => {
        console.log("promise successfull");
        console.log({data})
      }).catch((e) => {
        console.log('promise failed')
        console.log(e)
      })
  }

  return (
    <div>
        <br/>
        <section id="jumbotron"  style={{paddingTop:150,paddingBottom:75,paddingRight:20,paddingLeft:20}}>
          <h2 className="name display-1" style={{color:"white",fontWeight:900}}>Medical Chain, London</h2>
          <h2 className="h1 " style={{color:"white"}}><b>Patients : </b>{patientCount}</h2>
        </section>
      <Row className="d-flex justify-content-center">
          <div className="col-5">
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
                      {handleDecrypt(item[1])} (ID : {item.patientAddress})</option>
                  ))
                }
              </FormControl>
            </FormGroup>
          </form>
              </div>
            <div className="text-center">OR</div>
          {state.addPatient ? (
            <Col sm={8} smOffset={2} className="newPat">
                <FormGroup controlId="newPatient">
                  <h4> Add New Patient </h4>
                  <FormControl
                    type="text"
                    value={newPatient.id}
                    placeholder="Enter Address ID"
                    onChange={ev => { setNewPatient({ ...newPatient, id: ev.target.value }) }}
                  />
                  <FormControl
                    type="text"
                    value={newPatient.name}
                    placeholder="Name"
                    onChange={ev => { setNewPatient({ ...newPatient, name: ev.target.value }) }}
                  />
                  <FormControl
                    type="number"
                    value={newPatient.age}
                    placeholder="Age"
                    onChange={ev => { setNewPatient({ ...newPatient, age: ev.target.value }) }}
                  />
                  <FormControl
                    type="contact"
                    value={newPatient.contact}
                    placeholder="Contact Number"
                    onChange={ev => { setNewPatient({ ...newPatient, contact: ev.target.value }) }}
                  />
                  <FormControl
                    type="text"
                    value={newPatient.useraddress}
                    placeholder="User Address"
                    onChange={ev => { setNewPatient({ ...newPatient, useraddress: ev.target.value }) }}
                  />
                </FormGroup>
                <button className="btn mt-1 text-white btn-primary" onClick={ev=>createNewPatient()}>
                  Submit
                </button>
            </Col>
          ) : (
            <div className="col-3 text-center">
              <button className="btn btn-primary mt-1 text-white" onClick={ev => setState({ ...state, addPatient: true })}>Add a Patient</button>
            </div>
          )}
      </Row>


      <Tabs className="container ">
        <TabList>
          <Tab>Patient Details</Tab>
          <Tab>Diagnosis</Tab>
          <Tab>Prescriptions</Tab>
        </TabList>
          <br/>
        <TabPanel  >
          <div className="details">
            <h2>Patient Description</h2>
          <div id="tableHolder">
            <table className="table table-bordered" style={{ width: "100%" }}>
              <thead className="bg-primary text-white">
                <tr >
                  <th style={{ paddingRight: 20 }}>PatientID</th>
                  <th style={{ paddingRight: 20 }}>Name</th>
                  <th style={{ paddingRight: 20 }}>Age</th>
                  <th style={{ paddingRight: 20 }}>Contact Number</th>
                  <th style={{ paddingRight: 20 }}>Address</th>
                </tr>
              </thead>
              <tbody>
                {allPatients.map(u => {
                  return (
                      <tr 
                      >
                        <td style={{ paddingRight: 20 }}> {u[0]} </td>
                        <td style={{ paddingRight: 20 }}> {handleDecrypt(u[1])} </td>
                        <td style={{ paddingRight: 20 }}> {handleDecryptNumbers(u[2].toString()).toString()} </td>
                        <td style={{ paddingRight: 20 }}> {handleDecryptNumbers(u[3].toString()).toString()} </td>
                        <td style={{ paddingRight: 20 }}> {handleDecrypt(u[4])} </td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          </div>
        </TabPanel>

        <TabPanel >
          <div className="diagnosis d-flex justify-content-around">
            <form className="col-3 me-3">
              <FormGroup controlId="disease">
                <h3>Diagnosis of the Patient</h3>
                <FormControl
                  type="text"
                  value={newDiagnosis.diseaseName}
                  placeholder="Enter text"
                  onChange={ev => setNewDiagnosis({ ...newDiagnosis, diseaseName: ev.target.value })}
                  name="disease"
                />
              </FormGroup>
              <Button onClick={createNewDiagnosis} className="btn mt-1 text-white btn-primary">
                Submit
              </Button>
            </form>
            <div className="diagnosis-table ms-3 col-9">
              <h2>History of Diseases.</h2>
          <div id="tableHolder">
              <table className="table table-bordered">
                <thead className="bg-primary text-white">
                <tr >
                    <th style={{ paddingRight: 20 }}>Diagnosis No.</th>
                    <th style={{ paddingRight: 20 }}>Diagnosis</th>
                    <th style={{ paddingRight: 20 }}>Doctor Address</th>
                    <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                    <th style={{ paddingRight: 20 }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatientDiagnosis.map(u => (
                    <tr>
                      <td style={{ paddingRight: 20 }}> {u[0].toString()} </td>
                      <td style={{ paddingRight: 20 }}> {handleDecrypt(u[1].toString()).toString()} </td>
                      <td style={{ paddingRight: 20 }}> {u[2].toString()} </td>
                      <td style={{ paddingRight: 20 }}> {u[3].toString()} </td>
                      <td style={{ paddingRight: 20 }}> {moment.unix(u[4].toString()).format("dddd, MMMM Do, YYYY h:mm:ss A")} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>

          </div>
        </TabPanel>

        <TabPanel >
          <div className="prescription d-flex justify-content-around">
            <div className="col-3">
              <h2 >Add a Prescription</h2>
              <form >
                <input type="hidden" value={state.id} />
                <Col sm={9}>
                  <FormGroup controlId="prescribedDrugName">
                    <b>Name of the Drug</b>
                    <FormControl
                      type="text"
                      value={prescribedDrug.name}
                      placeholder="Drug Name"
                      onChange={ev => setPrescribedDrug({ ...prescribedDrug, name: ev.target.value })}
                      name="prescribedDrugName"
                    />
                  </FormGroup>
                  <FormGroup controlId="prescribedDrugQuantity">
                    <b>Quantity</b>
                    <FormControl
                      type="text"
                      pattern="[1-9][0-9]*"
                      value={prescribedDrug.quantity}
                      placeholder="Quantity"
                      onChange={ev => setPrescribedDrug({ ...prescribedDrug, quantity: ev.target.value })}
                      name="prescribedDrugQuantity"
                    />
                  </FormGroup>
                  <Button className="btn text-white btn-primary mt-1" onClick={createNewPrescription}>
                    Submit
                  </Button>
                </Col>
              </form>
            </div>
            <div className="col-9">
              <h2>List of Prescriptions</h2>
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
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          </div>
          </div>
        </TabPanel>
      </Tabs>



    </div>
  )
}

export default DoctorDashboard 

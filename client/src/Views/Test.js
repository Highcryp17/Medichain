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
import {Tabs,Tab} from "react-bootstrap"
import kalp from '../getContract'
import web3 from '../web3'
import { useStateContext } from "../Contexts/ContextProvider";

const Test= () => {
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
  const [state, setState] = useState({
    patientIndex: null,
    id: '',
    addPatient: false,
  })
  const [allPatients, setAllPatients] = useState([])
  const [allDiagnosisArray, setAllDiagnosisArray] = useState([])
  const [allPrescriptions, setAllPrescriptions] = useState([])
  const [allReceipts, setAllReceipts] = useState([])
  const {currentHealthcare} = useStateContext()

  useEffect(() => {
    getPatientCount();
  }, [])

  useEffect(() => {
    fetchAllPatients();
  }, [patientCount])

  useEffect(() => {
    fetchAllDiagnosis()
    fetchAllPrescriptions()
    fetchAllReceipts()
  }, [state.id,setAllPatients,setAllDiagnosisArray,setAllDiagnosisArray])

  async function fetchAllDiagnosis() {
    if (state.id != 0) {
      let diagnosisCount;
      await kalp.methods.getCount(state.id)
        .call().then((fetched) => {
          console.log("fetched getCount", fetched)
          diagnosisCount = fetched[0]
        }).catch((e) => console.log(e))

      console.log("dig count : ", diagnosisCount)
      var tempArray = []
      for (let i = 0; i < diagnosisCount; i++) {
        await kalp.methods.getDiagosisfromAddress(state.id, i).call()
          .then((fetched) => {
            tempArray.push(fetched)
            console.log("Inside fetchAllDiagnosis, iteration: ", i, "fetchedData:", fetched)
          })
          .catch((e) => {
            console.log(e)
          })
        setAllDiagnosisArray(tempArray)
        console.log("this is the final temp array for fetch diagnosis", tempArray)
        console.log("this is the final diagnosis array", allDiagnosisArray)
      }
    }
  }

  async function fetchAllPrescriptions() {
    if (state.id != 0) {
      let prescriptionCount;
      await kalp.methods.getCount(state.id).call()
        .then((data) => {
          console.log("getCount", data)
          prescriptionCount = data[1]
        }).catch((e) => {
          console.log(e)
        })
      var tempArray = []
      for (let i = 0; i < prescriptionCount; i++) {
        console.log("prescriptions iterator", i)
        await kalp.methods.getPrescriptionfromAddress(state.id, i)
          .call()
          .then((fetched) => {
            tempArray.push(fetched)
            console.log("INSIDE Prescription fetched this array on iteration ", 0, " : ", fetched)
          })
          .catch((e) => {
            console.log("ooopss you got an errorrrrrr dumbass", e)
          })
      }
      setAllPrescriptions(tempArray)
      console.log("temparray", tempArray)
      console.log("allPrescriptions", allPrescriptions)
    }
  }

  async function getPatientCount() {
    await kalp.methods.getPatientCount().call()
      .then((fetched) => {
        setPatientCount(fetched)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function fetchAllPatients() {
    var tempArray = []
    for (let i = 0; i <= patientCount; i++) {
      await kalp.methods.getPatientfromID(i).call()
        .then((fetched) => {
          tempArray.push({ ...fetched, patientIndex: i })
          console.log("temparray", tempArray)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    setAllPatients(tempArray)
    console.log("allPatients", allPatients)
  }

  async function createNewPatient() {
    kalp.methods.setPatient(newPatient.id, newPatient.name, newPatient.age, newPatient.contact, newPatient.useraddress).send({ from: currentHealthcare})
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
    kalp.methods.setDiagnosisfromAddress(state.id, newDiagnosis.diseaseName, chainAddress)
      .send({ from: currentHealthcare })
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
    prescribedDrug.id = state.id
    console.log(prescribedDrug)
    kalp.methods.setPrescriptionfromAddress(state.id, chainAddress, prescribedDrug.name, prescribedDrug.quantity)
      .send({ from: currentHealthcare})
      .then(({ data }) => {
        console.log("promise successfull");
        // console.log({data})
      }).catch((e) => {
        console.log('promise failed')
        console.log(e)
      })
  }

  async function createNewReceipt() {
    console.log("id",state.id)
    console.log("chainaddress",chainAddress)
    console.log("entity",newReceipt.entity)
    console.log("quantity",newReceipt.quantity)
    console.log("total",newReceipt.total)
    console.log("receiptNo",newReceipt.receiptNo)
    kalp.methods.setReceiptfromAddress(state.id,chainAddress, newReceipt.entity, newReceipt.quantity, newReceipt.total,newReceipt.receiptNo).send({ from: chainAddress })
      .then(({ data }) => {
        console.log("promise successfull, returned", data);
        // console.log({data})
      }).catch((e) => {
        console.log('promise failed')
        console.log(e)
      })
  }

  async function fetchAllReceipts() {
    if (state.id != 0) {
      let receiptCount;
      await kalp.methods.getCount(state.id)
        .call().then((fetched) => {
          console.log("fetched getCount", fetched)
          receiptCount = fetched[2]
        }).catch((e) => console.log(e))

      console.log("receipt count : ", receiptCount)
      if(receiptCount===0){
        setAllReceipts({'':''})
        return
      }
      var tempArray = []
      for (let i = 0; i < receiptCount; i++) {
        await kalp.methods.getReceiptfromAddress(state.id, i).call()
          .then((fetched) => {
            tempArray.push(fetched)
            console.log("Inside fetchAllReceipts, iteration: ", i, "fetchedData:", fetched)
          })
          .catch((e) => {
            console.log(e)
          })
        setAllReceipts(tempArray)
        console.log("this is the final temp array for fetch Receipts", tempArray)
        console.log("this is the final Receipts array", allReceipts)
      }
    }
  }

  return (
    <div>
        <section className="bg-primary" style={{paddingTop:50,paddingBottom:50,paddingRight:20,paddingLeft:20}}>
          <h2 className="name display-1" style={{color:"white"}}>Medical Chain, London</h2>
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
                      {item[1]} (ID : {item.patientIndex})</option>
                  ))
                }
              </FormControl>
            </FormGroup>
          </form>
              </div>
            <div className="text-center">OR</div>
          {state.addPatient ? (
            <Col sm={8} smOffset={2} className="newPat">
              <form >
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
                <button className="btn mt-1 btn-primary" onClick={ev => { createNewPatient() }}>
                  Submit
                </button>
              </form>
            </Col>
          ) : (
            <div className="col-3 text-center">
              <button className="btn btn-primary text-white" onClick={ev => setState({ ...state, addPatient: true })}>Add a Patient</button>
            </div>
          )}
      </Row>


    <Tabs justify variant="pills" defaultActiveKey="tab-1" className="mb-1 p-0">
      <Tab eventKey="tab-1" title="Tab 1">
            asfkjasfnjasknf
      </Tab>
      <Tab eventKey="tab-2" title="Tab 2">
            asfkjasfnjasknf
      </Tab>
    </Tabs>



      <div defaultActiveKey={0} variant="pills" id="options" className="container nav nav-tabs">
        <Tab eventKey={0} className="nav-item" title="Patient Details">
          <div className="details">
            <h2>Patient Description</h2>
            <table style={{ width: "100%" }}>
              <thead>
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
                    u[0] === state.id ? (
                      <tr 
                      >
                        <td style={{ paddingRight: 20 }}> {u[0]} </td>
                        <td style={{ paddingRight: 20 }}> {u[1]} </td>
                        <td style={{ paddingRight: 20 }}> {u[2]} </td>
                        <td style={{ paddingRight: 20 }}> {u[3]} </td>
                        <td style={{ paddingRight: 20 }}> {u[4]} </td>
                      </tr>
                    )
                      : (
                        <tr colSpan={5}>

                        </tr>
                      )
                  )
                })}
              </tbody>
            </table>

          </div>
        </Tab>

        <Tab eventKey={1} title="Upload Report Diagonosis">
          <div className="report">
            <Col sm={6}>
              <form>
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
                <Button onClick={createNewDiagnosis}>
                  Submit
                </Button>
              </form>
            </Col>
            <Col sm={6}>
              <h2>History of Diseases.</h2>
              <table style={{ width: "100%" }}>
                <thead>
                <tr style={{ backgroundColor: "aquamarine",borderRadius:20 }}>
                    <th style={{ paddingRight: 20 }}>Name</th>
                    <th style={{ paddingRight: 20 }}>Age</th>
                    <th style={{ paddingRight: 20 }}>idk</th>
                    <th style={{ paddingRight: 20 }}>diagnosis</th>
                    <th style={{ paddingRight: 20 }}>Chain Address</th>
                    <th style={{ paddingRight: 20 }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {allDiagnosisArray.map(u => (
                    <tr>
                      <td style={{ paddingRight: 20 }}> {u[0]} </td>
                      <td style={{ paddingRight: 20 }}> {u[1]} </td>
                      <td style={{ paddingRight: 20 }}> {u[2]} </td>
                      <td style={{ paddingRight: 20 }}> {u[3]} </td>
                      <td style={{ paddingRight: 20 }}> {u[4]} </td>
                      <td style={{ paddingRight: 20 }}> {u[5]} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>

          </div>
        </Tab>

        <Tab eventKey={2} title="Upload Prescription">
          <div className="prescription">
            <Col sm={4}>
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
                  <Button onClick={createNewPrescription}>
                    Submit
                  </Button>
                </Col>
              </form>
            </Col>

            <Col sm={7} smOffset={1}>
              <h2>List of Prescriptions</h2>
              <table style={{ width: "100%" }}>
                <thead>
                <tr style={{ backgroundColor: "aquamarine",borderRadius:20 }}>
                    <th style={{ paddingRight: 20 }}>Prescription No.</th>
                    <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                    <th style={{ paddingRight: 20 }}>Timestamp</th>
                    <th style={{ paddingRight: 20 }}>Quantity</th>
                    <th style={{ paddingRight: 20 }}>DrugName</th>
                  </tr>
                </thead>
                <tbody>
                  {allPrescriptions.map(u => (
                    <tr>
                      <td style={{ paddingRight: 20 }}> {u[0]} </td>
                      <td style={{ paddingRight: 20 }}> {u[1]} </td>
                      <td style={{ paddingRight: 20 }}> {u[2]} </td>
                      <td style={{ paddingRight: 20 }}> {u[3]} </td>
                      <td style={{ paddingRight: 20 }}> {u[4]} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </div>
        </Tab>

        <Tab eventKey={3} title="Upload Receipt">
          <div className="receipt">
            <Col sm={4}>
              <form method="post" action="">
                <input type="hidden" value={state.id} />
                <FormGroup controlId="receiptNo">
                  <ControlLabel>Receipt No.</ControlLabel>
                  <FormControl
                    type="text"
                    pattern="[1-9][0-9]*"
                    value={newReceipt.receiptNo}
                    placeholder="Enter Number"
                    onChange={ev => setNewReceipt({ ...newReceipt, receiptNo: ev.target.value })}
                    name="receiptNo"
                  />
                </FormGroup>
                <Col >
                  <FormGroup controlId="receiptEntity" inline>
                    <ControlLabel>Entity</ControlLabel>
                    <FormControl
                      type="text"
                      value={newReceipt.entity}
                      placeholder="Enter text"
                      onChange={ev => setNewReceipt({ ...newReceipt, entity: ev.target.value })}
                      name="receiptEntity"
                    />
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup controlId="receiptQuantity" inline>
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl
                      type="text"
                      pattern="[1-9][0-9]*"
                      value={newReceipt.quantity}
                      placeholder="Quantity"
                      onChange={ev => setNewReceipt({ ...newReceipt, quantity: ev.target.value })}
                      name="receiptQuantity"
                    />
                  </FormGroup>
                </Col>
                <input type="hidden" value={state.id} />
                <Col>
                  <FormGroup controlId="receiptTotal" inline>
                    <ControlLabel>Total Cost</ControlLabel>
                    <FormControl
                      type="text"
                      pattern="[1-9][0-9]*"
                      value={newReceipt.total}
                      placeholder="Total Cost"
                      onChange={ev => { setNewReceipt({ ...newReceipt, total: ev.target.value }) }}
                      name="receiptTotal"
                    />
                  </FormGroup>
                </Col>
                <Button onClick={createNewReceipt}>
                  Submit
                </Button>
              </form>
            </Col>

            <Col sm={7} smOffset={1}>
              <h2>List of Receipts</h2>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr style={{ backgroundColor: "aquamarine", borderRadius: 20 }}>
                    <th style={{ paddingRight: 20 }}>Receipt ID</th>
                    <th style={{ paddingRight: 20 }}>Healthcare Address</th>
                    <th style={{ paddingRight: 20 }}>Timestamp</th>
                    <th style={{ paddingRight: 20 }}>Quantity</th>
                    <th style={{ paddingRight: 20 }}>Drug</th>
                    <th style={{ paddingRight: 20 }}>Total Price</th>
                    <th style={{ paddingRight: 20 }}>Receipt No.</th>
                  </tr>
                </thead>
                <tbody>
                  {allReceipts.map(u => (
                    <tr>
                      <td style={{ paddingRight: 20 }}> {u[0]} </td>
                      <td style={{ paddingRight: 20 }}> {u[1]} </td>
                      <td style={{ paddingRight: 20 }}> {u[2]} </td>
                      <td style={{ paddingRight: 20 }}> {u[3]} </td>
                      <td style={{ paddingRight: 20 }}> {u[4]} </td>
                      <td style={{ paddingRight: 20 }}> {u[5]} </td>
                      <td style={{ paddingRight: 20 }}> {u[6]} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </div>
        </Tab>


      </div>



    </div>
  )
}

export default Test

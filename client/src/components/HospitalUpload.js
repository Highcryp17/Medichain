import React, { Component, useEffect} from "react";
import {
  Grid,
  Jumbotron,
  Button,
  Row,
  Col,
  FormControl,
  FormGroup,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HospitalUpload.css";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import HistoryHosp from "./HistoryHosp";
import web3 from "../web3";
import kalp from "../getContract";

class HospitalUpload extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      disease: "",
      data: [],
      addPatient: false,
      patientAdd: "",
      prescribedDrugName: "",
      prescribedDrugQuantity: "",
      receiptNo: "",
      receiptEntity: "",
      receiptQuantity: "",
      receiptTotal: "",
      diseaseData: [],
      prescriptionData: [],
      receiptData: [],
      patientCount: [],
      allPatientsArray: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.newSub = this.newSub.bind(this);
    this.newRep = this.newRep.bind(this);
    this.newPres = this.newPres.bind(this);
    this.newPatient = this.newPatient.bind(this);
    this.newPat = this.newPat.bind(this);
    this.newRecItem = this.newRecItem.bind(this);
    this.newRec = this.newRec.bind(this);
    this.getAllPatients= this.getAllPatients.bind(this);
  }

  
  async setPatient(e){
    const account = await web3.eth.getAccounts();
    console.log("setPatient called")
    kalp.methods.setPatient(this.state.id,this.state.name,this.state.age,this.state.contactNo,this.state.address).send({from: account[0]}).
      then(({data})=>{
      console.log("promise successfull");
      console.log({data})
    }).catch((e)=>{
      console.log('promise failed')
      console.log(e)
    })
  }

  async getPatientCount(){
    kalp.methods.getPatientCount().call().
      then((fetched)=>{
        // console.log(fetched)
        this.setState({patientCount: fetched})         
        console.log("patient count var = ")
        console.log(this.state.patientCount)
      })
    .catch((e)=>{
      console.log("errorrrrrr" + e)
    })
  }
  
  getAllPatients() {
    let tempPatient = []
      for (let i = 1; i <= 12; i++) {
          console.log('iterator is' + i)
           kalp.methods.getPatient(i).call()
          .then((data)=>{
              console.log("promise fullfilled");
                tempPatient.push(data)
                console.log("this is temp patient")
                console.log(tempPatient)
            }).catch(()=>{
              console.log('promise failed');
            })
      }
        this.setState({allPatientsArray: tempPatient});
        console.log(this.state.allPatientsArray)
  }
  
  async handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "id") {
      //setState of data. Get Data using await
      // this.setState({data: [{"name": "Pehla Number", "date": "Purana1"},
      //   {"name": "Dusra Number", "date": "Purana2"}]})
      console.log(this.state.id);
      let patient = await kalp.methods.getCount(this.state.id).call();

      let recordsCount = patient[0];
      let patientList = [];
      // const mydata = await healthCare.methods.getPatient(0).call();
      for (let i = 1; i <= recordsCount; i++) {
        let records = await kalp.methods.getRecord(this.state.id, i).call();
        patientList.push(records);
        this.setState({ data: patientList });
        console.log(records);
      }
      this.setState({ data: patientList });

      let prescCount = patient[1];
      let prescList = [];
      // const mydata = await healthCare.methods.getPatient(0).call();
      for (let i = 1; i <= prescCount; i++) {
        let presc = await kalp.methods.getPrescription(this.state.id, i).call();
        prescList.push(presc);
        this.setState({ prescriptionData: prescList });
        console.log(presc);
      }
      this.setState({ prescriptionData: prescList });

      let recCount = patient[2];
      let recList = [];
      // const mydata = await healthCare.methods.getPatient(0).call();
      for (let i = 1; i <= recCount; i++) {
        let presc = await kalp.methods.getReceipt(this.state.id, i).call();
        recList.push(presc);
        this.setState({ receiptData: recList });
        console.log(presc);
      }
      this.setState({ receiptData: recList });

      // this.setState({receiptData: [{"no": 1, "total": 1732, "date": "Purana1"}, {"no": 5, "total": 138, "date": "Purana2"}]})
    }
  }

  async newSub(e) {
    e.preventDefault();
    console.log(this.state.disease);
    const accounts = await kalp.methods.getPatient(0);
    console.log("loggin accounts 0" + accounts[0]);
    console.log("loggin accounts" + accounts);
    await kalp.methods
      .setRecord(1, accounts[0], "5/1/2018", this.state.disease)
      .send({ from: accounts[0] });
    //awaits se send.
    //setState of data. Get Data using await
    let patient = await kalp.methods.getCount(1).call();
    console.log(patient[0]);
    let recordsCount = patient[0];
    let patientList = [];
    // const mydata = await healthCare.methods.getPatient(0).call();
    for (let i = 0; i <= recordsCount; i++) {
      let records = await kalp.methods.getPatient(1, i).call();
      patientList.push(records);
      this.setState({ data: patientList });
      console.log(records);
    }
    this.setState({ data: patientList });
  }

  newPatient(e) {
    this.setState((prevState) => {
      return {
        addPatient: !prevState.addPatient,
      };
    });
  }

  newRep(e) {
    e.preventDefault();
    //awaits se send.
    //setState of diseaseData. Get diseaseData using await
    this.setState({ disease: "" });
  }

  async newPres(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    //awaits se send.
    //setState of prescriptionData. Get prescriptionData using await
    const accounts = await web3.eth.getAccounts();
    // this.setState({prescriptionDrugName: ""})
    // this.setState({prescriptionDrugQuantity: ""})
    await kalp.methods
      .setPrescription(1, accounts[0], "Crocin", "5/1/2018")
      .send({ from: accounts[0] });

    let patient = await kalp.methods.getCount(1).call();
    console.log(patient[0]);
    let prescCount = patient[0];
    let prescList = [];
    // const mydata = await healthCare.methods.getPatient(0).call();
    for (let i = 0; i <= prescCount; i++) {
      let presc = await kalp.methods.getPrescription(1, i).call();
      prescList.push(presc);
      this.setState({ prescriptionData: prescList });
      console.log(presc);
    }
    this.setState({ prescriptionData: prescList });
  }

  async newPat(e) {
    e.preventDefault();
    //awaits se send the new patient address
    this.setState((prevState) => {
      return {
        id: prevState.patientAdd,
      };
    });
    const accounts = await web3.eth.getAccounts();

    await kalp.methods
      .setPatient(this.state.id, "Harsh", 54, 4604660345, "Kandivali")
      .send({ from: accounts[0] });
  }

  newRecItem(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    //awaits se send send the item ka entity and quantity
    // this.setState({receiptEntity: ""})
    // this.setState({receiptQuantity: ""})
  }

  async newRec(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    //awaits se send send the item ka entity and quantity
    //setState of receiptData. Get receiptData using await
    // this.setState({receiptNo: ""})
    // this.setState({receiptTotal: ""})
    const accounts = await web3.eth.getAccounts();

    await kalp.methods
      .setReceipt(
        1,
        accounts[0],
        this.state.receiptEntity,
        "5/1/2018",
        this.state.receiptTotal
      )
      .send({ from: accounts[0] });
  }

  componentDidMount(){
    // this.setPatient();
    this.getPatientCount();
    this.getAllPatients();

    console.log("componentMounted");
    console.log("allPatientsArray"+ this.state.allPatientsArray);
  }

  render() {
    // web3 = new Web3(new Web3.providers.HttpProviders("http://localhost:8545"));

    // web3.eth.defaultAccount = web3.eth.accounts[0];

    return (
      <Grid>
        <Jumbotron className="jumbotron">
          <h2 className="name">Grey Sloan Memorial</h2>
          <Col className="JTD" smOffset={3}>
            <span className="JTE">Address: </span>New York, NY, United States
          </Col>
          <Col className="JTD" smOffset={3}>
            <span className="JTE">Contact: </span>+91-8655561191
          </Col>
          <Col className="JTD" smOffset={3}>
            <span className="JTE">Patients: </span>{this.state.patientCount}
          </Col>
        </Jumbotron>
        <Row>
          <Col sm={6} smOffset={3}>
            <form method="post" action="">
              <FormGroup controlId="patient">
                <ControlLabel>ID of Patient</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Select"
                  value={this.state.id}
                  name="id"
                  onChange={this.handleChange}
                >
                  <option value="">---Select a Patient---</option>
                    {this.state.allPatientsArray.map(u => (
                      <option value={u[0]}>
                      {u[0]}</option>
                    ))}
                  
                </FormControl>
              </FormGroup>
            </form>
            <Col sm={6} smOffset={3}>
              <div>OR</div>
            </Col>
            {this.state.addPatient ? (
              <Col sm={8} smOffset={2} className="newPat">
                <form action="#" method="post">
                  <FormGroup controlId="newPatient">
                    <ControlLabel> Address of the New Patient</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.patientAdd}
                      placeholder="Enter Address"
                      onChange={this.handleChange}
                      name="patientAdd"
                    />
                  </FormGroup>
                  <Button type="submit" onClick={this.newPat}>
                    Submit
                  </Button>
                </form>
              </Col>
            ) : (
              <Col sm={8} smOffset={2} className="newPat">
                <Button onClick={this.newPatient}>Add a Patient</Button>
              </Col>
            )}
          </Col>
        </Row>
        <Tabs defaultActiveKey={1} id="options">
          <Tab eventKey={1} title="Upload Report Diagonosis">
            <div className="report">
              <Col sm={6}>
                <form method="post" action="">
                  <input type="hidden" value={this.state.id} />
                  <FormGroup controlId="disease">
                    <ControlLabel>Diagnosis of the Patient</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.disease}
                      placeholder="Enter text"
                      onChange={this.handleChange}
                      name="disease"
                    />
                  </FormGroup>
                  <Button type="submit" onClick={this.newSub}>
                    Submit
                  </Button>
                </form>
              </Col>

              <Col sm={6}>
                <h2>History of Diseases.</h2>
                <HistoryHosp data={this.state.data} />
                <table style={{width:"100%"}}>
                  <thead>
                  <tr style={{backgroundColor:"#aeaeae",  borderRadius:20}}>
                    <th style={{paddingRight:20}}>PatientID</th>
                    <th style={{paddingRight:20}}>Name</th>
                    <th style={{paddingRight:20}}>Age</th>
                    <th style={{paddingRight:20}}>Contact Number</th>
                    <th style={{paddingRight:20}}>Address</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.state.allPatientsArray.map(u => (

                      <tr>
                        <td style={{paddingRight:20}}> {u[0]} </td>
                        <td style={{paddingRight:20}}> {u[1]} </td>
                        <td style={{paddingRight:20}}> {u[2]} </td>
                        <td style={{paddingRight:20}}> {u[3]} </td>
                        <td style={{paddingRight:20}}> {u[4]} </td>
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
                <form method="post" action="">
                  <input type="hidden" value={this.state.id} />
                  <Col sm={9}>
                    <FormGroup controlId="prescribedDrugName">
                      <ControlLabel>Name of the Drug</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.prescribedDrugName}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                        name="prescribedDrugName"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup controlId="prescribedDrugQuantity">
                      <ControlLabel>Quantity</ControlLabel>
                      <FormControl
                        type="text"
                        pattern="[1-9][0-9]*"
                        value={this.state.prescribedDrugQuantity}
                        placeholder=""
                        onChange={this.handleChange}
                        name="prescribedDrugQuantity"
                      />
                    </FormGroup>
                  </Col>
                  <Button type="submit" onClick={this.newPres}>
                    Submit
                  </Button>
                </form>
              </Col>

              <Col sm={7} smOffset={1}>
                <h2>List of Prescriptions</h2>
                <HistoryHosp data={this.state.prescriptionData} />
              </Col>
            </div>
          </Tab>
          <Tab eventKey={3} title="Upload Receipt">
            <div className="receipt">
              <Col sm={4}>
                <form method="post" action="">
                  <input type="hidden" value={this.state.id} />
                  <FormGroup controlId="receiptNo">
                    <ControlLabel>Receipt No.</ControlLabel>
                    <FormControl
                      type="text"
                      pattern="[1-9][0-9]*"
                      value={this.state.receiptNo}
                      placeholder="Enter Number"
                      onChange={this.handleChange}
                      name="receiptNo"
                    />
                  </FormGroup>
                  <Col sm={9}>
                    <FormGroup controlId="receiptEntity" inline>
                      <ControlLabel>Entity</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.receiptEntity}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                        name="receiptEntity"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup controlId="receiptQuantity" inline>
                      <ControlLabel>Quantity</ControlLabel>
                      <FormControl
                        type="text"
                        pattern="[1-9][0-9]*"
                        value={this.state.receiptQuantity}
                        placeholder=""
                        onChange={this.handleChange}
                        name="receiptQuantity"
                      />
                    </FormGroup>
                  </Col>
                  <Button type="submit" onClick={this.newRecItem}>
                    Add
                  </Button>
                </form>
                <br />
                <br />
                <form action="#" method="post">
                  <input type="hidden" value={this.state.id} />
                  <Col sm={7}>
                    <FormGroup controlId="receiptNo">
                      <ControlLabel>Receipt No.</ControlLabel>
                      <FormControl
                        type="text"
                        pattern="[1-9][0-9]*"
                        value={this.state.receiptNo}
                        placeholder="Enter Number"
                        onChange={this.handleChange}
                        name="receiptNo"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={5}>
                    <FormGroup controlId="receiptTotal" inline>
                      <ControlLabel>Total Cost</ControlLabel>
                      <FormControl
                        type="text"
                        pattern="[1-9][0-9]*"
                        value={this.state.receiptTotal}
                        placeholder=""
                        onChange={this.handleChange}
                        name="receiptTotal"
                      />
                    </FormGroup>
                  </Col>
                  <Button type="submit" onClick={this.newRec}>
                    Submit
                  </Button>
                </form>
              </Col>

              <Col sm={7} smOffset={1}>
                <h2>List of Receipts</h2>
                <HistoryHosp data={this.state.receiptData} />
              </Col>
            </div>
          </Tab>
        </Tabs>
      </Grid>
    );
  }
}

export default HospitalUpload;

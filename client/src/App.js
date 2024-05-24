import React, { Component } from "react";
import { ReactDOM } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Navigate,
} from "react-router-dom";
import getWeb3 from "./utils/getWeb3";
import InsuranceView from "./components/InsuranceView";
import HospitalUpload from "./components/HospitalUpload";
import HistoryHosp from "./components/HistoryHosp";
import UserDiagnosis from "./components/UserDiagnosis";
import UserPrescription from "./components/UserPrescription";
import UserReceipt from "./components/UserReceipt";
import UserView from "./components/UserView";
import "./App.css";
import web3 from "./web3";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component=<Navigate to="/InsuranceView" /> /> */}
        <Route path="/" exact component={InsuranceView} />
        <Route path="/InsuranceView" exact component={InsuranceView} />
        <Route path="/HospitalUpload" exact component={HospitalUpload} />
        <Route path="/History" exact component={HistoryHosp} />
        <Route path="/UserReceipt" exact component={UserReceipt} />
        <Route path="/UserDiagnosis" exact component={UserDiagnosis} />
        <Route path="/UserPrescription" exact component={UserPrescription} />
        <Route path="/UserView" exact component={UserView} />
      </Switch>
    </Router>
  );
};

export default App;

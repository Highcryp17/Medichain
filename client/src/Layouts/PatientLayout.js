import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";

export default function PatientLayout() {
  const {currentPatient} = useStateContext();
  console.log("currentPatient is : ",currentPatient)

	if(currentPatient){
    console.log("currentPatient is : ",currentPatient)
    return(
        <div>
          <Outlet/>
          <Navigate to="/PatientDashboard"/>
        </div>
    )
  }
  else{
    console.log("currentPatient is : ",currentPatient)
    return(
        <div>
          <Outlet/>
        <Navigate to="/PatientLogin"/>
        </div>
    )
  }
}

import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";

export default function GuestLayout() {
  const {currentHealthcare,currentDoctor,currentPharmacy} = useStateContext();
if(currentDoctor){
          return(
            <>
              <Navigate to="/DoctorDashboard"/>
            </>
          )
}

if(currentPharmacy){
          return(
            <>
              <Navigate to="/PharmacyDashboard"/>
            </>
          )
}


if(currentHealthcare){
    if(currentPharmacy){
          console.log("GuestLayout, currentPharmacy is set")
          console.log("GuestLayout, currentPharmacy is set")
      return(
        <>
         <Navigate to="/"/>
        </>
      )
      }
    else{
        return(
            <div>
              <Outlet/>
            <Navigate to="/Home"/>
            </div>
        )
      }
  }
  else{
    console.log("currentHealthcare",currentHealthcare)
    return(
      <div>
        <Outlet/>
        <Navigate to="/HealthcareLogin"/>
      </div>
    )
	}
}

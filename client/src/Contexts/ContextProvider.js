import React from 'react';
import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const StateContext = createContext({
	currentHealthcare: null,
	currentDoctor: null,
  currentPatient: null,
  currentPharmacy: null,
	setCurrentDoctor: () => {},
  setCurrentHealthcare: () => {},
  setCurrentPatient: () =>{},
  setCurrentPharmacy: () =>{}

})

 const ContextProvider = ({children}) => {
	const [currentHealthcare, _setCurrentHealthcare] = useState(localStorage.getItem("CURRENT_HEALTHCARE"));
	const [currentDoctor, _setCurrentDoctor]	= useState(localStorage.getItem("CURRENT_DOCTOR"));
	const [currentPatient, _setCurrentPatient]	= useState(localStorage.getItem("CURRENT_PATIENT"));
	const [currentPharmacy, _setCurrentPharmacy]	= useState(localStorage.getItem("CURRENT_PHARMACY"));

	const setCurrentHealthcare= (healthcareAddress) => {
		_setCurrentHealthcare(healthcareAddress) 
		if(healthcareAddress){
			localStorage.setItem("CURRENT_HEALTHCARE", healthcareAddress);
      console.log("LocalStorage currentHealthcare",localStorage.getItem("CURRENT_HEALTHCARE"))
		}else{
			localStorage.removeItem("CURRENT_HEALTHCARE");
		}
	}
   const setCurrentDoctor= (doctorAddress) => {
		_setCurrentDoctor(doctorAddress) 
		if(doctorAddress){
			localStorage.setItem("CURRENT_DOCTOR", doctorAddress);
      console.log("LocalStorage currentDOCTOR",localStorage.getItem("CURRENT_DOCTOR"))
		}else{
			localStorage.removeItem("CURRENT_DOCTOR");
		}
	}

   const setCurrentPatient= (patientAddress) => {
		_setCurrentPatient(patientAddress) 
		if(patientAddress){
			localStorage.setItem("CURRENT_PATIENT", patientAddress);
      console.log("LocalStorage PATIENT",localStorage.getItem("CURRENT_PATIENT"))
		}else{
			localStorage.removeItem("CURRENT_PATIENT");
		}
	}

  const setCurrentPharmacy= (pharmacyAddress) => {
		_setCurrentPharmacy(pharmacyAddress) 
		if(pharmacyAddress){
			localStorage.setItem("CURRENT_PHARMACY", pharmacyAddress);
      console.log("LocalStorage PHARMACY",localStorage.getItem("CURRENT_PHARMACY"))
		}else{
			localStorage.removeItem("CURRENT_PHARMACY");
		}
	}

	return(
		<StateContext.Provider value={{
      currentHealthcare,
      currentDoctor,
      currentPatient,
      currentPharmacy,
      setCurrentHealthcare,
      setCurrentDoctor,
      setCurrentPatient,
      setCurrentPharmacy,
		}}>
		{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
export default ContextProvider

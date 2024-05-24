import React, { Component } from "react";
import { BrowserRouter as Router, Route,createBrowserRouter } from "react-router-dom";

import HealthcareLogin from "./Views/HealthcareLogin"
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import HealthcareDashboard from "./Views/HealthcareDashboard";
import DoctorDashboard from "./Views/DoctorDashboard";
import PatientLogin from "./Views/PatientLogin";
import PatientDashboard from "./Views/PatientDashboard";
import PharmacyDashboard from "./Views/PharmacyDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout/>,
    children:[
      {
        path:"/HealthcareLogin", 
        element:<HealthcareLogin/>
      },
      {
        path:"/Home", 
        element:<HealthcareDashboard/>
      },
    ]
  },
 {
    path: "/",
    element: <DefaultLayout/>,
    children:[
      {
        path:"/DoctorDashboard", 
        element:<DoctorDashboard/>
      },
      {
        path:"/PatientDashboard", 
        element:<PatientDashboard/>
      },
      {
        path:"/PharmacyDashboard", 
        element:<PharmacyDashboard/>
      }
    ]
  },
]);

export default router;

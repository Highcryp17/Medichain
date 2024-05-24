import React from 'react'

const WelcomeHeader = ()=>{
  return(
    <section id="welcome-page" className="bg-primary d-flex justify-content-around container-flex">
      <h1 className="display-1 text-white">
        <b>Welcome to MedicalChain</b>
      <i className="ms-5 fa-solid fa-laptop-medical"></i>
    </h1>
    </section>
  )
}

export default WelcomeHeader;
